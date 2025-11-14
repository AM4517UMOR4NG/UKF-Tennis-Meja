import React, { memo } from 'react';
import { motion } from 'framer-motion';

const StatisticsSection = memo(() => {
  const mainStats = [
    { value: '75+', label: 'Anggota Aktif', subtitle: 'Dari 7 Fakultas', trend: '📈 +15% dari tahun lalu' },
    { value: '18', label: 'Turnamen/Tahun', subtitle: '12 Internal, 6 Eksternal', trend: '🏆 8 Juara, 6 Runner-up' },
    { value: '5', label: 'Sesi/Minggu', subtitle: 'Total 20 Jam/Minggu', trend: '👥 4 Coach Profesional' },
    { value: '7', label: 'Tahun Berdiri', subtitle: 'Sejak 2018', trend: '⭐ 50+ Prestasi' }
  ];

  const additionalStats = [
    { value: '95%', label: 'Kehadiran Latihan', subtitle: 'Rata-rata per sesi' },
    { value: '4.8', label: 'Rating Kepuasan', subtitle: 'Dari 100+ responden' },
    { value: '12', label: 'Kerjasama', subtitle: 'Universitas & Sponsor' }
  ];

  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Statistik & Prestasi Klub</h2>
            <p className="text-gray-400 text-sm">Pencapaian dan perkembangan UKF Table Tennis</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
          {/* Main Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {mainStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-gray-600/50 p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-xl text-center"
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <p className="text-white text-lg font-medium mb-1">{stat.label}</p>
                <p className="text-gray-400 text-sm mb-3">{stat.subtitle}</p>
                <div className="text-gray-500 text-xs">{stat.trend}</div>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700/50 mb-8"></div>

          {/* Additional Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                viewport={{ once: true }}
                className="card bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-gray-600/50 p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-xl text-center"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <p className="text-white text-lg font-medium mb-1">{stat.label}</p>
                <p className="text-gray-400 text-sm">{stat.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
});

StatisticsSection.displayName = 'StatisticsSection';

export default StatisticsSection;
