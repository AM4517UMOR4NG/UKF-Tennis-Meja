import React, { memo } from 'react';
import { motion } from 'framer-motion';

const SkillProgressBar = memo(({ skill, level, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">{skill}</span>
        <span className="text-gray-400 text-sm">{level}%</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5, type: "spring" }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-400 rounded-full relative overflow-hidden`}
        >
          <motion.div
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
});

SkillProgressBar.displayName = 'SkillProgressBar';

export default SkillProgressBar;
