import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-4">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-orange-500 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
            </div>
            <span className="font-semibold">UKF Table Tennis</span>
          </div>
          <div className="text-sm text-gray-300 text-center md:text-right">
            <p>© {new Date().getFullYear()} UKF Table Tennis — Untuk mahasiswa baru.</p>
            <p className="mt-1">Bergabunglah dengan komunitas table tennis kami!</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

