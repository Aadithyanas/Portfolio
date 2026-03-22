import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import AddProject from './components/AddProject';
import AllProjects from './components/AllProjects';
import NEXAA from './components/NEXAA';
import NEXAAButton from './components/NEXAAButton';
import GitHubStatsSection from './components/GitHubStatsSection';
import { EducationExperience } from './components/EducationExperience';
import { Footer } from './components/Footer';

/* ─── Site is permanently dark ─── */
const isDark = true;

function App() {
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showNEXAA, setShowNEXAA] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Pseudo-routing for /add12
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/add12' || path === '/add12/') {
      setShowAddProject(true);
    }
  }, []);

  const handleProjectAdded = () => {
    setShowAddProject(false);
    // If we were on /add12, maybe clear the URL (optional but cleaner)
    if (window.location.pathname.includes('/add12')) {
      window.history.pushState({}, '', '/');
    }
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCloseAddProject = () => {
    setShowAddProject(false);
    if (window.location.pathname.includes('/add12')) {
      window.history.pushState({}, '', '/');
    }
  };

  const handleShowAllProjects = () => setShowAllProjects(true);
  const handleBackToPortfolio = () => setShowAllProjects(false);
  const handleToggleNEXAA = () => setShowNEXAA(!showNEXAA);

  if (showAllProjects) {
    return (
      <AllProjects
        isDark={isDark}
        onBack={handleBackToPortfolio}
        toggleTheme={() => {}}
        themeMode="dark"
      />
    );
  }

  return (
    <AnimatePresence>
      <div
        style={{
          backgroundColor: '#0a0a0a',
          minHeight: '100vh',
          position: 'relative',
          color: '#f0f0f0',
          fontFamily: "'Outfit', sans-serif"
        }}
        className="selection:bg-blue-500/30 selection:text-blue-200"
      >
        <Navbar />
        <Hero isDark={isDark} />
        <Skills isDark={isDark} />
        <EducationExperience isDark={isDark} />
        <Projects
          isDark={isDark}
          refreshTrigger={refreshTrigger}
          onShowAllProjects={handleShowAllProjects}
        />
        <GitHubStatsSection isDark={isDark} username="Aadithyanas" />
        <Contact isDark={isDark} />

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
          <AddProject
            isDark={isDark}
            onClose={handleCloseAddProject}
            onProjectAdded={handleProjectAdded}
          />
        )}
        <Footer />
      </div>
    </AnimatePresence>
  );
}

export default App;
