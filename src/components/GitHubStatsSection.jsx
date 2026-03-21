import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub, FaCode, FaStar, FaEye, FaGitAlt, FaCalendarAlt,
  FaUsers, FaClock, FaTrophy, FaFire, FaSync, FaDownload,
  FaMapMarkerAlt, FaBuilding, FaArrowRight, FaRocket
} from 'react-icons/fa';

/* ─── Minimal Colors ─── */
const BLUE   = '#60a5fa';
const GREEN  = '#34d399';
const YELLOW = '#fbbf24';
const RED    = '#f87171';
const PURPLE = '#a78bfa';

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572a5',
  Java: '#b07219', CSS: '#563d7c', HTML: '#e34c26', Rust: '#dea584',
  Go: '#00add8', C: '#555555', 'C++': '#f34b7d', Ruby: '#701516',
  Swift: '#ffac45', Kotlin: '#a97bff', default: '#64748b',
};

function getLangColor(name) {
  return LANG_COLORS[name] || LANG_COLORS.default;
}

/* ─── Minimal Stat Card ─── */
function StatCard({ label, value, icon: Icon, color, suffix = '', index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        backgroundColor: '#0d0d0d',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '8px',
        padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '16px',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {label}
        </div>
        <Icon style={{ color, fontSize: '1.2rem', opacity: 0.8 }} />
      </div>
      <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 600, lineHeight: 1 }}>
        {value}<span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.3)', marginLeft: '4px' }}>{suffix}</span>
      </div>
    </motion.div>
  );
}

/* ─── Minimal Tab Bar ─── */
function TabBar({ tabs, active, onSelect }) {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px',
      borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px'
    }}>
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <motion.button
            key={id}
            onClick={() => onSelect(id)}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
              fontWeight: 500, fontSize: '0.85rem', fontFamily: "'Outfit', sans-serif",
              backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'background-color 0.2s ease, color 0.2s ease',
            }}
          >
            <Icon size={14} />
            <span>{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─── Minimal Language Bar ─── */
function LangBar({ lang, index }) {
  const color = getLangColor(lang.name);
  return (
    <div style={{
      backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
          <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>{lang.name}</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{lang.percentage}%</span>
      </div>
      <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }} whileInView={{ width: `${lang.percentage}%` }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.05 }}
          style={{ height: '100%', backgroundColor: color, opacity: 0.8 }}
        />
      </div>
    </div>
  );
}

