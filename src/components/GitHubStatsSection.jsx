import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCode, FaStar, FaEye, FaGitAlt, FaCalendarAlt, FaUsers, FaClock, FaTrophy, FaFire, FaSync, FaDownload, FaExternalLinkAlt, FaHeart, FaRocket } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GitHubStatsSection = ({ isDark, username = 'Aadithyanas' }) => {
  const [stats, setStats] = useState({
    totalCommits: 0,
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    totalWatchers: 0,
    languages: [],
    recentActivity: [],
    loading: true,
    streak: 0,
    contributions: 0,
    profileInfo: {},
    yearlyContributions: {},
    repositoryStats: {},
    lastUpdated: null,
    error: null
  });

  const [activeTab, setActiveTab] = useState('overview');
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const chartRef = useRef(null);
  const counterRefs = useRef([]);

  useEffect(() => {
    fetchGitHubStats();
  }, [username]);

  const refreshStats = () => {
    setStats(prev => ({ ...prev, loading: true, error: null }));
    fetchGitHubStats();
  };

  const loadFallbackData = () => {
    const fallbackData = {
      totalCommits: 500,
      totalRepos: 15,
      totalStars: 25,
      totalForks: 8,
      totalWatchers: 12,
      languages: [
        { name: 'JavaScript', bytes: 50000, percentage: 35 },
        { name: 'TypeScript', bytes: 30000, percentage: 25 },
        { name: 'Python', bytes: 25000, percentage: 20 },
        { name: 'Java', bytes: 15000, percentage: 15 },
        { name: 'CSS', bytes: 5000, percentage: 5 }
      ],
      recentActivity: [
        { type: 'PushEvent', repo: 'Portfolio', created_at: new Date().toISOString() },
        { type: 'CreateEvent', repo: 'NewProject', created_at: new Date(Date.now() - 86400000).toISOString() },
        { type: 'WatchEvent', repo: 'OpenSource', created_at: new Date(Date.now() - 172800000).toISOString() }
      ],
      loading: false,
      streak: 15,
      contributions: 200,
      profileInfo: {
        name: username,
        bio: 'Passionate developer building amazing projects',
        location: 'Earth',
        company: 'Freelancer',
        followers: 10,
        following: 25,
        createdAt: '2020-01-01T00:00:00Z',
        avatarUrl: `https://github.com/${username}.png`
      },
      yearlyContributions: {
        2024: 120,
        2023: 60,
        2022: 20
      },
      repositoryStats: {
        totalSize: 50,
        avgRepoSize: 3,
        mostStarredRepo: 'Portfolio',
        mostStarredRepoStars: 5,
        totalIssues: 2
      },
      lastUpdated: new Date().toISOString(),
      error: null,
      isFallback: true
    };
    
    setStats(fallbackData);
  };


  useEffect(() => {
    if (stats.loading) return;

    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo(sectionRef.current, 
        {
          y: 100,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate stats cards with more complex animations
      gsap.fromTo(statsRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.5,
          rotation: -10
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: "random"
          },
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add floating animation to stats cards
      statsRef.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            y: -10,
            duration: 2 + (index * 0.2),
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.1
          });
        }
      });

      // Animate counters
      counterRefs.current.forEach((counter, index) => {
        if (counter) {
          const endValue = parseInt(counter.textContent.replace(/\D/g, ''));
          gsap.fromTo(counter, 
            { textContent: 0 },
            {
              textContent: endValue,
              duration: 2,
              ease: "power2.out",
              delay: index * 0.2,
              snap: { textContent: 1 },
              onUpdate: function() {
                counter.textContent = Math.ceil(this.targets()[0].textContent);
              },
              scrollTrigger: {
                trigger: counter,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Animate contribution chart with advanced effects
      if (chartRef.current) {
        gsap.fromTo(chartRef.current,
          {
            scale: 0.3,
            opacity: 0,
            rotation: 5,
            y: 50
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            y: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: chartRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Add subtle pulse animation to chart
        gsap.to(chartRef.current, {
          scale: 1.02,
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      }

      // Add particle effects around the section
      const particles = [];
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = `absolute w-2 h-2 rounded-full ${
          isDark ? 'bg-blue-400/30' : 'bg-blue-600/30'
        }`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        sectionRef.current.appendChild(particle);
        particles.push(particle);
      }

      // Animate particles
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: -100,
          x: Math.random() * 200 - 100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          ease: "power2.out",
          repeat: -1,
          delay: Math.random() * 2
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [stats.loading]);

  const fetchGitHubStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true }));
      
      // Check for rate limit in localStorage
      const lastFetch = localStorage.getItem(`github-stats-${username}`);
      const now = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      
      if (lastFetch && (now - parseInt(lastFetch)) < oneHour) {
        // Use cached data if available and less than 1 hour old
        const cachedData = localStorage.getItem(`github-data-${username}`);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setStats(prev => ({ ...prev, ...parsedData, loading: false }));
          return;
        }
      }
      
      // Get GitHub token from environment variables
      const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
      const headers = githubToken 
        ? { 'Authorization': `token ${githubToken}` }
        : {};
      
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
      
      if (!userResponse.ok) {
        if (userResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }
      
      const userData = await userResponse.json();
      
      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
      
      if (!reposResponse.ok) {
        if (reposResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }
      
      const reposData = await reposResponse.json();
      
      // Fetch events for recent activity
      const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=20`, { headers });
      
      if (!eventsResponse.ok) {
        if (eventsResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`GitHub API error: ${eventsResponse.status}`);
      }
      
      const eventsData = await eventsResponse.json();
      
      // Calculate stats
      const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);
      const totalWatchers = reposData.reduce((acc, repo) => acc + repo.watchers_count, 0);
      
      // Get language data
      const languagePromises = reposData.slice(0, 15).map(async (repo) => {
        try {
          const langResponse = await fetch(repo.languages_url, { headers });
          const langData = await langResponse.json();
          return { repo: repo.name, languages: langData };
        } catch (error) {
          return { repo: repo.name, languages: {} };
        }
      });
      
      const languageData = await Promise.all(languagePromises);
      
      // Calculate language usage
      const languageCount = {};
      languageData.forEach(({ languages }) => {
        Object.entries(languages).forEach(([lang, bytes]) => {
          languageCount[lang] = (languageCount[lang] || 0) + bytes;
        });
      });
      
      const topLanguages = Object.entries(languageCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 8)
        .map(([lang, bytes]) => ({ 
          name: lang, 
          bytes,
          percentage: Math.round((bytes / Object.values(languageCount).reduce((a, b) => a + b, 0)) * 100)
        }));

      // Process recent activity
      const recentActivity = eventsData.slice(0, 10).map(event => ({
        type: event.type,
        repo: event.repo?.name || 'Unknown',
        created_at: event.created_at,
        action: event.payload?.action || 'activity'
      }));

      // Calculate estimated stats
      const estimatedCommits = Math.max(userData.public_repos * 20, 150);
      const estimatedContributions = Math.max(userData.public_repos * 15, 100);
      const estimatedStreak = Math.min(Math.floor(estimatedContributions / 30), 365);

      // Calculate repository statistics
      const totalSize = reposData.reduce((acc, repo) => acc + (repo.size || 0), 0);
      const avgRepoSize = Math.round(totalSize / reposData.length);
      const mostStarredRepo = reposData.reduce((max, repo) => 
        repo.stargazers_count > max.stargazers_count ? repo : max, reposData[0] || {}
      );

      // Calculate yearly contributions (simplified)
      const currentYear = new Date().getFullYear();
      const yearlyContributions = {
        [currentYear]: Math.floor(estimatedContributions * 0.6),
        [currentYear - 1]: Math.floor(estimatedContributions * 0.3),
        [currentYear - 2]: Math.floor(estimatedContributions * 0.1)
      };

      const statsData = {
        totalCommits: estimatedCommits,
        totalRepos: userData.public_repos,
        totalStars,
        totalForks,
        totalWatchers,
        languages: topLanguages,
        recentActivity,
        loading: false,
        streak: estimatedStreak,
        contributions: estimatedContributions,
        profileInfo: {
          name: userData.name || userData.login,
          bio: userData.bio || 'Passionate developer',
          location: userData.location || 'Earth',
          company: userData.company || 'Freelancer',
          followers: userData.followers || 0,
          following: userData.following || 0,
          createdAt: userData.created_at,
          avatarUrl: userData.avatar_url
        },
        yearlyContributions,
        repositoryStats: {
          totalSize: Math.round(totalSize / 1024), // in MB
          avgRepoSize,
          mostStarredRepo: mostStarredRepo.name || 'N/A',
          mostStarredRepoStars: mostStarredRepo.stargazers_count || 0,
          totalIssues: reposData.reduce((acc, repo) => acc + (repo.open_issues_count || 0), 0)
        },
        lastUpdated: new Date().toISOString()
      };

      // Cache the data
      localStorage.setItem(`github-stats-${username}`, now.toString());
      localStorage.setItem(`github-data-${username}`, JSON.stringify(statsData));
      
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      
      // Try to use cached data as fallback
      const cachedData = localStorage.getItem(`github-data-${username}`);
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setStats(prev => ({ 
            ...prev, 
            ...parsedData, 
            loading: false,
            error: error.message 
          }));
        } catch (parseError) {
          setStats(prev => ({ 
            ...prev, 
            loading: false, 
            error: error.message 
          }));
        }
      } else {
        setStats(prev => ({ 
          ...prev, 
          loading: false, 
          error: error.message 
        }));
      }
    }
  };

  if (stats.loading) {
    return (
      <section ref={sectionRef} className={`py-20 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Loading GitHub activity...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (stats.error) {
    return (
      <section ref={sectionRef} className={`py-20 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="mb-8">
              <FaGithub className={`text-6xl mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                GitHub Stats Unavailable
              </h2>
              <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {stats.error}
              </p>
              <div className={`p-6 rounded-lg max-w-2xl mx-auto ${
                isDark 
                  ? 'bg-gray-800/50 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  What you can do:
                </h3>
                <ul className={`text-left space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Wait for the rate limit to reset (usually 1 hour)</li>
                  <li>• Check your internet connection</li>
                  <li>• Try refreshing the page later</li>
                  <li>• Add a GitHub personal access token to increase rate limits</li>
                  <li>• Visit my <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline">GitHub profile</a> directly</li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <motion.button
                  onClick={refreshStats}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isDark
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSync className="inline mr-2" />
                  Try Again
                </motion.button>
                <motion.button
                  onClick={loadFallbackData}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCode className="inline mr-2" />
                  Show Demo Data
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={`py-20 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <FaGithub className={`text-4xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-4xl lg:text-5xl font-bold bg-clip-text text-transparent ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            }`}>
              GitHub Activity
            </h2>
            <motion.button
              onClick={refreshStats}
              disabled={stats.loading}
              className={`p-3 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900'
              } ${stats.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaSync className={`text-xl ${stats.loading ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
          <p className={`text-lg lg:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Explore my coding journey, contributions, and the technologies I work with
          </p>
          {stats.isFallback && (
            <div className={`mt-4 p-3 rounded-lg max-w-md mx-auto ${
              isDark 
                ? 'bg-yellow-900/30 border border-yellow-700 text-yellow-300' 
                : 'bg-yellow-100 border border-yellow-300 text-yellow-800'
            }`}>
              <p className="text-sm font-medium">
                ⚠️ Showing demo data - GitHub API rate limit exceeded
              </p>
            </div>
          )}
          {stats.lastUpdated && (
            <p className={`text-sm mt-2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Last updated: {new Date(stats.lastUpdated).toLocaleString()}
            </p>
          )}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'overview', label: 'Overview', icon: FaCode },
            { id: 'contributions', label: 'Contributions', icon: FaCalendarAlt },
            { id: 'languages', label: 'Languages', icon: FaGitAlt },
            { id: 'profile', label: 'Profile', icon: FaUsers },
            { id: 'repos', label: 'Repositories', icon: FaRocket },
            { id: 'activity', label: 'Activity', icon: FaClock }
          ].map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === id
                  ? isDark
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon />
              {label}
            </motion.button>
          ))}
        </div>

        {/* Content based on active tab */}
        <div className="min-h-[400px]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: 'Total Commits', 
                  value: stats.totalCommits, 
                  icon: FaCode, 
                  color: 'blue',
                  suffix: '+'
                },
                { 
                  label: 'Repositories', 
                  value: stats.totalRepos, 
                  icon: FaGitAlt, 
                  color: 'green'
                },
                { 
                  label: 'Stars Earned', 
                  value: stats.totalStars, 
                  icon: FaStar, 
                  color: 'yellow'
                },
                { 
                  label: 'Forks', 
                  value: stats.totalForks, 
                  icon: FaEye, 
                  color: 'purple'
                },
                { 
                  label: 'Watchers', 
                  value: stats.totalWatchers, 
                  icon: FaUsers, 
                  color: 'indigo'
                },
                { 
                  label: 'Contributions', 
                  value: stats.contributions, 
                  icon: FaFire, 
                  color: 'red',
                  suffix: '+'
                },
                { 
                  label: 'Current Streak', 
                  value: stats.streak, 
                  icon: FaTrophy, 
                  color: 'orange',
                  suffix: ' days'
                },
                { 
                  label: 'Languages Used', 
                  value: stats.languages.length, 
                  icon: FaCode, 
                  color: 'teal'
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  ref={(el) => (statsRef.current[index] = el)}
                  className={`p-6 rounded-xl ${
                    isDark 
                      ? 'bg-gray-800/50 border border-gray-700' 
                      : 'bg-white border border-gray-200'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      isDark 
                        ? `bg-${stat.color}-500/20 text-${stat.color}-400` 
                        : `bg-${stat.color}-100 text-${stat.color}-600`
                    }`}>
                      <stat.icon className="text-2xl" />
                    </div>
                    <div 
                      ref={(el) => (counterRefs.current[index] = el)}
                      className={`text-3xl font-bold mb-2 ${
                        isDark ? `text-${stat.color}-400` : `text-${stat.color}-600`
                      }`}
                    >
                      {stat.value}{stat.suffix || ''}
                    </div>
                    <div className={`text-sm font-medium ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'contributions' && (
            <div className="text-center">
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Contribution Graph
                </h3>
                <p className={`text-lg ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Last 12 months of coding activity
                </p>
              </div>
              
              <div className="relative">
                <div ref={chartRef} className="overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src={`https://ghchart.rshah.org/${username}`}
                    alt={`${username}'s GitHub contribution chart`}
                    className="w-full h-auto"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div 
                    className={`hidden text-center py-12 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    <FaGithub className="text-6xl mx-auto mb-4" />
                    <p className="text-xl mb-2">Contribution graph unavailable</p>
                    <p>Check out my GitHub profile for the latest activity!</p>
                  </div>
                </div>
                
                {/* Download Button */}
                <motion.button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = `https://ghchart.rshah.org/${username}`;
                    link.download = `${username}-contribution-chart.png`;
                    link.click();
                  }}
                  className={`absolute top-4 right-4 p-3 rounded-lg transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'bg-white/80 hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  } shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaDownload className="text-xl" />
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === 'languages' && (
            <div>
              <h3 className={`text-2xl font-bold mb-8 text-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Programming Languages
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-6 rounded-xl ${
                      isDark 
                        ? 'bg-gray-800/50 border border-gray-700' 
                        : 'bg-white border border-gray-200'
                    } shadow-lg`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className={`text-xl font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {lang.name}
                      </h4>
                      <span className={`text-lg font-bold ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {lang.percentage}%
                      </span>
                    </div>
                    
                    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2`}>
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {Math.round(lang.bytes / 1024)} KB of code
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h3 className={`text-2xl font-bold mb-8 text-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                GitHub Profile
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={`p-8 rounded-xl ${
                    isDark 
                      ? 'bg-gray-800/50 border border-gray-700' 
                      : 'bg-white border border-gray-200'
                  } shadow-xl`}
                >
                  <div className="flex items-center gap-6 mb-6">
                    <img
                      src={stats.profileInfo.avatarUrl}
                      alt="Profile"
                      className="w-20 h-20 rounded-full border-4 border-blue-500"
                    />
                    <div>
                      <h4 className={`text-2xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {stats.profileInfo.name}
                      </h4>
                      <p className={`text-lg ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        @{username}
                      </p>
                    </div>
                  </div>
                  
                  <p className={`text-lg mb-6 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {stats.profileInfo.bio}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaUsers className={`text-blue-500`} />
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {stats.profileInfo.followers} followers • {stats.profileInfo.following} following
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaHeart className={`text-red-500`} />
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {stats.profileInfo.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaRocket className={`text-green-500`} />
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {stats.profileInfo.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className={`text-purple-500`} />
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Joined {new Date(stats.profileInfo.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Yearly Contributions */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={`p-8 rounded-xl ${
                    isDark 
                      ? 'bg-gray-800/50 border border-gray-700' 
                      : 'bg-white border border-gray-200'
                  } shadow-xl`}
                >
                  <h4 className={`text-xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Yearly Contributions
                  </h4>
                  
                  <div className="space-y-4">
                    {Object.entries(stats.yearlyContributions).map(([year, contributions]) => (
                      <div key={year}>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-medium ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {year}
                          </span>
                          <span className={`font-bold ${
                            isDark ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                            {contributions} contributions
                          </span>
                        </div>
                        <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3`}>
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(contributions / Math.max(...Object.values(stats.yearlyContributions))) * 100}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === 'repos' && (
            <div>
              <h3 className={`text-2xl font-bold mb-8 text-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Repository Statistics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { 
                    label: 'Total Repository Size', 
                    value: `${stats.repositoryStats.totalSize} MB`, 
                    icon: FaDownload, 
                    color: 'blue'
                  },
                  { 
                    label: 'Average Repo Size', 
                    value: `${stats.repositoryStats.avgRepoSize} KB`, 
                    icon: FaCode, 
                    color: 'green'
                  },
                  { 
                    label: 'Most Starred Repo', 
                    value: stats.repositoryStats.mostStarredRepo, 
                    icon: FaStar, 
                    color: 'yellow'
                  },
                  { 
                    label: 'Stars on Top Repo', 
                    value: stats.repositoryStats.mostStarredRepoStars, 
                    icon: FaTrophy, 
                    color: 'purple'
                  },
                  { 
                    label: 'Open Issues', 
                    value: stats.repositoryStats.totalIssues, 
                    icon: FaEye, 
                    color: 'red'
                  },
                  { 
                    label: 'Total Watchers', 
                    value: stats.totalWatchers, 
                    icon: FaUsers, 
                    color: 'indigo'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-6 rounded-xl ${
                      isDark 
                        ? 'bg-gray-800/50 border border-gray-700' 
                        : 'bg-white border border-gray-200'
                    } shadow-lg`}
                  >
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                        isDark 
                          ? `bg-${stat.color}-500/20 text-${stat.color}-400` 
                          : `bg-${stat.color}-100 text-${stat.color}-600`
                      }`}>
                        <stat.icon className="text-xl" />
                      </div>
                      <div className={`text-2xl font-bold mb-2 ${
                        isDark ? `text-${stat.color}-400` : `text-${stat.color}-600`
                      }`}>
                        {stat.value}
                      </div>
                      <div className={`text-sm font-medium ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h3 className={`text-2xl font-bold mb-8 text-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${
                      isDark 
                        ? 'bg-gray-800/50 border border-gray-700' 
                        : 'bg-white border border-gray-200'
                    } shadow-lg`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'PushEvent' ? 'bg-green-500' :
                        activity.type === 'CreateEvent' ? 'bg-blue-500' :
                        activity.type === 'WatchEvent' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`} />
                      <div className="flex-1">
                        <p className={`font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {activity.type.replace('Event', '')} in {activity.repo}
                        </p>
                        <p className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {new Date(activity.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600 hover:text-white shadow-lg'
                : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400 hover:text-gray-900 shadow-lg'
            }`}
          >
            <FaGithub className="text-2xl" />
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStatsSection;
