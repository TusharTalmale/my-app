// context/ThemeContext.js
"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import colors from '../styles/colors'; // Import the colors

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeColors = {
    light: {
      primary: colors.primary,
      secondary: colors.secondary,
      tertiary: colors.tertiary,
      accent: colors.accent,
      text: colors.textDark,
      textSecondary: colors.textLight,
      background: colors.bgLight,
      backgroundAlt: colors.bgGray,
      cardBg: colors.bgLight,
      cardBorder: colors.accent + '50',
      headerBg: 'white',
      headerText: colors.textDark,
      linkText: colors.textLight,
      linkHover: colors.primary,
      footerBg: colors.textDark,
      footerText: 'white',
      inputBg: colors.bgGray,
      inputBorder: colors.accent,
    },
    dark: {
      primary: '#FF9933', // Slightly brighter orange for dark mode
      secondary: '#E0E369', // Slightly brighter yellow for dark mode
      tertiary: '#F0F3BB',
      accent: '#F2E8B5',
      text: '#FDFDFD',
      textSecondary: '#E0E0E0',
      background: '#1A1A1A',
      backgroundAlt: '#2A2A2A',
      cardBg: '#2A2A2A',
      cardBorder: '#444444',
      headerBg: '#2A2A2A',
      headerText: '#FDFDFD',
      linkText: '#E0E0E0',
      linkHover: '#FF9933',
      footerBg: '#111111',
      footerText: '#E0E0E0',
      inputBg: '#3A3A3A',
      inputBorder: '#555555',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentColors: themeColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };