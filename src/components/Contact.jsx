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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatusMessage('');

    // EmailJS setup - Update these with your actual EmailJS credentials
    const serviceID = 'service_xpduv4d'; // Your EmailJS service ID
    const templateID = 'template_tz9p3y6'; // Your EmailJS template ID
    const userID = 'N4RyDhPGG4ICgi72i'; // Your EmailJS user ID
    
    try {
      // Initialize EmailJS with proper error handling
      if (!userID) {
        throw new Error('EmailJS User ID is not configured');
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        message: formState.message,
        to_name: 'Aadithyan',
        reply_to: formState.email
      };

      // Send email using the modern EmailJS API
      const result = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        userID
      );

      console.log('Email sent successfully:', result);
      setStatusMessage('✅ Message sent successfully! I\'ll get back to you soon!');
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error('EmailJS Error Details:', error);
      
      // More specific error handling
      let errorMessage = '';
      if (error.status === 400) {
        errorMessage = '❌ Invalid email configuration. Please check your EmailJS settings.';
      } else if (error.status === 401) {
        errorMessage = '❌ EmailJS authentication failed. Please check your API key.';
      } else if (error.status === 403) {
        errorMessage = '❌ EmailJS service access denied. Please check your service configuration.';
      } else if (error.status === 404) {
        errorMessage = '❌ EmailJS service not found. Please check your service ID.';
      } else if (error.status === 429) {
        errorMessage = '❌ Too many requests. Please try again later.';
      } else {
        errorMessage = '❌ Email service temporarily unavailable. Please contact me directly:';
      }
      
      setStatusMessage(`${errorMessage}\n📧 adithyanas2694@gmail.com\n📱 +91 8848673615`);
      
      // Copy email to clipboard as fallback
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText('adithyanas2694@gmail.com');
        }
      } catch (clipboardError) {
        console.log('Could not copy to clipboard:', clipboardError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 pt-24">
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
              className={`text-center mt-4 p-4 rounded-lg ${
                statusMessage.includes('✅') 
                  ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' 
                  : 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">{statusMessage}</pre>
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

        {/* Debug Information (only in development)
        {import.meta.env.DEV && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">🔧 Debug Info (Development Only)</h3>
            <div className="text-xs space-y-1">
              <p>Service ID: {import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xpduv4d'}</p>
              <p>Template ID: {import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_tz9p3y6'}</p>
              <p>User ID: {import.meta.env.VITE_EMAILJS_USER_ID ? '✅ Set' : '❌ Not set'}</p>
              <p className="text-yellow-600">
                💡 If emails aren't working, check your EmailJS dashboard and update the credentials.
              </p>
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
};
