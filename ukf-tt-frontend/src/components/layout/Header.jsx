import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  // hide header on home page
  if (location.pathname === '/') return null;

  return (
    <header className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-700 shadow-lg sticky top-0 z-50 relative">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-white rounded-full p-2 shadow-md group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white">UKF Table Tennis</span>
        </Link>
        <nav className="flex items-center space-x-2">
          <Link 
            to="/register" 
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isActive('/register') 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            Daftar
          </Link>
          <Link 
            to="/tournaments/1/register" 
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isActive('/tournaments/1/register') 
                ? 'bg-white text-purple-600 shadow-md' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            Turnamen
          </Link>
          <Link 
            to="/admin" 
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isActive('/admin') 
                ? 'bg-white text-cyan-600 shadow-md' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

