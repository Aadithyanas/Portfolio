import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { ThemeToggle } from './ThemeToggle';
import { BackgroundAnimation } from './BackgroundAnimation';
import NEXAA from './NEXAA';
import NEXAAButton from './NEXAAButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AllProjects = ({ isDark, onBack, toggleTheme, themeMode }) => {
  const { projects, loading, error } = useProjects();
  const [showNEXAA, setShowNEXAA] = React.useState(false);
  const sectionRef = useRef(null);
  const projectsRef = useRef([]);

  const handleToggleNEXAA = () => {
    setShowNEXAA(!showNEXAA);
  };

  // GSAP animations
  useEffect(() => {
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate projects from top to bottom
      gsap.fromTo(projectsRef.current, 
        {
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image hover effects are now handled by Tailwind CSS classes
    }, sectionRef);

    return () => ctx.revert();
  }, [projects.length]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      }`}>
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>Loading all projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      }`}>
        <div className="text-center px-4">
          <p className="text-sm sm:text-base md:text-lg text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <BackgroundAnimation isDark={isDark} />
      {/* Header */}
      <div className={`sticky top-0 z-50 backdrop-blur-sm border-b ${
        isDark 
          ? 'bg-black/20 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <motion.button
              onClick={onBack}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </motion.button>
            
            <h1 className={`text-lg sm:text-xl md:text-2xl font-bold text-center flex-1 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              All Projects ({projects.length})
            </h1>

            <div className="flex-shrink-0">
              <ThemeToggle 
                isDark={isDark} 
                toggleTheme={toggleTheme} 
                themeMode={themeMode} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div ref={sectionRef} className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id || project.title}
              ref={(el) => (projectsRef.current[index] = el)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600' 
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden">
                <motion.img
                  src={getImageUrl(project.imageUrl || project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGY0NmV1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2plY3QgSW1hZ2U8L3RleHQ+PC9zdmc+';
                      }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-1.5 sm:p-2 md:p-2.5 bg-white rounded-full"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-900" />
                  </motion.a>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-1.5 sm:p-2 md:p-2.5 bg-white rounded-full"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-900" />
                  </motion.a>
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                  <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold flex-1 min-w-0 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    <span className="truncate block">{project.title}</span>
                  </h3>
                  {project.id && (
                    <span className={`px-2 py-0.5 sm:py-1 text-xs rounded-full flex-shrink-0 ${
                      isDark 
                        ? 'bg-green-900/20 text-green-400 border border-green-500' 
                        : 'bg-green-100 text-green-700 border border-green-200'
                    }`}>
                      Dynamic
                    </span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden mb-3 sm:mb-4 min-h-0">
                  <div className="h-16 sm:h-20 md:h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                    <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="overflow-hidden mt-auto">
                  <div className="relative">
                    <div className="flex gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={tech}
                          className={`px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 text-xs sm:text-sm rounded-full whitespace-nowrap flex-shrink-0 ${
                            isDark 
                              ? 'bg-blue-900 text-blue-100' 
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
    </motion.div>
  );
};

// Helper function to convert GitHub blob URLs to raw URLs
const getImageUrl = (url) => {
  if (!url) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGY0NmV1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2plY3QgSW1hZ2U8L3RleHQ+PC9zdmc+';
  
  // Convert GitHub blob URL to raw URL
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url.replace('/blob/', '/raw/');
  }
  
  return url;
};

export default AllProjects;
