import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getChatHistory, sendChatMessage, ChatMessage } from '../services/api';
import { lessonDetails } from '../data/lessonDetails';

interface Message extends ChatMessage {
  id: string;
}

interface TeacherChatProps {
  lessonId: number;
  lessonTitle: string;
  teacherName: string;
  teacherId: string;
  onBack: () => void;
}

const TeacherChat: React.FC<TeacherChatProps> = ({ lessonId, lessonTitle, teacherName, teacherId, onBack }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);

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
    loadChatHistory();
    return () => { document.body.style.overflow = ''; };
  }, [lessonId, teacherId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      const history = await getChatHistory(teacherId, lessonId);

      const formattedMessages: Message[] = history.map((msg, idx) => ({
        ...msg,
        id: `${msg.role}-${msg.timestamp}-${idx}`,
      }));

      // Добавляем приветственное сообщение, если истории нет
      if (formattedMessages.length === 0) {
        const welcome: Message = {
          id: 'welcome',
          role: 'assistant',
          content: `Hi! I'm your AI teacher for "${lessonTitle}". Ask me anything about this lesson and I'll help you understand.`,
          timestamp: Date.now(),
        };
        setMessages([welcome]);
      } else {
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
      const welcome: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `Hi! I'm your AI teacher for "${lessonTitle}". Ask me anything about this lesson and I'll help you understand.`,
        timestamp: Date.now(),
      };
      setMessages([welcome]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const lessonDetail = lessonDetails[lessonId];
      const response = await sendChatMessage(
        teacherId,
        lessonId,
        text,
        lessonTitle,
        lessonDetail?.essence
      );

      const aiMsg: Message = {
        id: `ai-${response.aiMessage.timestamp}`,
        role: 'assistant',
        content: response.aiMessage.content,
        timestamp: response.aiMessage.timestamp,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
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
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: 'var(--color-text-secondary)' }}>Loading chat...</p>
          </div>
        ) : (
          <>
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
          </>
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
