import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCode,
  FaCertificate,
} from "react-icons/fa";

/* ─────────────────── DATA ─────────────────── */
const education = [
  {
    degree: "Full Stack Development",
    institution: "Masai School",
    location: "Bangalore, India",
    period: "2023 – Ongoing",
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
    role: "Full Stack Developer (Trainee)",
    company: "Masai School",
    location: "Remote / Bangalore",
    period: "2023 – Ongoing",
    description:
      "Developed and shipped 4+ production-grade web applications. Led team sprints, performed code reviews, integrated REST APIs, and deployed projects to cloud platforms.",
    tags: ["React", "Next.js", "Rust", "PostgreSQL", "Vercel"],
    icon: <FaBriefcase />,
    color: "#34d399",
  },
];

const certifications = [
  { label: "Full Stack Web Development", issuer: "Masai School" },
  { label: "React Developer Certification", issuer: "Udemy" },
];

/* ─────────────────── CARD ─────────────────── */
const Card = ({ item, isDark, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.12 }}
    style={{
      backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
      borderRadius: "20px",
      padding: "28px 32px",
      position: "relative",
      overflow: "hidden",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    }}
    whileHover={{
      boxShadow: `0 0 32px ${item.color}22`,
      borderColor: `${item.color}55`,
    }}
  >
    {/* accent glow */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "4px",
        height: "100%",
        background: `linear-gradient(180deg, ${item.color}, transparent)`,
        borderRadius: "0 0 0 20px",
      }}
    />

    {/* header */}
    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "14px" }}>
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          backgroundColor: `${item.color}18`,
          border: `1px solid ${item.color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: item.color,
          fontSize: "1.1rem",
          flexShrink: 0,
        }}
      >
        {item.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            color: isDark ? "#ffffff" : "#111827",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            fontWeight: "800",
            marginBottom: "4px",
            fontFamily: "'Segoe UI', sans-serif",
          }}
        >
          {item.degree || item.role}
        </h3>
        <p
          style={{
            color: item.color,
            fontWeight: "600",
            fontSize: "0.9rem",
            marginBottom: "4px",
          }}
        >
          {item.institution || item.company}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              color: isDark ? "#6b7280" : "#9ca3af",
              fontSize: "0.8rem",
            }}
          >
            <FaCalendarAlt size={11} />
            {item.period}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              color: isDark ? "#6b7280" : "#9ca3af",
              fontSize: "0.8rem",
            }}
          >
            <FaMapMarkerAlt size={11} />
            {item.location}
          </span>
        </div>
      </div>
    </div>

    {/* description */}
    <p
      style={{
        color: isDark ? "#9ca3af" : "#6b7280",
        fontSize: "0.9rem",
        lineHeight: "1.7",
        marginBottom: "16px",
      }}
    >
      {item.description}
    </p>

    {/* tags */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {item.tags.map((tag) => (
        <span
          key={tag}
          style={{
            backgroundColor: `${item.color}14`,
            color: item.color,
            border: `1px solid ${item.color}30`,
            borderRadius: "999px",
            padding: "3px 12px",
            fontSize: "0.78rem",
            fontWeight: "600",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

/* ─────────────────── MAIN COMPONENT ─────────────────── */
export const EducationExperience = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState("education");

  const tabs = [
    { id: "education",   label: "Education",    icon: <FaGraduationCap />, count: education.length },
    { id: "experience",  label: "Experience",   icon: <FaBriefcase />,     count: experience.length },
    { id: "certs",       label: "Certifications", icon: <FaCertificate />, count: certifications.length },
  ];

  return (
    <section
      id="education"
      style={{
        backgroundColor: isDark ? "#0a0a0a" : "#f8fafc",
        padding: "96px 0",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* faint bg accent */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p
            style={{
              color: "#60a5fa",
              fontSize: "0.82rem",
              fontWeight: "700",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "10px",
              fontFamily: "'Courier New', monospace",
            }}
          >
            Background
          </p>
          <h2
            style={{
              color: isDark ? "#ffffff" : "#111827",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "900",
              fontFamily: "'Arial Black', sans-serif",
              marginBottom: "12px",
            }}
          >
            Education &amp; Experience
          </h2>
          <p
            style={{
              color: isDark ? "#6b7280" : "#9ca3af",
              fontSize: "1rem",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            My academic journey and hands-on development experience.
          </p>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          style={{
            display: "flex",
            gap: "8px",
            backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
            borderRadius: "16px",
            padding: "6px",
            marginBottom: "36px",
          }}
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "0.88rem",
                  fontFamily: "'Segoe UI', sans-serif",
                  transition: "all 0.22s ease",
                  backgroundColor: active
                    ? isDark ? "rgba(96,165,250,0.18)" : "rgba(96,165,250,0.12)"
                    : "transparent",
                  color: active
                    ? "#60a5fa"
                    : isDark ? "#6b7280" : "#9ca3af",
                  boxShadow: active ? "0 0 16px rgba(96,165,250,0.2)" : "none",
                }}
              >
                <span style={{ fontSize: "0.9rem" }}>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  style={{
                    backgroundColor: active ? "#60a5fa22" : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                    color: active ? "#60a5fa" : isDark ? "#6b7280" : "#9ca3af",
                    borderRadius: "999px",
                    padding: "1px 8px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {activeTab === "education" &&
            education.map((item, i) => (
              <Card key={item.degree} item={item} isDark={isDark} index={i} />
            ))}

          {activeTab === "experience" &&
            experience.map((item, i) => (
              <Card key={item.role} item={item} isDark={isDark} index={i} />
            ))}

          {activeTab === "certs" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "20px 24px",
                    backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                    borderRadius: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(52,211,153,0.12)",
                      border: "1px solid rgba(52,211,153,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#34d399",
                      flexShrink: 0,
                    }}
                  >
                    <FaCertificate />
                  </div>
                  <div>
                    <p style={{ color: isDark ? "#fff" : "#111827", fontWeight: "700", fontSize: "0.95rem" }}>
                      {cert.label}
                    </p>
                    <p style={{ color: "#6b7280", fontSize: "0.82rem", marginTop: "2px" }}>
                      {cert.issuer}
                    </p>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <span
                      style={{
                        backgroundColor: "rgba(52,211,153,0.12)",
                        color: "#34d399",
                        border: "1px solid rgba(52,211,153,0.25)",
                        borderRadius: "999px",
                        padding: "3px 12px",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                      }}
                    >
                      Verified
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
