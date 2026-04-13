import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lessons } from '../data/lessons';

interface LessonCardsProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
}

const LessonCards: React.FC<LessonCardsProps> = ({ isOpen, onClose, teacherName }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const cols = isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={styles.fullscreen}
        >
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                style={styles.backButton}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Back
                </span>
              </motion.button>
              <div style={styles.headerInfo}>
                <h2 style={{
                  ...styles.headerTitle,
                  fontSize: isMobile ? '18px' : '24px',
                }}>
                  Lessons
                </h2>
                <p style={{
                  ...styles.headerSubtitle,
                  fontSize: isMobile ? '12px' : '14px',
                }}>
                  {teacherName} · {lessons.length} lessons
                </p>
              </div>
            </div>
          </div>

          {/* Lesson Grid */}
          <div style={{
            ...styles.grid,
            gridTemplateColumns: cols,
            gap: isMobile ? '10px' : '16px',
            padding: isMobile ? '12px 16px 100px' : '24px 32px 100px',
          }}>
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.025 }}
                whileTap={{ scale: 0.97 }}
                whileHover={isMobile ? {} : {
                  y: -2,
                  borderColor: 'var(--color-accent)',
                  boxShadow: 'var(--shadow-glow)',
                }}
                style={{
                  ...styles.lessonCard,
                  padding: isMobile ? '16px' : '20px',
                  flexDirection: isMobile ? 'column' : 'row',
                }}
              >
                <div style={{
                  ...styles.lessonNumber,
                  width: isMobile ? '40px' : '48px',
                  height: isMobile ? '40px' : '48px',
                  fontSize: isMobile ? '15px' : '18px',
                }}>
                  {lesson.id}
                </div>
                <div style={styles.lessonContent}>
                  <h3 style={{
                    ...styles.lessonTitle,
                    fontSize: isMobile ? '15px' : '16px',
                  }}>
                    {lesson.title}
                  </h3>
                  <p style={{
                    ...styles.lessonDescription,
                    fontSize: isMobile ? '12px' : '13px',
                  }}>
                    {lesson.description}
                  </p>
                </div>
                {!isMobile && (
                  <div style={styles.lessonProgress}>
                    <span style={{
                      ...styles.progressText,
                      fontSize: '16px',
                      color: lesson.progress === 100 ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    }}>
                      {lesson.progress}%
                    </span>
                    <div style={styles.progressBarBg}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lesson.progress}%` }}
                        transition={{ delay: index * 0.025 + 0.2, duration: 0.5, ease: 'easeOut' }}
                        style={{
                          ...styles.progressBarFill,
                          backgroundColor: lesson.progress === 100 ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                        }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  fullscreen: {
    position: 'fixed',
    inset: 0,
    zIndex: 2000,
    backgroundColor: 'var(--color-bg)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg)',
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 0',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: 700,
    letterSpacing: '-0.5px',
    color: 'var(--color-text-primary)',
    marginBottom: '2px',
  },
  headerSubtitle: {
    color: 'var(--color-text-secondary)',
  },
  grid: {
    display: 'grid',
    flex: 1,
    overflowY: 'auto',
  },
  lessonCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  lessonNumber: {
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-accent-dim)',
    border: '1px solid var(--color-accent)',
    color: 'var(--color-accent)',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  lessonContent: {
    flex: 1,
    minWidth: 0,
  },
  lessonProgress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
    flexShrink: 0,
    minWidth: '50px',
  },
  progressText: {
    fontWeight: 600,
    fontVariantNumeric: 'tabular-nums',
  },
  progressBarBg: {
    width: '60px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: 'var(--color-bg-tertiary)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '2px',
    transition: 'background-color 0.2s ease',
  },
  lessonTitle: {
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    marginBottom: '4px',
  },
  lessonDescription: {
    color: 'var(--color-text-secondary)',
    lineHeight: 1.4,
  },
};

export default LessonCards;
