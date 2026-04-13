import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateTeacherProps {
  onCreateTeacher: (name: string, subject: string, description: string) => void;
}

const suggestions = [
  { icon: '🇬🇧', title: 'English Tutor', prompt: 'Help me learn English grammar and vocabulary' },
  { icon: '💻', title: 'C++ Mentor', prompt: 'Help me learn C++ programming from basics to advanced' },
  { icon: '⚖️', title: 'Legal Advisor', prompt: 'Help me understand my legal rights in the USA' },
  { icon: '🐍', title: 'Python Guide', prompt: 'Help me master Python for data science and AI' },
  { icon: '📊', title: 'Math Tutor', prompt: 'Help me understand calculus and linear algebra' },
  { icon: '🎨', title: 'Design Coach', prompt: 'Help me learn UI/UX design principles' },
  { icon: '🔬', title: 'Science Teacher', prompt: 'Help me understand physics and chemistry concepts' },
  { icon: '🗣️', title: 'Language Partner', prompt: 'Help me practice conversational Spanish' },
];

const CreateTeacher: React.FC<CreateTeacherProps> = ({ onCreateTeacher }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [step, setStep] = useState<'template' | 'custom' | 'form'>('template');

  const handleSuggestionClick = (suggestion: typeof suggestions[0]) => {
    setName(suggestion.title);
    setSubject(suggestion.title);
    setDescription(suggestion.prompt);
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && subject && description) {
      onCreateTeacher(name, subject, description);
      setName('');
      setSubject('');
      setDescription('');
      setStep('template');
    }
  };

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
        <h1 style={styles.title}>Create Teacher</h1>
        <p style={styles.subtitle}>Design your perfect AI learning companion</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 'template' && (
          <motion.div
            key="template"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={styles.sectionTitle}>Choose a template</h2>
            <div style={styles.grid}>
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.03,
                    borderColor: 'var(--color-accent)',
                    boxShadow: 'var(--shadow-glow)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={styles.suggestionCard}
                >
                  <span style={styles.suggestionIcon}>{suggestion.icon}</span>
                  <div style={styles.suggestionContent}>
                    <h3 style={styles.suggestionTitle}>{suggestion.title}</h3>
                    <p style={styles.suggestionPrompt}>{suggestion.prompt}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={styles.divider}
            >
              <div style={styles.dividerLine} />
              <span style={styles.dividerText}>or</span>
              <div style={styles.dividerLine} />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep('custom')}
              style={styles.customButton}
            >
              <span style={styles.customButtonIcon}>✨</span>
              <span>Create from scratch</span>
            </motion.button>
          </motion.div>
        )}

        {(step === 'custom' || step === 'form') && (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: step === 'custom' ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === 'custom' ? -30 : 30 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            style={styles.form}
          >
            <div style={styles.formGroup}>
              <label style={styles.label}>Teacher Name</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Professor English"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., English Language"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Instructions</label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell your AI teacher what to focus on..."
                style={styles.textarea}
                rows={4}
              />
            </div>

            <div style={styles.formActions}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('template')}
                style={styles.backButton}
              >
                ← Back to templates
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-glow)' }}
                whileTap={{ scale: 0.98 }}
                disabled={!name || !subject || !description}
                style={{
                  ...styles.submitButton,
                  opacity: !name || !subject || !description ? 0.5 : 1,
                }}
              >
                Create Teacher ✨
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
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
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '24px',
    letterSpacing: '-0.5px',
    color: 'var(--color-text-primary)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  suggestionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
  },
  suggestionIcon: {
    fontSize: '32px',
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '4px',
    color: 'var(--color-text-primary)',
  },
  suggestionPrompt: {
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.4,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '40px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: 'var(--color-border)',
  },
  dividerText: {
    padding: '0 16px',
    color: 'var(--color-text-tertiary)',
    fontSize: '14px',
  },
  customButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    border: '2px dashed var(--color-border-light)',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--color-text-primary)',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  customButtonIcon: {
    fontSize: '24px',
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-primary)',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: '14px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-primary)',
    fontSize: '16px',
    lineHeight: 1.5,
    resize: 'vertical' as const,
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
  },
  formActions: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    marginTop: '32px',
  },
  backButton: {
    padding: '14px 24px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-secondary)',
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  submitButton: {
    padding: '14px 32px',
    backgroundColor: 'var(--color-accent)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    color: '#0a0a0a',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default CreateTeacher;
