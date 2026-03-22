import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import AddProjectSimple from './components/AddProjectSimple';
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

  const handleProjectAdded = () => {
    setShowAddProject(false);
    setRefreshTrigger(prev => prev + 1);
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
        }}
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
          <AddProjectSimple
            isDark={isDark}
            onClose={() => setShowAddProject(false)}
            onProjectAdded={handleProjectAdded}
          />
        )}
        <Footer />
      </div>
    </AnimatePresence>
  );
}

export default App;
