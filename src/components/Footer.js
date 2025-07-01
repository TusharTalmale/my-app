// components/Footer.js
"use client";

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import SmoothScrollLink from './SmoothScrollLink'; // Assuming SmoothScrollLink exists

const Footer = () => {
  const { currentColors } = useContext(ThemeContext);

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
      className="py-16 px-6 md:px-12"
      style={{ backgroundColor: currentColors.footerBg }}
    >
      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Top Section: Brand and Navigation */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-10 pb-8 border-b"
             style={{ borderColor: currentColors.footerText + '30' }}>
          
          {/* Brand/Name */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-0">
            <h3 className="text-3xl font-extrabold flex items-center justify-center md:justify-start gap-3"
                style={{ color: currentColors.footerText }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg" 
                   style={{ background: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary})` }}>
                TT
              </div>
              Tushar Talmale
            </h3>
            <p className="mt-2 text-md" style={{ color: currentColors.footerText + 'B0' }}>
             Java Full Stack Web & Flutter Developer
            </p>
          </motion.div>
          
          {/* Navigation Links */}
          <motion.nav variants={itemVariants}>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-lg font-medium">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <SmoothScrollLink 
                    targetId={item.toLowerCase()} 
                    className="relative group hover:underline transition-colors duration-300" 
                    style={{ color: currentColors.footerText }}
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full" 
                          style={{ backgroundColor: currentColors.primary }}></span>
                  </SmoothScrollLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </div>
        
        {/* Middle Section: Social Media Icons */}
        <motion.div variants={itemVariants} className="flex space-x-8 mb-10">
          {[
            { url: "https://github.com/TusharTalmale", icon: "fab fa-github", label: "GitHub" },
            { url: "https://linkedin.com/in/TusharTalmale", icon: "fab fa-linkedin", label: "LinkedIn" },
            { url: "mailto:tushartal2@gmail.com", icon: "fas fa-envelope", label: "Email" },
            { url: "https://leetcode.com/TusharTalmale", icon: "fas fa-code", label: "LeetCode" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -7, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-3xl transition-colors duration-300 relative group"
              style={{ color: currentColors.footerText }}
              onMouseEnter={(e) => e.currentTarget.style.color = currentColors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = currentColors.footerText}
            >
              <i className={social.icon}></i>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {social.label}
              </span>
            </motion.a>
          ))}
        </motion.div>
        
        {/* Bottom Section: Copyright and Built With */}
        <motion.div variants={itemVariants} className="text-sm space-y-2" style={{ color: currentColors.footerText + '80' }}>
          <p>&copy; {new Date().getFullYear()} Tushar Talmale. All rights reserved.</p>
          <p>Built with <span className="font-semibold" style={{ color: currentColors.primary }}>React</span>, <span className="font-semibold" style={{ color: currentColors.secondary }}>Tailwind CSS</span>, and <span className="font-semibold" style={{ color: currentColors.accent }}>Framer Motion</span></p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
