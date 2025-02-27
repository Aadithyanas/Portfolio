import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import social icons
import emailjs from 'emailjs-com';
import './hero.css'

export const Contact = () => {
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

    // EmailJS setup
    const serviceID = 'service_xpduv4d'; // Replace with your service ID from EmailJS
    const templateID = 'template_tz9p3y6'; // Replace with your template ID from EmailJS
    const userID = '_3Crr2g3hRmw88Vjr'; // Replace with your user ID from EmailJS

    // Sending email via EmailJS
    emailjs
      .sendForm(serviceID, templateID, e.target, userID)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setStatusMessage('Message sent successfully!');
        setFormState({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        console.log('Error sending email:', error.text);
        setStatusMessage('There was an error sending the message. Please try again.');
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
          className="text-4xl font-bold text-center mb-12"
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
