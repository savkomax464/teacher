import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Loading...',
  size = 'medium'
}) => {
  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
  };

  const dotSize = sizeMap[size] / 5;
  const containerSize = sizeMap[size];

  return (
    <div style={styles.container}>
      <div style={{ ...styles.spinnerContainer, width: containerSize, height: containerSize }}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            style={{
              ...styles.dot,
              width: dotSize,
              height: dotSize,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}

        <motion.div
          style={styles.ring}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width={containerSize} height={containerSize} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeDasharray="70 200"
              strokeLinecap="round"
              opacity="0.3"
            />
          </svg>
        </motion.div>
      </div>

      {text && (
        <motion.p
          style={styles.text}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    padding: '60px 16px',
  },
  spinnerContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  dot: {
    borderRadius: '50%',
    backgroundColor: 'var(--color-accent)',
    boxShadow: '0 0 20px var(--color-accent-glow)',
  },
  ring: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: '15px',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    letterSpacing: '0.5px',
  },
};

export default LoadingSpinner;
