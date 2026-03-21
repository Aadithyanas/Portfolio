import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, ArrowRight, Activity } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

/* ─── Minimal Project Bar Card ─── */
const ProjectBar = ({ project, index, isDark }) => {
  const [hovered, setHovered] = useState(false);
  const [cardRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        padding: '28px 32px',
        border: `1px solid ${
          isDark
            ? hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'
            : hovered ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.04)'
        }`,
        backgroundColor: isDark 
          ? hovered ? 'rgba(255,255,255,0.02)' : '#0d0d0d' 
          : hovered ? 'rgba(0,0,0,0.02)' : '#ffffff',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        boxSizing: 'border-box',
        gap: '24px', // Space between top row and tech stack
      }}
    >
      {/* Top Row: Title, Badge, Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Left Side: Title & Live Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h3 style={{
            color: isDark ? '#f0f0f0' : '#111',
            fontSize: '1.25rem',
            fontWeight: 800,
            margin: 0,
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '0.01em',
          }}>
            {project.title}
          </h3>
          
          {project.liveUrl && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.15)',
              color: isDark ? '#34d399' : '#059669',
              borderRadius: '999px',
              padding: '4px 10px',
              fontSize: '0.65rem',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              <Activity size={10} strokeWidth={3} /> LIVE
            </div>
          )}
        </div>

        {/* Right Side: Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                textDecoration: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: 600,
                fontFamily: "'Outfit', sans-serif",
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = isDark ? '#fff' : '#000';
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
              }}
            >
              <Github size={14} /> Code
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                textDecoration: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: 600,
                fontFamily: "'Outfit', sans-serif",
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = isDark ? '#fff' : '#000';
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
              }}
            >
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      </div>

      {/* Description clamped to 4 lines */}
      {project.description && (
        <p style={{
          color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
          fontSize: '0.92rem',
          lineHeight: 1.6,
          margin: 0,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 300,
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>
      )}
      {/* Tech tags - Joined by Slash */}
      {project.techStack?.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)',
          fontSize: '0.82rem',
          fontWeight: 600,
          fontFamily: "'DM Mono', monospace",
        }}>
          {project.techStack.map((tech, i) => (
            <React.Fragment key={i}>
              <span>{tech}</span>
              {i < project.techStack.length - 1 && (
                <span style={{ color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)' }}>/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

    </motion.div>
  );
};

/* ─── Skeleton ─── */
const Skeleton = ({ isDark }) => (
  <div style={{
    borderRadius: '12px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
    backgroundColor: isDark ? '#0d0d0d' : '#fff',
    padding: '28px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  }}>
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', width: '50%' }}>
        <div style={{ height: '24px', width: '60%', borderRadius: '4px', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', animation: 'pulse 1.6s ease-in-out infinite' }} />
        <div style={{ height: '20px', width: '40px', borderRadius: '10px', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', animation: 'pulse 1.6s ease-in-out infinite' }} />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ height: '34px', width: '80px', borderRadius: '8px', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', animation: 'pulse 1.6s ease-in-out infinite' }} />
        <div style={{ height: '34px', width: '80px', borderRadius: '8px', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', animation: 'pulse 1.6s ease-in-out infinite' }} />
      </div>
    </div>
    <div style={{ display: 'flex', gap: '12px' }}>
      {[20, 25, 15, 30].map((w, i) => (
        <div key={i} style={{ height: '14px', width: `${w}%`, borderRadius: '4px', backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', animation: 'pulse 1.6s ease-in-out infinite' }} />
      ))}
    </div>
  </div>
);

/* ─── Section ─── */
export const Projects = ({ isDark, refreshTrigger = 0, onShowAllProjects }) => {
  const { projects, loading, error } = useProjects(refreshTrigger);
  const [headRef, headInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="projects"
      style={{
        padding: '96px 0 112px',
        backgroundColor: isDark ? '#050505' : '#fafafa',
        position: 'relative',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 32px', position: 'relative' }}>

        {/* Heading */}
        <div ref={headRef} style={{ marginBottom: '48px' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: "'Outfit', monospace",
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.3)',
              margin: '0 0 14px 0',
            }}
          >
            Selected work
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '2rem',
              fontWeight: 600,
              color: isDark ? '#f0f0f0' : '#0f0f0f',
              margin: '0 0 14px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Featured Projects
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.16 }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            <p style={{
              fontWeight: 300,
              fontSize: '0.92rem',
              color: isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.42)',
              margin: 0,
              lineHeight: 1.65,
            }}>
              Real-world applications I've designed and shipped.
            </p>
          </motion.div>
        </div>

        {/* Simple List Container */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {loading && (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} isDark={isDark} />)
          )}

          {error && (
            <p style={{ textAlign: 'center', color: 'rgba(255,80,80,0.8)', fontSize: '0.88rem', padding: '48px 0' }}>{error}</p>
          )}

          {!loading && !error && (
            projects.slice(0, 4).map((project, i) => (
              <ProjectBar key={project.id || project.title} project={project} index={i} isDark={isDark} />
            ))
          )}
        </div>

        {/* View All */}
        {!loading && projects.length > 4 && (
          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end' }}>
            <motion.button
              onClick={onShowAllProjects}
              whileHover={{ x: 4 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
                border: 'none',
                padding: '8px 0',
                fontSize: '0.88rem',
                fontWeight: 500,
                fontFamily: "'Outfit', sans-serif",
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = isDark ? '#fff' : '#000'}
              onMouseLeave={e => e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)'}
            >
              View all {projects.length} projects <ArrowRight size={14} />
            </motion.button>
          </div>
        )}

      </div>
    </section>
  );
};