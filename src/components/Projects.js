// components/Projects.js
"use client";

import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import SectionTitle from './SectionTitle';
import ProjectModal from './ProjectModal';

const Projects = ({ id }) => {
  const { currentColors } = useContext(ThemeContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');


  const allProjects = [
    { 
        title: "Threads Clone – Social Media App", 
        description: "Developed a real-time social media app with features like posting threads (text, images, videos), liking, commenting, and searching. Implemented real-time updates using Firebase Firestore and user authentication.", 
        technologies: ["Flutter", "Dart", "Firebase", "GetX", "Firebase Firestore", "Firebase Storage"], 
        github: "https://github.com/TusharTalmale/threads-clone-flutter", 
        liveDemo: "#", 
        type: "mobile", 
        pattern: 'dots', 
        bgColor: currentColors.accent, 
        borderColor: currentColors.secondary 
    },
    { 
        title: "Real-Time Chat App", 
        description: "Built a real-time messaging app with text and image sharing using Firebase Firestore. Implemented user authentication and chat history persistence with clean UI including message bubbles and timestamps.", 
        technologies: ["Flutter", "Dart", "Firebase", "GetX", "Firebase Auth", "Firebase Storage"], 
        github: "https://github.com/TusharTalmale/chat-App-flutter", 
        liveDemo: "#", 
        type: "mobile", 
        pattern: 'diagonal-stripes', 
        bgColor: currentColors.tertiary, 
        borderColor: currentColors.primary 
    },
    { 
        title: "AI Recipe Generator", 
        description: "Developed an AI Recipe Generator application using React and Spring Boot. Integrated Gemini API with 100% accuracy for ingredient-to-recipe transformation. Containerized using Docker with 99.8% uptime.", 
        technologies: ["React.js", "Spring Boot", "Gemini API", "Docker", "Jenkins", "MySQL"], 
        github: "https://github.com/TusharTalmale/AI-Recipe-Generator", 
        liveDemo: "#", 
        type: "web", 
        pattern: 'grid', 
        bgColor: currentColors.secondary, 
        borderColor: currentColors.tertiary 
    },
    { 
        title: "Land Auction Platform", 
        description: "Built real-time land auction platform with WebSocket-based bidding. Integrated Leaflet.js maps for sellers to mark plots and visualize boundaries. Implemented secure authentication using Spring Security and JWT.", 
        technologies: ["Spring Boot", "React.js", "WebSockets", "Leaflet.js", "JWT", "TailwindCSS", "MySQL"], 
        github: "https://github.com/TusharTalmale/Land-Auction", 
        liveDemo: "#", 
        type: "web", 
        pattern: 'wavy', 
        bgColor: currentColors.primary, 
        borderColor: currentColors.accent 
    },
    { 
        title: "Weather Forecasting App", 
        description: "Created a weather app that fetches real-time data using OpenWeather API. Added location-based weather updates and search feature for cities worldwide with interactive UI and weather animations.", 
        technologies: ["Flutter", "Dart", "OpenWeather API", "HTTP"], 
        github: "https://github.com/TusharTalmale/Weather-Flutter-app", 
        liveDemo: "#", 
        type: "mobile", 
        pattern: 'diagonal-stripes', 
        bgColor: currentColors.accent, 
        borderColor: currentColors.primary 
    },
    { 
        title: "Smart Email Writer – Chrome Extension", 
        description: "AI-powered Chrome extension that generates contextual email drafts. Integrated directly into Gmail UI for real-time suggestions with fast response times using Spring Boot async processing.", 
        technologies: ["React.js", "Spring Boot", "Gemini API", "Docker", "Chrome Extension API"], 
        github: "https://github.com/TusharTalmale/Smart-Email-Reply", 
        liveDemo: "emailbuddyai.netlify.app/", 
        type: "web", 
        pattern: 'dots', 
        bgColor: currentColors.primary, 
        borderColor: currentColors.tertiary 
    },
        { title: "Portfolio Website (This Site!)", description: "My personal portfolio website showcasing my skills, projects, and experience. Built with a focus on modern design, smooth animations, and responsiveness.", technologies: ["Next.js", "React.js", "Framer Motion", "TailwindCSS"], github: "https://github.com/TusharTalmale/my-portfolio-nextjs", liveDemo: "#", type: "web", pattern: 'wavy', bgColor: currentColors.primary, borderColor: currentColors.accent },

];

  const filteredProjects = filter === 'all' ? allProjects : allProjects.filter(p => p.type === filter);

  const patternStyles = {
    'diagonal-stripes': {
      backgroundImage: `repeating-linear-gradient(45deg, ${currentColors.primary} 0 1px, transparent 1px 8px)`,
      backgroundSize: '16px 16px',
    },
    'dots': {
      backgroundImage: `radial-gradient(${currentColors.secondary} 1px, transparent 1px)`,
      backgroundSize: '16px 16px',
    },
    'grid': {
      backgroundImage: `linear-gradient(to right, ${currentColors.tertiary} 1px, transparent 1px), linear-gradient(to bottom, ${currentColors.tertiary} 1px, transparent 1px)`,
      backgroundSize: '16px 16px',
    },
    'wavy': {
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${encodeURIComponent(currentColors.primary)}' fill-opacity='0.2' d='M6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z'/%3E%3C/svg%3E")`,
      backgroundSize: '24px 24px',
      backgroundRepeat: 'repeat',
    },
    'cross-hatch': {
      backgroundImage: `repeating-linear-gradient(45deg, ${currentColors.accent} 0 1px, transparent 1px 8px), repeating-linear-gradient(-45deg, ${currentColors.accent} 0 1px, transparent 1px 8px)`,
      backgroundSize: '16px 16px',
    }
  };

  return (
    <section id={id} className="py-20" style={{ backgroundColor: currentColors.background }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <SectionTitle>My Projects</SectionTitle>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: currentColors.textSecondary }}>
            A selection of my recent work, showcasing my skills and passion for development.
          </p>
        </div>
        
        <div className="flex justify-center gap-4 mb-12">
          {['all', 'web', 'mobile'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === type ? 'text-white' : 'border'
              }`}
              style={{ 
                backgroundColor: filter === type ? currentColors.primary : 'transparent',
                color: filter === type ? 'white' : currentColors.textSecondary,
                borderColor: currentColors.primary
              }}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)} Projects
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-xl shadow-lg border relative overflow-hidden cursor-pointer"
                style={{ 
                  backgroundColor: currentColors.cardBg, 
                  borderColor: currentColors.cardBorder,
                  minHeight: '350px'
                }}
                onClick={() => setSelectedProject(project)}
              >
                <div 
                  className="absolute inset-0 opacity-20" 
                  style={{ 
                    backgroundColor: project.bgColor,
                    ...patternStyles[project.pattern]
                  }}
                ></div>
                <div className="relative p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="text-sm font-semibold px-3 py-1 rounded-full absolute top-6 right-6" 
                      style={{ 
                        backgroundColor: project.borderColor + '30', 
                        color: project.borderColor 
                      }}
                    >
                      {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                    </span>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: currentColors.text }}>{project.title}</h3>
                  </div>
                  <p className="flex-grow mb-4" style={{ color: currentColors.textSecondary }}>{project.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: currentColors.backgroundAlt, color: currentColors.textSecondary }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: currentColors.primary }}>
                          <i className="fab fa-github"></i> GitHub
                        </a>
                      )}
                      {project.liveDemo && project.liveDemo !== '#' && (
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: currentColors.primary }}>
                          <i className="fas fa-external-link-alt"></i> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;