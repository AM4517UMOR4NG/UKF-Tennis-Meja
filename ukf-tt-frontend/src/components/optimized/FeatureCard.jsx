import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeatureCard = memo(({ theme = 'blue', title, description, to, ctaText }) => {
  const base = theme === 'purple' ? 'from-purple-500 to-indigo-600' : 'from-blue-500 via-cyan-500 to-blue-600';
  const iconColor = theme === 'purple' ? 'bg-purple-600' : 'bg-blue-600';
  const iconText = theme === 'purple' ? 'TC' : 'FC';
  
  return (
    <motion.div 
      whileHover={{ y: -6 }} 
      className="card group hover:border-transparent border-2 border-transparent p-4 rounded-xl shadow-sm bg-gray-900/80 backdrop-blur-sm border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-start space-x-4">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${iconColor} text-white font-bold text-sm`}>
          {iconText}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-300 mb-4">{description}</p>
          <Link 
            to={to} 
            className={`group relative inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r ${base} shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform transition-all duration-300 hover:scale-105 overflow-hidden`}
          > 
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">{ctaText}</span>
            <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
