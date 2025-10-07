import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Helper function to convert GitHub blob URLs to raw URLs
const getImageUrl = (url) => {
  if (!url) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGY0NmU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2plY3QgSW1hZ2U8L3RleHQ+PC9zdmc+';
  
  // Convert GitHub blob URL to raw URL
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url.replace('/blob/', '/raw/');
  }
  
  return url;
};

export const Projects = ({ isDark, refreshTrigger = 0, onShowAllProjects }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { projects, loading, error } = useProjects(refreshTrigger);
  const sectionRef = useRef(null);
  const projectsRef = useRef([]);
  console.log("Projects", projects[0]?.techStack);
  
  // Show only the latest 4 projects
  const latestProjects = projects.slice(0, 4);

  if (loading) {
    return (
      <section className={`py-8 sm:py-12 md:py-16 lg:py-20 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-8 sm:py-12 md:py-16 lg:py-20 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="text-center">
            <p className={`text-sm sm:text-base md:text-lg text-red-500`}>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="projects" className={`py-8 sm:py-12 md:py-16 lg:py-20 pt-12 sm:pt-16 md:pt-20 lg:pt-24 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <motion.h2
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 bg-clip-text text-transparent ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Featured Projects
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {latestProjects.map((project, index) => (
            <motion.div
              key={project.title}
              ref={(el) => (projectsRef.current[index] = el)}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 }}
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
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGY0NmU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2plY3QgSW1hZ2U8L3RleHQ+PC9zdmc+';
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
              <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col min-h-[200px]">
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
                <div className="flex-1 mb-4">
                  <div className="h-20 sm:h-24 md:h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                    <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>
                </div>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="mt-auto">
                    <div className="mb-2">
                      <h4 className={`text-sm font-bold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        🛠️ Tech Stack
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-medium ${
                            isDark 
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border border-blue-500' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border border-blue-400'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {projects.length > 4 && (
          <motion.div
            className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={onShowAllProjects}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects ({projects.length})
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};