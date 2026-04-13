import React from 'react';
import { motion } from 'framer-motion';

type Tab = 'my-teachers' | 'create-teacher' | 'settings';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TeacherIcon: React.FC<{ active?: boolean }> = ({ active }) => {
  const c = active ? '#ffd60a' : '#6e6e73';
  return (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
      <line x1="40" y1="20" x2="30" y2="6" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="60" y1="20" x2="70" y2="6" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="30" cy="5" r="3" stroke={c} strokeWidth="2" />
      <circle cx="70" cy="5" r="3" stroke={c} strokeWidth="2" />
      <rect x="15" y="20" width="70" height="50" rx="6" stroke={c} strokeWidth="4.5" />
      <rect x="22" y="27" width="40" height="30" rx="4" stroke={c} strokeWidth="3" />
      <rect x="25" y="36" width="12" height="8" rx="2" stroke={c} strokeWidth="2.5" />
      <rect x="45" y="36" width="12" height="8" rx="2" stroke={c} strokeWidth="2.5" />
      <line x1="37" y1="40" x2="45" y2="40" stroke={c} strokeWidth="2.5" />
      <circle cx="31" cy="40" r="2.5" fill={c} />
      <circle cx="51" cy="40" r="2.5" fill={c} />
      <circle cx="76" cy="35" r="4" stroke={c} strokeWidth="2" />
      <circle cx="76" cy="50" r="4" stroke={c} strokeWidth="2" />
    </svg>
  );
};

const SparkleIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill={active ? '#ffd60a' : '#6e6e73'} />
  </svg>
);

const GearIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" fill={active ? '#ffd60a' : '#6e6e73'} />
    <path d="M12 1 L14 4 L12 7 L10 4 Z" fill={active ? '#ffd60a' : '#6e6e73'} />
    <path d="M12 17 L14 20 L12 23 L10 20 Z" fill={active ? '#ffd60a' : '#6e6e73'} />
    <path d="M1 12 L4 10 L7 12 L4 14 Z" fill={active ? '#ffd60a' : '#6e6e73'} />
    <path d="M17 12 L20 10 L23 12 L20 14 Z" fill={active ? '#ffd60a' : '#6e6e73'} />
    <path d="M4.2 4.2 L6.5 6 L5 8.5 L2.5 6.5 Z" fill={active ? '#ffd60a' : '#6e6e73'} />
    <path d="M19.8 19.8 L17.5 18 L19 15.5 L21.5 17.5 Z" fill={active ? '#ffd60a' : '#6e6e73'} />
    <path d="M4.2 19.8 L6.5 18 L5 15.5 L2.5 17.5 Z" fill={active ? '#ffd60a' : '#6e6e73'} />
    <path d="M19.8 4.2 L17.5 6 L19 8.5 L21.5 6.5 Z" fill={active ? '#ffd60a' : '#6e6e73'} />
  </svg>
);

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: {
    id: Tab;
    label: string;
    icon: (active: boolean) => React.ReactNode;
  }[] = [
    { id: 'my-teachers', label: 'My Teachers', icon: (active) => <TeacherIcon active={active} /> },
    { id: 'create-teacher', label: 'Create Teacher', icon: (active) => <SparkleIcon active={active} /> },
    { id: 'settings', label: 'Settings', icon: (active) => <GearIcon active={active} /> },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={styles.logo}
        >
          <span style={styles.logoIcon}>🎓</span>
          <span style={styles.logoText}>Teacher AI</span>
        </motion.div>

        <div style={styles.tabContainer}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={styles.tab}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  style={styles.activeTabBackground}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span style={styles.tabIcon}>{tab.icon(activeTab === tab.id)}</span>
              <span style={{
                ...styles.tabLabel,
                color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              }}>
                {tab.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderBottom: '1px solid var(--color-border)',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    fontSize: '28px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '-0.5px',
    color: 'var(--color-text-primary)',
  },
  tabContainer: {
    display: 'flex',
    gap: '8px',
    position: 'relative',
  },
  tab: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  activeTabBackground: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'var(--color-accent-dim)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-accent-glow)',
  },
  tabIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: '14px',
    fontWeight: 500,
    transition: 'color 0.2s ease',
  },
};

export default Navigation;
