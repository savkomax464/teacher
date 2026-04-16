import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface TeacherChatProps {
  lessonId: number;
  lessonTitle: string;
  teacherName: string;
  onBack: () => void;
}

const AI_RESPONSES: Record<number, string[]> = {
  1: [
    "Great question! Let me break this down for you. The fundamentals are the foundation — think of them like learning the alphabet before writing essays.",
    "When you encounter a new concept, always ask yourself: 'What problem does this solve?' That perspective makes everything click.",
    "Try this: write down the definition in your own words. If you can explain it simply, you truly understand it.",
  ],
  2: [
    "Building blocks are all about composition. Start with small, focused pieces and combine them — just like LEGO bricks!",
    "The key insight here is that every complex system is made of simple parts working together. Focus on making each part reliable.",
    "A good rule of thumb: if you can't describe what a piece does in one sentence, it's probably doing too much.",
  ],
  3: [
    "Practice is where theory becomes real. Don't worry about getting it right immediately — mistakes are the best teachers.",
    "I'd recommend starting with the simplest exercise and gradually increasing difficulty. Confidence builds incrementally.",
    "The most important thing is consistency. 20 minutes every day beats a 3-hour cram session once a week.",
  ],
};

const GENERIC_RESPONSES = [
  "That's an interesting observation. Let me think about this from a different angle...\n\nThe key insight is to focus on the underlying pattern rather than the surface details.",
  "Good question! Here's how I'd approach it:\n\n1. Break the problem into smaller pieces\n2. Solve each piece independently\n3. Combine the solutions\n\nTry this approach and see where it gets you.",
  "You're on the right track. Remember that understanding beats memorization every time. If you can explain why something works, you'll never forget it.",
  "Let me give you a practical tip: whenever you learn something new, immediately try to teach it to someone else (or even to a rubber duck!). Teaching forces clarity.",
  "The best way to master this is through deliberate practice. Don't just repeat what you know — push yourself slightly beyond your comfort zone each time.",
  "Think about it this way: every expert was once a beginner. The difference is persistence. Keep going, and the concepts will become second nature.",
];

const TeacherChat: React.FC<TeacherChatProps> = ({ lessonId, lessonTitle, teacherName, onBack }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);

    // Prevent zoom on iOS
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventZoom, { passive: false });

    return () => {
      window.removeEventListener('resize', check);
      document.removeEventListener('touchstart', preventZoom);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Welcome message
    const welcome: Message = {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I'm your AI teacher for "${lessonTitle}". Ask me anything about this lesson and I'll help you understand.`,
      timestamp: Date.now(),
    };
    setMessages([welcome]);
    return () => { document.body.style.overflow = ''; };
  }, [lessonId, lessonTitle]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getAIResponse = (): string => {
    const lessonResponses = AI_RESPONSES[lessonId];
    if (lessonResponses) {
      const idx = messages.filter((m) => m.role === 'user').length % lessonResponses.length;
      return lessonResponses[idx];
    }
    const idx = messages.filter((m) => m.role === 'user').length % GENERIC_RESPONSES.length;
    return GENERIC_RESPONSES[idx];
  };

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: getAIResponse(),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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
            onClick={onBack}
            style={styles.backButton}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={styles.backButtonText}>Back</span>
          </motion.button>
          <div style={styles.headerInfo}>
            <h2 style={{ ...styles.headerTitle, fontSize: isMobile ? '16px' : '18px' }}>
              {teacherName}
            </h2>
            <p style={{ ...styles.headerSubtitle, fontSize: isMobile ? '11px' : '12px' }}>
              Lesson {lessonId} · {lessonTitle}
            </p>
          </div>
        </div>
        <div style={styles.statusDot} />
      </div>

      {/* Messages */}
      <div style={styles.messagesContainer}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                ...styles.messageRow,
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.role === 'assistant' && (
                <div style={styles.aiAvatar}>
                  {teacherName.charAt(0).toUpperCase()}
                </div>
              )}
              <div style={{
                ...styles.messageBubble,
                backgroundColor: msg.role === 'user'
                  ? 'var(--color-accent)'
                  : 'var(--color-surface)',
                color: msg.role === 'user'
                  ? '#000'
                  : 'var(--color-text-primary)',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : 'var(--radius-md)',
                borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : 'var(--radius-md)',
                maxWidth: isMobile ? '85%' : '70%',
              }}>
                <p style={{
                  fontSize: isMobile ? '13px' : '14px',
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                }}>
                  {msg.content}
                </p>
                <span style={{
                  fontSize: '10px',
                  opacity: 0.5,
                  marginTop: '6px',
                  display: 'block',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ ...styles.messageRow, justifyContent: 'flex-start' }}
          >
            <div style={styles.aiAvatar}>
              {teacherName.charAt(0).toUpperCase()}
            </div>
            <div style={{
              ...styles.messageBubble,
              backgroundColor: 'var(--color-surface)',
              padding: '12px 16px',
            }}>
              <div style={styles.typingDots}>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                  style={styles.typingDot}
                />
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
                  style={styles.typingDot}
                />
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                  style={styles.typingDot}
                />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={styles.inputArea}>
        <div style={styles.inputContainer}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about this lesson..."
            style={{
              ...styles.input,
              padding: isMobile ? '10px 14px' : '12px 16px',
            }}
          />
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            style={{
              ...styles.sendButton,
              opacity: inputValue.trim() ? 1 : 0.4,
              cursor: inputValue.trim() ? 'pointer' : 'default',
              width: isMobile ? '40px' : '44px',
              height: isMobile ? '40px' : '44px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="var(--color-bg)" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="var(--color-bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    position: 'fixed',
    inset: 0,
    zIndex: 4000,
    backgroundColor: 'var(--color-bg)',
    display: 'flex',
    flexDirection: 'column',
    touchAction: 'pan-y',
    WebkitOverflowScrolling: 'touch',
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
  backButtonText: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
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
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#34c759',
    boxShadow: '0 0 8px rgba(52, 199, 89, 0.4)',
    flexShrink: 0,
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },
  aiAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-accent-dim)',
    border: '1px solid var(--color-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--color-accent)',
    flexShrink: 0,
  },
  messageBubble: {
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    wordBreak: 'break-word',
  },
  typingDots: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },
  typingDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-text-tertiary)',
    display: 'inline-block',
  },
  inputArea: {
    padding: '16px 24px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg)',
    flexShrink: 0,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  input: {
    flex: 1,
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-primary)',
    outline: 'none',
    fontFamily: 'inherit',
    WebkitAppearance: 'none',
    fontSize: '16px',
  },
  sendButton: {
    backgroundColor: 'var(--color-accent)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default TeacherChat;
