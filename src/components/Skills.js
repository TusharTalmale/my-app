// components/Skills.js
"use client";

import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import SectionTitle from './SectionTitle';
import { FiCode, FiLayers, FiDatabase, FiServer, FiSmartphone, FiCpu, FiUsers } from 'react-icons/fi';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SkillsChart from './SkillChart';

const Skills = ({ id }) => {
  const { currentColors } = useContext(ThemeContext);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const skillCategories = [
    {
      name: "Languages",
      icon: <FiCode />,
      color: "#4F46E5",
      skills: [
        { name: "JavaScript", level: 90, icon: "js" },
        { name: "Java", level: 90, icon: "java" },
        { name: "Dart", level: 85, icon: "dart" },
        { name: "SQL", level: 85, icon: "sql" },
        { name: "CSS", level: 90, icon: "css" },
      ],
    },
    {
      name: "Frontend",
      icon: <FiLayers />,
      color: "#10B981",
      skills: [
        { name: "React.js", level: 90, icon: "react" },
        { name: "Next.js", level: 80, icon: "nextjs" },
        { name: "Redux", level: 85, icon: "redux" },
        { name: "Tailwind CSS", level: 95, icon: "tailwind" },
        { name: "Material-UI", level: 85, icon: "mui" },
        { name: "Bootstrap", level: 80, icon: "bootstrap" },
      ],
    },
    {
      name: "Backend",
      icon: <FiServer />,
      color: "#EF4444",
      skills: [
        { name: "Spring Boot", level: 90, icon: "spring" },
        { name: "REST APIs", level: 95, icon: "api" },
        { name: "Microservices", level: 85, icon: "microservices" },
        { name: "JWT", level: 85, icon: "jwt" },
        { name: "WebSockets", level: 80, icon: "websocket" },
        { name: "Spring Security", level: 80, icon: "security" },
        { name: "JUnit & Mockito", level: 75, icon: "testing" },
      ],
    },
    {
      name: "Mobile",
      icon: <FiSmartphone />,
      color: "#F59E0B",
      skills: [
        { name: "Flutter", level: 90, icon: "flutter" },
        { name: "Dart", level: 85, icon: "dart" },
        { name: "Firebase", level: 80, icon: "firebase" },
        { name: "GetX", level: 75, icon: "getx" },
        { name: "Provider", level: 70, icon: "provider" },
      ],
    },
    {
      name: "Databases",
      icon: <FiDatabase />,
      color: "#8B5CF6",
      skills: [
        { name: "MySQL", level: 90, icon: "mysql" },
        { name: "PostgreSQL", level: 85, icon: "postgres" },
        { name: "Firestore", level: 80, icon: "firestore" },
        { name: "MongoDB", level: 75, icon: "mongodb" },
        { name: "JPA & Hibernate", level: 80, icon: "hibernate" },
      ],
    },
    {
      name: "DevOps & Tools",
      icon: <FiCpu />,
      color: "#06B6D4",
      skills: [
        { name: "Docker", level: 85, icon: "docker" },
        { name: "Jenkins", level: 75, icon: "jenkins" },
        { name: "Git", level: 95, icon: "git" },
        { name: "GitHub Actions", level: 80, icon: "github" },
        { name: "VS Code", level: 90, icon: "vscode" },
        { name: "IntelliJ IDEA", level: 85, icon: "intellij" },
        { name: "Postman", level: 80, icon: "postman" },
      ],
    },
    {
      name: "Soft Skills",
      icon: <FiUsers />,
      color: "#EC4899",
      skills: [
        { name: "Leadership", level: 90, icon: "leadership" },
        { name: "Team Collaboration", level: 95, icon: "collab" },
        { name: "Critical Thinking", level: 90, icon: "thinking" },
        { name: "Time Management", level: 85, icon: "time" },
        { name: "Ownership", level: 90, icon: "ownership" },
      ],
    },
  ];

  const skillIcons = {
    js: "fab fa-js",
    java: "fab fa-java",
    dart: "fas fa-code",
    sql: "fas fa-database",
    css: "fab fa-css3-alt",
    react: "fab fa-react",
    nextjs: "fas fa-globe",
    redux: "fas fa-sync-alt",
    tailwind: "fas fa-wind",
    mui: "fas fa-palette",
    bootstrap: "fab fa-bootstrap",
    spring: "fas fa-leaf",
    api: "fas fa-exchange-alt",
    microservices: "fas fa-cubes",
    jwt: "fas fa-lock",
    websocket: "fas fa-plug",
    security: "fas fa-shield-alt",
    testing: "fas fa-vial",
    flutter: "fas fa-mobile",
    firebase: "fas fa-fire",
    getx: "fas fa-rocket",
    provider: "fas fa-box",
    mysql: "fas fa-database",
    postgres: "fas fa-database",
    firestore: "fas fa-fire",
    mongodb: "fas fa-database",
    hibernate: "fas fa-layer-group",
    docker: "fab fa-docker",
    jenkins: "fas fa-project-diagram",
    git: "fab fa-git-alt",
    github: "fab fa-github",
    vscode: "fas fa-terminal",
    intellij: "fas fa-code",
    postman: "fas fa-paper-plane",
    leadership: "fas fa-user-tie",
    collab: "fas fa-handshake",
    thinking: "fas fa-brain",
    time: "fas fa-clock",
    ownership: "fas fa-star"
  };

  useEffect(() => {
    setHoveredSkill(null);
  }, [activeCategory]);

  const CircularProgress = ({ percentage, radius = 40, stroke = 6, color }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke={currentColors.backgroundAlt}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset: 0 }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-lg font-bold" style={{ color: currentColors.text }}>
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id={id} className="py-20 relative overflow-hidden" style={{ backgroundColor: currentColors.background }}>
      {/* Enhanced decorative elements with animation */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-32 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        style={{ background: `linear-gradient(90deg, ${currentColors.primary}, ${currentColors.secondary})` }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ backgroundColor: currentColors.primary }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <SectionTitle>Skills & Expertise</SectionTitle>
          <motion.p 
            className="text-xl max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: currentColors.textSecondary }}
          >
            Technologies I've mastered and tools I use daily to build exceptional applications
          </motion.p>
        </div>
        
        {/* Category Tabs with improved animation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCategory(index)}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
                activeCategory === index ? 'text-white' : ''
              }`}
              style={{
                backgroundColor: activeCategory === index 
                  ? skillCategories[activeCategory].color 
                  : currentColors.cardBg,
                color: activeCategory === index 
                  ? 'white' 
                  : currentColors.textSecondary,
                border: activeCategory === index 
                  ? 'none' 
                  : `1px solid ${currentColors.cardBorder}`,
                boxShadow: activeCategory === index
                  ? `0 4px 15px ${skillCategories[activeCategory].color}50`
                  : 'none'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Skills Grid with enhanced animations */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          key={activeCategory}
        >
          <AnimatePresence>
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -10,
                  boxShadow: `0 10px 25px ${skillCategories[activeCategory].color}30`
                }}
                onHoverStart={() => setHoveredSkill(index)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 cursor-pointer"
                style={{ 
                  backgroundColor: currentColors.cardBg,
                  border: `1px solid ${currentColors.cardBorder}`,
                  transform: hoveredSkill === index ? 'scale(1.05)' : 'scale(1)',
                  zIndex: hoveredSkill === index ? 10 : 1
                }}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
              >
                <div className="mb-4">
                  <CircularProgress 
                    percentage={skill.level} 
                    radius={50}
                    stroke={6}
                    color={skillCategories[activeCategory].color}
                  />
                </div>
                
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3"
                     style={{ 
                       backgroundColor: `${skillCategories[activeCategory].color}20`,
                       color: skillCategories[activeCategory].color
                     }}>
                  <i className={skillIcons[skill.icon]}></i>
                </div>
                
                <h3 className="text-lg font-bold mb-2" style={{ color: currentColors.text }}>
                  {skill.name}
                </h3>
                
                <div className="w-full mt-3">
                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: currentColors.backgroundAlt }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-1.5 rounded-full"
                      style={{ backgroundColor: skillCategories[activeCategory].color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
     {/* Skills Overview Visualization with enhanced animation */}
<motion.div 
  className="mt-16 p-8 rounded-2xl"
  style={{ 
    backgroundColor: currentColors.cardBg,
    border: `1px solid ${currentColors.cardBorder}`,
    boxShadow: `0 10px 30px ${currentColors.primary}10`
  }}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.8 }}
>
               <SkillsChart />

</motion.div>
      </div>
    </section>
  );
};

export default Skills;