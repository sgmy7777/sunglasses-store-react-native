# SunShop - Angular E-commerce Application

A modern e-commerce application built with Angular 21, showcasing a sunglasses store with a clean, responsive design.

## Features

- 🏠 **Home Page**: Browse featured products with category filtering
- 🔍 **Product Details**: View detailed product information with add-to-cart functionality
- 🛒 **Shopping Cart**: Manage cart items with quantity controls
- 💳 **Checkout**: Complete purchase with shipping and payment information
- 📦 **Categories**: Browse products by category
- 🎨 **Responsive Design**: Mobile-first design using Tailwind CSS
- 🔄 **State Management**: NgRx for predictable state management
- ⚡ **Performance**: Lazy loading routes and optimized images

## Tech Stack

- **Angular 21**: Latest Angular with standalone components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **NgRx**: Redux-inspired state management
- **RxJS**: Reactive programming
- **Angular Router**: Client-side routing with lazy loading

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm start

# Navigate to http://localhost:4200
```

### Build

```bash
# Build for production
npm run build

# Output will be in dist/ folder
```

## Project Structure

```
src/
├── app/
│   ├── components/        # Reusable components
│   │   ├── header.component.ts
│   │   └── product-card.component.ts
│   ├── pages/            # Page components
│   │   ├── home.component.ts
│   │   ├── product-detail.component.ts
│   │   ├── cart.component.ts
│   │   ├── checkout.component.ts
│   │   └── categories.component.ts
│   ├── services/         # Business logic services
│   │   └── product.service.ts
│   ├── store/            # NgRx state management
│   │   ├── cart.actions.ts
│   │   ├── cart.reducer.ts
│   │   └── cart.selectors.ts
│   ├── models/           # TypeScript interfaces
│   │   └── product.model.ts
│   ├── app.config.ts     # Application configuration
│   └── app.routes.ts     # Route definitions
├── styles.scss           # Global styles
└── index.html           # HTML entry point
```

## Best Practices Implemented

1. **Standalone Components**: Using Angular's modern standalone API
2. **Lazy Loading**: Routes are lazy-loaded for better performance
3. **Type Safety**: Full TypeScript coverage with strict mode
4. **Reactive State**: NgRx for centralized state management
5. **Responsive Design**: Mobile-first approach with Tailwind CSS
6. **Component Isolation**: Each component is self-contained and reusable
7. **Observable Patterns**: Proper use of RxJS operators and subscriptions
8. **Performance Optimization**: OnPush change detection where applicable
9. **Accessibility**: Semantic HTML and ARIA attributes
10. **Code Organization**: Clear separation of concerns

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Lint code

## Features Roadmap

- [ ] User authentication
- [ ] Product search functionality
- [ ] Wishlist feature
- [ ] Product reviews and ratings
- [ ] Order history
- [ ] Real API integration
- [ ] Payment gateway integration
- [ ] Admin panel

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
