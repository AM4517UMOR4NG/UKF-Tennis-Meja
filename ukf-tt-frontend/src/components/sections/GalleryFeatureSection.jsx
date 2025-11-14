import React from 'react';
import { FeatureSteps } from '../blocks/feature-section';

const galleryFeatures = [
  { 
    step: 'Anggota 1', 
    title: 'John Doe - Captain Team',
    content: 'Captain tim UKF Table Tennis dengan pengalaman 5 tahun. Meraih 5x Champion di berbagai turnamen internal dan eksternal. Spesialisasi dalam teknik servis dan strategi permainan.', 
    image: 'https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg='
  },
  { 
    step: 'Anggota 2',
    title: 'Jane Smith - Vice Captain',
    content: 'Vice Captain yang handal dengan prestasi 3x Runner-up. Ahli dalam teknik backhand dan permainan defensif. Aktif melatih anggota baru dan mengorganisir latihan rutin.',
    image: 'https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg='
  },
  { 
    step: 'Anggota 3',
    title: 'Mike Johnson - Best Rookie 2024',
    content: 'Pemain muda berbakat yang meraih Best Rookie 2024. Bergabung tahun ini dan langsung menunjukkan kemampuan luar biasa dalam turnamen internal.',
    image: 'https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg='
  },
  { 
    step: 'Anggota 4',
    title: 'Sarah Wilson - Most Improved',
    content: 'Anggota yang menunjukkan perkembangan paling pesat tahun ini. Dari pemula hingga menjadi salah satu pemain andalan tim dalam waktu singkat.',
    image: 'https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg='
  },
  { 
    step: 'Anggota 5',
    title: 'David Lee - Top Scorer',
    content: 'Pemain dengan skor tertinggi dalam turnamen internal. Dikenal dengan teknik forehand yang kuat dan kemampuan smash yang mematikan.',
    image: 'https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg='
  },
  { 
    step: 'Anggota 6',
    title: 'Emma Brown - Best Defense',
    content: 'Spesialis permainan bertahan dengan kemampuan return yang luar biasa. Sering menjadi kunci kemenangan tim dalam pertandingan ganda.',
    image: 'https://media.istockphoto.com/id/1425158165/id/foto/dayung-pingpong-tenis-meja-dan-bola-putih-di-papan-biru.jpg?s=612x612&w=0&k=20&c=JJW4vpsv5bFIgPfTY7Ii0ZZYZruGRtpGO_62EEZmjUg='
  },
];

export function GalleryFeatureSection() {
  return (
    <div className="w-full">
      <FeatureSteps 
        features={galleryFeatures}
        title="Galeri Anggota Berprestasi"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
        className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-gray-700/30 shadow-2xl"
      />
    </div>
  );
}
