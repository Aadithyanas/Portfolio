import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

export const Footer: React.FC = () => {



  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/Aadithyanas", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
    { icon: <FaEnvelope />, href: "mailto:adithyanas2694@gmail.com", label: "Email" }
  ];

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Stats", href: "#github-stats" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer style={{
      backgroundColor: '#0a0a0a',
      padding: '80px 0 40px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      fontFamily: "'Outfit', sans-serif",
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          marginBottom: '60px'
        }}>
          {/* Branding */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#fff',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              Aadithyan
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              maxWidth: '300px'
            }}>
              A passionate Full Stack Developer focused on building high-performance, smooth, and visually stunning web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: 0
            }}>
              Navigation
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}

                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social / Connect */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: 0
            }}>
              Connect
            </h3>
            <div style={{ display: 'flex', gap: '16px' }}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, color: '#fff' }}
                  style={{
                    fontSize: '1.4rem',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'color 0.2s ease'
                  }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.85rem',
            margin: 0
          }}>
            © {currentYear} Aadithyan. Built with ❤️ and Code.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.9 }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
