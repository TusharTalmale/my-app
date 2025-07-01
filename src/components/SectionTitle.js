// components/SectionTitle.js
"use client";

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const SectionTitle = ({ children }) => {
  const { currentColors } = useContext(ThemeContext);
  return (
    <motion.h2
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-bold text-center mb-12 relative inline-block"
      style={{ color: currentColors.text }}
    >
      {children}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-0 left-0 w-full h-1 rounded-full"
        style={{ background: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary})` }}
      />
    </motion.h2>
  );
};

export default SectionTitle;