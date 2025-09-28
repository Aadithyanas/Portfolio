import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

const NEXAAButton = ({ isDark, onClick, isOpen }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
          : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
      } ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      whileHover={{ 
        scale: 1.15,
        rotate: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.85,
        rotate: -5,
        transition: { duration: 0.1 }
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: isOpen ? 0 : 1,
        rotate: isOpen ? -180 : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        duration: 0.6
      }}
    >
      <div className="relative">
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Bot className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 360, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-2 h-2 text-white" />
        </motion.div>
      </div>
      
      {/* Tooltip */}
      <motion.div
        className={`absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
          isDark 
            ? 'bg-gray-800 text-white' 
            : 'bg-white text-gray-900 shadow-lg'
        }`}
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        Chat with NEXAA - Aadithyan's AI Assistant
        <div className={`absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 ${
          isDark ? 'border-t-gray-800' : 'border-t-white'
        }`}></div>
      </motion.div>
    </motion.button>
  );
};

export default NEXAAButton;
