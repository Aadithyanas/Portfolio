import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Check } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export const ContactAlternative = ({ isDark }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = `Portfolio Contact from ${formState.name}`;
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
    
    const mailtoLink = `mailto:adithyanas2694@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.open(mailtoLink);
    
    // Show success message
    alert('Your email client will open with the message pre-filled. Please send it from there.');
    
    // Reset form
    setFormState({
      name: '',
      email: '',
      message: ''
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('adithyanas2694@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section id="contact" className={`py-20 pt-24 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
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

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-lg ${
              isDark 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Direct Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-red-500" size={20} />
                <span className="text-gray-600 dark:text-gray-300">adithyanas2694@gmail.com</span>
                <button
                  onClick={copyEmail}
                  className="ml-auto p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 dark:text-gray-300">📱 +91 8848673615</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-lg ${
              isDark 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Social Links</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Aadithyanas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black dark:hover:text-white transition"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/aadithyanas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
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
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none peer ${
                isDark 
                  ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                  : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
              }`}
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className={`absolute left-4 -top-2.5 px-1 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm ${
                isDark 
                  ? 'bg-gray-900 text-gray-400' 
                  : 'bg-white text-gray-600'
              }`}
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
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none peer ${
                isDark 
                  ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                  : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
              }`}
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className={`absolute left-4 -top-2.5 px-1 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm ${
                isDark 
                  ? 'bg-gray-900 text-gray-400' 
                  : 'bg-white text-gray-600'
              }`}
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
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none peer ${
                isDark 
                  ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                  : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
              }`}
              placeholder=" "
              required
            />
            <label
              htmlFor="message"
              className={`absolute left-4 -top-2.5 px-1 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm ${
                isDark 
                  ? 'bg-gray-900 text-gray-400' 
                  : 'bg-white text-gray-600'
              }`}
            >
              Message
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
            type="submit"
          >
            <span>Open Email Client</span>
            <Send className="w-4 h-4" />
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-8 text-gray-600 dark:text-gray-400"
        >
          <p>This will open your default email client with the message pre-filled.</p>
        </motion.div>
      </div>
    </section>
  );
};
