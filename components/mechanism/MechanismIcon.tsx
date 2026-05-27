"use client";
// Custom editorial SVG icons for the 4 mechanisms.
// Stroke-based, indigo/phos palette.

const I = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 64 64" fill="none" strokeWidth={1.4} className="w-12 h-12">
    {children}
  </svg>
);

export const IconRoutine = () => (
  // Nelson & Winter — recurring cycle
  <I>
    <circle cx={32} cy={32} r={22} stroke="#7C9CFF" />
    <circle cx={32} cy={32} r={14} stroke="#7C9CFF" strokeDasharray="2 3" />
    <path d="M32 10 L36 14 L32 18" stroke="#00FF9C" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M54 32 L50 36 L46 32" stroke="#00FF9C" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={32} cy={32} r={2} fill="#FF4D6D" stroke="none" />
  </I>
);

export const IconSocialProof = () => (
  // Cialdini — node network with collective glow
  <I>
    <circle cx={20} cy={28} r={4} stroke="#7C9CFF" />
    <circle cx={44} cy={20} r={4} stroke="#7C9CFF" />
    <circle cx={48} cy={42} r={4} stroke="#7C9CFF" />
    <circle cx={26} cy={48} r={4} stroke="#7C9CFF" />
    <circle cx={32} cy={32} r={5} stroke="#00FF9C" />
    <line x1={24} y1={28} x2={28} y2={32} stroke="#7C9CFF" />
    <line x1={40} y1={22} x2={35} y2={29} stroke="#7C9CFF" />
    <line x1={44} y1={40} x2={36} y2={34} stroke="#7C9CFF" />
    <line x1={28} y1={46} x2={31} y2={37} stroke="#7C9CFF" />
    <text x={32} y={36} fontSize={6} fill="#00FF9C" fontFamily="JetBrains Mono" textAnchor="middle">70%</text>
  </I>
);

export const IconParadox = () => (
  // Goffman — two identical masks/envelopes
  <I>
    <rect x={8} y={18} width={22} height={16} stroke="#7C9CFF" />
    <path d="M8 18 L19 28 L30 18" stroke="#7C9CFF" />
    <rect x={34} y={30} width={22} height={16} stroke="#FF4D6D" />
    <path d="M34 30 L45 40 L56 30" stroke="#FF4D6D" />
    <path d="M30 26 L34 30" stroke="#00FF9C" strokeDasharray="1 2" />
  </I>
);

export const IconShadow = () => (
  // Mintzberg — pyramid with shadow zone
  <I>
    <path d="M32 8 L52 48 L12 48 Z" stroke="#7C9CFF" />
    <line x1={32} y1={8} x2={32} y2={48} stroke="#7C9CFF" strokeDasharray="1 2" />
    <line x1={20} y1={36} x2={44} y2={36} stroke="#7C9CFF" />
    <path d="M12 48 L18 56 L46 56 L52 48" stroke="#FF4D6D" strokeDasharray="2 2" />
    <text x={32} y={54} fontSize={5} fill="#FF4D6D" fontFamily="JetBrains Mono" textAnchor="middle">shadow</text>
  </I>
);
