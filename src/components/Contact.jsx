import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import social icons
import emailjs from '@emailjs/browser';
import './hero.css'

export const Contact = ({ isDark }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setStatusMessage('');

    // EmailJS setup - Update these with your actual EmailJS credentials
    const serviceID = 'service_xpduv4d'; // Your EmailJS service ID
    const templateID = 'template_tz9p3y6'; // Your EmailJS template ID
    const userID = 'AOeVaBH6xhYuUoxv2z1L8'; // Your EmailJS user ID
    
    // Initialize EmailJS
    emailjs.init(userID);

    // Sending email via EmailJS
    emailjs
      .sendForm(serviceID, templateID, e.target, userID)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setStatusMessage('Message sent successfully! I\'ll get back to you soon!');
        setFormState({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        console.log('Error details:', error.text);
        
        // Fallback: Show contact information
        setStatusMessage(`Email service temporarily unavailable. Please contact me directly at adithyanas2694@gmail.com or call +91 8848673615`);
        
        // Optional: Copy email to clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText('adithyanas2694@gmail.com');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={`text-4xl font-bold text-center mb-12 bg-clip-text text-transparent ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
        >
          Get In Touch
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <motion.input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute left-4 -top-2.5 bg-white dark:bg-gray-900 px-1 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
            >
              Name
            </label>
          </div>

          <div className="relative">
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-2.5 bg-white dark:bg-gray-900 px-1 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <motion.textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="message"
              className="absolute left-4 -top-2.5 bg-white dark:bg-gray-900 px-1 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
            >
              Message
            </label>
          </div>

          {statusMessage && (
            <div
              className={`text-center mt-4 ${
                statusMessage.includes('success') ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {statusMessage}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
            disabled={loading}
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Social Icons */}
        <div className="hero-icons flex justify-center items-center mt-8 space-x-4">
          <a
            href="https://github.com/Aadithyanas"
            className="social-icon text-gray-500 hover:text-black transition"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/aadithyanas"
            className="social-icon text-blue-600 hover:text-blue-800 transition"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="mailto:adithyanas2694@gmail.com"
            className="social-icon text-red-500 hover:text-red-700 transition"
          >
            <FaEnvelope size={24} />
          </a>
        </div>

        {/* Phone Number */}
        <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
          <p className="text-lg">Phone: +91 8848673615</p>
        </div>
      </div>
    </section>
  );
};
