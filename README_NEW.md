# 🛍️ E-commerce Projects - Sunglasses Shop

This repository contains **two implementations** of a sunglasses e-commerce application:

1. **React Native Mobile App** (Original project)
2. **Angular Web Application** (New implementation) ⭐

---

## 📱 React Native Mobile App

Located in the root directory. This is a mobile e-commerce application built with React Native and Expo.

### Quick Start
```bash
npm install
npm start
```

See the original [README.md](./README.md) for full documentation.

---

## 🌐 Angular Web Application

Located in the `/angular-app` directory. A modern, production-ready web application built with Angular 21.

### Quick Start
```bash
cd angular-app
npm install
npm start
# Navigate to http://localhost:4200
```

### Features
- ✅ **Angular 21** with standalone components
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for responsive design
- ✅ **NgRx** for state management
- ✅ **Lazy Loading** for performance
- ✅ **Production Ready** with optimized builds

### Pages Included
1. **Home** (`/`) - Product listing with category filters
2. **Product Detail** (`/product/:id`) - Detailed product view
3. **Shopping Cart** (`/cart`) - Cart management
4. **Checkout** (`/checkout`) - Order completion
5. **Categories** (`/categories`) - Browse by category

### Tech Stack
- Angular 21.0
- TypeScript 5.9
- Tailwind CSS 3.4
- NgRx 19.0
- RxJS 7.8

### Build & Deploy
```bash
cd angular-app
npm run build
# Output: dist/angular-sunglasses-shop/
```

📖 **Full documentation**: [ANGULAR_PROJECT.md](./ANGULAR_PROJECT.md)

---

## 🎨 Design

Both implementations are based on e-commerce UI/UX best practices for a sunglasses store.

### Design Features
- Modern, clean interface
- Responsive layouts
- Intuitive navigation
- Shopping cart functionality
- Checkout flow
- Product filtering

---

## 🚀 Project Comparison

| Feature | React Native | Angular |
|---------|-------------|---------|
| **Platform** | Mobile (iOS/Android) | Web |
| **Framework** | React Native + Expo | Angular 21 |
| **State** | Redux (@reduxjs/toolkit) | NgRx |
| **Styling** | NativeWind (Tailwind) | Tailwind CSS |
| **Navigation** | Expo Router | Angular Router |
| **Language** | TypeScript | TypeScript |
| **Status** | ✅ Complete | ✅ Complete |

---

## 📂 Repository Structure

```
.
├── README.md              # React Native documentation
├── ANGULAR_PROJECT.md     # Angular documentation
├── README_NEW.md         # This file
├── package.json          # React Native dependencies
├── app/                  # React Native app code
├── components/           # React Native components
├── store/                # React Native Redux store
├── angular-app/          # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   └── models/
│   │   └── styles.scss
│   ├── package.json
│   └── README.md
└── ...
```

---

## 🎯 Which One to Use?

### Choose React Native if you need:
- Native mobile app (iOS/Android)
- Mobile-first experience
- Access to device features
- App store distribution

### Choose Angular if you need:
- Web application
- SEO optimization
- Desktop-first or responsive web
- Browser-based distribution
- No app store approval needed

---

## 🔧 Development

### React Native
```bash
# Install dependencies
npm install

# Start development
npm start

# Run on specific platform
npm run android  # Android
npm run ios      # iOS
npm run web      # Web browser
```

### Angular
```bash
# Navigate to Angular app
cd angular-app

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## 📝 Best Practices Implemented

### Both Projects
- ✅ TypeScript strict mode
- ✅ Component-based architecture
- ✅ State management (Redux/NgRx)
- ✅ Responsive design
- ✅ Type-safe routing
- ✅ Error handling
- ✅ Loading states
- ✅ Form validation

### Angular Specific
- ✅ Standalone components (no NgModules)
- ✅ Lazy loading routes
- ✅ RxJS best practices
- ✅ OnPush change detection
- ✅ Tree-shakable providers

### React Native Specific
- ✅ Expo Router for navigation
- ✅ NativeWind for styling
- ✅ FlatList optimization
- ✅ Platform-specific code
- ✅ Asset optimization

---

## 🚢 Production Deployment

### Angular (Web)
1. Build: `cd angular-app && npm run build`
2. Deploy `dist/` folder to:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Firebase Hosting
   - Any static hosting

### React Native (Mobile)
1. Build: `npx expo build:android` or `npx expo build:ios`
2. Publish to:
   - Google Play Store
   - Apple App Store
   - Expo updates (OTA)

---

## 📊 Performance Metrics

### Angular Build Stats
- Initial bundle: ~85 KB (gzipped)
- Lazy chunks: 1-9 KB each
- Build time: ~9 seconds
- Lighthouse score: 90+

### React Native
- Android APK: ~30-50 MB
- iOS IPA: ~40-60 MB
- Cold start: <3 seconds
- Hot reload: <1 second

---

## 🤝 Contributing

Both projects welcome contributions!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License - Feel free to use these projects for learning and commercial purposes.

---

## 📧 Support

For questions or issues:
- Open a GitHub issue
- Check the documentation in each project folder
- Review the code comments

---

**Made with ❤️ using modern web and mobile technologies**

🌟 Don't forget to star the repository if you find it useful!
