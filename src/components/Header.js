// components/Header.js
"use client";

import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import SmoothScrollLink from './SmoothScrollLink';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme, currentColors } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Calculate scroll progress (0-100)
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = docHeight - winHeight;
      const progress = (scrollY / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { icon: <FiGithub className="text-xl" />, url: "https://github.com/TusharTalmale" },
    { icon: <FiLinkedin className="text-xl" />, url: "https://linkedin.com/in/TusharTalmale" },
    { icon: <SiLeetcode className="text-xl" />, url: "https://leetcode.com/TusharTalmale" },
    { icon: <FiMail className="text-xl" />, url: "mailto:tushartal2@gmail.com" }
  ];

  return (
    <>
      {/* Scroll progress indicator */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 transition-all duration-300"
        style={{ 
          width: `${scrollProgress}%`,
          background: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary})`,
          opacity: isScrolled ? 1 : 0
        }}
      />
      
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-opacity-80 backdrop-blur-md shadow-sm py-3' : 'bg-opacity-30 backdrop-blur-sm py-5'
        }`}
        style={{ 
          backgroundColor: currentColors.headerBg + (isScrolled ? 'CC' : '4D'),
          borderBottom: `1px solid ${currentColors.headerBg}20`
        }}
      >
        <nav className="container mx-auto flex justify-between items-center px-6 md:px-12">
          {/* Logo/Name */}
          <div className="flex items-center gap-4">
            <SmoothScrollLink 
              targetId="hero" 
              className="flex items-center gap-3 group"
            >
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.secondary})`,
                }}
              >
                {/* <span className="font-bold">TT</span> */}
                  <img 
                src="two.png" 
                alt="Tushar Talmale"
                className="w-full h-full object-cover"
              />
              </motion.div>
              <motion.span 
                className="text-xl font-bold hidden sm:block"
                style={{ color: isScrolled ? currentColors.headerText : currentColors.text }}
                whileHover={{ color: currentColors.primary }}
              >
                Tushar Talmale
              </motion.span>
            </SmoothScrollLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-6 items-center">
              {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <li key={item}>
                  <SmoothScrollLink 
                    targetId={item} 
                    className="relative group"
                  >
                    <motion.span
                      className="text-lg font-medium block px-2 py-1"
                      style={{ color: isScrolled ? currentColors.headerText : currentColors.textSecondary }}
                      whileHover={{ color: currentColors.primary }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 rounded-full"
                      style={{ backgroundColor: currentColors.primary }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ width: '100%' }}
                    />
                  </SmoothScrollLink>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4 ml-4">
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full"
                    style={{ 
                      color: isScrolled ? currentColors.headerText : currentColors.textSecondary,
                      backgroundColor: currentColors.backgroundAlt + '80'
                    }}
                    whileHover={{ 
                      y: -2,
                      color: currentColors.primary,
                      backgroundColor: currentColors.backgroundAlt
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full"
                style={{ 
                  color: isScrolled ? currentColors.headerText : currentColors.textSecondary,
                  backgroundColor: currentColors.backgroundAlt + '80'
                }}
                whileHover={{ 
                  rotate: theme === 'light' ? 15 : -15,
                  backgroundColor: currentColors.backgroundAlt
                }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'light' ? <FiMoon /> : <FiSun />}
              </motion.button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full"
              style={{ 
                color: isScrolled ? currentColors.headerText : currentColors.textSecondary,
                backgroundColor: currentColors.backgroundAlt + '80'
              }}
              whileHover={{ rotate: theme === 'light' ? 15 : -15 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </motion.button>
            
            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none"
              style={{ color: isScrolled ? currentColors.headerText : currentColors.textSecondary }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
              style={{ 
                backgroundColor: currentColors.headerBg + 'EE',
                borderTop: `1px solid ${currentColors.headerBg}30`
              }}
            >
              <div className="px-6 py-4">
                <ul className="space-y-4 mb-6">
                  {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                    <motion.li
                      key={item}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SmoothScrollLink 
                        targetId={item} 
                        className="block px-4 py-3 rounded-lg font-medium text-lg transition-colors"
                        style={{ 
                          color: currentColors.headerText,
                          backgroundColor: currentColors.backgroundAlt + '20'
                        }}
                        onClick={() => setIsMenuOpen(false)}
                        whileHover={{
                          backgroundColor: currentColors.backgroundAlt + '40'
                        }}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </SmoothScrollLink>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="flex justify-center gap-4 pt-4 border-t" style={{ borderColor: currentColors.backgroundAlt + '20' }}>
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full"
                      style={{ 
                        color: currentColors.headerText,
                        backgroundColor: currentColors.backgroundAlt + '40'
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        y: -3,
                        backgroundColor: currentColors.backgroundAlt + '60'
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;