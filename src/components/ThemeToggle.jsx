import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <motion.button
      
      onClick={toggleTheme}
      
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-slate-80" />
      )}
    </motion.button>
  );
};
