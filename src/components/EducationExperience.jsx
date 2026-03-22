import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCode,
  FaRobot,
  FaExternalLinkAlt,
} from "react-icons/fa";

/* ─────────────────── DATA ─────────────────── */
const education = [
  {
    degree: "Full Stack Development",
    institution: "Masai School",
    location: "Bangalore, India",
    period: "2023 – 2024",
    description:
      "Intensive full-stack bootcamp covering React, Node.js, TypeScript, PostgreSQL, Rust, and Next.js. Building real-world projects with industry best practices.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Next.js"],
    icon: <FaCode />,
    color: "#60a5fa",
  },
  {
    degree: "Diploma in Computer Hardware & Software",
    institution: "Dept. of Technical Education, Govt. of Kerala",
    location: "Kerala, India",
    period: "2021 – 2024",
    description:
      "Core diploma covering computer hardware architecture, software fundamentals, networking, and system administration.",
    tags: ["Hardware", "Networking", "Software", "Systems"],
    icon: <FaGraduationCap />,
    color: "#a78bfa",
  },
];

const experience = [
  {
    role: "Robotics Engineer",
    company: "Aju ED Solution",
    location: "Hybrid / Kerala",
    period: "Present",
    description:
      "Designed and built intelligent robotics systems leveraging Raspberry Pi and embedded technologies. Developed end-to-end solutions integrating sensors, real-time control, and software logic for automation and smart applications.",
    tags: ["Raspberry Pi", "Robotics", "Python", "IoT", "Automation"],
    icon: <FaRobot />,
    color: "#60a5fa",
  },
  {
    role: "Full Stack Developer",
    company: "KodingKorp",
    location: "Hybrid / Delhi",
    period: "5 Months",
    description:
      "Engineered a high-performance desktop application using Tauri and Rust. Developed a travel experience app with API integrations, real-time data handling, and efficient state management. Focused on lightweight builds and seamless cross-platform functionality.",
    tags: ["React", "Next.js", "Rust", "PostgreSQL", "Vercel"],
    icon: <FaBriefcase />,
    color: "#34d399",
  },
  {
    role: "Full Stack Developer",
    company: "Masai School",
    location: "Remote / Bangalore",
    period: "6 Months",
    description:
      "Developed and shipped 4+ production-grade web applications. Led team sprints, performed code reviews, integrated REST APIs, and deployed projects to cloud platforms.",
    tags: ["React", "Next.js", "Rust", "PostgreSQL", "Vercel"],
    icon: <FaBriefcase />,
    color: "#34d399",
  },
];

/* ─────────────────── STYLES ─────────────────── */
const glassStyles = {
  background: "rgba(17, 17, 17, 0.4)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "24px",
};

/* ─────────────────── CARD COMPONENT ─────────────────── */
const ExperienceCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    style={{
      ...glassStyles,
      padding: "32px",
      position: "relative",
      overflow: "hidden",
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      transition: "all 0.3s ease",
    }}
    whileHover={{
      borderColor: `${item.color}55`,
      boxShadow: `0 20px 40px -20px ${item.color}33`,
      transform: "translateY(-4px)",
    }}
  >
    {/* Decorative background glow */}
    <div
      style={{
        position: "absolute",
        top: "-10%",
        right: "-10%",
        width: "150px",
        height: "150px",
        background: `radial-gradient(circle, ${item.color}11 0%, transparent 70%)`,
        borderRadius: "50%",
        pointerEvents: "none",
      }}
    />

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: `linear-gradient(135deg, ${item.color}22, ${item.color}08)`,
            border: `1px solid ${item.color}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: item.color,
            fontSize: "1.5rem",
            flexShrink: 0,
          }}
        >
          {item.icon}
        </div>
        <div>
          <h3 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: "700", marginBottom: "4px", letterSpacing: "-0.01em" }}>
            {item.role || item.degree}
          </h3>
          <p style={{ color: item.color, fontWeight: "600", fontSize: "0.95rem" }}>
            {item.company || item.institution}
          </p>
        </div>
      </div>
      
      <div style={{ textAlign: "right", minWidth: "120px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: "500", justifyContent: "flex-end", marginBottom: "4px" }}>
          <FaCalendarAlt size={12} />
          {item.period}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: "500", justifyContent: "flex-end" }}>
          <FaMapMarkerAlt size={12} />
          {item.location}
        </div>
      </div>
    </div>

    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: "1.6", margin: "0" }}>
      {item.description}
    </p>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {item.tags.map((tag) => (
        <span
          key={tag}
          style={{
            padding: "6px 14px",
            borderRadius: "99px",
            fontSize: "0.75rem",
            fontWeight: "600",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.8)",
            transition: "all 0.2s ease",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

/* ─────────────────── MAIN COMPONENT ─────────────────── */
export const EducationExperience = () => {
  const [activeTab, setActiveTab] = useState("experience");

  const tabs = [
    { id: "experience", label: "Experience", icon: <FaBriefcase />, count: experience.length },
    { id: "education", label: "Education", icon: <FaGraduationCap />, count: education.length },
  ];

  return (
    <section
      id="experience"
      style={{
        backgroundColor: "#0a0a0a",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.03) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span
            style={{
              color: "#60a5fa",
              fontSize: "0.85rem",
              fontWeight: "700",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Journey
          </span>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "900",
              marginBottom: "20px",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Experience & Education
          </h2>
          <div style={{ width: "60px", height: "4px", background: "#60a5fa", margin: "0 auto", borderRadius: "2px" }} />
        </motion.div>

        {/* Custom Tab Switcher */}
        <div
          style={{
            ...glassStyles,
            padding: "8px",
            maxWidth: "400px",
            margin: "0 auto 48px",
            display: "flex",
            gap: "8px",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  borderRadius: "18px",
                  border: "none",
                  background: isActive ? "#60a5fa" : "transparent",
                  color: isActive ? "#000000" : "rgba(255,255,255,0.4)",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ minHeight: "400px" }}
        >
          {activeTab === "experience" ? (
            experience.map((item, i) => (
              <ExperienceCard key={`${item.role}-${i}`} item={item} index={i} />
            ))
          ) : (
            education.map((item, i) => (
              <ExperienceCard key={`${item.degree}-${i}`} item={item} index={i} />
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

