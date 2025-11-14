import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const GallerySection = memo(() => {
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set());

  const members = [
    { name: 'John Doe', role: 'Captain Team', achievement: '5x Champion' },
    { name: 'Jane Smith', role: 'Vice Captain', achievement: '3x Runner-up' },
    { name: 'Mike Johnson', role: 'Player', achievement: 'Best Rookie 2024' },
    { name: 'Sarah Wilson', role: 'Player', achievement: 'Most Improved' },
    { name: 'David Lee', role: 'Player', achievement: 'Top Scorer' },
    { name: 'Emma Brown', role: 'Player', achievement: 'Best Defense' },
    { name: 'Tom Wilson', role: 'Player', achievement: 'Hot Streak' },
    { name: 'Lisa Chen', role: 'Player', achievement: 'Rising Star' }
  ];

  const handleImageError = useCallback((index) => {
    setImageLoadErrors(prev => new Set(prev).add(index));
  }, []);

  const getImageSrc = (index) => {
    if (imageLoadErrors.has(index)) {
      return `data:image/svg+xml;base64,${btoa(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#374151"/>
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9CA3AF" font-family="Arial" font-size="16">
            Image Not Available
          </text>
        </svg>
      `)}`;
    }
    return "https://images.pexels.com/photos/18511482/pexels-photo-18511482/free-photo-of-raket-tenis-meja.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  };

  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Galeri Anggota</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={`${member.name}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img 
                src={getImageSrc(index)}
                alt={`Member ${member.name}`}
                className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                loading="lazy"
                onError={() => handleImageError(index)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-lg">{member.name}</p>
                  <p className="text-gray-300 text-sm">{member.role}</p>
                  <p className="text-gray-400 text-xs">{member.achievement}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

GallerySection.displayName = 'GallerySection';

export default GallerySection;
