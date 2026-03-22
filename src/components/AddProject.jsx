import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Plus, Lock, Eye, EyeOff, Globe, Github } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { cn } from '../lib/utils';

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
    imageUrl: ''
  });

  const ADMIN_PASSWORD = 'admin123';

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
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newProject = {
        title: projectData.title,
        description: projectData.description,
        techStack: projectData.techStack.split(',').map(tech => tech.trim()),
        githubUrl: projectData.githubUrl,
        liveUrl: projectData.liveUrl,
        imageUrl: projectData.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'projects'), newProject);
      
      setProjectData({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        imageUrl: ''
      });

      if (onProjectAdded) onProjectAdded();
      onClose();
    } catch (error) {
      console.error('Error adding project: ', error);
      if (error.code === 'permission-denied') {
        setError('Firestore Access Denied: Please set your Security Rules to "Test Mode" or allow public writes for the "projects" collection in the Firebase Console.');
      } else {
        setError(`Failed to add project: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = cn(
    "w-full px-4 py-3 rounded-xl border transition-all duration-300",
    "bg-white/5 border-white/10 text-white placeholder-white/30",
    "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10"
  );

  const labelClasses = "block text-sm font-medium mb-2 text-white/70 ml-1";

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 font-['Outfit',sans-serif]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/5 text-white/50 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3">Admin Portal</h2>
          <p className="text-white/50 mb-8">Enter your secure password to access the project management suite.</p>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className={inputClasses}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">{error}</p>}

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Verify Identity
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 font-['Outfit',sans-serif]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl custom-scrollbar"
      >
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0a0a0a]/95 backdrop-blur py-2 z-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Add New Project</h2>
            <p className="text-white/50 text-sm mt-1">Expanding your digital portfolio</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-white/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={projectData.title}
                  onChange={handleInputChange}
                  required
                  className={inputClasses}
                  placeholder="e.g. AI Portfolio Generator"
                />
              </div>

              <div>
                <label className={labelClasses}>Tech Stack (comma separated)</label>
                <input
                  type="text"
                  name="techStack"
                  value={projectData.techStack}
                  onChange={handleInputChange}
                  required
                  className={inputClasses}
                  placeholder="React, Tailwind, Firebase..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClasses}>GitHub URL</label>
                <div className="relative">
                  <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input
                    type="url"
                    name="githubUrl"
                    value={projectData.githubUrl}
                    onChange={handleInputChange}
                    className={cn(inputClasses, "pl-12")}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Live Demo URL</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input
                    type="url"
                    name="liveUrl"
                    value={projectData.liveUrl}
                    onChange={handleInputChange}
                    className={cn(inputClasses, "pl-12")}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className={labelClasses}>Project Description</label>
            <textarea
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className={cn(inputClasses, "resize-none h-32 md:h-40")}
              placeholder="Tell the story of this project..."
            />
          </div>

          <div>
            <label className={labelClasses}>Hero Image URL</label>
            <div className="relative group">
              <Upload className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 transition-colors group-focus-within:text-blue-400" />
              <input
                type="url"
                name="imageUrl"
                value={projectData.imageUrl}
                onChange={handleInputChange}
                className={cn(inputClasses, "pl-12")}
                placeholder="Direct link to image (Unsplash, Imgur, GitHub Raw...)"
              />
            </div>
            <p className="text-[10px] text-white/30 mt-2 ml-1 uppercase tracking-widest font-semibold">
              Pro tip: Use Unsplash source or Imgur direct links for best quality
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 rounded-2xl bg-white/5 text-white/70 font-bold hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-4 px-6 rounded-2xl bg-white text-black font-bold hover:bg-white/90 disabled:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Deploy to Showcase
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

