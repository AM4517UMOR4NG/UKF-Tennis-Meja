import React, { memo } from 'react';
import { motion } from 'framer-motion';

const NewsSection = memo(() => {
  const newsItems = [
    {
      id: 1,
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
        </svg>
      ),
      title: 'Turnamen Internal Desember - DIBUKA!',
      content: 'Pendaftaran turnamen internal tanggal 14 Desember 2025 sekarang dibuka! Kategori: Tunggal Putra, Tunggal Putri, Ganda Campuran. Total hadiah Rp 1.000.000 + Trophy.',
      details: [
        'Deadline: 10 Desember 2025',
        'Biaya: Rp 25.000',
        'Lokasi: GOR Kampus'
      ],
      timestamp: '2 hari yang lalu • Admin'
    },
    {
      id: 2,
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h2a1 1 0 100 2 2 2 0 01-2 2H6a2 2 0 01-2-2V5z"/>
        </svg>
      ),
      title: 'Coaching Clinic dengan Coach Budi',
      content: 'Sesi coaching khusus hari Sabtu ini dengan Coach Budi (Ex-Nasional). Fokus pada teknik servis modern, footwork, dan strategi pertandingan. Terbatas untuk 15 peserta!',
      details: [
        '09:00 - 12:00 WIB',
        'Kuota: 15 Orang',
        'Level: Intermediate'
      ],
      timestamp: '5 hari yang lalu • Coach Budi'
    },
    {
      id: 3,
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ),
      title: 'JUARA 1! Turnamen Antar Kampus Se-Jateng',
      content: 'Selamat kepada Tim UKF Table Tennis yang berhasil meraih Juara 1 di Turnamen Antar Kampus Se-Jawa Tengah! Mengalahkan 12 universitas lain di final yang sengit.',
      details: [
        'Final Score: 3-1 vs UNDIP',
        'Lokasi: Universitas Semarang',
        'Hadiah: Rp 2.000.000'
      ],
      timestamp: '1 minggu yang lalu • Team Manager'
    },
    {
      id: 4,
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
        </svg>
      ),
      title: 'Libur Latihan - Natal & Tahun Baru',
      content: 'Jadwal libur latihan untuk periode Natal dan Tahun Baru: 24 Des 2025 - 2 Jan 2026. Latihan akan kembali normal mulai 3 Januari 2026.',
      details: [
        'Libur: 24 Des - 2 Jan',
        'Mulai Normal: 3 Jan 2026',
        'Selamat Hari Raya!'
      ],
      timestamp: '2 minggu yang lalu • Admin'
    }
  ];

  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Papan Berita & Pengumuman</h2>
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-gray-600/50 p-6 rounded-xl backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-blue-400">{item.title}</h3>
                      <p className="text-gray-300 mt-2">{item.content}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        {item.details.map((detail, idx) => (
                          <span key={idx} className="text-gray-400 text-sm">{detail}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mt-3">{item.timestamp}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

NewsSection.displayName = 'NewsSection';

export default NewsSection;
