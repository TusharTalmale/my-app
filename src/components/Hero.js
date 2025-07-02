"use client";

import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import SmoothScrollLink from './SmoothScrollLink';
import { 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiArrowDown, 
  FiCode,
  FiDownload,
  FiAward,
  FiClock,
  FiLayers
} from 'react-icons/fi';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';
import { FaJava, FaMobileAlt, FaServer } from 'react-icons/fa';
import Particles from './Particles';
import Typewriter from 'typewriter-effect';

const Hero = ({ id }) => {
  const { currentColors } = useContext(ThemeContext);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [showResumeButton, setShowResumeButton] = useState(false);
  
  // Floating blob animation
  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut"
        },
        rotate: {
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }
      }
    }
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "backOut" }
    }
  };

  // Skill tags with animation
  const skills = [
    { name: "React.js", icon: <FiCode className="mr-1" /> },
    { name: "Spring Boot", icon: <FaServer className="mr-1" /> },
    { name: "Flutter", icon: <FaMobileAlt className="mr-1" /> },
    { name: "Dart", icon: <FiCode className="mr-1" /> },
    { name: "Java", icon: <FaJava className="mr-1" /> },
    { name: "JavaScript", icon: <FiCode className="mr-1" /> },
    { name: "Tailwind CSS", icon: <FiCode className="mr-1" /> },
    { name: "Docker", icon: <FiLayers className="mr-1" /> },
    { name: "Firebase", icon: <FiCode className="mr-1" /> },
    { name: "WebSockets", icon: <FiCode className="mr-1" /> }
  ];
  const [animatedSkills, setAnimatedSkills] = useState([]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      
      // Animate skills one by one
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimatedSkills(prev => {
            if (prev.length < skills.length) {
              return [...prev, skills[prev.length]];
            } else {
              clearInterval(interval);
              return prev;
            }
          });
        }, 100);
      }, 1000);

      // Show resume button after animations complete
      setTimeout(() => {
        setShowResumeButton(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, controls, skills]);

  // Stats data
  const stats = [
    { value: "5+", label: "Projects", icon: <FiCode /> },
    { value: "200+", label: "LeetCode", icon: <SiLeetcode /> },
    { value: "Gold", label: "HackerRank", icon: <SiHackerrank /> },
    { value: "2", label: "Internships", icon: <FiClock /> }
  ];

  return (
    <section 
      id={id} 
      ref={ref}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      style={{ backgroundColor: currentColors.background }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl" 
             style={{ backgroundColor: currentColors.primary }}></div>
        <div className="absolute bottom-10 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl" 
             style={{ backgroundColor: currentColors.secondary }}></div>
      </div>
      
      {/* Animated particles background */}
      <Particles colors={currentColors} />
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div 
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
                style={{ 
                  backgroundColor: `${currentColors.primary}20`, 
                  color: currentColors.primary 
                }}
              >
               React.js , Java Full Stack & Flutter Developer
              </span>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
                style={{ color: currentColors.text }}
              >
                Hi, I&rsquo;m <span 
                  className="inline-block"
                  style={{ 
                    background: `linear-gradient(120deg, ${currentColors.primary}, ${currentColors.secondary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Tushar Talmale
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto lg:mx-0 min-h-[72px]"
                style={{ color: currentColors.textSecondary }}
              >
                <Typewriter
                  options={{
                    strings: [
                      "I build scalable web & mobile apps with modern technologies",
                      "Passionate about clean code and intuitive user experiences",
                      "Full stack developer with expertise in Flutter and Spring Boot",
                      "Problem solver with 200+ LeetCode solutions"
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </motion.p>
            </motion.div>
            
            {/* Stats Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 rounded-xl text-center"
                  style={{ 
                    backgroundColor: currentColors.cardBg,
                    border: `1px solid ${currentColors.primary}20`
                  }}
                >
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                         style={{ 
                           backgroundColor: `${currentColors.primary}10`,
                           color: currentColors.primary
                         }}>
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-1" style={{ color: currentColors.text }}>
                    {stat.value}
                  </h3>
                  <p className="text-sm" style={{ color: currentColors.textSecondary }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8"
            >
              <SmoothScrollLink targetId="projects">
                <motion.button
                  whileHover={{ 
                    y: -5,
                    boxShadow: `0 10px 20px ${currentColors.primary}30`
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.secondary})`,
                    color: 'white'
                  }}
                >
                  View My Work
                </motion.button>
              </SmoothScrollLink>
              
              <SmoothScrollLink targetId="contact">
                <motion.button
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: currentColors.cardBg,
                    color: currentColors.text,
                    border: `2px solid ${currentColors.primary}`
                  }}
                >
                  Get In Touch
                </motion.button>
              </SmoothScrollLink>

              {showResumeButton && (
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  href="/Resume/Tushar_Talmale.pdf"
                  download="Tushar_Talmale_Resume.pdf"
                  className="flex items-center justify-center px-6 py-4 rounded-xl text-lg font-bold shadow-lg transition-all duration-300 gap-2"
                  style={{ 
                    backgroundColor: currentColors.cardBg,
                    color: currentColors.text,
                    border: `2px solid ${currentColors.secondary}`
                  }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiDownload />
                  Resume
                </motion.a>
              )}
            </motion.div>
            
            {/* Animated Skills */}
            <motion.div 
              variants={itemVariants}
              className="mb-8"
            >
              <h4 className="text-lg font-semibold mb-4 text-center lg:text-left" style={{ color: currentColors.text }}>
                Tech Stack
              </h4>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {animatedSkills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                    style={{ 
                      backgroundColor: `${currentColors.primary}10`,
                      color: currentColors.text,
                      border: `1px solid ${currentColors.primary}20`
                    }}
                  >
                    {skill.icon}
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center lg:justify-start gap-6"
            >
              {[
                { icon: <FiGithub className="text-2xl" />, url: "https://github.com/TusharTalmale", label: "GitHub" },
                { icon: <FiLinkedin className="text-2xl" />, url: "https://linkedin.com/in/TusharTalmale", label: "LinkedIn" },
                { icon: <SiLeetcode className="text-2xl" />, url: "https://leetcode.com/TusharTalmale", label: "LeetCode" },
                { icon: <SiHackerrank className="text-2xl" />, url: "https://hackerrank.com/TusharTalmale", label: "HackerRank" },
                { icon: <FiMail className="text-2xl" />, url: "mailto:tushartal2@gmail.com", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-colors duration-300 group"
                  style={{ 
                    backgroundColor: currentColors.cardBg,
                    color: currentColors.text,
                    border: `1px solid ${currentColors.primary}30`
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium whitespace-nowrap" style={{ color: currentColors.text }}>
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Column - Animated Profile */}
          <motion.div 
            className="relative flex justify-center"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="relative">
              {/* Main profile image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 border-8 border-white" 
                   style={{ boxShadow: `0 25px 50px -12px ${currentColors.primary}40` }}>
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 w-full h-[500px] flex items-center justify-center">
                  <div className="text-center p-8">
                    <FiCode className="text-6xl mx-auto mb-4" style={{ color: currentColors.primary }} />
                    <h3 className="text-2xl font-bold mb-2" style={{ color: currentColors.text }}>Tushar Talmale</h3>
                    <p className="text-lg" style={{ color: currentColors.textSecondary }}>Full Stack Developer</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around profile */}
              <motion.div 
                className="absolute -top-8 -left-8 w-24 h-24 rounded-2xl shadow-xl z-0"
                style={{ backgroundColor: currentColors.primary }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut"
                  }
                }}
              />
              
              <motion.div 
                className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full shadow-xl z-0"
                style={{ backgroundColor: currentColors.secondary }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -10, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 0.5
                  }
                }}
              />
              
              {/* Floating badges */}
              <motion.div 
                className="absolute -bottom-6 left-1/4 bg-white rounded-xl shadow-xl z-20 p-4 flex items-center gap-3"
                style={{ border: `2px solid ${currentColors.primary}` }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                     style={{ background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.secondary})` }}>
                  <FiCode />
                </div>
                <div>
                  <p className="font-bold" style={{ color: currentColors.text }}>5+ Projects</p>
                  <p className="text-sm" style={{ color: currentColors.textSecondary }}>Completed</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-8 right-1/4 bg-white rounded-xl shadow-xl z-20 p-4 flex items-center gap-3"
                style={{ border: `2px solid ${currentColors.secondary}` }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                     style={{ background: `linear-gradient(135deg, ${currentColors.secondary}, ${currentColors.accent})` }}>
                  <SiLeetcode />
                </div>
                <div>
                  <p className="font-bold" style={{ color: currentColors.text }}>200+ Problems</p>
                  <p className="text-sm" style={{ color: currentColors.textSecondary }}>Solved on LeetCode</p>
                </div>
              </motion.div>

              {/* Third floating badge */}
              <motion.div 
                className="absolute -bottom-6 right-1/4 bg-white rounded-xl shadow-xl z-20 p-4 flex items-center gap-3"
                style={{ border: `2px solid ${currentColors.accent}` }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                     style={{ background: `linear-gradient(135deg, ${currentColors.accent}, ${currentColors.primary})` }}>
                  <FiAward />
                </div>
                <div>
                  <p className="font-bold" style={{ color: currentColors.text }}>Gold Badge</p>
                  <p className="text-sm" style={{ color: currentColors.textSecondary }}>HackerRank Java</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <SmoothScrollLink targetId="about">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center cursor-pointer group"
              style={{ color: currentColors.textSecondary }}
            >
              <span className="mb-3 group-hover:text-white transition-colors duration-300">
                Scroll to explore
              </span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 group-hover:bg-white group-hover:border-white transition-colors duration-300"
                   style={{ borderColor: currentColors.primary }}>
                <FiArrowDown className="w-6 h-6 group-hover:text-gray-900 transition-colors duration-300" />
              </div>
            </motion.div>
          </SmoothScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;