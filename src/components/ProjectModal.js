// components/ProjectModal.js
"use client";

import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ThemeContext } from '../context/ThemeContext';

const ProjectModal = ({ project, onClose }) => {
  const { currentColors } = useContext(ThemeContext);
  const [readme, setReadme] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Define actual project screenshots for each project
  const projectScreenshots = {
    "Threads Clone – Social Media App": [
      "/projects/threads-clone/1.png",
      "/projects/threads-clone/2.png",
      "/projects/threads-clone/3.png"
    ],
    "Real-Time Chat App": [
      "/chat/Screenshot_1748328562.png",
      "/chat/Screenshot_1748328847.png",
      "/chat/Screenshot_1748330087.png",
      "/chat/Screenshot_1748330207.png",

      "/chat/Screenshot_1748330237.png",
      "/chat/Screenshot_1748330258.png",
      "/chat/Screenshot_1748330278.png",
      "/chat/Screenshot_1748330290.png",

     
    ],
    "AI Recipe Generator": [
      "/projects/recipe-generator/1.png",
      "/projects/recipe-generator/2.png",
      "/projects/recipe-generator/3.png"
    ],
    "Land Auction Platform": [
      "/land/two.png",
            "/land/one.png",
      "/land/three.png",
      "/land/four.png",

    ],
    "Weather Forecasting App": [
      "/weather/Screenshot_1747647337.png"
    ],
    "Smart Email Writer – Chrome Extension": [
      "/projects/email-writer/1.png",
      "/projects/email-writer/2.png"
    ],
    "Portfolio Website (This Site!)": [
      "/projects/portfolio/1.png",
      "/projects/portfolio/2.png"
    ]
  };

  const currentProjectImages = projectScreenshots[project.title] || [
    `/projects/default/${activeImageIndex + 1}.png`
  ];

  useEffect(() => {
    if (project.github) {
      const repoPath = project.github.replace('https://github.com/', '');
      fetch(`https://raw.githubusercontent.com/${repoPath}/main/README.md`)
        .then(response => {
          if (response.ok) return response.text();
          return '';
        })
        .then(text => {
          setReadme(text);
          setIsLoading(false);
        })
        .catch(() => {
          setReadme('');
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [project.github]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        style={{ backgroundColor: currentColors.cardBg }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: currentColors.cardBorder }}>
          <h3 className="text-2xl font-bold" style={{ color: currentColors.text }}>{project.title}</h3>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200" 
            style={{ color: currentColors.textSecondary, backgroundColor: currentColors.backgroundAlt }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="border-b" style={{ borderColor: currentColors.cardBorder }}>
            <div className="flex overflow-x-auto">
              <button 
                className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'details' ? 'border-b-2' : ''}`} 
                style={{ 
                  color: activeTab === 'details' ? currentColors.primary : currentColors.textSecondary, 
                  borderColor: activeTab === 'details' ? currentColors.primary : 'transparent',
                  backgroundColor: activeTab === 'details' ? currentColors.backgroundAlt : 'transparent'
                }} 
                onClick={() => setActiveTab('details')}
              >
                Project Details
              </button>
              <button 
                className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'readme' ? 'border-b-2' : ''}`} 
                style={{ 
                  color: activeTab === 'readme' ? currentColors.primary : currentColors.textSecondary, 
                  borderColor: activeTab === 'readme' ? currentColors.primary : 'transparent',
                  backgroundColor: activeTab === 'readme' ? currentColors.backgroundAlt : 'transparent'
                }} 
                onClick={() => setActiveTab('readme')}
              >
                Documentation
              </button>
              <button 
                className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'gallery' ? 'border-b-2' : ''}`} 
                style={{ 
                  color: activeTab === 'gallery' ? currentColors.primary : currentColors.textSecondary, 
                  borderColor: activeTab === 'gallery' ? currentColors.primary : 'transparent',
                  backgroundColor: activeTab === 'gallery' ? currentColors.backgroundAlt : 'transparent'
                }} 
                onClick={() => setActiveTab('gallery')}
              >
                Screenshots
              </button>
              {project.liveDemo && project.liveDemo !== '#' && (
                <button 
                  className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'demo' ? 'border-b-2' : ''}`} 
                  style={{ 
                    color: activeTab === 'demo' ? currentColors.primary : currentColors.textSecondary, 
                    borderColor: activeTab === 'demo' ? currentColors.primary : 'transparent',
                    backgroundColor: activeTab === 'demo' ? currentColors.backgroundAlt : 'transparent'
                  }} 
                  onClick={() => setActiveTab('demo')}
                >
                  Live Demo
                </button>
              )}
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'details' && (
              <div>
                <p className="mb-6 text-lg" style={{ color: currentColors.textSecondary }}>{project.description}</p>
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-4" style={{ color: currentColors.text }}>Technologies Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 rounded-full text-sm font-medium"
                        style={{ 
                          backgroundColor: currentColors.secondary + '20', 
                          color: currentColors.text,
                          border: `1px solid ${currentColors.secondary}`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-300 hover:shadow-md"
                      style={{ 
                        backgroundColor: currentColors.primary, 
                        color: 'white',
                        border: `1px solid ${currentColors.primary}`
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View on GitHub
                    </a>
                  )}
                  {project.liveDemo && project.liveDemo !== '#' && (
                    <a 
                      href={project.liveDemo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-300 hover:shadow-md"
                      style={{ 
                        backgroundColor: 'transparent', 
                        color: currentColors.primary,
                        border: `1px solid ${currentColors.primary}`
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z"/>
                      </svg>
                      View Live Demo
                    </a>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'readme' && (
              <div className="prose max-w-none" style={{ color: currentColors.textSecondary }}>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: currentColors.primary }}></div>
                  </div>
                ) : readme ? (
                  <ReactMarkdown>{readme}</ReactMarkdown>
                ) : (
                  <div className="text-center py-12" style={{ color: currentColors.textSecondary }}>
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <p className="text-lg">No documentation available for this project</p>
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-4 py-2 rounded-md text-sm font-medium"
                        style={{ 
                          backgroundColor: currentColors.backgroundAlt,
                          color: currentColors.primary
                        }}
                      >
                        Check GitHub Repository
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <div className="mb-6 rounded-xl overflow-hidden shadow-lg border" style={{ borderColor: currentColors.cardBorder }}>
                  <img 
                    src={currentProjectImages[activeImageIndex]} 
                    alt={`${project.title} screenshot ${activeImageIndex + 1}`} 
                    className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                  />
                </div>
                {currentProjectImages.length > 1 && (
                  <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
                    {currentProjectImages.map((img, index) => (
                      <button 
                        key={index} 
                        onClick={() => setActiveImageIndex(index)} 
                        className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200`} 
                        style={{ 
                          borderColor: activeImageIndex === index ? currentColors.primary : currentColors.cardBorder,
                          opacity: activeImageIndex === index ? 1 : 0.7
                        }}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'demo' && project.liveDemo && project.liveDemo !== '#' && (
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-xl overflow-hidden border" style={{ borderColor: currentColors.cardBorder }}>
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke={currentColors.primary} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  <h4 className="text-xl font-semibold mb-2" style={{ color: currentColors.text }}>Live Demo Available</h4>
                  <p className="mb-6 max-w-md" style={{ color: currentColors.textSecondary }}>
                    This project has a live demo that you can interact with. Click the button below to try it out!
                  </p>
                  <a 
                    href={project.liveDemo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-300 hover:shadow-md"
                    style={{ 
                      backgroundColor: currentColors.primary, 
                      color: 'white'
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z"/>
                    </svg>
                    Open Live Demo
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;