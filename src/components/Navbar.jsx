import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)']
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
              href={`#${item.toLowerCase()}`}
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              {item}
              <motion.span
                
              />
            </motion.a>
          ))}
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
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
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </motion.div>
      )}
    </motion.nav>
  );
};
