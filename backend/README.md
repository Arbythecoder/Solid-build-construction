# 🔧 Afodams Property Limited - Backend API

RESTful API for the Afodams Property platform built with Node.js, Express, and MongoDB.

## 🌟 Features

- 🔐 JWT-based authentication with role-based access control
- 🏠 Complete property management CRUD operations
- 👥 Multi-role user system (Admin, Landlord, Tenant, Agent, Investor)
- 📤 File upload support (Multer + Cloudinary)
- 🔔 Real-time notifications (Socket.io)
- 📧 Email templates for notifications
- 📊 API documentation (Swagger/OpenAPI)
- ⚡ Response caching (Node-cache)
- 🛡️ Security features (Helmet, rate limiting, input sanitization)
- ✅ Input validation (Zod schemas)
- 🧪 Comprehensive test suite (Jest + Supertest)

## 🚀 Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcrypt
- **File Upload:** Multer + Cloudinary
- **Real-time:** Socket.io
- **Validation:** Zod
- **Testing:** Jest + Supertest
- **Documentation:** Swagger/OpenAPI 3.0
- **Security:** Helmet, express-rate-limit, express-mongo-sanitize

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Update .env with your configuration (see Environment Variables section)
```

## 🔑 Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/afodams

# JWT
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters

# Server
PORT=5000
NODE_ENV=production

# CORS
CORS_ORIGIN=https://your-frontend-domain.com

# Cloudinary (Image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Paystack (Payments)
PAYSTACK_SECRET_KEY=sk_live_xxxxx
PAYSTACK_PUBLIC_KEY=pk_live_xxxxx

# Email (SendGrid)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
SMTP_FROM_EMAIL=noreply@afodamsproperty.com
SMTP_FROM_NAME=Afodams Property Limited
```

## 🏃 Development

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Seed database with sample data
npm run seed
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Production)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create FREE cluster (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string
6. Update `MONGO_URI` in `.env`

### Local MongoDB

```bash
# Install MongoDB
# https://www.mongodb.com/docs/manual/installation/

# Start MongoDB
mongod

# Update .env
MONGO_URI=mongodb://localhost:27017/afodams
```

## 🌱 Seed Database

Run the seed script to populate with sample data:

```bash
npm run seed
```

This creates:
- 1 Admin user: `admin@afodamsproperty.com` / `Admin@123`
- 3 Landlord users
- 1 Tenant user
- 9 Properties (3 in Gbagada, 3 in Ikeja, 3 in Ogba)

## 📚 API Documentation

### Swagger UI

Once the server is running, visit:
```
http://localhost:5000/api-docs
```

### API Endpoints

#### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user (protected)
- `PUT /update` - Update user profile (protected)

#### Properties (`/api/properties`)
- `GET /` - Get all properties (with filters)
- `GET /:id` - Get single property
- `POST /` - Create property (protected - landlord/admin)
- `PUT /:id` - Update property (protected - owner/admin)
- `DELETE /:id` - Delete property (protected - owner/admin)

#### Inquiries (`/api/inquiries`)
- `GET /` - Get all inquiries (protected - admin)
- `POST /` - Create inquiry
- `GET /property/:propertyId` - Get inquiries for property
- `PUT /:id` - Update inquiry status (protected - admin)

#### Agents (`/api/agents`)
- `POST /register` - Register as agent (with file upload)
- `GET /` - Get all agents (protected - admin)
- `PUT /:id/verify` - Verify agent (protected - admin)

#### Landlords (`/api/landlords`)
- `POST /verify` - Submit verification (with file upload)
- `GET /` - Get all landlords (protected - admin)
- `PUT /:id/verify` - Verify landlord (protected - admin)

#### Tenants (`/api/tenants`)
- `POST /register` - Register as tenant
- `GET /` - Get all tenants (protected - admin/landlord)

#### Notifications (`/api/notifications`)
- `GET /` - Get user notifications (protected)
- `PUT /:id/read` - Mark as read (protected)
- `DELETE /:id` - Delete notification (protected)

#### Favorites (`/api/favorites`)
- `GET /` - Get user favorites (protected)
- `POST /` - Add to favorites (protected)
- `DELETE /:propertyId` - Remove from favorites (protected)
- `GET /check/:propertyId` - Check if favorited (protected)

## 🌐 Deployment

### Render.com (Recommended - FREE)

1. **Push code to GitHub**

2. **Create Render account:** https://render.com

3. **Create Web Service:**
   - Connect GitHub repository
   - Render auto-detects `render.yaml`
   - Add environment variables
   - Deploy

4. **Environment Variables on Render:**
   - Add all variables from `.env.example`
   - Minimum required: `MONGO_URI`, `JWT_SECRET`

### Heroku

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create afodams-backend

# Add MongoDB
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### VPS/Cloud Server

```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone https://github.com/Arbythecoder/afodams-backend.git
cd afodams-backend

# Install dependencies
npm install

# Create .env file
nano .env

# Install PM2
sudo npm install -g pm2

# Start server
pm2 start server.js --name afodams-api
pm2 save
pm2 startup
```

## 📁 Project Structure

```
backend/
├── config/
│   ├── db.js           # MongoDB connection
│   ├── cache.js        # Node-cache setup
│   ├── socket.js       # Socket.io configuration
│   └── swagger.js      # Swagger/OpenAPI spec
├── controllers/        # Route controllers
├── models/            # Mongoose models (7 models)
├── routes/            # Express routes
├── middleware/        # Custom middleware
├── utils/
│   ├── emailTemplates.js  # Email HTML templates
│   └── validators.js      # Zod validation schemas
├── tests/             # Jest test suites
├── uploads/           # File upload directory (gitignored)
├── .env.example       # Environment variables template
├── server.js          # Express app entry point
├── seed-properties.js # Database seed script
├── package.json       # Dependencies
└── render.yaml        # Render.com deployment config
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - Prevent brute force attacks
- **Input Sanitization** - Prevent NoSQL injection
- **Helmet.js** - Security headers
- **CORS** - Configured allowed origins
- **Input Validation** - Zod schema validation
- **File Upload Limits** - Max 5MB per file

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test auth.test.js
```

## 🔗 Frontend Repository

This backend serves the Afodams Frontend application.

**Frontend Repo:** https://github.com/Arbythecoder/afodams-frontend

## 📄 License

Proprietary - Afodams Property Limited

## 📞 Contact

**Afodams Property Limited**
- 📍 149 Ogudu Road, Lagos, Nigeria
- 📧 afodamsproperty@gmail.com
- 📱 +234 911 525 8580

---

Built with ❤️ for Nigerian real estate
