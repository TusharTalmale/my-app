// components/Experience.js
"use client";

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import SectionTitle from './SectionTitle';

const Experience = ({ id }) => {
  const { currentColors } = useContext(ThemeContext);
  const experiences = [
    {
      title: "Web Developer Intern",
      company: "Fit-Start Startup",
      duration: "June 2025 - Present",
      location: "Remote",
      description: [
        "Developed admin panel using React.js and Next.js.",
        "Integrated Supabase APIs for secure data management.",
        "Improved website performance and speed through optimization techniques by 55%.",
      ],
      logo: "Fitstart.jpg",
    },
    {
      title: "Full Stack Developer Intern",
      company: "Prasunet Company pvt ltd (Tech Bharat Global Impact)",
      duration: "Mar 2025 - Apr 2025",
      location: "Remote",
      description: [
        "Developed an AI Recipe Generator application using React, Spring Boot, and Docker, significantly enhancing user engagement.",
        "Integrated the Gemini API with 100% accuracy for seamless ingredient-to-recipe transformation.",
        "Containerized the entire application using Docker, achieving 99.8% uptime and improving deployment efficiency.",
        "Implemented robust CI/CD pipelines using Jenkins, streamlining development and deployment.",
      ],
      logo: "Prashunet Logo.webp",
    },
  ];

  return (
    <section id={id} className="py-20" style={{ backgroundColor: currentColors.background }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <SectionTitle>Work Experience</SectionTitle>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: currentColors.textSecondary }}>
            My professional journey and contributions
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 rounded-full transform -translate-x-1/2" style={{ background: `linear-gradient(to bottom, ${currentColors.secondary}, ${currentColors.accent})` }}></div>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-12 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:items-start gap-6`}
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full z-10 items-center justify-center text-white font-bold shadow-lg" style={{ background: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary})` }}>
                {index + 1}
              </div>
              
              <div className="md:w-5/12">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="p-6 rounded-xl shadow-lg border relative"
                  style={{ backgroundColor: currentColors.cardBg, borderColor: currentColors.cardBorder }}
                >
                  <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-md" style={{ backgroundColor: currentColors.cardBg, borderColor: currentColors.tertiary }}>
                    <img src={exp.logo} alt={exp.company} className="w-13 h-13 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: currentColors.text }}>{exp.title}</h3>
                  <p className="font-medium mb-2" style={{ color: currentColors.primary }}>{exp.company}</p>
                  <p className="text-sm mb-4" style={{ color: currentColors.textSecondary }}>{exp.duration} • {exp.location}</p>
                  <ul className="space-y-2" style={{ color: currentColors.textSecondary }}>
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: currentColors.primary }}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              
              <div className="md:w-2/12 flex justify-center">
                {/* Empty space for alignment */}
              </div>
              
              <div className="md:w-5/12">
                {/* Empty space for alignment */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;