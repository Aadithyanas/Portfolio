import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa';

/* ── Dark-locked Input Field ── */
function Field({ label, type = 'text', name, value, onChange, multiline, rows = 5, required }) {
  const [focused, setFocused] = useState(false);
  const Tag = multiline ? 'textarea' : 'input';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{
        color: focused ? '#fff' : 'rgba(255,255,255,0.5)',
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
          border: `1px solid ${focused ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
          backgroundColor: focused ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
          color: '#fff',
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

/* ── Dark-locked Social Icon Button ── */
function SocialBtn({ href, icon: Icon, label }) {
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
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'}`,
        color: hovered ? '#fff' : 'rgba(255,255,255,0.6)',
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
   MAIN COMPONENT
───────────────────────────────────────────── */
export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const set = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

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
      id="contact"
      style={{
        backgroundColor: '#0a0a0a',
        padding: '96px 0 112px',
        position: 'relative',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 32px' }}>

        {/* Heading */}
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
            color: 'rgba(255,255,255,0.28)',
            margin: '0 0 14px 0',
          }}>
            Get in touch
          </p>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '2rem',
            fontWeight: 600,
            color: '#f0f0f0',
            margin: '0 0 14px 0',
            letterSpacing: '-0.01em',
          }}>
            Let's Collaborate
          </h2>
          <p style={{
            fontWeight: 300,
            fontSize: '0.92rem',
            color: 'rgba(255,255,255,0.38)',
            margin: 0,
            lineHeight: 1.65,
            maxWidth: '500px',
          }}>
            Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Form & Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>

          {/* Social Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
          >
            <SocialBtn href="https://github.com/Aadithyanas"          icon={FaGithub}   label="GitHub"   />
            <SocialBtn href="https://www.linkedin.com/in/aadithyanas" icon={FaLinkedin} label="LinkedIn" />
            <SocialBtn href="mailto:adithyanas2694@gmail.com"         icon={FaEnvelope} label="Email"    />
            <SocialBtn href="tel:+918848673615"                       icon={FaPhone}    label="Call"     />
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              backgroundColor: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '40px',
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <Field label="Name"  name="name"  value={form.name}  onChange={set('name')}  required />
                <Field label="Email" name="email" value={form.email} onChange={set('email')} type="email" required />
              </div>

              <Field label="Message" name="message" value={form.message} onChange={set('message')} multiline required />

              {/* Status Message */}
              {status && (
                <div style={{
                  padding: '16px', borderRadius: '8px',
                  backgroundColor: status.ok ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                  border: `1px solid ${status.ok ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                  color: status.ok ? '#34d399' : '#f87171',
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
                    backgroundColor: loading ? 'rgba(255,255,255,0.05)' : '#fff',
                    color: loading ? '#fff' : '#000',
                    fontWeight: 600, fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif",
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.2s',
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = '0.85'; }}
                  onMouseLeave={(e) => { if (!loading) e.currentTarget.style.opacity = '1'; }}
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
