import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Customize your learning experience</p>
      </motion.div>

      <div style={{
        ...styles.settingsList,
        maxWidth: isMobile ? '100%' : '600px',
        marginLeft: isMobile ? '0' : 'auto',
        marginRight: isMobile ? '0' : 'auto',
      }}>
        {/* Language Setting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            ...styles.settingCard,
            padding: isMobile ? '16px' : '24px',
          }}
        >
          <div style={{
            ...styles.settingHeader,
            gap: isMobile ? '12px' : '16px',
            marginBottom: isMobile ? '12px' : '16px',
          }}>
            <div style={{
              ...styles.settingIcon,
              fontSize: isMobile ? '24px' : '28px',
            }}>🌐</div>
            <div style={styles.settingInfo}>
              <h3 style={{
                ...styles.settingTitle,
                fontSize: isMobile ? '16px' : '18px',
              }}>Language</h3>
              <p style={{
                ...styles.settingDescription,
                fontSize: isMobile ? '13px' : '14px',
              }}>Choose your preferred language</p>
            </div>
          </div>

          <div style={styles.languageSelector}>
            <motion.button
              whileHover={isMobile ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              style={{
                ...styles.languageButton,
                padding: isMobile ? '12px 14px' : '14px 16px',
              }}
            >
              <span style={{
                ...styles.languageFlag,
                fontSize: isMobile ? '20px' : '24px',
              }}>{currentLang.flag}</span>
              <span style={{
                ...styles.languageName,
                fontSize: isMobile ? '15px' : '16px',
              }}>{currentLang.name}</span>
              <span style={styles.dropdownArrow}>{showLanguageDropdown ? '▲' : '▼'}</span>
            </motion.button>

            <AnimatePresence>
              {showLanguageDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    ...styles.dropdown,
                    padding: isMobile ? '6px' : '8px',
                  }}
                >
                  {languages.map((lang, index) => (
                    <motion.button
                      key={lang.code}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={isMobile ? {} : { backgroundColor: 'var(--color-surface-hover)' }}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                      style={{
                        ...styles.dropdownItem,
                        padding: isMobile ? '10px 14px' : '12px 16px',
                        backgroundColor: language === lang.code ? 'var(--color-accent-dim)' : 'transparent',
                      }}
                    >
                      <span style={{
                        ...styles.dropdownFlag,
                        fontSize: isMobile ? '18px' : '20px',
                      }}>{lang.flag}</span>
                      <span style={{
                        ...styles.dropdownName,
                        fontSize: isMobile ? '14px' : '15px',
                      }}>{lang.name}</span>
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
          style={{
            ...styles.settingCard,
            padding: isMobile ? '16px' : '24px',
          }}
        >
          <div style={{
            ...styles.settingHeader,
            gap: isMobile ? '12px' : '16px',
            marginBottom: isMobile ? '12px' : '16px',
          }}>
            <div style={{
              ...styles.settingIcon,
              fontSize: isMobile ? '24px' : '28px',
            }}>🎨</div>
            <div style={styles.settingInfo}>
              <h3 style={{
                ...styles.settingTitle,
                fontSize: isMobile ? '16px' : '18px',
              }}>Theme</h3>
              <p style={{
                ...styles.settingDescription,
                fontSize: isMobile ? '13px' : '14px',
              }}>Dark mode (default)</p>
            </div>
          </div>
          <div style={styles.themeBadge}>Dark</div>
        </motion.div>

        {/* About Setting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{
            ...styles.settingCard,
            padding: isMobile ? '16px' : '24px',
          }}
        >
          <div style={{
            ...styles.settingHeader,
            gap: isMobile ? '12px' : '16px',
          }}>
            <div style={{
              ...styles.settingIcon,
              fontSize: isMobile ? '24px' : '28px',
            }}>ℹ️</div>
            <div style={styles.settingInfo}>
              <h3 style={{
                ...styles.settingTitle,
                fontSize: isMobile ? '16px' : '18px',
              }}>About Teacher AI</h3>
              <p style={{
                ...styles.settingDescription,
                fontSize: isMobile ? '13px' : '14px',
              }}>Version 1.0.0</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  settingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  settingCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-border)',
  },
  settingHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  settingIcon: {
    flexShrink: 0,
  },
  settingInfo: {
    flex: 1,
    minWidth: 0,
  },
  settingTitle: {
    fontWeight: 600,
    marginBottom: '3px',
    color: 'var(--color-text-primary)',
  },
  settingDescription: {
    color: 'var(--color-text-secondary)',
  },
  languageSelector: {
    position: 'relative',
  },
  languageButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    backgroundColor: 'var(--color-bg-tertiary)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  languageFlag: {
    flexShrink: 0,
  },
  languageName: {
    flex: 1,
    fontWeight: 500,
    textAlign: 'left',
    color: 'var(--color-text-primary)',
  },
  dropdownArrow: {
    fontSize: '12px',
    color: 'var(--color-text-tertiary)',
    flexShrink: 0,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '6px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    zIndex: 100,
    boxShadow: 'var(--shadow-lg)',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  dropdownFlag: {
    flexShrink: 0,
  },
  dropdownName: {
    flex: 1,
    fontWeight: 500,
    textAlign: 'left',
    color: 'var(--color-text-primary)',
  },
  checkmark: {
    color: 'var(--color-accent)',
    fontWeight: 600,
    flexShrink: 0,
  },
  themeBadge: {
    display: 'inline-block',
    padding: '6px 14px',
    backgroundColor: 'var(--color-accent-dim)',
    color: 'var(--color-accent)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 600,
  },
};

export default Settings;
