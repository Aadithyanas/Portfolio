import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaBrain, FaCode, FaBolt, FaEye, FaCog } from 'react-icons/fa';

export const AIBrainAnimation = ({ isDark }) => {
  const [isExploded, setIsExploded] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [particles, setParticles] = useState([]);

  const handleBrainClick = () => {
    if (!isExploded) {
      setShowWarning(true);
      setTimeout(() => {
        setIsExploded(true);
        createExplosion();
        setShowWarning(false);
      }, 2000);
    }
  };

  const createExplosion = () => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      size: Math.random() * 8 + 4,
      color: isDark ? '#60a5fa' : '#3b82f6',
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
    
    setTimeout(() => {
      setParticles([]);
      setIsExploded(false);
    }, 3000);
  };

  return (
    <div className="ai-brain-container">
      {/* Laptop/Tablet Frame */}
      <motion.div
        className="laptop-frame"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Screen */}
        <div className="laptop-screen">
          {/* Hacking Screen Content */}
          <div className="hacking-screen">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <div className="btn red"></div>
                <div className="btn yellow"></div>
                <div className="btn green"></div>
              </div>
              <span className="terminal-title">AI_BRAIN.exe</span>
            </div>
            
            <div className="terminal-content">
              <div className="terminal-line">
                <span className="prompt">$</span>
                <span className="command">neural_network --activate</span>
              </div>
              <div className="terminal-line">
                <span className="output">Loading AI consciousness...</span>
              </div>
              <div className="terminal-line">
                <span className="output">Neural pathways: 99.9%</span>
              </div>
              <div className="terminal-line">
                <span className="output">Memory banks: ONLINE</span>
              </div>
              <div className="terminal-line">
                <span className="output">Ready for interaction</span>
              </div>
              <div className="terminal-line">
                <span className="prompt">$</span>
                <span className="cursor">_</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Brain */}
      <motion.div
        className="ai-brain"
        onClick={handleBrainClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {/* Brain Core */}
        <div className="brain-core">
          <FaBrain className="brain-icon" />
        </div>

        {/* Neural Network Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="neural-line"
            style={{
              transform: `rotate(${i * 45}deg)`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Floating Data Points */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="data-point"
            style={{
              left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 80}%`,
              top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 80}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Click Hint */}
        <motion.div
          className="click-hint"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Click Me!
        </motion.div>
      </motion.div>

      {/* Mini Robot */}
      <motion.div
        className="mini-robot"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <FaRobot className="robot-icon" />
        
        {/* Robot Eyes */}
        <motion.div
          className="robot-eyes"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <FaEye />
          <FaEye />
        </motion.div>

        {/* Robot Antenna */}
        <motion.div
          className="robot-antenna"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <FaBolt />
        </motion.div>
      </motion.div>

      {/* Warning Modal */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            className="warning-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="warning-content">
              <FaBolt className="warning-icon" />
              <h3>⚠️ WARNING ⚠️</h3>
              <p>AI Brain Activation in Progress...</p>
              <p>Prepare for Neural Explosion!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explosion Effect */}
      <AnimatePresence>
        {isExploded && (
          <motion.div
            className="explosion-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="explosion-particle"
                style={{
                  left: `50%`,
                  top: `50%`,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                }}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: particle.delay,
                }}
              />
            ))}
            
            {/* AI Text Explosion */}
            <motion.div
              className="ai-explosion-text"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AI EXPLOSION!
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Code Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-code"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <FaCode size={16 + i * 2} />
        </motion.div>
      ))}
    </div>
  );
};
