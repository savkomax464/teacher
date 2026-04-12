import React from 'react';

const AITeacherWatermark: React.FC<{ opacity?: number; size?: number }> = ({
  opacity = 0.15,
  size = 450
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* ===== TV ANTENNA ===== */}
      <line x1="175" y1="80" x2="175" y2="110" stroke="#ffd60a" strokeWidth="3" />
      <line x1="225" y1="80" x2="225" y2="110" stroke="#ffd60a" strokeWidth="3" />
      <line x1="175" y1="80" x2="140" y2="35" stroke="#ffd60a" strokeWidth="3" strokeLinecap="round" />
      <line x1="225" y1="80" x2="260" y2="35" stroke="#ffd60a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="140" cy="32" r="5" stroke="#ffd60a" strokeWidth="2" />
      <circle cx="260" cy="32" r="5" stroke="#ffd60a" strokeWidth="2" />

      {/* ===== TV BODY - old television shape ===== */}
      <rect x="70" y="110" width="260" height="210" rx="18" stroke="#ffd60a" strokeWidth="3" />

      {/* TV bezel - inner frame around screen */}
      <rect x="85" y="125" width="230" height="165" rx="12" stroke="#ffd60a" strokeWidth="2" />

      {/* ===== TV SCREEN ===== */}
      <rect x="100" y="138" width="160" height="130" rx="10" stroke="#ffd60a" strokeWidth="3" />

      {/* ===== GLASSES on the screen ===== */}
      <rect x="118" y="175" width="48" height="32" rx="6" stroke="#ffd60a" strokeWidth="2.5" />
      <rect x="194" y="175" width="48" height="32" rx="6" stroke="#ffd60a" strokeWidth="2.5" />
      <line x1="166" y1="191" x2="194" y2="191" stroke="#ffd60a" strokeWidth="2.5" />

      {/* ===== EYES ===== */}
      <circle cx="142" cy="191" r="6" fill="#ffd60a" />
      <circle cx="142" cy="191" r="9" fill="#ffd60a" opacity="0.3" />
      <circle cx="144" cy="189" r="2" fill="#fff" opacity="0.8" />

      <circle cx="218" cy="191" r="6" fill="#ffd60a" />
      <circle cx="218" cy="191" r="9" fill="#ffd60a" opacity="0.3" />
      <circle cx="220" cy="189" r="2" fill="#fff" opacity="0.8" />

      {/* ===== MOUTH - robot grid ===== */}
      <line x1="135" y1="238" x2="225" y2="238" stroke="#ffd60a" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="155" y1="232" x2="155" y2="244" stroke="#ffd60a" strokeWidth="2" strokeLinecap="round" />
      <line x1="180" y1="232" x2="180" y2="244" stroke="#ffd60a" strokeWidth="2" strokeLinecap="round" />
      <line x1="205" y1="232" x2="205" y2="244" stroke="#ffd60a" strokeWidth="2" strokeLinecap="round" />

      {/* ===== TV KNOBS on the right side ===== */}
      <circle cx="290" cy="160" r="10" stroke="#ffd60a" strokeWidth="2" />
      <circle cx="290" cy="160" r="4" fill="#ffd60a" opacity="0.3" />
      <circle cx="290" cy="200" r="10" stroke="#ffd60a" strokeWidth="2" />
      <circle cx="290" cy="200" r="4" fill="#ffd60a" opacity="0.3" />
      <circle cx="290" cy="240" r="8" stroke="#ffd60a" strokeWidth="2" />
      <circle cx="290" cy="240" r="3" fill="#ffd60a" opacity="0.3" />

      {/* Speaker lines */}
      <line x1="278" y1="260" x2="310" y2="260" stroke="#ffd60a" strokeWidth="1.5" opacity="0.4" />
      <line x1="278" y1="268" x2="310" y2="268" stroke="#ffd60a" strokeWidth="1.5" opacity="0.4" />
      <line x1="278" y1="276" x2="310" y2="276" stroke="#ffd60a" strokeWidth="1.5" opacity="0.4" />

      {/* ===== TV LEGS / STAND ===== */}
      <line x1="130" y1="320" x2="120" y2="350" stroke="#ffd60a" strokeWidth="4" strokeLinecap="round" />
      <line x1="270" y1="320" x2="280" y2="350" stroke="#ffd60a" strokeWidth="4" strokeLinecap="round" />
      <line x1="105" y1="350" x2="135" y2="350" stroke="#ffd60a" strokeWidth="4" strokeLinecap="round" />
      <line x1="265" y1="350" x2="295" y2="350" stroke="#ffd60a" strokeWidth="4" strokeLinecap="round" />

      {/* ===== SCAN LINES (CRT effect) ===== */}
      <line x1="108" y1="150" x2="252" y2="150" stroke="#ffd60a" strokeWidth="0.8" opacity="0.12" />
      <line x1="108" y1="158" x2="252" y2="158" stroke="#ffd60a" strokeWidth="0.8" opacity="0.12" />
      <line x1="108" y1="166" x2="252" y2="166" stroke="#ffd60a" strokeWidth="0.8" opacity="0.12" />
      <line x1="108" y1="174" x2="252" y2="174" stroke="#ffd60a" strokeWidth="0.8" opacity="0.12" />
      <line x1="108" y1="250" x2="252" y2="250" stroke="#ffd60a" strokeWidth="0.8" opacity="0.12" />
      <line x1="108" y1="258" x2="252" y2="258" stroke="#ffd60a" strokeWidth="0.8" opacity="0.12" />

      {/* ===== FLOATING PARTICLES ===== */}
      <circle cx="35" cy="120" r="3" fill="#ffd60a" opacity="0.2" />
      <circle cx="365" cy="100" r="2.5" fill="#ffd60a" opacity="0.15" />
      <circle cx="25" cy="200" r="2" fill="#ffd60a" opacity="0.12" />
      <circle cx="375" cy="180" r="3" fill="#ffd60a" opacity="0.18" />
      <circle cx="45" cy="280" r="2" fill="#ffd60a" opacity="0.1" />
      <circle cx="355" cy="260" r="2.5" fill="#ffd60a" opacity="0.12" />

      <line x1="35" y1="120" x2="25" y2="200" stroke="#ffd60a" strokeWidth="0.8" opacity="0.08" />
      <line x1="365" y1="100" x2="375" y2="180" stroke="#ffd60a" strokeWidth="0.8" opacity="0.08" />
      <line x1="25" y1="200" x2="45" y2="280" stroke="#ffd60a" strokeWidth="0.6" opacity="0.06" />
      <line x1="375" y1="180" x2="355" y2="260" stroke="#ffd60a" strokeWidth="0.6" opacity="0.06" />
    </svg>
  );
};

export default AITeacherWatermark;
