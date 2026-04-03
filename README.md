# 🏠 Krishan Realty - Real Estate Portal

> A modern, full-featured real estate platform connecting buyers with premium properties across Nepal

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![Status](https://img.shields.io/badge/Status-Active-success)]()

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based authentication** with secure token generation
- **Password hashing** using bcryptjs
- **User registration & login** with email verification
- **Session management** with persistent user data

### 🏘️ Property Management
- **Premium Property Listings** - Browse 12+ high-value properties across Nepal
- **Advanced Search** - Filter by location, price, and availability status
- **Property Details** - Comprehensive information with high-quality images
- **Quick Information** - Property specifications at a glance

### ❤️ Favorites System
- **Save Favorites** - Add properties to your personal favorites list
- **Organize Saved Properties** - Easy-to-use dashboard for saved properties
- **Remove from Favorites** - One-click removal from your saved list
- **Persistent Storage** - Favorites are saved per user account

### 👤 User Portal
- **Personal Dashboard** - View saved properties and statistics
- **Profile Management** - Update user information
- **Statistics Dashboard** - Track available properties and favorites count
- **Responsive Design** - Seamless experience on all devices

### 🎨 UI/UX Features
- **Modern Design** - Clean, professional interface
- **Mobile Responsive** - Optimized for desktop, tablet, and mobile
- **Fast Loading** - Optimized images and assets
- **Accessibility** - WCAG compliant interface

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Backend** | Node.js + Express.js |
| **Database** | SQLite 3 (better-sqlite3) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Security** | bcryptjs |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Styling** | Tailwind CSS, Custom CSS |
| **Theme** | Astra WordPress Theme |
| **Page Builder** | Elementor |

---

## 📁 Project Structure

```
Project-Broker/
├── 📄 server.js                    # Express server & API routes
├── 📦 package.json                 # Dependencies & scripts
├── 📊 buyer_portal.db              # SQLite database
├── 📚 website/
│   ├── index.html                  # Homepage
│   ├── login.html                  # Authentication page
│   ├── dashboard.html              # User favorites dashboard
│   ├── projects.html               # Properties listing
│   ├── about.html                  # About page
│   ├── services.html               # Services page
│   ├── clients.html                # Client testimonials
│   ├── contact.html                # Contact page
│   ├── profile.html                # User profile
│   ├── css/                        # Stylesheets
│   │   ├── style-main.css          # Main stylesheet
│   │   ├── nav-uniform.css         # Navigation styles
│   │   └── [other-styles.css]
│   ├── js/                         # JavaScript modules
│   ├── images/                     # Property & brand images
│   ├── fonts/                      # Web fonts
│   └── favicon.ico                 # Website favicon
├── 🔧 rebuild_site.py              # Build utility script
├── 📝 README.md                    # This file
└── 📋 render.yaml                  # Deployment configuration
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v14 or higher
- **npm** (included with Node.js)
- **Git** (for version control)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/KrishanYadav333/Project-Broker.git
   cd Project-Broker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000`

4. **Access the application**
   - 🏠 Website Home: http://localhost:3000
   - 🔑 Login: http://localhost:3000/login
   - 📊 Dashboard: http://localhost:3000/dashboard
   - 🏘️ Properties: http://localhost:3000/projects.html

### Default Test Account

```
Email: test@example.com
Password: password123
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
DB_PATH=./buyer_portal.db
PORT=3000
```

### Database Setup

The database is created automatically on first run. It includes:
- **users** table - User accounts and authentication
- **favorites** table - Bookmarked properties per user
- **properties** table - Property catalog

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/register` | Register new user | `{ email, password, name }` |
| `POST` | `/api/login` | User login | `{ email, password }` |
| `GET` | `/api/user` | Get user info | Headers: `Authorization: Bearer <token>` |
| `POST` | `/api/logout` | User logout | Headers: `Authorization: Bearer <token>` |

### Favorites

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/favorites/add` | Add to favorites | `{ propertyId }` |
| `POST` | `/api/favorites/remove` | Remove from favorites | `{ propertyId }` |
| `GET` | `/api/favorites` | Get user favorites | - |

### Properties

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/properties` | Get all properties |
| `GET` | `/api/properties/:id` | Get property details |

---

## 🌐 Deployment

### Deploy to Render (Recommended)

#### Option 1: Using Blueprint (Automatic)

1. Push code to GitHub
2. In Render dashboard, click **New +** → **Blueprint**
3. Select your repository
4. Render auto-detects `render.yaml` configuration
5. Click **Deploy**

Render will automatically configure:
- `NODE_ENV=production`
- `JWT_SECRET` (auto-generated)
- Database path

#### Option 2: Manual Web Service Deployment

1. Create a **Web Service** on Render
2. Connect your GitHub repository
3. Set build & start commands:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:
   - `JWT_SECRET`: Strong random secret
   - `NODE_ENV`: `production`
5. Set Health Check Path: `/healthz`
6. Deploy

### ⚠️ Important: SQLite on Render

SQLite doesn't persist by default on Render. For production:

1. **Mount a persistent disk**:
   - In Render settings, attach a persistent volume
   - Mount path: `/data`

2. **Update DB_PATH**:
   ```env
   DB_PATH=/data/buyer_portal.db
   ```

3. **Alternative**: Use PostgreSQL for production

### Deploy to Other Platforms

The application is compatible with:
- **Heroku** - Set buildpack to Node.js
- **Vercel** - Requires serverless adaptation
- **AWS** - EC2, Elastic Beanstalk, or Lambda
- **DigitalOcean** - App Platform
- **VPS** - Any Linux server with Node.js

---

## 🎨 Customization

### Branding

Update in `website/index.html` & `website/css/style-main.css`:
- Logo: Replace `images/Company_logo.png`
- Colors: Update CSS variables in style sheets
- Font: Modify typography settings

### Properties Catalog

Edit property data in:
- `website/projects.html` - Gallery section
- JavaScript handles dynamic data from localStorage

---

## 📞 Contact & Support

**Krishan Realty**
- 📞 Phone: +977 9822321530
- 📧 Email: kryshan753@gmail.com
- 📍 Location: Kathmandu, Nepal

---

## ⚖️ License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📊 Stats & Info

- **Version**: 1.0.0
- **Last Updated**: April 2026
- **Properties Listed**: 12+
- **Supported Locations**: Multiple cities across Nepal
- **Response Time**: < 100ms average

---

## 🙏 Acknowledgments

- **Astra Theme** - WordPress theme framework
- **Elementor** - Page builder
- **Express.js** - Web framework
- **Community** - All contributors and supporters

---

**Made with ❤️ by Krishan Realty Team**

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
