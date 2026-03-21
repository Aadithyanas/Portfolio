import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaRocket,
  FaStar,
  FaCode,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const myResume = "/assets/Aadithyan_AS_Resume.pdf";

/* ── responsive hook ── */
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

export const Hero = ({ isDark }) => {
  const width = useWindowWidth();
  const isMobile  = width < 640;
  const isTablet  = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = myResume;
    link.download = "Aadithyan_AS_Resume";
    link.click();
    window.open(myResume, "_blank");
  };

  /* ── layout values by breakpoint ── */
  const layout = isMobile
    ? { grid: "1fr", robotH: "55vw", textPad: "0 20px 32px", nameSz: "2.8rem" }
    : isTablet
    ? { grid: "1fr", robotH: "60vw", textPad: "0 32px 48px", nameSz: "3.8rem" }
    : { grid: "1fr 1fr", robotH: "100vh", textPad: "0 0 0 48px", nameSz: "clamp(3.5rem,5vw,6rem)" };

  return (
    <section
      id="about"
      style={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        display: "flex",
        alignItems: isDesktop ? "center" : "flex-start",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── grid ── */}
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isDesktop ? "0 48px" : "0",
          display: "grid",
          gridTemplateColumns: layout.grid,
          alignItems: "center",
          minHeight: isDesktop ? "100vh" : "auto",
        }}
      >
        {/* ══ ROBOT ══ */}
        <motion.div
          initial={{ opacity: 0, x: isDesktop ? -50 : 0, y: isDesktop ? 0 : -20, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 0.85 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            width: "100%",
            height: layout.robotH,
            position: "relative",
            backgroundColor: "#000000",
            mixBlendMode: "lighten",
            clipPath: "inset(0 0 52px 0)",
            transformOrigin: isDesktop ? "center left" : "center",
            ...(isDesktop ? {} : { margin: "0 auto" }),
          }}
        >
          <Spline
            scene="https://prod.spline.design/fCbzvhwnIheIyptC/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

        {/* ══ TEXT ══ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: layout.textPad,
            /* on mobile/tablet, add horizontal padding and center */
            ...(isDesktop
              ? {}
              : { alignItems: "flex-start", padding: isMobile ? "24px 24px 48px" : "24px 48px 48px" }),
          }}
        >
          {/* HELLO I'M */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              color: "#ffffff",
              fontSize: isMobile ? "0.8rem" : "1rem",
              fontWeight: "600",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "8px",
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            Hello, I'm
          </motion.p>

          {/* NAME */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            style={{
              color: "#ffffff",
              fontSize: layout.nameSz,
              fontWeight: "900",
              lineHeight: "1",
              marginBottom: "12px",
              fontFamily: "'Arial Black', 'Impact', sans-serif",
              letterSpacing: "-0.02em",
              whiteSpace: isMobile ? "normal" : "nowrap",
            }}
          >
            Aadithyan{" "}
            <span style={{ fontWeight: "400", fontSize: "0.75em", letterSpacing: "0" }}>
              A S
            </span>
          </motion.h1>

          {/* Typing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            style={{
              fontSize: isMobile ? "1.05rem" : "clamp(1.1rem,1.6vw,1.5rem)",
              fontWeight: "600",
              color: "#60a5fa",
              marginBottom: "18px",
              fontFamily: "'Courier New', monospace",
              minHeight: "36px",
            }}
          >
            <TypeAnimation
              sequence={[
                "Full Stack Developer", 2000,
                "React Enthusiast",    2000,
                "Rust Developer",      2000,
                "Next.js Expert",      2000,
              ]}
              repeat={Infinity}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            style={{
              color: "#a0a0a0",
              fontSize: isMobile ? "0.88rem" : "clamp(0.9rem,1.1vw,1.05rem)",
              lineHeight: "1.75",
              marginBottom: "28px",
              maxWidth: isMobile ? "100%" : "420px",
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            As a passionate Full Stack Developer, I specialize in building
            dynamic, user-friendly web applications. With expertise in both
            frontend and backend technologies, I craft seamless digital
            experiences.
          </motion.p>

          {/* Buttons + Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
              flexWrap: isMobile ? "wrap" : "nowrap",
            }}
          >
            {/* Download CV */}
            <button
              onClick={handleDownloadCV}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "999px",
                padding: isMobile ? "11px 22px" : "13px 28px",
                fontSize: isMobile ? "0.88rem" : "0.95rem",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.22s ease",
                fontFamily: "'Segoe UI', sans-serif",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e2e8f0";
                e.currentTarget.style.transform = "scale(1.04) translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.transform = "scale(1) translateY(0)";
              }}
            >
              <FaDownload size={13} />
              Download CV
            </button>

            {/* Social icons */}
            {[
              { href: "https://github.com/Aadithyanas",            icon: <FaGithub   size={17} />, label: "GitHub"   },
              { href: "https://www.linkedin.com/in/aadithyanas",   icon: <FaLinkedin size={17} />, label: "LinkedIn" },
              { href: "mailto:adithyanas2694@gmail.com",            icon: <FaEnvelope size={17} />, label: "Email"    },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: isMobile ? "40px" : "46px",
                  height: isMobile ? "40px" : "46px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  transition: "all 0.22s ease",
                  textDecoration: "none",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(96,165,250,0.2)";
                  e.currentTarget.style.borderColor = "#60a5fa";
                  e.currentTarget.style.color = "#60a5fa";
                  e.currentTarget.style.transform = "scale(1.12) translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                }}
              >
                {icon}
              </a>
            ))}
          </motion.div>

          {/* Stats — bullet separated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.40 }}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: isMobile ? "wrap" : "nowrap",
              gap: isMobile ? "12px" : "0",
            }}
          >
            {[
              { icon: <FaRocket size={13} />, value: "2+ Years",    color: "#60a5fa" },
              { icon: <FaStar   size={13} />, value: "19 Skills",   color: "#a78bfa" },
              { icon: <FaCode   size={13} />, value: "4+ Projects", color: "#34d399" },
            ].map(({ icon, value, color }, i) => (
              <React.Fragment key={value}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#ffffff",
                    fontSize: isMobile ? "0.85rem" : "0.95rem",
                    fontWeight: "700",
                    fontFamily: "'Segoe UI', sans-serif",
                    whiteSpace: "nowrap",
                    padding: isMobile ? "0" : i === 0 ? "0 16px 0 0" : "0 16px",
                  }}
                >
                  <span style={{ color }}>{icon}</span>
                  {value}
                </div>
                {i < 2 && !isMobile && (
                  <span style={{ color: "#444", fontSize: "1.1rem", flexShrink: 0 }}>
                    •
                  </span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};