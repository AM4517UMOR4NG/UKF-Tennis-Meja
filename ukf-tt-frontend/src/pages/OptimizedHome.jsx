import React, { useState, useCallback, useMemo, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import OptimizedShaderBackground from '../components/ui/OptimizedShaderBackground';
import OptimizedParticleSystem from '../components/ui/OptimizedParticleSystem';
import FeatureCard from '../components/optimized/FeatureCard';
import Reason from '../components/optimized/Reason';
import SkillProgressBar from '../components/optimized/SkillProgressBar';
import { useThrottle } from '../hooks/useThrottle';

// Lazy load heavy components
const StatisticsSection = lazy(() => import('../components/sections/StatisticsSection'));
const NewsFeatureSection = lazy(() => import('../components/sections/NewsFeatureSection').then(module => ({ default: module.NewsFeatureSection })));
const GalleryFeatureSection = lazy(() => import('../components/sections/GalleryFeatureSection').then(module => ({ default: module.GalleryFeatureSection })));

// Loading component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

export default function OptimizedHome() {
  const [showModal, setShowModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  // Memoized data
  const scheduleData = useMemo(() => [
    { day: 'Senin', time: '16:00 - 18:00', type: 'Teknik Dasar', detail: 'Forehand & Backhand', coach: 'Andi' },
    { day: 'Selasa', time: '18:00 - 20:00', type: 'Advanced', detail: 'Spin & Control', coach: 'Budi' },
    { day: 'Rabu', time: '16:00 - 18:00', type: 'Beginner', detail: 'Basic Rules', coach: 'Siti' },
    { day: 'Kamis', time: '16:00 - 18:00', type: 'Teknik Dasar', detail: 'Service & Return', coach: 'Andi' },
    { day: 'Jumat', time: '17:00 - 19:00', type: 'Sparring', detail: 'Match Practice', coach: 'Open Session' },
    { day: 'Sabtu', time: '09:00 - 12:00', type: 'Sparring & Turnamen Mini', detail: 'Internal Competition', coach: 'All Coaches' },
    { day: 'Minggu', time: '10:00 - 12:00', type: 'Open Play - Gratis', detail: 'Fun & Recreation', coach: 'Open to All' }
  ], []);

  const skillsData = useMemo(() => [
    { skill: 'Forehand', level: 85, color: 'blue' },
    { skill: 'Backhand', level: 72, color: 'purple' },
    { skill: 'Service', level: 90, color: 'green' },
    { skill: 'Spin Control', level: 68, color: 'orange' },
    { skill: 'Footwork', level: 78, color: 'pink' }
  ], []);

  const leaderboardData = useMemo(() => [
    { name: 'Ahmad Rizki', points: 245, trend: 'up' },
    { name: 'Siti Nurhaliza', points: 238, trend: 'up' },
    { name: 'Budi Santoso', points: 221, trend: 'down' }
  ], []);

  // Optimized handlers
  const handleRegisterButtonClick = useCallback((e) => {
    e.preventDefault();
    setIsRegistering(true);
    
    setTimeout(() => {
      setIsRegistering(false);
      window.location.href = '/register';
    }, 800);
  }, []);

  const throttledToggleParticles = useThrottle(() => {
    setParticlesEnabled(prev => !prev);
  }, 1000);

  // Animation variants
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }), []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }), []);

  // Memoized components
  const RegisterButton = useMemo(() => (
    <motion.button
      onClick={handleRegisterButtonClick}
      className={`group relative inline-flex items-center gap-3 rounded-full px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform transition-all duration-300 backdrop-blur-sm border border-white/10 ${
        isRegistering ? 'animate-pulse scale-110 shadow-blue-500/50 shadow-2xl' : ''
      }`}
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
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <motion.svg 
        className="w-5 h-5 relative z-10" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        animate={{ 
          rotate: isRegistering ? 360 : 0,
          scale: isRegistering ? [1, 1.3, 1] : 1
        }}
        transition={{ 
          duration: isRegistering ? 0.6 : 0.3,
          repeat: isRegistering ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </motion.svg>
      <motion.span
        className="relative z-10"
        animate={{
          scale: isRegistering ? [1, 1.1, 1] : 1,
          opacity: isRegistering ? [1, 0.8, 1] : 1
        }}
        transition={{
          duration: 0.3,
          repeat: isRegistering ? 2 : 0
        }}
      >
        {isRegistering ? 'Mengarahkan...' : 'Daftar Sekarang'}
      </motion.span>
    </motion.button>
  ), [handleRegisterButtonClick, isRegistering]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Performance Controls */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <button
          onClick={throttledToggleParticles}
          className="px-3 py-1 bg-gray-800/80 text-white text-xs rounded-full border border-gray-600/50 hover:bg-gray-700/80 transition-colors"
        >
          {particlesEnabled ? 'Disable' : 'Enable'} Effects
        </button>
      </div>

      {/* FIXED TOP RIGHT REGISTER BUTTON */}
      <div className="fixed top-4 right-4 z-40">
        {RegisterButton}
      </div>

      {/* OPTIMIZED PARTICLE EFFECTS */}
      <OptimizedParticleSystem isActive={particlesEnabled} />

      {/* OPTIMIZED BACKGROUND */}
      <OptimizedShaderBackground enabled={particlesEnabled} />

      {/* STATIC BACKGROUND FALLBACK */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      </div>
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* HERO SECTION */}
        <motion.div 
          className="flex flex-col overflow-hidden pb-20"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <ContainerScroll
            titleComponent={
              <>
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl font-semibold text-white leading-tight"
                >
                  Selamat Datang di
                  <br />
                  <span className="block text-5xl sm:text-[5.5rem] lg:text-[6rem] font-extrabold mt-1 leading-none bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                    UKF Table Tennis
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl"
                >
                  Bergabunglah dengan komunitas ping-pong yang penuh semangat — latihan, turnamen, dan teman baru menunggu.
                  Pendaftaran cepat tanpa perlu membuat akun.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="mt-6 flex flex-wrap gap-3"
                >
                  {RegisterButton}

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
            {/* Visual canvas with optimized image */}
            <div className="relative w-full h-96 sm:h-[36rem] rounded-2xl overflow-hidden shadow-2xl mt-8 sm:mt-10 group">
              <img 
                src="https://images.pexels.com/photos/18511482/pexels-photo-18511482/free-photo-of-raket-tenis-meja.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Table Tennis Racket"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </ContainerScroll>
        </motion.div>

        {/* QUICK NAVIGATION TILES */}
        <section className="mt-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">Akses Cepat</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { to: "/register", title: "Daftar Anggota", desc: "Isi formulir pendaftaran anggota UKF Table Tennis tanpa perlu akun.", color: "blue" },
                { to: "/tournaments/1/register", title: "Daftar Turnamen", desc: "Ikuti turnamen internal terbaru dan raih prestasi bersama tim.", color: "purple" },
                { to: "/admin", title: "Panel Admin", desc: "Akses khusus pengurus untuk melihat dan mengelola pendaftaran.", color: "green" }
              ].map((item, index) => (
                <motion.div
                  key={item.to}
                  whileHover={{ 
                    scale: 1.08, 
                    rotateY: index % 2 === 0 ? 15 : -15, 
                    rotateX: -10,
                    z: 50
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to={item.to}
                    className="group block relative rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-600/60 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-600/10 to-${item.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className={`text-xl font-semibold text-white group-hover:text-${item.color}-300 transition-colors duration-300`}>{item.title}</h3>
                        <motion.div 
                          className={`w-8 h-8 rounded-full bg-${item.color}-600/20 flex items-center justify-center group-hover:bg-${item.color}-600 transition-colors duration-300`}
                          whileHover={{ rotate: 45, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <span className={`text-${item.color}-400 text-lg group-hover:text-white transition-colors duration-300`}>→</span>
                        </motion.div>
                      </div>
                      <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{item.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SCHEDULE SECTION */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Jadwal Latihan Rutin</h2>
              {RegisterButton}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {scheduleData.map((schedule, index) => (
                <motion.div
                  key={schedule.day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-gray-600/50 p-4 rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-400 mb-1">{schedule.day}</div>
                    <div className="text-sm font-semibold text-white mb-2">{schedule.time}</div>
                    <div className="text-xs text-gray-300 mb-1">{schedule.type}</div>
                    <div className="text-xs text-gray-400">{schedule.detail}</div>
                    <div className="mt-2 text-xs text-gray-500">Coach: {schedule.coach}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* LAZY LOADED SECTIONS */}
        <Suspense fallback={<SectionLoader />}>
          <GallerySection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <NewsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <StatisticsSection />
        </Suspense>

        {/* SKILL TRACKER SECTION */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">Skill Tracker Interaktif</h2>
              <p className="text-gray-400 text-sm">Pantau perkembangan skill dan raih prestasi bersama UKF Table Tennis</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Skill Progress Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Progress Skill Member
                  </h3>
                  
                  {skillsData.map((item, index) => (
                    <SkillProgressBar
                      key={item.skill}
                      skill={item.skill}
                      level={item.level}
                      color={item.color}
                      index={index}
                    />
                  ))}
                </div>

                {/* Live Stats & Leaderboard */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    Live Statistics
                  </h3>

                  {/* Live Counter Animation */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="card bg-gradient-to-br from-blue-800/30 to-blue-900/30 border border-blue-600/30 p-4 rounded-xl text-center"
                    >
                      <div className="text-2xl font-bold text-blue-400">1,247</div>
                      <p className="text-white text-sm font-medium">Total Latihan</p>
                      <p className="text-gray-400 text-xs">Bulan ini</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="card bg-gradient-to-br from-green-800/30 to-green-900/30 border border-green-600/30 p-4 rounded-xl text-center"
                    >
                      <div className="text-2xl font-bold text-green-400">89%</div>
                      <p className="text-white text-sm font-medium">Target Tercapai</p>
                      <p className="text-gray-400 text-xs">Minggu ini</p>
                    </motion.div>
                  </div>

                  {/* Mini Leaderboard */}
                  <div className="card bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-gray-600/50 p-4 rounded-xl">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <span>🥇</span>
                      Top Member Minggu Ini
                    </h4>
                    <div className="space-y-2">
                      {leaderboardData.map((member, index) => (
                        <motion.div
                          key={member.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center justify-between p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                            <span className="text-white text-sm">{member.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-blue-400 font-medium">{member.points}</span>
                            <span className={`text-xs ${member.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                              {member.trend === 'up' ? '↑' : '↓'}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURE CARDS */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <FeatureCard
                theme="blue"
                title="Pendaftaran Mahasiswa Baru"
                description="Daftar menjadi anggota UKF Table Tennis dengan mudah—tanpa perlu membuat akun. Isi formulir singkat dan konfirmasi via WA."
                to="/register"
                ctaText="Daftar Sekarang"
              />

              <FeatureCard
                theme="purple"
                title="Pendaftaran Turnamen"
                description="Ikuti turnamen internal dan antar kampus. Format tunggal/ ganda, sistem gugur, dan penghargaan menarik."
                to="/tournaments/1/register"
                ctaText="Daftar Turnamen"
              />
            </div>
          </motion.div>
        </section>

        {/* NEWS FEATURE SECTION */}
        <section className="mb-12">
          <Suspense fallback={<SectionLoader />}>
            <NewsFeatureSection />
          </Suspense>
        </section>

        {/* GALLERY FEATURE SECTION */}
        <section className="mb-12">
          <Suspense fallback={<SectionLoader />}>
            <GalleryFeatureSection />
          </Suspense>
        </section>

        {/* WHY JOIN */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-2 border-gray-700/50 p-6 rounded-xl backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Mengapa Bergabung dengan UKF Table Tennis?</h3>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <Reason icon="🏓" title="Komunitas Aktif" desc="Latihan rutin, coaching, dan sparring partner" />
                  <Reason icon="🏆" title="Turnamen Rutin" desc="Kompetisi internal dan antar kampus" />
                  <Reason icon="👥" title="Teman Baru" desc="Networking dan acara sosial setelah latihan" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-bold">Turnamen Mendatang</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Tanggal: 14 Desember 2025 • Lokasi: GOR Kampus • Format: Tunggal & Ganda</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/tournaments/1/register" className="relative text-sm font-semibold px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white rounded-full hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 overflow-hidden">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">Daftar</span>
                  </Link>
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

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
}
