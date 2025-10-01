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
  if (!url) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGY0NmV1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2plY3QgSW1hZ2U8L3RleHQ+PC9zdmc+';
  
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
  
  // Show only the latest 4 projects
  const latestProjects = projects.slice(0, 4);

  // GSAP animations
  useEffect(() => {
    if (latestProjects.length === 0) return;

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
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate project images on hover
      projectsRef.current.forEach((projectEl, index) => {
        if (projectEl) {
          const imageEl = projectEl.querySelector('.project-image');
          
          if (imageEl) {
            projectEl.addEventListener('mouseenter', () => {
              gsap.to(imageEl, { scale: 1.1, duration: 0.3, ease: "power2.out" });
            });
            
            projectEl.addEventListener('mouseleave', () => {
              gsap.to(imageEl, { scale: 1, duration: 0.3, ease: "power2.out" });
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [latestProjects.length]);

  if (loading) {
    return (
      <section id="projects" className={`py-20 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className={`mt-4 text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className={`py-20 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className={`text-lg text-red-500`}>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="projects" className={`py-20 pt-24 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className={`text-4xl font-bold text-center mb-12 bg-clip-text text-transparent ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Featured Projects
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
          {latestProjects.map((project, index) => (
            <motion.div
              key={project.title}
              ref={(el) => (projectsRef.current[index] = el)}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600' 
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={getImageUrl(project.imageUrl || project.image)}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to base64 placeholder if image fails to load
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGY0NmV1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2plY3QgSW1hZ2U8L3RleHQ+PC9zdmc+';
                      }}
                />
                <div className="project-overlay absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-white rounded-full"
                  >
                    <Github className="w-6 h-6 text-gray-900" />
                  </motion.a>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-white rounded-full"
                  >
                    <ExternalLink className="w-6 h-6 text-gray-900" />
                  </motion.a>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col min-h-80">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg sm:text-xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{project.title}</h3>
                  {project.id && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isDark 
                        ? 'bg-green-900/20 text-green-400 border border-green-500' 
                        : 'bg-green-100 text-green-700 border border-green-200'
                    }`}>
                      Dynamic
                    </span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className={`h-24 sm:h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${
                    isDark ? 'scrollbar-thumb-gray-600 scrollbar-track-gray-800' : ''
                  }`}>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden">
                  <div className="tech-stack-container relative">
                    <div className="tech-stack-scroll flex gap-2 animate-scroll">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={tech}
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full whitespace-nowrap flex-shrink-0 ${
                            isDark 
                              ? 'bg-blue-900 text-blue-100' 
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {/* Duplicate for seamless loop */}
                      {project.techStack.map((tech, index) => (
                        <span
                          key={`${tech}-duplicate`}
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full whitespace-nowrap flex-shrink-0 ${
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
        </div>

        {/* Show More Button */}
        {projects.length > 4 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={onShowAllProjects}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects ({projects.length})
            </motion.button>
            <p className={`mt-2 text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Showing 4 of {projects.length} projects
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
