# Buyer Portal - Real Estate Broker Application

A full-stack buyer portal for a real-estate broker with user authentication and property favourites functionality.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Buyer Dashboard**: View user profile, role, and statistics
- **Property Listings**: Browse available properties with images and details
- **Favourites Management**: Add/remove properties to/from favourites
- **Security**: Password hashing with bcrypt, JWT-based authentication
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: SQLite (via better-sqlite3)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Frontend**: HTML, CSS, JavaScript

## Project Structure

```
buyer-portal/
├── server.js              # Express server with API routes
├── package.json           # Node.js dependencies
├── buyer_portal.db        # SQLite database (created on first run)
├── website/
│   ├── index.html         # Original website home page
│   ├── login.html         # Login and registration page
│   ├── dashboard.html     # Buyer dashboard
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── images/            # Property images
│   └── fonts/             # Web fonts
└── README.md              # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Access the application**:
   - Login page: http://localhost:3000/login
   - Dashboard: http://localhost:3000/dashboard
   - Original website: http://localhost:3000

## Deploy To Render

### Option 1: Blueprint (recommended)

1. Push this repository to GitHub.
2. In Render, click **New +** -> **Blueprint**.
3. Select this repository. Render will detect `render.yaml`.
4. Deploy. Render will automatically set:
  - `NODE_ENV=production`
  - `JWT_SECRET` (generated)
  - `DB_PATH=buyer_portal.db`

### Option 2: Manual Web Service

1. In Render, create a **Web Service** from this repo.
2. Use:
  - Build command: `npm install`
  - Start command: `npm start`
3. Add env var:
  - `JWT_SECRET` = a strong random secret
4. Health check path:
  - `/healthz`

### Important Note About SQLite On Render

- This app uses SQLite (`better-sqlite3`).
- Without a persistent disk, database data can reset on redeploy/restart.
- For persistent data, mount a persistent disk and set `DB_PATH` to that mounted location.

## API Endpoints

### Authentication

- `POST /api/register` - Register a new user
  - Body: `{ "email": "user@example.com", "password": "password123", "name": "John Doe" }`
  - Returns: JWT token and user info

- `POST /api/login` - Login user
  - Body: `{ "email": "user@example.com", "password": "password123" }`
  - Returns: JWT token and user info

- `GET /api/profile` - Get current user profile (requires authentication)
  - Headers: `Authorization: Bearer <token>`

### Properties

- `GET /api/properties` - Get all available properties (requires authentication)
  - Headers: `Authorization: Bearer <token>`

### Favourites

- `GET /api/favourites` - Get user's favourite properties (requires authentication)
  - Headers: `Authorization: Bearer <token>`

- `POST /api/favourites/:propertyId` - Add property to favourites (requires authentication)
  - Headers: `Authorization: Bearer <token>`

- `DELETE /api/favourites/:propertyId` - Remove property from favourites (requires authentication)
  - Headers: `Authorization: Bearer <token>`

- `GET /api/favourites/check/:propertyId` - Check if property is in favourites (requires authentication)
  - Headers: `Authorization: Bearer <token>`

## Example Flows

### Flow 1: Sign Up → Login → Add Favourite

1. **Register a new account**:
   - Navigate to http://localhost:3000/login
   - Click on the "Register" tab
   - Fill in your details:
     - Full Name: "Jane Smith"
     - Email: "jane@example.com"
     - Password: "password123"
     - Confirm Password: "password123"
   - Click "Register"
   - You'll be automatically logged in and redirected to the dashboard

2. **Browse properties**:
   - On the dashboard, you'll see all available properties
   - Each property shows title, location, description, and price

3. **Add a property to favourites**:
   - Click the "Add to Favourites" button on any property
   - The button will change to "Remove" and the property is saved
   - A success toast notification will appear

4. **View your favourites**:
   - Click on the "My Favourites" tab
   - You'll see all properties you've added to your favourites

5. **Remove a property from favourites**:
   - In the "My Favourites" tab, click "Remove" on any property
   - The property will be removed from your favourites list

### Flow 2: Login → View Dashboard → Manage Favourites

1. **Login with existing account**:
   - Navigate to http://localhost:3000/login
   - Enter your email and password
   - Click "Login"
   - You'll be redirected to the dashboard

2. **View your profile**:
   - At the top of the dashboard, you'll see:
     - Your name
     - Your role (Buyer)
     - Your email
     - Total available properties
     - Total favourites count

3. **Manage favourites**:
   - Switch between "All Properties" and "My Favourites" tabs
   - Add or remove properties as needed

4. **Logout**:
   - Click the "Logout" button in the header
   - You'll be redirected to the login page

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: API endpoints require valid JWT tokens
- **User Isolation**: Users can only access and modify their own favourites
- **Input Validation**: Server-side validation for all user inputs
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'buyer',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Properties Table
```sql
CREATE TABLE properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  price REAL,
  location TEXT,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Favourites Table
```sql
CREATE TABLE favourites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  property_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id),
  UNIQUE(user_id, property_id)
);
```

## Sample Properties

The application comes pre-loaded with 6 sample properties:

1. Modern Downtown Apartment - $450,000
2. Suburban Family Home - $650,000
3. Beachfront Villa - $1,200,000
4. Mountain Retreat - $350,000
5. Urban Loft - $550,000
6. Country Estate - $2,500,000

## Troubleshooting

### Port already in use
If port 3000 is already in use, you can change the port:
```bash
PORT=3001 npm start
```

### Database issues
If you encounter database issues, delete the `buyer_portal.db` file and restart the server. The database will be recreated with sample data.

### Dependencies not installed
Make sure you've run `npm install` before starting the server.

## License

This project is created for educational purposes as a take-home assessment.
