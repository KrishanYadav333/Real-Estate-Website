const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const DB_PATH = process.env.DB_PATH || 'buyer_portal.db';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('website'));

// Database setup
const db = new Database(DB_PATH);

// Lightweight health endpoint for Render health checks
app.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true });
});

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'buyer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price REAL,
    location TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS favourites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    property_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id),
    UNIQUE(user_id, property_id)
  );
`);

// Seed some sample properties
const propertyCount = db.prepare('SELECT COUNT(*) as count FROM properties').get();
if (propertyCount.count === 0) {
  const insertProperty = db.prepare(`
    INSERT INTO properties (title, description, price, location, image_url)
    VALUES (?, ?, ?, ?, ?)
  `);

  const sampleProperties = [
    ['Modern Downtown Apartment', 'Luxurious 2-bedroom apartment in the heart of downtown with stunning city views.', 450000, 'Downtown, New York', 'images/architect-building.jpg'],
    ['Suburban Family Home', 'Spacious 4-bedroom family home with large backyard and modern amenities.', 650000, 'Suburbs, California', 'images/architect-bridge.jpg'],
    ['Beachfront Villa', 'Beautiful 3-bedroom villa with direct beach access and ocean views.', 1200000, 'Coastal, Florida', 'images/mirror-building.jpg'],
    ['Mountain Retreat', 'Cozy 2-bedroom cabin in the mountains, perfect for weekend getaways.', 350000, 'Mountains, Colorado', 'images/traingular-building.jpg'],
    ['Urban Loft', 'Stylish industrial loft in trendy neighborhood with exposed brick.', 550000, 'Arts District, Chicago', 'images/architect-plan.jpg'],
    ['Country Estate', 'Expansive 5-bedroom estate with horse stables and 10 acres of land.', 2500000, 'Countryside, Texas', 'images/architect-sketch.jpg']
  ];

  sampleProperties.forEach(prop => {
    insertProperty.run(...prop);
  });
  console.log('Sample properties seeded.');
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Validation helpers
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Routes

// Root path - serve login page (client-side will redirect if already logged in)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'website', 'login.html'));
});

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'website', 'login.html'));
});

// Serve dashboard page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'website', 'dashboard.html'));
});

// Serve home page
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'website', 'index.html'));
});

// User registration
app.post('/api/register', (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert user
    const result = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)').run(email, hashedPassword, name);

    // Generate JWT token
    const user = { id: result.lastInsertRowid, email, name, role: 'buyer' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const tokenPayload = { id: user.id, email: user.email, name: user.name, role: user.role };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user profile
app.get('/api/profile', authenticateToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, email, name, role, created_at FROM users WHERE id = ?').get(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all properties
app.get('/api/properties', authenticateToken, (req, res) => {
  try {
    const properties = db.prepare('SELECT * FROM properties ORDER BY created_at DESC').all();
    res.json(properties);
  } catch (error) {
    console.error('Properties error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's favourites
app.get('/api/favourites', authenticateToken, (req, res) => {
  try {
    const favourites = db.prepare(`
      SELECT p.* FROM properties p
      INNER JOIN favourites f ON p.id = f.property_id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `).all(req.user.id);

    res.json(favourites);
  } catch (error) {
    console.error('Favourites error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add property to favourites
app.post('/api/favourites/:propertyId', authenticateToken, (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;

    // Check if property exists
    const property = db.prepare('SELECT id FROM properties WHERE id = ?').get(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if already in favourites
    const existingFavourite = db.prepare('SELECT id FROM favourites WHERE user_id = ? AND property_id = ?').get(userId, propertyId);
    if (existingFavourite) {
      return res.status(409).json({ error: 'Property already in favourites' });
    }

    // Add to favourites
    db.prepare('INSERT INTO favourites (user_id, property_id) VALUES (?, ?)').run(userId, propertyId);

    res.status(201).json({ message: 'Property added to favourites' });
  } catch (error) {
    console.error('Add favourite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove property from favourites
app.delete('/api/favourites/:propertyId', authenticateToken, (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;

    // Remove from favourites
    const result = db.prepare('DELETE FROM favourites WHERE user_id = ? AND property_id = ?').run(userId, propertyId);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Property not in favourites' });
    }

    res.json({ message: 'Property removed from favourites' });
  } catch (error) {
    console.error('Remove favourite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Check if property is in user's favourites
app.get('/api/favourites/check/:propertyId', authenticateToken, (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;

    const favourite = db.prepare('SELECT id FROM favourites WHERE user_id = ? AND property_id = ?').get(userId, propertyId);

    res.json({ isFavourite: !!favourite });
  } catch (error) {
    console.error('Check favourite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Login page: http://localhost:${PORT}/login`);
  console.log(`Dashboard: http://localhost:${PORT}/dashboard`);
});
