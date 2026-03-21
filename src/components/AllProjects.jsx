import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft, Search, Grid, List, Layers, Activity } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { ThemeToggle } from './ThemeToggle';
import NEXAA from './NEXAA';
import NEXAAButton from './NEXAAButton';

/* ─── Minimal Project Card (Matching Projects.jsx) ─── */
const ProjectCard = ({ project, index, isDark }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: [0.25, 0.46, 0.45, 0.94] }}
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
        gap: '24px',
        height: '100%',
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
          flex: 1, // Push tags to bottom
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

/* ─── Skeleton loader ─── */
const Skeleton = ({ isDark }) => (
  <div style={{
    borderRadius: '12px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
    backgroundColor: isDark ? '#0d0d0d' : '#fff',
    padding: '28px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    height: '100%',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[90, 85, 60, 40].map((w, i) => (
        <div key={i} style={{ height: '10px', width: `${w}%`, borderRadius: '4px', backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', animation: 'pulse 1.6s ease-in-out infinite' }} />
      ))}
    </div>
    <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
      {[20, 25, 15, 30].map((w, i) => (
        <div key={i} style={{ height: '14px', width: `${w}%`, borderRadius: '4px', backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', animation: 'pulse 1.6s ease-in-out infinite' }} />
      ))}
    </div>
  </div>
);

/* ─── Main Page ─── */
const AllProjects = ({ isDark, onBack, toggleTheme, themeMode }) => {
  const { projects, loading, error } = useProjects();
  const [showNEXAA, setShowNEXAA] = useState(false);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid'); // 'grid' | 'list'

  const filtered = projects.filter(p =>
    !search ||
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase()) ||
    p.techStack?.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div
      style={{
        minHeight: '100vh',
        backgroundColor: isDark ? '#050505' : '#fafafa',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Outfit', sans-serif",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '10%', right: '5%', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: isDark ? 'rgba(5,5,5,0.85)' : 'rgba(250,250,250,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
      }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Back */}
          <motion.button
            onClick={onBack}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              borderRadius: '10px', padding: '8px 14px',
              color: isDark ? '#d1d5db' : '#374151',
              fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
              flexShrink: 0,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            <ArrowLeft size={15} /> Back
          </motion.button>

          {/* Title */}
          <div style={{ flex: 1 }}>
            <h1 style={{ color: isDark ? '#fff' : '#111', fontWeight: '800', fontSize: 'clamp(1.1rem,2vw,1.4rem)', margin: 0, letterSpacing: '-0.01em' }}>
              All Projects
            </h1>
            <p style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)', fontSize: '0.85rem', margin: 0, fontWeight: 300 }}>
              {loading ? 'Loading…' : `${filtered.length} of ${projects.length} projects`}
            </p>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <Search size={14} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              style={{
                paddingLeft: '32px', paddingRight: '14px', paddingTop: '8px', paddingBottom: '8px',
                borderRadius: '10px', fontSize: '0.85rem', fontFamily: "'Outfit', sans-serif",
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                color: isDark ? '#fff' : '#111',
                outline: 'none', width: '180px',
              }}
            />
          </div>

          {/* View toggle */}
          <div style={{ display: 'flex', gap: '4px', backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', borderRadius: '10px', padding: '4px', flexShrink: 0 }}>
            {[['grid', <Grid size={15} />], ['list', <List size={15} />]].map(([v, icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: '6px 10px', borderRadius: '7px', border: 'none', cursor: 'pointer',
                  backgroundColor: view === v ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') : 'transparent',
                  color: view === v ? (isDark ? '#fff' : '#000') : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'),
                  display: 'flex', alignItems: 'center', transition: 'all 0.2s',
                }}
              >
                {icon}
              </button>
            ))}
          </div>

          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} themeMode={themeMode} />
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 1 }}>

        {error && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: '#ef4444', fontWeight: '600' }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(400px, 1fr))' : '1fr',
            gap: '20px'
          }}>
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} isDark={isDark} />)}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '96px 24px' }}
          >
            <Layers size={48} style={{ color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', margin: '0 auto 16px' }} />
            <p style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', fontWeight: '400', fontSize: '1.1rem' }}>
              No projects match &ldquo;{search}&rdquo;
            </p>
          </motion.div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: view === 'grid'
                ? 'repeat(auto-fill, minmax(400px, 1fr))' // Creates responsive grid
                : '1fr', // Creates a single-column list
              gap: '20px',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id || project.title}
                  project={project}
                  index={i}
                  isDark={isDark}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* NEXAA */}
      <NEXAAButton isDark={isDark} onClick={() => setShowNEXAA(!showNEXAA)} isOpen={showNEXAA} />
      <NEXAA isDark={isDark} isOpen={showNEXAA} onToggle={() => setShowNEXAA(!showNEXAA)} />
    </motion.div>
  );
};

export default AllProjects;
