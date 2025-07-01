// components/SmoothScrollLink.js
"use client";

import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const SmoothScrollLink = ({ children, targetId, className, onClick }) => {
  const { currentColors } = useContext(ThemeContext);
  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;