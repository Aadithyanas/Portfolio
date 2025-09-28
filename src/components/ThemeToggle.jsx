import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle = ({ isDark, toggleTheme, themeMode }) => {
  const getIcon = () => {
    if (themeMode === 'system') {
      return <Monitor className="w-5 h-5" />;
    } else if (isDark) {
      return <Sun className="w-5 h-5" />;
    } else {
      return <Moon className="w-5 h-5" />;
    }
  };

  const getTooltip = () => {
    if (themeMode === 'system') return 'System Theme';
    if (isDark) return 'Switch to Light';
    return 'Switch to Dark';
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={getTooltip()}
    >
      <motion.div
        className={`${
          isDark 
            ? 'text-yellow-400' 
            : themeMode === 'system'
            ? 'text-blue-500'
            : 'text-gray-700 dark:text-gray-300'
        }`}
        animate={{ rotate: themeMode === 'system' ? [0, 360] : 0 }}
        transition={{ duration: 2, repeat: themeMode === 'system' ? Infinity : 0 }}
      >
        {getIcon()}
      </motion.div>
      
      {/* Theme mode indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {themeMode === 'system' ? 'System' : isDark ? 'Dark' : 'Light'}
      </div>
    </motion.button>
  );
};
