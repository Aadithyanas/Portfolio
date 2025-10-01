import React from "react";
import { TypeAnimation } from "react-type-animation";
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaCode, FaRocket, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { AIBrainAnimation } from './AIBrainAnimation';
import heroImage from '../imges/resumepic.jpg';
import myResume from "../imges/Aadithyan.pdf"
import './hero.css';
import './ai-brain.css';

export const Hero = ({ isDark }) => {

  const handleDownloadCV = () => {
    // Trigger the file download
    const link = document.createElement('a');
    link.href = myResume; // Path to your resume file
    link.download = "Aadithyan-AS-Resume";
    link.click();

    // Open the file in a new window
    window.open(myResume, '_blank');
  };

  return (
    <section id="about" style={{ backgroundColor: "transparent" }} className="relative overflow-hidden pt-20">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            } opacity-20`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaCode size={24 + i * 4} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        {/* Top Section: Profile Image and Name */}
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 mb-12 lg:mb-16">
          {/* Profile Image */}
          <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden bg-blue-500/10 shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 flex-shrink-0 ring-4 ring-blue-500/20">
            <img 
              src={heroImage} 
              alt="Aadithyan A S - Full Stack Developer" 
              className="profile-image-perfect hover:scale-110 transition-transform duration-300" 
            />
            
            {/* Floating Stats Cards */}
            <motion.div
              className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 lg:p-4 rounded-lg shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <FaRocket className="text-sm lg:text-base" />
                <span className="text-sm lg:text-base font-bold">2+ Years</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 lg:p-4 rounded-lg shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <FaStar className="text-sm lg:text-base" />
                <span className="text-sm lg:text-base font-bold">19 Skills</span>
          </div>
            </motion.div>
        </div>

          {/* Name and Title */}
          <div className="text-center lg:text-left">
            <motion.h1 
              className={`text-3xl lg:text-4xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hello, I'm
            </motion.h1>
            <motion.h2 
              className={`text-4xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Aadithyan A S
            </motion.h2>
            <motion.div 
              className={`text-xl lg:text-2xl font-semibold ${
                isDark ? 'text-blue-300' : 'text-blue-600'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
            <TypeAnimation
              sequence={[
                  "Full Stack Developer",
                2000,
                "React Enthusiast",
                2000,
                
                  "Rust Developer",
                  2000,
                  "Next.js Expert",
                  2000,
              ]}
              repeat={Infinity}
            />
            </motion.div>
          </div>
          </div>

        {/* Main Content: Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Section: Description and Stats */}
          <div className="space-y-8">
            {/* Description */}
            <motion.p
              className={`text-lg lg:text-xl leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              As a passionate Full Stack Developer, I specialize in building dynamic, user-friendly web applications. With expertise in both frontend and backend technologies, I craft seamless digital experiences using tools like React, Node.js, TypeScript, and modern databases. I'm dedicated to delivering high-quality, efficient solutions and continuously improving my skills to stay ahead in the fast-evolving tech landscape.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <span className={`block text-2xl lg:text-3xl font-bold ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>19+</span>
                <span className={`text-sm lg:text-base ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>Technologies</span>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <span className={`block text-2xl lg:text-3xl font-bold ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>4+</span>
                <span className={`text-sm lg:text-base ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>Projects</span>
            </div>
             
            </motion.div>

            {/* Featured Technologies */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h4 className={`text-xl lg:text-2xl font-bold mb-4 ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}>Featured Technologies</h4>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {['React', 'TypeScript', 'Next.js', 'Rust', 'PostgreSQL', 'Node.js'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className={`px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base font-medium transition-all duration-300 ${
                      isDark 
                        ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
          </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex flex-col gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h4 className={`text-xl lg:text-2xl font-bold ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}>Connect With Me</h4>
              <div className="flex gap-4 lg:gap-6">
                <a href="https://github.com/Aadithyanas" target="_blank" rel="noopener noreferrer" className={`p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'
                }`}>
                  <FaGithub className="text-xl lg:text-2xl" />
                </a>
                <a href="https://www.linkedin.com/in/aadithyanas" target="_blank" rel="noopener noreferrer" className={`p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'
                }`}>
                  <FaLinkedin className="text-xl lg:text-2xl" />
                </a>
                <a href="mailto:adithyanas2694@gmail.com" target="_blank" rel="noopener noreferrer" className={`p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'
                }`}>
                  <FaEnvelope className="text-xl lg:text-2xl" />
            </a>
          </div>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <button 
                className={`w-full px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold text-lg lg:text-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}
                onClick={handleDownloadCV}
              >
                <FaDownload className="text-lg lg:text-xl"/>
                <span>Download Resume</span>
              </button>
            </motion.div>
          </div>

          {/* Right Section: AI Animation and Education */}
          <div className="space-y-8">
            {/* AI Animation */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md lg:max-w-lg h-80 lg:h-96 flex items-center justify-center">
                <AIBrainAnimation isDark={isDark} />
              </div>
            </div>

            {/* Education Section - Below AI Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className={`text-2xl lg:text-3xl font-bold mb-6 ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}>
                Education
              </h3>
              
              <div className="space-y-6">
                <div className={`p-4 lg:p-6 rounded-lg ${
                  isDark 
                    ? 'bg-gray-800/50 border border-gray-700' 
                    : 'bg-gray-100 border border-gray-200'
                }`}>
                  <p className={`font-bold text-lg lg:text-xl mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Full Stack Developer</p>
                  <p className={`text-sm lg:text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Major: Full Stack Development</p>
                  <p className={`text-sm lg:text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Institute: Masai School</p>
                  <p className={`text-sm lg:text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Year of Graduation: Ongoing...</p>
                </div>
                <div className={`p-4 lg:p-6 rounded-lg ${
                  isDark 
                    ? 'bg-gray-800/50 border border-gray-700' 
                    : 'bg-gray-100 border border-gray-200'
                }`}>
                  <p className={`font-bold text-lg lg:text-xl mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Diploma in Computer Hardware</p>
                  <p className={`text-sm lg:text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Major: Computer Hardware/Software</p>
                  <p className={`text-sm lg:text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>University: Department of Technical Education, Government of Kerala</p>
                  <p className={`text-sm lg:text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Year of Graduation: 2024</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
