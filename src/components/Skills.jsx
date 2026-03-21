import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaJs, FaReact, FaCss3Alt, FaNodeJs, FaGitAlt,
  FaHtml5, FaPython, FaJava, FaAndroid, FaDatabase, FaDocker,
  FaAws, FaCode
} from "react-icons/fa";
import {
  SiMongodb, SiFirebase, SiRust,
  SiNextdotjs, SiTypescript, SiPostgresql,
  SiMysql, SiRedis, SiElasticsearch, SiSqlite,
  SiDjango, SiFastapi, SiExpress, SiNestjs,
  SiTailwindcss, SiBun, SiNginx, SiArduino, SiTauri
} from "react-icons/si";

/* ─── Data ───────────────────────────────────────────────────────────── */
const stack = [
  {
    group: "Languages",
    items: [
      { name: "JavaScript", icon: FaJs,         color: "#fbbf24" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "Python",     icon: FaPython,     color: "#3776ab" },
      { name: "Rust",       icon: SiRust,       color: "#ce422b" },
      { name: "Java",       icon: FaJava,       color: "#b07219" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React",        icon: FaReact,       color: "#14b8a6" },
      { name: "Next.js",      icon: SiNextdotjs,   color: "#ffffff" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
      { name: "HTML5",        icon: FaHtml5,       color: "#ea580c" },
      { name: "CSS3",         icon: FaCss3Alt,     color: "#3b82f6" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js",     icon: FaNodeJs,  color: "#22c55e" },
      { name: "Bun",         icon: SiBun,     color: "#fbc02d" },
      { name: "Express",     icon: SiExpress, color: "#9ca3af" },
      { name: "NestJS",      icon: SiNestjs,  color: "#e0234e" },
      { name: "Django",      icon: SiDjango,  color: "#092e20" },
      { name: "FastAPI",     icon: SiFastapi, color: "#009688" },
    ],
  },
  {
    group: "Databases",
    items: [
      { name: "PostgreSQL",    icon: SiPostgresql,    color: "#336791" },
      { name: "MySQL",         icon: SiMysql,         color: "#4479a1" },
      { name: "MongoDB",       icon: SiMongodb,       color: "#47a248" },
      { name: "SQLite",        icon: SiSqlite,        color: "#003b57" },
      { name: "Redis",         icon: SiRedis,         color: "#dc382d" },
      { name: "Elasticsearch", icon: SiElasticsearch, color: "#005571" },
    ],
  },
  {
    group: "Cloud & Ops",
    items: [
      { name: "AWS",    icon: FaAws,      color: "#ff9900" },
      { name: "Docker", icon: FaDocker,   color: "#2496ed" },
      { name: "Git",    icon: FaGitAlt,   color: "#f05032" },
      { name: "Nginx",  icon: SiNginx,    color: "#009639" },
      { name: "Firebase", icon: SiFirebase, color: "#ffca28" },
    ],
  },
  {
    group: "Other",
    items: [
      { name: "Tauri",   icon: SiTauri,   color: "#ffc131" },
      { name: "Android", icon: FaAndroid, color: "#3ddc84" },
      { name: "Arduino", icon: SiArduino, color: "#00979c" },
      { name: "Plasmo",  icon: FaCode,    color: "#8b5cf6" },
    ],
  },
];

/* ─── IconButton ─────────────────────────────────────────────────────── */
const IconButton = ({ name, icon: Icon, color }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      style={{ position: "relative", display: "flex", justifyContent: "center" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          backgroundColor: hovered ? `${color}15` : "rgba(255,255,255,0.03)",
          border: `1.5px solid ${hovered ? `${color}44` : "rgba(255,255,255,0.06)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
          boxShadow: hovered ? `0 8px 24px ${color}33` : "none",
        }}
      >
        <Icon 
          style={{ 
            fontSize: "24px", 
            color: hovered ? color : "rgba(255,255,255,0.55)",
            transition: "color 0.3s",
          }} 
        />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: "-36px",
              backgroundColor: "rgba(10,10,10,0.9)",
              border: `1px solid ${color}44`,
              color: "#fff",
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: 600,
              fontFamily: "'Outfit', sans-serif",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── GroupSection ───────────────────────────────────────────────────── */
const GroupSection = ({ group, items }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.015)",
      border: "1px solid rgba(255,255,255,0.04)",
      borderRadius: "24px",
      padding: "28px 20px",
    }}
  >
    <p style={{
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      fontSize: "0.9rem",
      color: "rgba(255,255,255,0.85)",
      margin: 0,
      letterSpacing: "0.01em",
    }}>
      {group}
    </p>
    <div style={{ 
      display: "flex", 
      flexWrap: "wrap", 
      gap: "16px",
      justifyContent: "center",
      maxWidth: "320px",
    }}>
      {items.map(s => <IconButton key={s.name} {...s} />)}
    </div>
  </motion.div>
);

/* ─── Section ────────────────────────────────────────────────────────── */
export const Skills = () => {
  // inject fonts once
  if (typeof document !== "undefined" && !document.getElementById("ts-fonts")) {
    const el = document.createElement("link");
    el.id = "ts-fonts";
    el.rel = "stylesheet";
    el.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap";
    document.head.appendChild(el);
  }

  return (
    <section 
      id="skills"
      style={{
        backgroundColor: "#050505",
        padding: "100px 0 120px",
        fontFamily: "'Outfit', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle Background Glows */}
      <div style={{
        position: "absolute", top: "10%", left: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(96,165,250,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167,139,250,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#60a5fa",
            marginBottom: "12px",
          }}>
            What I work with
          </p>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900,
            fontFamily: "'Arial Black', sans-serif",
            color: "#ffffff",
            margin: 0,
          }}>
            Tech Stack
          </h2>
        </motion.div>

        {/* Grid: Responsive Columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}>
          {stack.map(g => <GroupSection key={g.group} {...g} />)}
        </div>

        {/* Footer note */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: "80px",
            fontFamily: "'Outfit', sans-serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.25)",
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          Not an exhaustive list. I adapt to whatever the project requires.
        </motion.p>

      </div>
    </section>
  );
};

export default Skills;