// components/About.js
"use client";

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import SectionTitle from './SectionTitle';

const About = ({ id }) => {
  const { currentColors } = useContext(ThemeContext);
  const stats = [
    { value: "200+", label: "LeetCode Problems Solved" },
    { value: "10+", label: "Projects Completed" },
    { value: "2", label: "Internships" },
    { value: "5+", label: "Years of Experience" }, // Adjusted based on expected graduation 2025 and internships
  ];

  return (
    <section id={id} className="py-20" style={{ backgroundColor: currentColors.background }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <SectionTitle>About Me</SectionTitle>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 flex justify-center relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://placehold.co/400x400/E0E0E0/333333?text=Tushar+Talmale" 
                alt="Tushar Talmale"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-64 h-64 md:w-80 md:h-80 rounded-2xl border-4" style={{ borderColor: currentColors.secondary + '30' }}></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/3"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: currentColors.text }}>
              Passionate Full Stack & Flutter Developer
            </h3>
            
            <div className="space-y-4 mb-8" style={{ color: currentColors.textSecondary }}>
              <p>

               I&rsquo;m a Computer Engineering student with hands-on experience in building scalable web applications using Java, Spring Boot, and React.js. My expertise extends to crafting cross-platform mobile applications with Flutter, Dart, and Firebase.
              </p>
              <p>
                I thrive on solving complex problems and possess a strong dedication to clean code, robust system design, and seamless user experiences. I&rsquo;m proficient in RESTful APIs, JWT authentication, and real-time communication with WebSockets.
              </p>
              <p>
                Adept at deploying production-grade applications using Docker and CI/CD pipelines, I am always eager to learn and integrate emerging technologies. I value strong communication and collaborative teamwork.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl text-center shadow-sm"
                  style={{ background: `linear-gradient(to br, ${currentColors.tertiary}, ${currentColors.accent})` }}
                >
                  <p className="text-2xl md:text-3xl font-bold" style={{ color: currentColors.primary }}>{stat.value}</p>
                  <p style={{ color: currentColors.textSecondary }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;