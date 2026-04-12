import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AITeacherWatermark from './AITeacherWatermark';

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
        <h1 style={styles.title}>My Teachers</h1>
        <p style={styles.subtitle}>Your personal AI mentors and guides</p>
      </motion.div>

      {teachers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.emptyState}
        >
          <div style={styles.emptyCharacter}>
            <AITeacherWatermark opacity={0.4} size={120} />
          </div>
          <h3 style={styles.emptyTitle}>No teachers yet</h3>
          <p style={styles.emptyText}>
            Create your first AI teacher to start learning
          </p>
        </motion.div>
      ) : (
        <div style={styles.grid}>
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
                whileHover={{ 
                  y: -4,
                  boxShadow: 'var(--shadow-lg), var(--shadow-glow)'
                }}
                style={styles.card}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.avatar}>
                    {teacher.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={styles.cardTitle}>
                    <h3 style={styles.teacherName}>{teacher.name}</h3>
                    <span style={styles.subject}>{teacher.subject}</span>
                  </div>
                </div>
                <p style={styles.description}>{teacher.description}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.date}>Created {teacher.createdAt}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={styles.startButton}
                  >
                    Start Learning →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '120px 24px 40px',
    maxWidth: '1200px',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-xl)',
    padding: '24px',
    border: '1px solid var(--color-border)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-accent-dim)',
    border: '2px solid var(--color-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: 600,
    color: 'var(--color-accent)',
    flexShrink: 0,
  },
  cardTitle: {
    flex: 1,
  },
  teacherName: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '4px',
    color: 'var(--color-text-primary)',
  },
  subject: {
    fontSize: '13px',
    color: 'var(--color-accent)',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  description: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
    marginBottom: '20px',
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
    padding: '10px 20px',
    backgroundColor: 'var(--color-accent-dim)',
    color: 'var(--color-accent)',
    border: '1px solid var(--color-accent)',
    borderRadius: 'var(--radius-md)',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
  },
  emptyCharacter: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'var(--color-text-primary)',
  },
  emptyText: {
    fontSize: '16px',
    color: 'var(--color-text-secondary)',
  },
};

export default MyTeachers;