/* ─── Activity Item ─── */
function ActivityItem({ activity }) {
  const date = new Date(activity.created_at);
  const formatted = isNaN(date) ? '—' : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <FaCode style={{ color: 'rgba(255,255,255,0.2)', fontSize: '1.2rem' }} />
        <div>
          <p style={{ color: '#fff', fontSize: '0.9rem', margin: 0 }}>
            {activity.type.replace('Event', '')} <span style={{ color: 'rgba(255,255,255,0.4)' }}>in</span> {activity.repo}
          </p>
        </div>
      </div>
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{formatted}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const GitHubStatsSection = ({ isDark, username = 'Aadithyanas' }) => {
  const [stats, setStats] = useState({
    totalCommits: 0, totalRepos: 0, totalStars: 0, totalForks: 0, totalWatchers: 0,
    languages: [], recentActivity: [], loading: true, streak: 0, contributions: 0,
    profileInfo: {}, yearlyContributions: {}, repositoryStats: {}, error: null, isFallback: false
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { fetchGitHubStats(); }, [username]);

  const loadFallbackData = () => {
    setStats({
      totalCommits: 500, totalRepos: 15, totalStars: 25, totalForks: 8, totalWatchers: 12,
      languages: [
        { name: 'JavaScript', bytes: 50000, percentage: 35 },
        { name: 'TypeScript', bytes: 30000, percentage: 25 },
        { name: 'Python',     bytes: 25000, percentage: 20 },
      ],
      recentActivity: [
        { type: 'PushEvent', repo: `${username}/Portfolio`, created_at: new Date().toISOString() },
        { type: 'CreateEvent', repo: `${username}/NewProject`, created_at: new Date(Date.now()-86400000).toISOString() },
      ],
      loading: false, streak: 15, contributions: 200,
      profileInfo: {
        name: username, bio: 'Passionate developer building amazing projects',
        location: 'Earth', company: 'Freelancer', followers: 10, following: 25,
        createdAt: '2020-01-01T00:00:00Z', avatarUrl: `https://github.com/${username}.png`,
      },
      yearlyContributions: { 2024: 120, 2023: 60 },
      repositoryStats: { totalSize: 50, avgRepoSize: 3, mostStarredRepo: 'Portfolio', mostStarredRepoStars: 5, totalIssues: 2 },
      error: null, isFallback: true,
    });
  };

  const fetchGitHubStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));
      const now = Date.now();
      const cacheKey = `github-data-${username}`;
      const timeKey  = `github-stats-${username}`;
      const lastFetch = localStorage.getItem(timeKey);

      if (lastFetch && (now - parseInt(lastFetch)) < 3600000) {
        const cached = localStorage.getItem(cacheKey);
        if (cached) { setStats(prev => ({ ...prev, ...JSON.parse(cached), loading: false })); return; }
      }

      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const headers = token ? { Authorization: `token ${token}` } : {};

      const [userRes, reposRes, eventsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, { headers }),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
        fetch(`https://api.github.com/users/${username}/events/public?per_page=20`, { headers }),
      ]);

      if (!userRes.ok || !reposRes.ok) throw new Error(userRes.status === 403 ? 'Rate limit exceeded.' : `API error: ${userRes.status}`);

      const [userData, reposData, eventsData] = await Promise.all([
        userRes.json(), reposRes.json(), eventsRes.ok ? eventsRes.json() : Promise.resolve([]),
      ]);

      const totalStars = reposData.reduce((a, r) => a + r.stargazers_count, 0);
      const totalForks = reposData.reduce((a, r) => a + r.forks_count, 0);
      const totalWatchers = reposData.reduce((a, r) => a + r.watchers_count, 0);

      const langRaw = {};
      await Promise.all(reposData.slice(0, 12).map(async (r) => {
        try {
          const res = await fetch(r.languages_url, { headers });
          const data = await res.json();
          Object.entries(data).forEach(([l, b]) => { langRaw[l] = (langRaw[l] || 0) + b; });
        } catch {}
      }));

      const totalBytes = Object.values(langRaw).reduce((a, b) => a + Number(b), 0);
      const languages = Object.entries(langRaw)
        .sort(([,a], [,b]) => Number(b) - Number(a)).slice(0, 8)
        .map(([name, bytes]) => ({ name, bytes, percentage: Math.round((Number(bytes) / totalBytes) * 100) }));

      const recentActivity = eventsData.slice(0, 8).map(e => ({ type: e.type, repo: e.repo?.name || 'Unknown', created_at: e.created_at }));

      const estimated = Math.max(userData.public_repos * 20, 150);
      const contrib = Math.max(userData.public_repos * 15, 100);
      const streak = Math.min(Math.floor(contrib / 30), 365);
      const totalSize = reposData.reduce((a, r) => a + (r.size || 0), 0);
      const top = reposData.reduce((m, r) => r.stargazers_count > m.stargazers_count ? r : m, reposData[0] || {});

      const data = {
        totalCommits: estimated, totalRepos: userData.public_repos,
        totalStars, totalForks, totalWatchers, languages, recentActivity,
        loading: false, streak, contributions: contrib,
        profileInfo: {
          name: userData.name || userData.login, bio: userData.bio,
          location: userData.location, company: userData.company,
          followers: userData.followers, following: userData.following,
          createdAt: userData.created_at, avatarUrl: userData.avatar_url,
        },
        yearlyContributions: { [new Date().getFullYear()]: contrib },
        repositoryStats: {
          totalSize: Math.round(totalSize / 1024),
          avgRepoSize: reposData.length ? Math.round(totalSize / reposData.length) : 0,
          mostStarredRepo: top.name || 'N/A', mostStarredRepoStars: top.stargazers_count || 0,
          totalIssues: reposData.reduce((a, r) => a + (r.open_issues_count || 0), 0),
        },
        error: null, isFallback: false
      };

      localStorage.setItem(timeKey, now.toString());
      localStorage.setItem(cacheKey, JSON.stringify(data));
      setStats(data);
    } catch (err) {
      const cached = localStorage.getItem(`github-data-${username}`);
      if (cached) {
        setStats(prev => ({ ...prev, ...JSON.parse(cached), loading: false, error: err.message }));
      } else {
        setStats(prev => ({ ...prev, loading: false, error: err.message }));
      }
    }
  };

  const TABS = [
    { id: 'overview',      label: 'Overview',       icon: FaCode        },
    { id: 'contributions', label: 'Contributions',  icon: FaCalendarAlt },
    { id: 'languages',     label: 'Languages',      icon: FaGitAlt      },
    { id: 'profile',       label: 'Profile',        icon: FaUsers       },
    { id: 'repos',         label: 'Repositories',   icon: FaRocket      },
    { id: 'activity',      label: 'Activity',       icon: FaClock       },
  ];

  const sectionStyle = {
    backgroundColor: '#0a0a0a',
    padding: '96px 0 112px',
    fontFamily: "'Outfit', sans-serif",
    position: 'relative',
    zIndex: 50,
  };

  if (stats.loading) {
    return (
      <section style={sectionStyle}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', padding: '60px' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading Activity...</p>
        </div>
      </section>
    );
  }

  if (stats.error && !stats.totalRepos) {
    return (
      <section style={sectionStyle}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', padding: '60px' }}>
          <p style={{ color: '#f87171', marginBottom: '16px' }}>{stats.error}</p>
          <button onClick={loadFallbackData} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Load Demo Data</button>
        </div>
      </section>
    );
  }

  return (
    <section id="github" style={sectionStyle}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* Minimal Heading */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontFamily: "'Outfit', monospace", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', margin: '0 0 14px 0' }}>
                Open Source
              </p>
              <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#f0f0f0', margin: '0 0 14px 0', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaGithub /> GitHub Activity
              </h2>
              <p style={{ fontWeight: 300, fontSize: '0.92rem', color: 'rgba(255,255,255,0.38)', margin: 0, lineHeight: 1.65 }}>
                A realtime snapshot of my codebase contributions and repository stats.
              </p>
            </div>
          </div>
          {stats.isFallback && <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '0.75rem', color: 'rgba(251,191,36,0.8)', padding: '4px 8px', background: 'rgba(251,191,36,0.1)', borderRadius: '4px' }}>Demo Data (API Rate Limit Exceeded)</span>}
        </motion.div>

        <TabBar tabs={TABS} active={activeTab} onSelect={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            
            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <StatCard label="Commits" value={stats.totalCommits} icon={FaCode} color={BLUE} suffix="+" index={0} />
                <StatCard label="Repositories" value={stats.totalRepos} icon={FaGitAlt} color={GREEN} index={1} />
                <StatCard label="Stars" value={stats.totalStars} icon={FaStar} color={YELLOW} index={2} />
                <StatCard label="Forks" value={stats.totalForks} icon={FaEye} color={PURPLE} index={3} />
              </div>
            )}

            {/* CONTRIBUTIONS */}
            {activeTab === 'contributions' && (
              <div style={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '24px' }}>
                <img
                  src={`https://ghchart.rshah.org/60a5fa/${username}`}
                  alt="GitHub chart"
                  style={{ width: '100%', opacity: 0.9, filter: 'grayscale(100%) brightness(1.5) sepia(100%) hue-rotate(180deg) saturate(300%) contrast(0.8)' }}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            )}

            {/* LANGUAGES */}
            {activeTab === 'languages' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {stats.languages.map((lang, i) => <LangBar key={lang.name} lang={lang} index={i} />)}
              </div>
            )}

            {/* REPOSITORIES */}
            {activeTab === 'repos' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <StatCard label="Total Size (MB)" value={stats.repositoryStats.totalSize} icon={FaDownload} color={BLUE} index={0} />
                <StatCard label="Avg Size (KB)" value={stats.repositoryStats.avgRepoSize} icon={FaCode} color={GREEN} index={1} />
                <StatCard label="Top Stars" value={stats.repositoryStats.mostStarredRepoStars} icon={FaTrophy} color={YELLOW} index={2} />
                <StatCard label="Open Issues" value={stats.repositoryStats.totalIssues} icon={FaEye} color={RED} index={3} />
              </div>
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                <div style={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '32px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <img src={stats.profileInfo.avatarUrl} alt="avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>{stats.profileInfo.name}</h3>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>@{username}</p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                       {stats.profileInfo.followers} Followers • {stats.profileInfo.following} Following
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACTIVITY */}
            {activeTab === 'activity' && (
              <div style={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                {stats.recentActivity.map((a, i) => <ActivityItem key={i} activity={a} />)}
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        <div style={{ marginTop: '48px' }}>
          <a
            href={`https://github.com/${username}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '12px 24px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.03)',
              color: '#fff', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none',
              fontSize: '0.9rem', fontWeight: 500, fontFamily: "'Outfit', sans-serif"
            }}
          >
            Visit GitHub <FaArrowRight size={12} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default GitHubStatsSection;
