import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import AnimatedShaderBackground from '../components/ui/animated-shader-background';
import MobileNavbar from '../components/layout/MobileNavbar';

export default function RegisterSuccess() {
  const location = useLocation();
  const message = location.state?.message || 'Pendaftaran berhasil. Terima kasih!';
  const id = location.state?.id || null;
  const memberData = location.state?.memberData || null;

  return (
    <>
      {/* MOBILE NAVIGATION */}
      <MobileNavbar />
      
      <div className="relative max-w-2xl mx-auto p-6 pt-16">
        {/* Animated Shader Background */}
        <AnimatedShaderBackground />
        
        {/* Content */}
        <div className="relative z-10">
        <div className="card text-center bg-gray-900/80 backdrop-blur-sm border-gray-700/50">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Pendaftaran Berhasil! 🎉</h1>
          <p className="text-lg text-gray-300 mb-6">{message}</p>
          
          {id && (
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-300 mb-1">ID Pendaftaran Anda</p>
              <p className="text-2xl font-bold text-cyan-400 font-mono">{id}</p>
            </div>
          )}

          {memberData && (
            <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-lg font-semibold text-white mb-3 text-center">📋 Data Pendaftaran</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Nama:</span>
                  <span className="text-white font-medium">{memberData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">NIM:</span>
                  <span className="text-white font-medium">{memberData.studentId}</span>
                </div>
                {memberData.email && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white font-medium">{memberData.email}</span>
                  </div>
                )}
                {memberData.faculty && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fakultas:</span>
                    <span className="text-white font-medium">{memberData.faculty}</span>
                  </div>
                )}
                {memberData.year && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Angkatan:</span>
                    <span className="text-white font-medium">{memberData.year}</span>
                  </div>
                )}
                {memberData.interests && memberData.interests.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Minat:</span>
                    <span className="text-white font-medium">{memberData.interests.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

        <div className="space-y-4">
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Kami akan menghubungi Anda segera melalui email atau nomor telepon yang terdaftar.
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

