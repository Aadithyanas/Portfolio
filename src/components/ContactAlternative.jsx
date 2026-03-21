import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa';

/* ── Minimal Design Field ── */
function Field({ label, type = 'text', name, value, onChange, multiline, rows = 5, required, isDark }) {
  const [focused, setFocused] = useState(false);
  const Tag = multiline ? 'textarea' : 'input';
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{
        color: isDark ? (focused ? '#fff' : 'rgba(255,255,255,0.5)') : (focused ? '#000' : 'rgba(0,0,0,0.5)'),
        fontSize: '0.8rem',
        fontWeight: '600',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        transition: 'color 0.2s',
        fontFamily: "'Outfit', sans-serif",
      }}>
        {label}
      </label>
      <Tag
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        rows={multiline ? rows : undefined}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '16px 20px',
          borderRadius: '8px',
          border: `1px solid ${isDark ? (focused ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)') : (focused ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.06)')}`,
          backgroundColor: isDark ? (focused ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.01)') : (focused ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.01)'),
          color: isDark ? '#fff' : '#000',
          fontSize: '0.95rem',
          fontFamily: "'Outfit', sans-serif",
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'all 0.25s ease',
          resize: multiline ? 'vertical' : 'none',
        }}
      />
    </div>
  );
}

/* ── Minimal Social Icon Button ── */
function SocialBtn({ href, icon: Icon, label, isDark }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        padding: '12px 24px', borderRadius: '8px',
        backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${isDark ? (hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)') : (hovered ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.05)')}`,
        color: isDark ? (hovered ? '#fff' : 'rgba(255,255,255,0.6)') : (hovered ? '#000' : 'rgba(0,0,0,0.6)'),
        textDecoration: 'none',
        fontWeight: '500', fontSize: '0.85rem',
        fontFamily: "'Outfit', sans-serif",
        transition: 'all 0.2s ease',
        flex: '1 1 auto',
      }}
    >
      <Icon style={{ fontSize: '1.1rem', flexShrink: 0 }} />
      <span>{label}</span>
    </a>
  );
}

/* ─────────────────────────────────────────────
   ALTERNATIVE COMPONENT
───────────────────────────────────────────── */
export const ContactAlternative = ({ isDark }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const set = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  // Using formsubmit.co as standard fallback alternative when emailjs fails
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/adithyanas2694@gmail.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
        }),
      });

      if (response.ok) {
        setStatus({ ok: true, msg: "Message sent! I'll get back to you soon." });
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error("Failed to send");
      }
    } catch (err) {
      setStatus({
        ok: false,
        msg: "Couldn't send right now. Please email me directly at adithyanas2694@gmail.com",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-alternative"
      style={{
        backgroundColor: isDark ? '#050505' : '#fafafa',
        padding: '96px 0 112px',
        position: 'relative',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 32px' }}>

        {/* Minimal Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <p style={{
            fontFamily: "'Outfit', monospace",
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.3)',
            margin: '0 0 14px 0',
          }}>
            Get in touch
          </p>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '2rem',
            fontWeight: 600,
            color: isDark ? '#f0f0f0' : '#0f0f0f',
            margin: '0 0 14px 0',
            letterSpacing: '-0.01em',
          }}>
            Let's Collaborate
          </h2>
          <p style={{
            fontWeight: 300,
            fontSize: '0.92rem',
            color: isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.42)',
            margin: 0,
            lineHeight: 1.65,
            maxWidth: '500px',
          }}>
            Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Form & Info Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
          
          {/* Social Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
          >
            <SocialBtn href="https://github.com/Aadithyanas"          icon={FaGithub}   label="GitHub"   isDark={isDark} />
            <SocialBtn href="https://www.linkedin.com/in/aadithyanas" icon={FaLinkedin} label="LinkedIn" isDark={isDark} />
            <SocialBtn href="mailto:adithyanas2694@gmail.com"         icon={FaEnvelope} label="Email"    isDark={isDark} />
            <SocialBtn href="tel:+918848673615"                       icon={FaPhone}    label="Call"     isDark={isDark} />
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              backgroundColor: isDark ? '#0d0d0d' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
              borderRadius: '12px',
              padding: '40px',
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <Field label="Name"  name="name"  value={form.name}  onChange={set('name')}  isDark={isDark} required />
                <Field label="Email" name="email" value={form.email} onChange={set('email')} isDark={isDark} type="email" required />
              </div>
              
              <Field label="Message" name="message" value={form.message} onChange={set('message')} isDark={isDark} multiline required />

              {/* Status Message */}
              {status && (
                <div style={{
                  padding: '16px', borderRadius: '8px',
                  backgroundColor: status.ok ? (isDark ? 'rgba(16, 185, 129, 0.05)' : 'rgba(16, 185, 129, 0.1)') : (isDark ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.1)'),
                  border: `1px solid ${status.ok ? (isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.3)') : (isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.3)')}`,
                  color: status.ok ? (isDark ? '#34d399' : '#059669') : (isDark ? '#f87171' : '#dc2626'),
                  fontSize: '0.85rem', fontWeight: 500, fontFamily: "'Outfit', sans-serif"
                }}>
                  {status.msg}
                </div>
              )}

              {/* Submit Button */}
              <div style={{ marginTop: '8px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    padding: '14px 32px', borderRadius: '8px', border: 'none',
                    backgroundColor: isDark ? (loading ? 'rgba(255,255,255,0.05)' : '#fff') : (loading ? 'rgba(0,0,0,0.05)' : '#000'),
                    color: isDark ? (loading ? '#fff' : '#000') : (loading ? '#000' : '#fff'),
                    fontWeight: 600, fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.opacity = '0.85';
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.opacity = '1';
                  }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <FaArrowRight size={12} />}
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactAlternative;
