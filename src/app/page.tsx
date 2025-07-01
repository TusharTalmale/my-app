// app/page.tsx
"use client";

import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';

// Import all your new components
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experiance';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function MainAppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero id="hero" />
        <About id="about" />
        <Skills id="skills" />
        <Experience id="experience" />
        <Projects id="projects" />
        <Contact id="contact" />

      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}