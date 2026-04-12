import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

const Settings: React.FC<SettingsProps> = ({ language, onLanguageChange }) => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.container}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 style={styles.title}>Settings</h1>
        <p style={styles.subtitle}>Customize your learning experience</p>
      </motion.div>

      <div style={styles.settingsList}>
        {/* Language Setting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={styles.settingCard}
        >
          <div style={styles.settingHeader}>
            <div style={styles.settingIcon}>🌐</div>
            <div style={styles.settingInfo}>
              <h3 style={styles.settingTitle}>Language</h3>
              <p style={styles.settingDescription}>Choose your preferred language</p>
            </div>
          </div>

          <div style={styles.languageSelector}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              style={styles.languageButton}
            >
              <span style={styles.languageFlag}>{currentLang.flag}</span>
              <span style={styles.languageName}>{currentLang.name}</span>
              <span style={styles.dropdownArrow}>{showLanguageDropdown ? '▲' : '▼'}</span>
            </motion.button>

            <AnimatePresence>
              {showLanguageDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={styles.dropdown}
                >
                  {languages.map((lang, index) => (
                    <motion.button
                      key={lang.code}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ backgroundColor: 'var(--color-surface-hover)' }}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                      style={{
                        ...styles.dropdownItem,
                        backgroundColor: language === lang.code ? 'var(--color-accent-dim)' : 'transparent',
                      }}
                    >
                      <span style={styles.dropdownFlag}>{lang.flag}</span>
                      <span style={styles.dropdownName}>{lang.name}</span>
                      {language === lang.code && (
                        <span style={styles.checkmark}>✓</span>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Theme Setting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={styles.settingCard}
        >
          <div style={styles.settingHeader}>
            <div style={styles.settingIcon}>🎨</div>
            <div style={styles.settingInfo}>
              <h3 style={styles.settingTitle}>Theme</h3>
              <p style={styles.settingDescription}>Dark mode (default)</p>
            </div>
          </div>
          <div style={styles.themeBadge}>Dark</div>
        </motion.div>

        {/* About Setting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={styles.settingCard}
        >
          <div style={styles.settingHeader}>
            <div style={styles.settingIcon}>ℹ️</div>
            <div style={styles.settingInfo}>
              <h3 style={styles.settingTitle}>About Teacher AI</h3>
              <p style={styles.settingDescription}>Version 1.0.0</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '120px 24px 40px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '48px',
    fontWeight: 700,
    letterSpacing: '-1.5px',
    marginBottom: '8px',
    color: 'var(--color-text-primary)',
  },
  subtitle: {
    fontSize: '18px',
    color: 'var(--color-text-secondary)',
    fontWeight: 400,
    marginBottom: '40px',
  },
  settingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  settingCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-xl)',
    padding: '24px',
    border: '1px solid var(--color-border)',
  },
  settingHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  settingIcon: {
    fontSize: '28px',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '4px',
    color: 'var(--color-text-primary)',
  },
  settingDescription: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
  },
  languageSelector: {
    position: 'relative',
  },
  languageButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '14px 16px',
    backgroundColor: 'var(--color-bg-tertiary)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  languageFlag: {
    fontSize: '24px',
  },
  languageName: {
    flex: 1,
    fontSize: '16px',
    fontWeight: 500,
    textAlign: 'left',
    color: 'var(--color-text-primary)',
  },
  dropdownArrow: {
    fontSize: '12px',
    color: 'var(--color-text-tertiary)',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '8px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '8px',
    zIndex: 100,
    boxShadow: 'var(--shadow-lg)',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  dropdownFlag: {
    fontSize: '20px',
  },
  dropdownName: {
    flex: 1,
    fontSize: '15px',
    fontWeight: 500,
    textAlign: 'left',
    color: 'var(--color-text-primary)',
  },
  checkmark: {
    color: 'var(--color-accent)',
    fontWeight: 600,
  },
  themeBadge: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: 'var(--color-accent-dim)',
    color: 'var(--color-accent)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 600,
  },
};

export default Settings;
