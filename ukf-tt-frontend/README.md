# 🏓 UKF Table Tennis — Frontend

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

**Modern, responsive frontend application for UKF Table Tennis tournament registration system**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/)

</div>

## 📋 Overview

A sleek and modern frontend application built for the UKF Table Tennis tournament registration system. This application provides a seamless user experience for student registrations, tournament sign-ups, and administrative management with a focus on performance and accessibility.

## ✨ Features

### 🎯 User Experience
- **One-Shot Registration**: New students can register instantly without creating an account
- **Tournament Registration**: Easy sign-up process for table tennis tournaments
- **Profile Management**: Upload and manage profile photos
- **Responsive Design**: Optimized for all devices using Tailwind CSS

### 🛠️ Technical Features
- **Modern Architecture**: Built with React 18 and Vite for optimal performance
- **Form Validation**: Robust form handling with React Hook Form + Yup
- **Smooth Animations**: Enhanced user interactions with Framer Motion
- **Component-Based**: Reusable components with modern design patterns
- **API Integration**: Efficient backend communication with Axios

### 🎨 Design System
- **Consistent UI**: Unified design language with Tailwind CSS
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized bundle size and lazy loading
- **Dark Mode Support**: Ready for theme switching implementation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ukf-tt-frontend.git
   cd ukf-tt-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:4000/api
   ```
   
   *Optional environment variables:*
   ```env
   VITE_APP_TITLE=UKF Table Tennis
   VITE_APP_VERSION=1.0.0
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run build:analyze` | Build with bundle analyzer |
| `npm run performance:test` | Run performance tests |

## 🏗️ Project Structure

```
ukf-tt-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components
│   │   ├── forms/         # Form components
│   │   └── layout/        # Layout components
│   ├── pages/             # Page-level components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Register.jsx   # Registration form
│   │   ├── Tournament.jsx # Tournament registration
│   │   └── Admin.jsx      # Admin dashboard
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── utils/             # Helper functions
│   ├── api.js             # API configuration
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite build configuration
└── README.md              # This file
```

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite 5** - Next generation frontend tooling
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router 6** - Declarative routing for React

### Form Handling & Validation
- **React Hook Form 7** - Performant, flexible forms
- **Yup** - Schema validation library
- **@hookform/resolvers** - Validation resolver integration

### UI & Animation
- **Framer Motion** - Production-ready motion library
- **Tailwind Merge** - Utility class merging
- **CLSX** - Conditional className utility

### Development Tools
- **PostCSS** - CSS transformation tool
- **Autoprefixer** - CSS vendor prefixing
- **Terser** - JavaScript minifier

## 🎯 Component Architecture

### Design Patterns
- **Compound Components**: For complex UI elements
- **Custom Hooks**: Encapsulated business logic
- **Utility Classes**: Reusable styling patterns
- **Error Boundaries**: Graceful error handling

### State Management
- **Local State**: useState/useReducer for component state
- **Form State**: React Hook Form for form management
- **Server State**: Axios with custom hooks for API data

## 🔧 Configuration

### Vite Configuration
The Vite configuration includes:
- React plugin integration
- Build optimization settings
- Development server configuration
- Bundle analyzer support

### Tailwind Configuration
- Custom color palette
- Responsive breakpoints
- Animation utilities
- Component class prefixes

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 90+ |
| Firefox | 88+ |
| Safari  | 14+ |
| Edge    | 90+ |

## 🚀 Performance

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and font optimization
- **Lazy Loading**: Component and route lazy loading

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: Optimized under 500KB (gzipped)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use ESLint and Prettier for code formatting
- Follow conventional commit messages
- Write meaningful component and function names
- Add appropriate comments for complex logic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- UKF Table Tennis community for requirements and feedback
- React and Vite teams for excellent development tools
- Tailwind CSS team for the amazing utility framework

## 📞 Support

For support and questions:
- 📧 Email: support@ukf-tabletennis.com
- 💬 Discord: [Join our community](https://discord.gg/ukf-tt)
- 🐛 Issues: [Report bugs here](https://github.com/your-username/ukf-tt-frontend/issues)

---

<div align="center">

**Built with ❤️ for the UKF Table Tennis community**

[⬆ Back to top](#-ukf-table-tennis--frontend)

</div>

