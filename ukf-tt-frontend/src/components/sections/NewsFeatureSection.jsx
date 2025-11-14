import React from 'react';
import { FeatureSteps } from '../blocks/feature-section';

const newsFeatures = [
  { 
    step: 'Berita 1', 
    title: 'Turnamen Internal Desember - DIBUKA!',
    content: 'Pendaftaran turnamen internal tanggal 14 Desember 2025 sekarang dibuka! Kategori: Tunggal Putra, Tunggal Putri, Ganda Campuran. Total hadiah Rp 1.000.000 + Trophy.', 
    image: 'https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg='
  },
  { 
    step: 'Berita 2',
    title: 'Coaching Clinic dengan Coach Budi',
    content: 'Sesi coaching khusus hari Sabtu ini dengan Coach Budi (Ex-Nasional). Fokus pada teknik servis modern, footwork, dan strategi pertandingan. Terbatas untuk 15 peserta!',
    image: 'https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg='
  },
  { 
    step: 'Berita 3',
    title: 'JUARA 1! Turnamen Antar Kampus Se-Jateng',
    content: 'Selamat kepada Tim UKF Table Tennis yang berhasil meraih Juara 1 di Turnamen Antar Kampus Se-Jawa Tengah! Mengalahkan 12 universitas lain di final yang sengit.',
    image: 'https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg='
  },
  { 
    step: 'Berita 4',
    title: 'Libur Latihan - Natal & Tahun Baru',
    content: 'Jadwal libur latihan untuk periode Natal dan Tahun Baru: 24 Des 2025 - 2 Jan 2026. Latihan akan kembali normal mulai 3 Januari 2026. Selamat Hari Raya!',
    image: 'https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg='
  },
];

export function NewsFeatureSection() {
  return (
    <div className="w-full">
      <FeatureSteps 
        features={newsFeatures}
        title="Papan Berita & Pengumuman"
        autoPlayInterval={5000}
        imageHeight="h-[500px]"
        className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-gray-700/30 shadow-2xl"
      />
    </div>
  );
}
