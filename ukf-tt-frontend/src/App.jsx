import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import { PerformanceProvider } from './components/PerformanceProvider';

// Lazy load non-critical pages
const RegisterNoAccount = React.lazy(() => import('./pages/RegisterNoAccount'));
const RegisterSuccess = React.lazy(() => import('./pages/RegisterSuccess'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-white">Loading...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <PerformanceProvider>
        <div className="min-h-screen flex flex-col relative">
          <main className="flex-1 container mx-auto overflow-x-hidden relative z-10">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterNoAccount />} />
                <Route path="/register/success" element={<RegisterSuccess />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </PerformanceProvider>
    </ErrorBoundary>
  );
}

