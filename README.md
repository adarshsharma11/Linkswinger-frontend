# LinkSwingers (LS) - Nuxt.js Application

A modern web application built with Nuxt.js for the LinkSwingers platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
linkswinger/
├── assets/          # Static assets (SCSS, fonts, images)
├── components/      # Vue components
│   ├── common/    # Reusable components
│   ├── landing-page/ # Landing page components
│   ├── profile/    # Profile-related components
│   └── ...
├── composables/    # Vue composables and TypeScript models
├── layouts/        # Nuxt layouts
├── middleware/     # Route middleware
├── pages/          # Application pages (auto-routed)
├── plugins/        # Nuxt plugins
├── public/         # Public static files
├── server/         # Server-side code
├── store/          # Vuex store modules
└── utils/          # Utility functions
```

## 🧩 Key Components

### Common Components
Located in `components/common/`:
- **Logo** (`logo/logo.vue`) - Brand logo component
- **Header** (`header/header.vue`) - Site header
- **Footer** (`footer/footer.vue`) - Site footer
- **Navbar** (`navbar/navbar.vue`) - Navigation component
- **Promotion Strip** (`promotion-strip/promotion-strip.vue`) - Top scrolling banner

### Recent Updates
- ✅ Created reusable `CommonPromotionStrip` component with dynamic text
- ✅ Refactored landing page to use the new promotion strip component
- ✅ Added test page for component demonstration

## 🎨 Styling

The project uses:
- SCSS for styling
- Bootstrap for UI components
- Custom theme colors and variables
- Font Awesome icons

## 🔧 Development Guidelines

### Creating Common Components
1. Place in `components/common/` directory
2. Use PascalCase naming: `ComponentName.vue`
3. Include proper TypeScript interfaces
4. Add scoped styles when needed
5. Test with the test page before integration

### Using the Promotion Strip Component
```vue
<template>
  <div>
    <CommonPromotionStrip :text="yourDynamicText" />
    <!-- Your page content -->
  </div>
</template>

<script setup>
const yourDynamicText = ref('Your scrolling text here')
</script>
```

## 🧪 Testing Components

Use the test page at `/test/promotion-strip-test` to:
- Test dynamic text functionality
- Verify component behavior
- Check responsive design

## 📝 Environment Variables

Create a `.env` file in the root directory for environment-specific configurations.

## 🚀 Deployment

Build the application for production:
```bash
npm run build
# or
yarn build
```

## 📚 Additional Resources

- [Nuxt.js Documentation](https://nuxtjs.org/)
- [Vue.js Documentation](https://vuejs.org/)
- [Bootstrap Documentation](https://getbootstrap.com/)

## 🤝 Contributing

1. Follow the established component structure
2. Test your changes thoroughly
3. Update documentation when adding new features
4. Use the test pages for component validation

## 📞 Support

For issues and questions, refer to the project documentation or contact the development team.
