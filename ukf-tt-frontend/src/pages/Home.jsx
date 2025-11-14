import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import AnimatedShaderBackground from '../components/ui/animated-shader-background';
import { NewsFeatureSection } from '../components/sections/NewsFeatureSection';
import { GalleryFeatureSection } from '../components/sections/GalleryFeatureSection';
import MobileNavbar from '../components/layout/MobileNavbar';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for dynamic background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      {/* MOBILE NAVIGATION */}
      <MobileNavbar />
      
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 relative w-full overflow-hidden pt-16">

        {/* DYNAMIC 3D BACKGROUND */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`
            }}
          />
          <AnimatedShaderBackground />
        </div>

        {/* HERO SECTION */}
        <motion.div 
          className="flex flex-col overflow-hidden pb-6 md:pb-12 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          <ContainerScroll
            titleComponent={
              <>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight text-center"
                >
                  Selamat Datang di
                  <br />
                  <span className="block text-3xl sm:text-5xl md:text-[5.5rem] lg:text-[6rem] font-extrabold mt-1 leading-none bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                    UKF Table Tennis
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 max-w-2xl text-center mx-auto px-4"
                >
                  Bergabunglah dengan komunitas ping-pong yang penuh semangat — latihan, turnamen, dan teman baru menunggu.
                  <span className="hidden sm:inline"> Pendaftaran cepat tanpa perlu membuat akun.</span>
                </motion.p>

                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={fadeInUp}
                  className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center px-4"
                >
                  <motion.button
                    onClick={() => setShowModal(true)} 
                    className="group relative inline-flex items-center gap-3 rounded-full px-6 py-3 border border-gray-600/50 bg-gray-800/60 backdrop-blur-sm font-semibold hover:shadow-xl hover:shadow-gray-500/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-gray-200 hover:text-white overflow-hidden"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2, type: "spring" }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600/20 to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">Lihat Turnamen</span>
                    <motion.svg 
                      className="w-4 h-4 relative z-10" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </motion.svg>
                  </motion.button>
                </motion.div>
              </>
            }
          >
            {/* Visual canvas with image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[36rem] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl mt-6 sm:mt-8 md:mt-10 group mx-4 sm:mx-0">
              <img 
                src="https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg="
                alt="Table Tennis Racket"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Mobile overlay with info */}
              <div className="absolute bottom-4 left-4 right-4 md:hidden">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                  <h3 className="text-white font-semibold text-sm">UKF Table Tennis</h3>
                  <p className="text-gray-300 text-xs mt-1">Komunitas Tenis Meja Terbaik</p>
                </div>
              </div>
            </div>
          </ContainerScroll>
        </motion.div>

        {/* NEWS FEATURE SECTION */}
        <section className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          <NewsFeatureSection />
        </section>

        {/* GALLERY FEATURE SECTION */}
        <section className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          <GalleryFeatureSection />
        </section>

        {/* WHY JOIN */}
        <section className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 mb-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-2 border-gray-700/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm max-w-7xl mx-auto">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Mengapa Bergabung dengan UKF Table Tennis?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <Reason icon="🏓" title="Komunitas Aktif" desc="Latihan rutin, coaching, dan sparring partner" />
                  <Reason icon="🏆" title="Turnamen Rutin" desc="Kompetisi internal dan antar kampus" />
                  <Reason icon="👥" title="Teman Baru" desc="Networking dan acara sosial setelah latihan" />
                </div>
                
                {/* Call to Action */}
                <div className="mt-8 text-center">
                  <Link 
                    to="/register"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold text-lg rounded-full hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
                  >
                    <span>🏓</span>
                    Daftar Sekarang - Gratis!
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <p className="text-gray-400 text-sm mt-3">
                    ✨ Pendaftaran mudah, tanpa perlu membuat akun
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Simple modal for quick tournament info */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="w-full max-w-lg sm:max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold">Turnamen Mendatang</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    <span className="block sm:inline">Tanggal: 14 Desember 2025</span>
                    <span className="block sm:inline sm:ml-2">• Lokasi: GOR Kampus</span>
                    <span className="block sm:inline sm:ml-2">• Format: Tunggal & Ganda</span>
                  </p>
                </div>
                <div className="flex justify-end">
                  <motion.button 
                    onClick={() => setShowModal(false)} 
                    className="relative text-sm font-medium px-4 py-2.5 rounded-lg border border-gray-600/50 bg-gray-800/60 backdrop-blur-sm text-gray-200 hover:text-white hover:bg-gray-700/60 hover:border-gray-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Tutup
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-sm text-gray-700 dark:text-gray-200">
                  <p><strong>Biaya:</strong> Rp 20.000 / peserta</p>
                  <p className="mt-2">Bawa raket atau pinjam dari klub. Registrasi ditutup H-1 sebelum acara.</p>
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-200">
                  <p><strong>Contact:</strong> 0882-1641-2696 (WA)</p>
                  <p className="mt-2">Gratis untuk anggota aktif UKF. Semua peserta wajib membawa kartu identitas mahasiswa.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border-t border-gray-700/50 w-full mt-auto">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
        
        <div className="relative w-full py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* UKF Brand */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">UKF Tennis</h3>
                    <p className="text-blue-400 text-sm">Unit Kegiatan Table Tennis</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Wadah pengembangan bakat dan prestasi dalam olahraga tenis meja di tingkat universitas.
                </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <span>📱</span>
                    <span className="text-sm">0882-1641-2696</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <span>📧</span>
                    <span className="text-sm">ukf.tabletennis@university.ac.id</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <span>📍</span>
                    <span className="text-sm">GOR Kampus, Universitas</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                <div className="space-y-3">
                  <Link to="/register" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    <span className="mr-2">🏓</span>
                    Daftar Anggota Tenis Meja
                  </Link>
                  <a href="#" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    <span className="mr-2">→</span>
                    Tentang UKF
                  </a>
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
                <p className="text-gray-300 text-sm">Dapatkan update terbaru tentang turnamen dan kegiatan UKF.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Email Anda" 
                    className="flex-1 px-3 py-2 bg-gray-800/60 border border-gray-600/50 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Bottom Bar */}
            <motion.div 
              className="mt-12 pt-8 border-t border-gray-700/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} UKF Tennis Meja. All rights reserved.
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Developed with dedication by UKF Tech Team
                  </p>
                </div>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                    Terms of Service
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

function Reason({ icon, title, desc }) {
  return (
    <div className="p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-sm border border-gray-700/30">
      <div className="text-lg mb-2 font-semibold text-blue-400">{icon}</div>
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="text-sm text-gray-300 mt-1">{desc}</p>
    </div>
  );
}
