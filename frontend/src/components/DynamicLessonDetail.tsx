import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getLesson, Lesson } from '../services/api';
import { setLessonProgress, loadProgress } from '../utils/progress';

interface LessonDetailProps {
  teacherId: string;
  lessonId: number;
  onBack: () => void;
  onNavigateToLesson: (lessonId: number) => void;
  lessonProgress: Record<number, number>;
  onProgressUpdate: (progress: Record<number, number>) => void;
  onOpenChat?: (lessonId: number, lessonTitle: string) => void;
}

const TOTAL_LESSONS = 20;

const DynamicLessonDetail: React.FC<LessonDetailProps> = ({
  teacherId,
  lessonId,
  onBack,
  onNavigateToLesson,
  lessonProgress: externalProgress,
  onProgressUpdate,
  onOpenChat,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [internalProgress, setInternalProgress] = useState<Record<number, number>>({});
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const savedRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    loadLessonData();
  }, [teacherId, lessonId]);

  const loadLessonData = async () => {
    try {
      setLoading(true);
      const data = await getLesson(teacherId, lessonId);
      setLesson(data);
    } catch (error) {
      console.error('Failed to load lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    savedRef.current = false;
    const loaded = { ...loadProgress() };
    setInternalProgress(loaded);
    document.body.style.overflow = 'hidden';

    const scrollEl = scrollRef.current;
    const latestProgress = { current: loaded[lessonId] ?? 0 };

    const handleScroll = () => {
      if (!scrollEl) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const scrollable = scrollHeight - clientHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(100, Math.round((scrollTop / scrollable) * 100));
      latestProgress.current = pct;
      setInternalProgress((prev) => ({ ...prev, [lessonId]: pct }));
    };

    scrollEl?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.body.style.overflow = '';
      scrollEl?.removeEventListener('scroll', handleScroll);
      if (!savedRef.current) {
        savedRef.current = true;
        if (latestProgress.current > 0) {
          setLessonProgress(lessonId, latestProgress.current);
        }
      }
    };
  }, [lessonId]);

  const progress = internalProgress[lessonId] ?? externalProgress[lessonId] ?? 0;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={styles.root}
      >
        <div style={{ padding: '60px 16px', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>Loading lesson...</p>
        </div>
      </motion.div>
    );
  }

  if (!lesson) return null;

  const prevLessonId = lessonId > 1 ? lessonId - 1 : null;
  const nextLessonId = lessonId < TOTAL_LESSONS ? lessonId + 1 : null;

  const saveCurrentProgress = () => {
    if (!savedRef.current) {
      savedRef.current = true;
      const current = internalProgress[lessonId] ?? 0;
      if (current > 0) {
        setLessonProgress(lessonId, current);
      }
    }
  };

  const handleNavigate = (targetId: number) => {
    saveCurrentProgress();
    onNavigateToLesson(targetId);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const handleBack = () => {
    saveCurrentProgress();
    const updated = { ...loadProgress() };
    onProgressUpdate(updated);
    onBack();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={styles.root}
    >
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            style={styles.backButton}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={styles.backButtonText}>Back</span>
          </motion.button>
          <div style={styles.headerInfo}>
            <h2 style={{
              ...styles.headerTitle,
              fontSize: isMobile ? '16px' : '20px',
            }}>
              {lesson.title}
            </h2>
            <p style={{
              ...styles.headerSubtitle,
              fontSize: isMobile ? '12px' : '13px',
            }}>
              Lesson {lesson.lesson_number}
              <span style={{
                marginLeft: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '12px',
                color: progress === 100 ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
              }}>
                {progress === 100 ? '✓ 100%' : `${progress}%`}
              </span>
            </p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={!isMobile ? { scale: 1.03 } : {}}
          onClick={() => onOpenChat?.(lessonId, lesson.title)}
          style={styles.askButton}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M9 9a3 3 0 0 1 5.12 1.83c0 1.5-1.83 1.67-2.12 3.17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1" fill="currentColor" />
          </svg>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>Ask Teacher</span>
        </motion.button>
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} style={styles.scrollContent}>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={styles.hero}
        >
          <h1 style={{
            ...styles.heroTitle,
            fontSize: isMobile ? '28px' : '36px',
          }}>
            Lesson {lesson.lesson_number}
          </h1>
          <p style={{
            ...styles.heroSubtitle,
            fontSize: isMobile ? '15px' : '18px',
          }}>
            {lesson.title}
          </p>
        </motion.div>

        <div style={styles.divider} />

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          style={styles.section}
        >
          <div style={styles.sectionLabel}>
            <span style={styles.sectionNumber}>01</span>
            <div style={styles.sectionLabelLine} />
          </div>
          <h3 style={styles.sectionTitle}>Описание</h3>
          <div style={styles.card}>
            <p style={{
              ...styles.bodyText,
              fontSize: isMobile ? '14px' : '16px',
            }}>
              {lesson.essence || lesson.description}
            </p>
          </div>
        </motion.div>

        {/* Content sections - only if generated */}
        {lesson.content && (
          <>
            {lesson.content.rules && lesson.content.rules.length > 0 && (
              <>
                <div style={styles.divider} />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  style={styles.section}
                >
                  <div style={styles.sectionLabel}>
                    <span style={styles.sectionNumber}>02</span>
                    <div style={styles.sectionLabelLine} />
                  </div>
                  <h3 style={styles.sectionTitle}>Ключевые правила</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '12px',
                  }}>
                    {lesson.content.rules.map((rule, i) => (
                      <div key={i} style={styles.ruleCard}>
                        <div style={styles.ruleBadge}>{String(i + 1).padStart(2, '0')}</div>
                        <p style={{
                          ...styles.ruleText,
                          fontSize: isMobile ? '13px' : '14px',
                        }}>
                          {rule}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {lesson.content.example && (
              <>
                <div style={styles.divider} />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  style={styles.section}
                >
                  <div style={styles.sectionLabel}>
                    <span style={styles.sectionNumber}>03</span>
                    <div style={styles.sectionLabelLine} />
                  </div>
                  <h3 style={styles.sectionTitle}>Пример</h3>
                  <div style={styles.card}>
                    <p style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: isMobile ? '14px' : '15px',
                      lineHeight: 1.65,
                    }}>
                      {lesson.content.example}
                    </p>
                  </div>
                </motion.div>
              </>
            )}

            {lesson.content.pitfalls && lesson.content.pitfalls.length > 0 && (
              <>
                <div style={styles.divider} />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  style={styles.section}
                >
                  <div style={styles.sectionLabel}>
                    <span style={{ ...styles.sectionNumber, color: 'var(--color-text-tertiary)' }}>04</span>
                    <div style={{ ...styles.sectionLabelLine, background: 'linear-gradient(90deg, var(--color-text-tertiary)44 0%, transparent 100%)' }} />
                  </div>
                  <h3 style={styles.sectionTitle}>Подводные камни</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {lesson.content.pitfalls.map((pitfall, i) => (
                      <div key={i} style={styles.pitfallCard}>
                        <div style={styles.pitfallDot} />
                        <div style={{ flex: 1 }}>
                          <p style={{
                            ...styles.pitfallDescription,
                            fontSize: isMobile ? '12px' : '13px',
                          }}>
                            {pitfall}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </>
        )}

        {/* Navigation */}
        <div style={{
          ...styles.navSection,
          paddingBottom: isMobile ? '60px' : '80px',
        }}>
          <div style={styles.navDivider} />
          <div style={styles.navButtons}>
            {prevLessonId !== null ? (
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                onClick={() => handleNavigate(prevLessonId)}
                style={styles.navButton}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={styles.navButtonText}>Lesson {prevLessonId}</span>
              </motion.button>
            ) : (
              <div style={styles.navButtonSpacer} />
            )}
            {nextLessonId !== null ? (
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                onClick={() => handleNavigate(nextLessonId)}
                style={{ ...styles.navButton, flexDirection: 'row-reverse' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={styles.navButtonText}>Lesson {nextLessonId}</span>
              </motion.button>
            ) : (
              <div style={styles.navButtonSpacer} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    position: 'fixed',
    inset: 0,
    zIndex: 3000,
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
    flex: 1,
    minWidth: 0,
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 0',
    flexShrink: 0,
  },
  backButtonText: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
  },
  headerInfo: {
    flex: 1,
    minWidth: 0,
  },
  headerTitle: {
    fontWeight: 700,
    letterSpacing: '-0.5px',
    color: 'var(--color-text-primary)',
    marginBottom: '2px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  headerSubtitle: {
    color: 'var(--color-text-secondary)',
  },
  askButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'var(--color-accent-dim)',
    color: 'var(--color-accent)',
    border: '1px solid var(--color-accent)',
    borderRadius: 'var(--radius-md)',
    padding: '8px 16px',
    cursor: 'pointer',
    flexShrink: 0,
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  hero: {
    textAlign: 'center',
    padding: '40px 24px 32px',
  },
  heroTitle: {
    fontWeight: 800,
    letterSpacing: '-1px',
    color: 'var(--color-accent)',
    marginBottom: '8px',
  },
  heroSubtitle: {
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    maxWidth: '480px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.4,
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, var(--color-border) 50%, transparent 100%)',
    margin: '0 24px',
  },
  section: {
    padding: '40px 24px',
    maxWidth: '860px',
    margin: '0 auto',
    width: '100%',
  },
  sectionLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '6px',
  },
  sectionNumber: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    fontWeight: 700,
    color: 'var(--color-accent)',
    letterSpacing: '1px',
  },
  sectionLabelLine: {
    flex: 1,
    height: '1px',
    background: 'linear-gradient(90deg, var(--color-accent)44 0%, transparent 100%)',
  },
  sectionTitle: {
    fontSize: 'clamp(20px, 4vw, 26px)',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    color: 'var(--color-text-primary)',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px',
  },
  bodyText: {
    color: 'var(--color-text-primary)',
    lineHeight: 1.7,
  },
  ruleCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 18px',
  },
  ruleBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    fontWeight: 700,
    color: 'var(--color-accent)',
    backgroundColor: 'var(--color-accent-dim)',
    border: '1px solid var(--color-accent)',
    borderRadius: 'var(--radius-sm)',
    padding: '3px 8px',
    flexShrink: 0,
    lineHeight: 1.4,
  },
  ruleText: {
    color: 'var(--color-text-primary)',
    lineHeight: 1.55,
    paddingTop: '2px',
  },
  pitfallCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 18px',
  },
  pitfallDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-accent)',
    marginTop: '6px',
    flexShrink: 0,
    boxShadow: '0 0 8px var(--color-accent-glow)',
  },
  pitfallDescription: {
    color: 'var(--color-text-secondary)',
    lineHeight: 1.55,
  },
  navSection: {
    maxWidth: '860px',
    margin: '0 auto',
    width: '100%',
    padding: '32px 24px',
  },
  navDivider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, var(--color-border) 50%, transparent 100%)',
    marginBottom: '24px',
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flex: 1,
    maxWidth: '200px',
  },
  navButtonText: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-accent)',
  },
  navButtonSpacer: {
    flex: 1,
    maxWidth: '200px',
  },
};

export default DynamicLessonDetail;
