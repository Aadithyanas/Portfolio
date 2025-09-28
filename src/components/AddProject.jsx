import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Plus, Lock, Eye, EyeOff } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

const AddProject = ({ isDark, onClose, onProjectAdded }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Project form state
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    image: null
  });

  // Admin password (you can change this)
  const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Access denied.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = '';

      // Use free image hosting or placeholder
      if (projectData.image) {
        // Option 1: Use placeholder image
        imageUrl = 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Project+Image';
        
        // Option 2: You can manually upload to free services and paste URL here
        // - imgur.com (free, no account needed)
        // - postimg.cc (free image hosting)
        // - imgbb.com (free with account)
        // - github.com (upload to your repo and use raw URL)
      }

      // Prepare project data
      const newProject = {
        title: projectData.title,
        description: projectData.description,
        techStack: projectData.techStack.split(',').map(tech => tech.trim()),
        githubUrl: projectData.githubUrl,
        liveUrl: projectData.liveUrl,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Add project to Firestore
      const docRef = await addDoc(collection(db, 'projects'), newProject);
      
      console.log('Project added with ID: ', docRef.id);
      
      // Reset form
      setProjectData({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        image: null
      });

      // Notify parent component
      if (onProjectAdded) {
        onProjectAdded();
      }

      // Close modal
      onClose();

    } catch (error) {
      console.error('Error adding project: ', error);
      setError('Failed to add project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full max-w-md p-8 rounded-lg ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <Lock className={`w-12 h-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          
          <h2 className={`text-2xl font-bold text-center mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Admin Access Required
          </h2>
          
          <p className={`text-center mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Enter the admin password to add new projects
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Access Admin Panel
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-lg ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Add New Project
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={projectData.title}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Tech Stack (comma separated) *
              </label>
              <input
                type="text"
                name="techStack"
                value={projectData.techStack}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="React, Node.js, MongoDB, etc."
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description *
            </label>
            <textarea
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Describe your project..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={projectData.githubUrl}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Live URL
              </label>
              <input
                type="url"
                name="liveUrl"
                value={projectData.liveUrl}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="https://your-project.com"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Project Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className={`mx-auto h-12 w-12 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {projectData.image && (
              <p className={`mt-2 text-sm ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`}>
                Selected: {projectData.image.name}
              </p>
            )}
          </div>

          {error && (
            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-red-900/20 border border-red-500' : 'bg-red-50 border border-red-200'
            }`}>
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isDark
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Project
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProject;
