import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaJs, FaReact, FaCss3Alt, FaNodeJs, FaGitAlt } from "react-icons/fa";

export const skills = [
  {
    name: "JavaScript",
    icon: FaJs,
    proficiency: 90,
    color: "#fbbf24",
  },
  {
    name: "React",
    icon: FaReact,
    proficiency: 85,
    color: "#14b8a6",
  },
  {
    name: "CSS",
    icon: FaCss3Alt,
    proficiency: 80,
    color: "#3b82f6",
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    proficiency: 75,
    color: "#10b981",
  },
  {
    name: "Git",
    icon: FaGitAlt,
    proficiency: 70,
    color: "#a855f7",
  },
];

export const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div className="relative w-32 h-32">
                  {/* Circular Progress */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 36 36"
                  >
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
                      animate={
                        inView
                          ? { strokeDashoffset: 100 - skill.proficiency }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        delay: index * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  </svg>

                  {/* Conditional Icon Animation */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={
                      skill.name === "React"
                        ? { rotate: [0, 360] } // Rotate only React icon
                        : {}
                    }
                    transition={
                      skill.name === "React"
                        ? {
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }
                        : {}
                    }
                  >
                    {Icon && (
                      <Icon
                        className="w-12 h-12"
                        style={{
                          color: skill.color,
                        }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Skill Name & Proficiency */}
                <div className="mt-4">
                  <span className="font-medium text-lg">{skill.name}</span>
                  <motion.p
                    className="text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{
                      duration: 1,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                  >
                    {/* Displaying Proficiency Percentage */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.3,
                        ease: "easeOut",
                      }}
                    >
                      {skill.proficiency}%
                    </motion.span>
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
