'use client'; 
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Particles = ({ colors }) => {
  const particles = Array(20).fill(0);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 10 + 2;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: colors.primary,
              left: `${x}%`,
              top: `${y}%`,
              opacity: 0.1 + Math.random() * 0.1
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: delay
            }}
          />
        );
      })}
    </div>
  );
};

export default Particles;