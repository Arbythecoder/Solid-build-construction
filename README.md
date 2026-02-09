# Solid Build Construction Limited

A comprehensive real estate property management platform for Nigeria with world-class features.

## Features

- 🏠 Property Listings (Gbagada, Ikeja, Ogba, and more Lagos locations)
- 🔐 Multi-role Authentication (Admin, Landlord, Tenant, Investor, Agent)
- 💰 Nigerian-specific tools (Mortgage Calculator, Payment Plans, C of O Verification)
- 📊 Real-time Analytics Dashboard
- 🔔 Socket.io Notifications
- ⭐ Favorites & Sharing
- 📱 Responsive Design
- 🎨 Luxury UI/UX

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.io (Real-time)
- Cloudinary (Images)
- Paystack (Payments)
- JWT Authentication
- Swagger API Docs

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (State)
- React Hot Toast

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Paystack account

### Backend Setup
```bash
cd backend
npm install
cp .env.production.example .env
# Edit .env with your credentials
npm run dev
```

### Frontend Setup
```bash
cd frontend-react
npm install
npm run dev
```

## Deployment

### Railway (Backend)
1. Create Railway account
2. Create new project
3. Connect GitHub repo
4. Set environment variables from `.env.production.example`
5. Deploy!

### GitHub Pages (Frontend)
1. Update `.env.production` with your Railway backend URL
2. Push to GitHub
3. Enable GitHub Pages in Settings > Pages
4. Select "GitHub Actions" as source
5. Workflow will auto-deploy on push to main

## Login Credentials (Seeded)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@Solid Buildproperty.com | Admin@123 |
| Landlord | landlord1@Solid Build.com | Landlord@123 |
| Tenant | tenant@Solid Build.com | Tenant@123 |

## API Documentation

Once backend is running, visit:
- Local: http://localhost:5000/api-docs
- Production: https://your-app.railway.app/api-docs

## Database Schema

- **Users**: Multi-role (admin, landlord, tenant, investor, agent)
- **Properties**: Full details with images, location, features
- **Notifications**: Real-time updates
- **Favorites**: User-saved properties
- **Inquiries**: Contact form submissions

## Project Structure

```
Solid Buildpropertylimited/
├── backend/                # Express API
│   ├── config/            # DB, Socket, Swagger configs
│   ├── controllers/       # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, upload, error handling
│   ├── utils/             # Email templates, validators
│   └── tests/             # Jest tests
├── frontend-react/        # React SPA
│   ├── src/
│   │   ├── components/    # Reusable UI
│   │   ├── pages/         # Route pages
│   │   ├── context/       # State management
│   │   ├── services/      # API calls
│   │   └── hooks/         # Custom hooks
│   └── public/
└── .github/workflows/     # CI/CD

```

## Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## License

MIT License - See LICENSE file

## Support

For issues, email: support@Solid Buildproperty.com
