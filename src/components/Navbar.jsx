import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { FaBars, FaTimes, FaPlus, FaLock } from 'react-icons/fa';

export const Navbar = ({ isDark, toggleTheme, themeMode, onAddProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLockIcon, setShowLockIcon] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(200, 200, 200, 0.9)']
  );

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
          Portfolio
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
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={item === 'About' ? '#about' : `#${item.toLowerCase()}`}
              className={`relative group ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            onClick={onAddProject}
            onMouseEnter={() => setShowLockIcon(true)}
            onMouseLeave={() => setShowLockIcon(false)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Add Project (Password Protected)"
          >
            {showLockIcon ? (
              <FaLock className="w-4 h-4" />
            ) : (
              <FaPlus className="w-4 h-4" />
            )}
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
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={item === 'About' ? '#about' : `#${item.toLowerCase()}`}
              className={`text-lg font-medium ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <motion.button
            onClick={() => {
              onAddProject();
              setIsOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Add Project (Password Protected)"
          >
            <FaPlus className="w-4 h-4" />
            Add Project
          </motion.button>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} themeMode={themeMode} />
        </motion.div>
      )}
    </motion.nav>
  );
};
