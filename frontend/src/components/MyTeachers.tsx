import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AITeacherWatermark from './AITeacherWatermark';
import LessonCards from './LessonCards';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  description: string;
  createdAt: string;
}

interface MyTeachersProps {
  teachers: Teacher[];
}

const MyTeachers: React.FC<MyTeachersProps> = ({ teachers }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showLessons, setShowLessons] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleStartLearning = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowLessons(true);
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="page-title">My Teachers</h1>
        <p className="page-subtitle">Your personal AI mentors and guides</p>
      </motion.div>

      {teachers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.emptyState}
        >
          <div style={styles.emptyCharacter}>
            <AITeacherWatermark opacity={0.4} size={isMobile ? 100 : 120} />
          </div>
          <h3 style={styles.emptyTitle}>No teachers yet</h3>
          <p style={styles.emptyText}>
            Create your first AI teacher to start learning
          </p>
        </motion.div>
      ) : (
        <div style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: isMobile ? '12px' : '24px',
        }}>
          <AnimatePresence>
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
                whileHover={isMobile ? {} : {
                  y: -4,
                  boxShadow: 'var(--shadow-lg), var(--shadow-glow)'
                }}
                style={{
                  ...styles.card,
                  padding: isMobile ? '16px' : '24px',
                }}
              >
                <div style={{
                  ...styles.cardHeader,
                  gap: isMobile ? '12px' : '16px',
                }}>
                  <div style={{
                    ...styles.avatar,
                    width: isMobile ? '56px' : '64px',
                    height: isMobile ? '56px' : '64px',
                    fontSize: isMobile ? '24px' : '28px',
                  }}>
                    {teacher.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={styles.cardTitle}>
                    <h3 style={{
                      ...styles.teacherName,
                      fontSize: isMobile ? '16px' : '18px',
                    }}>{teacher.name}</h3>
                    <span style={styles.subject}>{teacher.subject}</span>
                  </div>
                </div>
                <p style={{
                  ...styles.description,
                  fontSize: isMobile ? '13px' : '14px',
                  marginBottom: isMobile ? '14px' : '20px',
                }}>{teacher.description}</p>
                <div style={{
                  ...styles.cardFooter,
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '10px' : '0',
                  alignItems: isMobile ? 'stretch' : 'center',
                }}>
                  <span style={styles.date}>Created {teacher.createdAt}</span>
                  <motion.button
                    whileHover={isMobile ? {} : { scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartLearning(teacher);
                    }}
                    style={{
                      ...styles.startButton,
                      padding: isMobile ? '12px' : '10px 20px',
                      fontSize: isMobile ? '14px' : '14px',
                    }}
                  >
                    Start Learning →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Lesson Cards Modal */}
      {selectedTeacher && (
        <LessonCards
          isOpen={showLessons}
          onClose={() => setShowLessons(false)}
          teacherName={selectedTeacher.name}
        />
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  emptyState: {
    textAlign: 'center',
    padding: '60px 16px',
  },
  emptyCharacter: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  emptyTitle: {
    fontSize: '22px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'var(--color-text-primary)',
  },
  emptyText: {
    fontSize: '15px',
    color: 'var(--color-text-secondary)',
  },
  grid: {
    display: 'grid',
  },
  card: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-border)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '14px',
  },
  avatar: {
    borderRadius: '50%',
    backgroundColor: 'var(--color-accent-dim)',
    border: '2px solid var(--color-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    color: 'var(--color-accent)',
    flexShrink: 0,
  },
  cardTitle: {
    flex: 1,
    minWidth: 0,
  },
  teacherName: {
    fontWeight: 600,
    marginBottom: '4px',
    color: 'var(--color-text-primary)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  subject: {
    fontSize: '12px',
    color: 'var(--color-accent)',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  description: {
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: '12px',
    color: 'var(--color-text-tertiary)',
  },
  startButton: {
    backgroundColor: 'var(--color-accent-dim)',
    color: 'var(--color-accent)',
    border: '1px solid var(--color-accent)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
  },
};

export default MyTeachers;
