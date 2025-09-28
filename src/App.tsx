import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { ContactAlternative } from './components/ContactAlternative';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import AddProjectSimple from './components/AddProjectSimple';
import AllProjects from './components/AllProjects';
import NEXAA from './components/NEXAA';
import NEXAAButton from './components/NEXAAButton';

type ThemeMode = 'light' | 'dark' | 'system';

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showNEXAA, setShowNEXAA] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [useEmailJS, setUseEmailJS] = useState(true);

  useEffect(() => {
    // Get saved theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') as ThemeMode || 'system';
    setThemeMode(savedTheme);
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      if (themeMode === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(systemPrefersDark);
      } else {
        setIsDark(themeMode === 'dark');
      }
    };

    updateTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themeMode === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  const toggleTheme = () => {
    let newTheme: ThemeMode;
    if (themeMode === 'light') {
      newTheme = 'dark';
    } else if (themeMode === 'dark') {
      newTheme = 'system';
    } else {
      newTheme = 'light';
    }
    
    setThemeMode(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleAddProject = () => {
    setShowAddProject(true);
  };

  const handleProjectAdded = () => {
    setShowAddProject(false);
    // Trigger refresh of projects
    setRefreshTrigger(prev => prev + 1);
  };

  const handleShowAllProjects = () => {
    setShowAllProjects(true);
  };

  const handleBackToPortfolio = () => {
    setShowAllProjects(false);
  };

  const handleToggleNEXAA = () => {
    setShowNEXAA(!showNEXAA);
  };

  // Show all projects page
  if (showAllProjects) {
    return (
      <AllProjects 
        isDark={isDark} 
        onBack={handleBackToPortfolio}
        toggleTheme={toggleTheme}
        themeMode={themeMode}
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
          isDark 
            ? 'dark bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-gray-100' 
            : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
        }`}
      >
        <BackgroundAnimation isDark={isDark} />
        <Navbar 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          themeMode={themeMode} 
          onAddProject={handleAddProject}
        />
        <Hero isDark={isDark} />
        <Skills isDark={isDark} />
        <Projects 
          isDark={isDark} 
          refreshTrigger={refreshTrigger} 
          onShowAllProjects={handleShowAllProjects}
        />
        {useEmailJS ? (
          <Contact isDark={isDark} />
        ) : (
          <ContactAlternative isDark={isDark} />
        )}
        
        {/* Email Method Toggle */}
        <div className="text-center py-4">
          <button
            onClick={() => setUseEmailJS(!useEmailJS)}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {useEmailJS ? 'Switch to Direct Email' : 'Switch to EmailJS'}
          </button>
        </div>
        
        {/* NEXAA AI Assistant */}
        <NEXAAButton 
          isDark={isDark} 
          onClick={handleToggleNEXAA}
          isOpen={showNEXAA}
        />
        
        <NEXAA 
          isDark={isDark}
          isOpen={showNEXAA}
          onToggle={handleToggleNEXAA}
        />
        
        {showAddProject && (
          <AddProjectSimple 
            isDark={isDark} 
            onClose={() => setShowAddProject(false)}
            onProjectAdded={handleProjectAdded}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
