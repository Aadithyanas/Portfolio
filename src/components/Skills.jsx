import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaJs,
  FaReact,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaHtml5,
  FaPython,
  FaJava,
  FaAndroid,
  FaDatabase,
} from "react-icons/fa";
import { SiArduino, SiMongodb, SiFirebase } from "react-icons/si";

export const skills = [
  { name: "JavaScript", icon: FaJs, proficiency: 90, color: "#fbbf24" },
  { name: "React", icon: FaReact, proficiency: 85, color: "#14b8a6" },
  { name: "CSS", icon: FaCss3Alt, proficiency: 80, color: "#3b82f6" },
  { name: "HTML", icon: FaHtml5, proficiency: 95, color: "#ff5722" },
  { name: "Node.js", icon: FaNodeJs, proficiency: 75, color: "#10b981" },
  { name: "Python", icon: FaPython, proficiency: 70, color: "#3776ab" },
  { name: "Java", icon: FaJava, proficiency: 65, color: "#b07219" },
  { name: "Git", icon: FaGitAlt, proficiency: 70, color: "#a855f7" },
  { name: "Android ", icon: FaAndroid, proficiency: 60, color: "#3ddc84" },
  { name: "Firebase", icon: SiFirebase, proficiency: 75, color: "#ffca28" },
  { name: "MongoDB", icon: SiMongodb, proficiency: 65, color: "#47a248" },
  { name: "SQL", icon: FaDatabase, proficiency: 85, color: "#00758f" },
  { name: "Arduino", icon: SiArduino, proficiency: 60, color: "#00979c" },
];

export const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Skills & Technologies
        </motion.h2>

        {/* Responsive Grid Layout */}
        <div
          ref={ref}
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center text-center p-4 rounded-lg shadow-md bg-white dark:bg-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                {/* Circular Progress Bar */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      stroke="#e5e7eb"
                      strokeWidth="4"
                      fill="none"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="16"
                      stroke={skill.color}
                      strokeWidth="4"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ strokeDashoffset: 100 }}
                      animate={inView ? { strokeDashoffset: 100 - skill.proficiency } : {}}
                      transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                    />
                  </svg>

                  {/* Skill Icon */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={skill.name === "React" ? { rotate: [0, 360] } : {}}
                    transition={skill.name === "React" ? { duration: 4, repeat: Infinity } : {}}
                  >
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: skill.color }} />
                  </motion.div>
                </div>

                {/* Skill Name & Proficiency */}
                <div className="mt-4">
                  <span className="font-medium text-lg">{skill.name}</span>
                  <motion.p
                    className="text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  >
                    {skill.proficiency}%
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
