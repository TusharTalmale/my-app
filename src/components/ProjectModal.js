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

  const projectImages = [
    `https://placehold.co/800x500/${currentColors.accent.substring(1)}/${currentColors.text.substring(1)}?text=Project+Screenshot+1`,
    `https://placehold.co/800x500/${currentColors.tertiary.substring(1)}/${currentColors.text.substring(1)}?text=Project+Screenshot+2`,
    `https://placehold.co/800x500/${currentColors.secondary.substring(1)}/${currentColors.text.substring(1)}?text=Project+Screenshot+3`,
  ];

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
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors duration-200" style={{ color: currentColors.textSecondary }} >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="border-b" style={{ borderColor: currentColors.cardBorder }}>
            <div className="flex">
              <button className={`px-6 py-3 font-medium ${activeTab === 'details' ? 'border-b-2' : ''}`} style={{ color: activeTab === 'details' ? currentColors.primary : currentColors.textSecondary, borderColor: activeTab === 'details' ? currentColors.primary : 'transparent' }} onClick={() => setActiveTab('details')} >
                Project Details
              </button>
              <button className={`px-6 py-3 font-medium ${activeTab === 'readme' ? 'border-b-2' : ''}`} style={{ color: activeTab === 'readme' ? currentColors.primary : currentColors.textSecondary, borderColor: activeTab === 'readme' ? currentColors.primary : 'transparent' }} onClick={() => setActiveTab('readme')} >
                Documentation
              </button>
              <button className={`px-6 py-3 font-medium ${activeTab === 'gallery' ? 'border-b-2' : ''}`} style={{ color: activeTab === 'gallery' ? currentColors.primary : currentColors.textSecondary, borderColor: activeTab === 'gallery' ? currentColors.primary : 'transparent' }} onClick={() => setActiveTab('gallery')} >
                Gallery
              </button>
              {project.liveDemo && project.liveDemo !== '#' && (
                <button className={`px-6 py-3 font-medium ${activeTab === 'demo' ? 'border-b-2' : ''}`} style={{ color: activeTab === 'demo' ? currentColors.primary : currentColors.textSecondary, borderColor: activeTab === 'demo' ? currentColors.primary : 'transparent' }} onClick={() => setActiveTab('demo')} >
                  Video Demo
                </button>
              )}
            </div>
          </div>
          <div className="p-6">
            {activeTab === 'details' && (
              <div>
                <p className="mb-6" style={{ color: currentColors.textSecondary }}>{project.description}</p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3" style={{ color: currentColors.text }}>Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: currentColors.secondary + '30', color: currentColors.text }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors duration-300" style={{ backgroundColor: currentColors.text, color: currentColors.background, hoverBackgroundColor: currentColors.textSecondary }} >
                    <i className="fab fa-github"></i> View on GitHub
                  </a>
                  {project.liveDemo && project.liveDemo !== '#' && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors duration-300" style={{ backgroundColor: currentColors.primary, color: 'white', hoverBackgroundColor: currentColors.secondary }} >
                      <i className="fas fa-external-link-alt"></i> Live Demo
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
                    <i className="fas fa-file-alt text-4xl mb-4"></i>
                    <p>No README.md found for this project</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'gallery' && (
              <div>
                <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                  <img src={projectImages[activeImageIndex]} alt={`Project Screenshot ${activeImageIndex + 1}`} className="w-full h-auto" />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {projectImages.map((img, index) => (
                    <button key={index} onClick={() => setActiveImageIndex(index)} className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2`} style={{ borderColor: activeImageIndex === index ? currentColors.primary : 'transparent' }} >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'demo' && project.liveDemo && project.liveDemo !== '#' && (
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden">
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <i className="fas fa-video text-4xl mb-4"></i>
                    <p>Video demo would be embedded here</p>
                    <p className="text-sm text-gray-400 mt-2">(In a real implementation, this would show a video player)</p>
                  </div>
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