import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          utils: ['axios']
        }
      }
    },
    // Enable gzip compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Source maps for debugging (disable in production)
    sourcemap: process.env.NODE_ENV !== 'production'
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-router-dom']
  },
  // Development server optimizations
  server: {
    hmr: {
      overlay: false // Disable error overlay for better performance
    }
  }
})

