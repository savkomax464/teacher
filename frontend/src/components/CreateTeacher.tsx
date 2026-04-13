import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [step, setStep] = useState<'template' | 'custom' | 'form'>('template');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="page-title">Create Teacher</h1>
        <p className="page-subtitle">Design your perfect AI learning companion</p>
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
            <h2 style={{
              ...styles.sectionTitle,
              fontSize: isMobile ? '20px' : '24px',
              marginBottom: isMobile ? '16px' : '24px',
            }}>Choose a template</h2>
            <div style={{
              ...styles.grid,
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: isMobile ? '10px' : '16px',
            }}>
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={isMobile ? {} : {
                    scale: 1.03,
                    borderColor: 'var(--color-accent)',
                    boxShadow: 'var(--shadow-glow)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    ...styles.suggestionCard,
                    padding: isMobile ? '14px' : '20px',
                  }}
                >
                  <span style={{
                    ...styles.suggestionIcon,
                    fontSize: isMobile ? '26px' : '32px',
                  }}>{suggestion.icon}</span>
                  <div style={styles.suggestionContent}>
                    <h3 style={{
                      ...styles.suggestionTitle,
                      fontSize: isMobile ? '14px' : '16px',
                    }}>{suggestion.title}</h3>
                    <p style={{
                      ...styles.suggestionPrompt,
                      fontSize: isMobile ? '12px' : '13px',
                    }}>{suggestion.prompt}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                ...styles.divider,
                margin: isMobile ? '24px 0' : '40px 0',
              }}
            >
              <div style={styles.dividerLine} />
              <span style={{
                ...styles.dividerText,
                fontSize: isMobile ? '13px' : '14px',
              }}>or</span>
              <div style={styles.dividerLine} />
            </motion.div>

            <motion.button
              whileHover={isMobile ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep('custom')}
              style={{
                ...styles.customButton,
                padding: isMobile ? '16px' : '20px',
                fontSize: isMobile ? '15px' : '16px',
              }}
            >
              <span style={{
                ...styles.customButtonIcon,
                fontSize: isMobile ? '20px' : '24px',
              }}>✨</span>
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
            style={{
              ...styles.form,
              maxWidth: isMobile ? '100%' : '600px',
            }}
          >
            <div style={styles.formGroup}>
              <label style={{
                ...styles.label,
                fontSize: isMobile ? '13px' : '14px',
              }}>Teacher Name</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Professor English"
                style={{
                  ...styles.input,
                  padding: isMobile ? '12px 14px' : '14px 16px',
                  fontSize: isMobile ? '15px' : '16px',
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={{
                ...styles.label,
                fontSize: isMobile ? '13px' : '14px',
              }}>Subject</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., English Language"
                style={{
                  ...styles.input,
                  padding: isMobile ? '12px 14px' : '14px 16px',
                  fontSize: isMobile ? '15px' : '16px',
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={{
                ...styles.label,
                fontSize: isMobile ? '13px' : '14px',
              }}>Instructions</label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell your AI teacher what to focus on..."
                style={{
                  ...styles.textarea,
                  padding: isMobile ? '12px 14px' : '14px 16px',
                  fontSize: isMobile ? '15px' : '16px',
                }}
                rows={4}
              />
            </div>

            <div style={{
              ...styles.formActions,
              flexDirection: isMobile ? 'column-reverse' : 'row',
              gap: isMobile ? '10px' : '16px',
            }}>
              <motion.button
                type="button"
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('template')}
                style={{
                  ...styles.backButton,
                  padding: isMobile ? '14px' : '14px 24px',
                  width: isMobile ? '100%' : 'auto',
                  fontSize: isMobile ? '14px' : '15px',
                }}
              >
                ← Back to templates
              </motion.button>
              <motion.button
                type="submit"
                whileHover={isMobile ? {} : { scale: 1.02, boxShadow: 'var(--shadow-glow)' }}
                whileTap={{ scale: 0.98 }}
                disabled={!name || !subject || !description}
                style={{
                  ...styles.submitButton,
                  padding: isMobile ? '14px' : '14px 32px',
                  fontSize: isMobile ? '14px' : '15px',
                  opacity: !name || !subject || !description ? 0.5 : 1,
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                Create Teacher ✨
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  sectionTitle: {
    fontWeight: 600,
    letterSpacing: '-0.5px',
    color: 'var(--color-text-primary)',
  },
  grid: {
    display: 'grid',
  },
  suggestionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
  },
  suggestionIcon: {
    flexShrink: 0,
  },
  suggestionContent: {
    flex: 1,
    minWidth: 0,
  },
  suggestionTitle: {
    fontWeight: 600,
    marginBottom: '3px',
    color: 'var(--color-text-primary)',
  },
  suggestionPrompt: {
    color: 'var(--color-text-secondary)',
    lineHeight: 1.4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: 'var(--color-border)',
  },
  dividerText: {
    padding: '0 14px',
    color: 'var(--color-text-tertiary)',
  },
  customButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    backgroundColor: 'var(--color-surface)',
    border: '2px dashed var(--color-border-light)',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--color-text-primary)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  customButtonIcon: {
    flexShrink: 0,
  },
  form: {
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-primary)',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-primary)',
    lineHeight: 1.5,
    resize: 'vertical' as const,
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '28px',
  },
  backButton: {
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  submitButton: {
    backgroundColor: 'var(--color-accent)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    color: '#0a0a0a',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default CreateTeacher;
