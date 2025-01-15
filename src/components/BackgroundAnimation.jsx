import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundAnimation = ({ isDark }) => {
  const particles = Array.from({ length: 30 });
  const shapes = Array.from({ length: 5 });
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      {particles.map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute rounded-full ${
            isDark ? 'bg-blue-500' : 'bg-blue-200'
          }`}
          style={{
            width: Math.random() * 8 + 'px',
            height: Math.random() * 8 + 'px',
            left: Math.random() * 100 + '%',
            opacity: 0.1
          }}
          animate={{
            y: ['-100vh', '100vh'],
            x: ['-50px', '50px'],
            opacity: [0, 0.3, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
            times: [0, 0.5, 1]
          }}
        />
      ))}

      {/* Geometric shapes */}
      {shapes.map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className={`absolute ${
            isDark ? 'border-blue-500/20' : 'border-blue-200/20'
          } border-[1px]`}
          style={{
            width: Math.random() * 300 + 100 + 'px',
            height: Math.random() * 300 + 100 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            borderRadius: Math.random() > 0.5 ? '30%' : '0%',
            rotate: Math.random() * 360 + 'deg'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30' 
            : 'bg-gradient-to-br from-blue-100/50 via-purple-100/30 to-pink-100/50'
        }`}
      />
    </div>
  );
};