# 🏠 Afodams Property - Premium React App

## 🚀 WORLD-CLASS Real Estate Platform

Built with **React + TypeScript + Tailwind CSS + Framer Motion**

---

## ✨ Features

- ⚡ **Lightning Fast** - Vite build tool
- 🎨 **Premium Design** - Luxury gold, orange, brown theme
- 🎬 **Stunning Animations** - Framer Motion powered
- 📱 **Fully Responsive** - Mobile-first design
- 🎥 **Video Backgrounds** - Cinematic hero sections
- 🔒 **Type Safe** - Full TypeScript support
- 🎯 **SEO Optimized** - Meta tags and semantic HTML
- 🚀 **Production Ready** - Optimized builds

---

## 🛠️ Tech Stack

- **React 18** - Latest React with hooks
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Professional animations
- **Vite** - Next-gen build tool
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful icons
- **React Hot Toast** - Elegant notifications

---

## 📦 Installation

### Step 1: Navigate to Project
```bash
cd frontend-react
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React & React DOM
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- And all other dependencies

---

## 🏃 Running the App

### Development Mode
```bash
npm run dev
```

Your app will be available at: **http://localhost:3000**

The app will automatically reload when you make changes!

### Production Build
```bash
npm run build
```

Creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

Preview the production build locally.

---

## 📁 Project Structure

```
frontend-react/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx           # Premium button component
│   │   │   └── PropertyCard.tsx     # Property card with animations
│   │   └── layout/
│   │       ├── Navbar.tsx           # Responsive navigation
│   │       └── Footer.tsx           # Footer component
│   ├── pages/
│   │   ├── HomePage.tsx             # Landing page with video hero
│   │   ├── PropertyListPage.tsx    # Property listings
│   │   ├── PropertyDetailsPage.tsx # Property details
│   │   ├── AboutPage.tsx            # About us
│   │   ├── ContactPage.tsx          # Contact form
│   │   ├── LoginPage.tsx            # Login
│   │   ├── SignupPage.tsx           # Signup
│   │   └── DashboardPage.tsx        # Dashboard
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── index.html                       # HTML template
├── tailwind.config.js               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── package.json                     # Dependencies

```

---

## 🎨 Premium Design System

### Colors
```javascript
// Luxury Gold
--luxury-gold: #D4AF37
--gold-light: #F4E4B7
--gold-dark: #B8941F

// Premium Orange
--premium-orange: #FF8C42

// Deep Brown
--premium-brown: #4A2C2A

// Black & White
--premium-black: #0A0A0A
--premium-white: #FFFFFF
```

### Typography
- **Headings:** Playfair Display (Luxury serif)
- **Body:** Poppins (Modern sans-serif)
- **Accent:** Montserrat (Bold statements)

### Components

#### Button Usage
```tsx
import Button from '@/components/ui/Button'

// Gold button (primary)
<Button variant="gold" size="md">
  Click Me
</Button>

// Luxury button (black with gold border)
<Button variant="luxury" size="lg">
  Get Started
</Button>

// Outline button
<Button variant="outline" size="sm">
  Learn More
</Button>
```

#### Property Card Usage
```tsx
import PropertyCard from '@/components/ui/PropertyCard'

<PropertyCard
  id="1"
  title="Luxury Villa"
  price={150000000}
  location="Lekki, Lagos"
  image="https://..."
  bedrooms={5}
  bathrooms={6}
  size={450}
  status="For Sale"
  featured={true}
/>
```

---

## 🎬 Animations

### Framer Motion Examples

#### Fade In Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### Hover Effect
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive Element
</motion.div>
```

#### Scroll Animation
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Content appears on scroll
</motion.div>
```

---

## 🔗 Backend Integration

### API Configuration

Create `src/config/api.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const api = {
  properties: {
    getAll: () => fetch(`${API_URL}/properties`),
    getById: (id: string) => fetch(`${API_URL}/properties/${id}`),
    create: (data: any) => fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  },
  // Add more endpoints...
}
```

### Environment Variables

Create `.env`:

```env
VITE_API_URL=http://localhost:5000
```

---

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- **sm:** 640px (Mobile)
- **md:** 768px (Tablet)
- **lg:** 1024px (Desktop)
- **xl:** 1280px (Large Desktop)
- **2xl:** 1536px (Extra Large)

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

Your app will be live at: `https://your-app.vercel.app`

### Netlify

```bash
npm run build
# Drag & drop the `dist` folder to Netlify
```

### Manual Deployment

```bash
# Build
npm run build

# Upload the `dist` folder to your hosting
```

---

## 🎯 Key Features

### 1. Video Background Hero
- Cinematic property video
- Gradient overlay
- Animated statistics
- Premium search bar

### 2. Property Cards
- Image hover effects
- Wishlist functionality
- 3D transform on hover
- Smooth animations

### 3. Premium Navigation
- Glass morphism effect
- Sticky on scroll
- Mobile responsive menu
- Active state indicators

### 4. Toast Notifications
- Elegant design
- Auto-dismiss
- Custom styling
- Multiple types (success, error, info)

---

## 🎨 Customization

### Change Primary Color

Edit `tailwind.config.js`:

```javascript
colors: {
  luxury: {
    gold: '#YOUR_COLOR', // Change this
  },
}
```

### Change Fonts

Edit `tailwind.config.js`:

```javascript
fontFamily: {
  playfair: ['"YOUR_FONT"', 'serif'],
  poppins: ['"YOUR_FONT"', 'sans-serif'],
}
```

Update `index.html` to import your fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts
server: {
  port: 3001, // Use different port
}
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Build Errors
```bash
# Clear cache and rebuild
npm run build -- --force
```

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 🤝 Contributing

This is a private project for Afodams Property Limited.

---

## 📄 License

© 2025 Afodams Property Limited. All rights reserved.

---

## 🎉 What's Next?

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm run dev`
3. ✅ Open http://localhost:3000
4. ✅ See the **AMAZING** transformation!

**Enjoy your world-class property platform!** 🚀✨
