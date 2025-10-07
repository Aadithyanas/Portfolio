import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';
const myResume = "/assets/Aadithyan_AS_Resume.pdf"
export const Navbar = ({ isDark, toggleTheme, themeMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(200, 200, 200, 0.9)']
  );

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsOpen(false); // Close mobile menu after navigation
  };

  // Resume download function
  const downloadResume = () => {
    // Trigger the file download
    const link = document.createElement('a');
    link.href = myResume; // Path to your resume file
    link.download = "Aadithyan_AS_Resume";
    link.click();

    // Open the file in a new window
    window.open(myResume, '_blank');
  };
  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <motion.a
          href="#"
          className="text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          Aadithyan AS
        </motion.a>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => {
            const sectionId = item === 'About' ? 'about' : item.toLowerCase();
            return (
              <motion.button
                key={item}
                onClick={() => scrollToSection(sectionId)}
                className={`relative group ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.button>
            );
          })}
          <motion.button
            onClick={downloadResume}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              isDark
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Download Resume"
          >
            <FaDownload className="w-4 h-4" />
            Resume
          </motion.button>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} themeMode={themeMode} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden flex flex-col items-center space-y-4 mt-4"
        >
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => {
            const sectionId = item === 'About' ? 'about' : item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => scrollToSection(sectionId)}
                className={`text-lg font-medium ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item}
              </button>
            );
          })}
          <motion.button
            onClick={() => {
              downloadResume();
              setIsOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isDark
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Download Resume"
          >
            <FaDownload className="w-4 h-4" />
            Resume
          </motion.button>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} themeMode={themeMode} />
        </motion.div>
      )}
    </motion.nav>
  );
};
