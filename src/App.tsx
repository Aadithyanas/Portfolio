import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`min-h-screen transition-colors duration-300 ${
          isDark ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;