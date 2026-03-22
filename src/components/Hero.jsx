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
import { AnimatedText } from "./ui/animated-shiny-text";
import { cn } from "../lib/utils";

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
  const isMobile = width < 480;
  const isSmall = width >= 480 && width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = myResume;
    link.download = "Aadithyan_AS_Resume";
    link.click();
    window.open(myResume, "_blank");
  };

  /* ── layout values by breakpoint ── */
  const robotH = isMobile ? "72vw"
    : isSmall ? "65vw"
      : isTablet ? "55vw"
        : "80vh";

  const nameSz = isMobile ? "2.4rem"
    : isSmall ? "2.8rem"
      : isTablet ? "3.5rem"
        : "clamp(3.5rem,4.5vw,5.5rem)";

  const descSz = isMobile ? "0.85rem"
    : isSmall ? "0.9rem"
      : isTablet ? "0.95rem"
        : "clamp(0.9rem,1.1vw,1.05rem)";

  return (
    <section
      id="about"
      style={{
        backgroundColor: "#0a0a0a",
        /* On desktop fill full viewport; on mobile just fit content + safe top-padding for navbar */
        minHeight: isDesktop ? "100vh" : "auto",
        paddingTop: isDesktop ? "0" : isMobile ? "90px" : "100px",
        /* ↑ This removes the huge empty gap — no more forced full-vh on mobile */
        paddingBottom: isDesktop ? "0" : "48px",
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
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          alignItems: "center",
          minHeight: isDesktop ? "100vh" : "auto",
        }}
      >
        {/* ══ ROBOT ══ */}
        <motion.div
          /* Entrance: slides in from left on desktop, drops from top on mobile */
          initial={{
            opacity: 0,
            x: isDesktop ? -80 : 0,
            y: isDesktop ? 0 : -30,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: isDesktop ? 0.85 : 1,
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1], /* spring-like custom easing */
          }}
          style={{
            width: "100%",
            height: robotH,
            position: "relative",
            backgroundColor: "#000000",
            mixBlendMode: "lighten",
            clipPath: "inset(0 0 100px 0)",   // ← changed
            overflow: "hidden",
            transformOrigin: isDesktop ? "center left" : "center",
            ...(!isDesktop ? { margin: "0 auto" } : {}),
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
            padding: isDesktop
              ? "0 0 0 48px"
              : isMobile
                ? "20px 20px 0"
                : isSmall
                  ? "20px 24px 0"
                  : "20px 40px 0",
          }}
        >
          {/* HELLO I'M */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              color: "#ffffff",
              fontSize: isMobile ? "0.72rem" : "0.88rem",
              fontWeight: "600",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "8px",
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            Hello, I'm
          </motion.p>

          {/* NAME - Replaced with Animated Shiny Text */}
          <AnimatedText
            text="Aadithyan AS"
            className="justify-start py-0 mb-2"
            textClassName={cn(
              "font-black text-left leading-tight whitespace-nowrap",
              isMobile ? "text-[2.4rem]" : isSmall ? "text-[3.2rem]" : isTablet ? "text-[4rem]" : "text-[clamp(4rem,5vw,6rem)]"
            )}
            gradientColors="linear-gradient(90deg, #444, #fff, #444)"
            gradientAnimationDuration={2}
            hoverEffect={true}
          />

          {/* Typing */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            style={{
              fontSize: isMobile ? "0.95rem" : isTablet ? "1.1rem" : "clamp(1.1rem,1.6vw,1.5rem)",
              fontWeight: "600",
              color: "#60a5fa",
              marginBottom: "16px",
              fontFamily: "'Courier New', monospace",
              minHeight: "30px",
            }}
          >
            <TypeAnimation
              sequence={[
                "Full Stack Developer", 2000,
                "React Enthusiast", 2000,
                "Rust Developer", 2000,
                "Next.js Expert", 2000,
              ]}
              repeat={Infinity}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            style={{
              color: "#a0a0a0",
              fontSize: descSz,
              lineHeight: "1.75",
              marginBottom: "24px",
              maxWidth: isMobile || isSmall ? "100%" : "420px",
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "10px" : "12px",
              marginBottom: "24px",
              flexWrap: "wrap",
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
                padding: isMobile ? "10px 20px" : "13px 28px",
                fontSize: isMobile ? "0.82rem" : "0.95rem",
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
              <FaDownload size={12} />
              Download CV
            </button>

            {/* Social icons */}
            {[
              { href: "https://github.com/Aadithyanas", icon: <FaGithub size={16} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/aadithyanas", icon: <FaLinkedin size={16} />, label: "LinkedIn" },
              { href: "mailto:adithyanas2694@gmail.com", icon: <FaEnvelope size={16} />, label: "Email" },
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
                  width: isMobile ? "38px" : "44px",
                  height: isMobile ? "38px" : "44px",
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.7 }}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: isMobile ? "10px 16px" : "0",
            }}
          >
            {[
              { icon: <FaRocket size={12} />, value: "2+ Years", color: "#60a5fa" },
              { icon: <FaStar size={12} />, value: "19 Skills", color: "#a78bfa" },
              { icon: <FaCode size={12} />, value: "4+ Projects", color: "#34d399" },
            ].map(({ icon, value, color }, i) => (
              <React.Fragment key={value}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#ffffff",
                    fontSize: isMobile ? "0.8rem" : "0.9rem",
                    fontWeight: "700",
                    fontFamily: "'Segoe UI', sans-serif",
                    whiteSpace: "nowrap",
                    padding: isMobile ? "0" : i === 0 ? "0 14px 0 0" : "0 14px",
                  }}
                >
                  <span style={{ color }}>{icon}</span>
                  {value}
                </div>
                {i < 2 && !isMobile && (
                  <span style={{ color: "#444", fontSize: "1rem", flexShrink: 0 }}>
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