export function SketchKey({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="32" r="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="1 0"/>
      <circle cx="28" cy="32" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M40 36 L65 36 L65 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M65 30 L65 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M57 36 L57 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M28 26 Q29 25.5 30 26.5 Q28 27 28 26" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export function SketchLock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="38" width="48" height="34" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M26 38 L26 26 Q26 14 40 14 Q54 14 54 26 L54 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="40" cy="53" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M40 58 L40 64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function SketchShield({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 12 L62 22 L62 42 Q62 58 40 68 Q18 58 18 42 L18 22 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M30 40 L37 47 L52 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SketchAtom({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <ellipse cx="40" cy="40" rx="28" ry="12" stroke="currentColor" strokeWidth="2" fill="none"/>
      <ellipse cx="40" cy="40" rx="28" ry="12" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(60 40 40)"/>
      <ellipse cx="40" cy="40" rx="28" ry="12" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(120 40 40)"/>
    </svg>
  );
}

export function SketchCoin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill="#F7931A"/>
      <g transform="rotate(14, 40, 40)">
        <path d="M33 23 L33 57" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M47 28 L47 52" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M33 28 Q40 24 47 28" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M33 40 Q40 36 47 40" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M33 52 Q40 56 47 52" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M29 23 L37 23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M29 26.5 L37 26.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M29 53.5 L37 53.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M29 57 L37 57" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

export function SketchArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10 Q20 8 34 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 4 L36 10 L28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SketchWave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12 Q25 4 50 12 Q75 20 100 12 Q125 4 150 12 Q175 20 200 12" stroke="#F7931A" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function SketchStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4 L23 16 L36 16 L26 24 L30 36 L20 28 L10 36 L14 24 L4 16 L17 16 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function SketchCheckmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 17 L13 24 L26 9" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SketchWarning({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6 L36 34 L4 34 Z" stroke="#F7931A" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M20 18 L20 26" stroke="#F7931A" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="20" cy="30" r="1.5" fill="#F7931A"/>
    </svg>
  );
}

export function SketchX({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 8 L24 24" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 8 L8 24" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function SketchNetwork({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="30" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="14" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="68" cy="14" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="46" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="68" cy="46" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M17 17 L33 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M63 17 L47 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 43 L33 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M63 43 L47 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function SketchDecorLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 8 Q37 4 75 8 Q112 12 150 8 Q187 4 225 8 Q262 12 300 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.2"/>
    </svg>
  );
}

export function SketchDiamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4 L36 20 L20 36 L4 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function SketchQuantumCircuit({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="30" x2="190" y2="30" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="10" y1="60" x2="190" y2="60" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="10" y1="90" x2="190" y2="90" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="30" y="20" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="40" y="34" textAnchor="middle" fontSize="10" fontFamily="Courier New" fill="currentColor">H</text>
      <rect x="70" y="50" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="80" y="64" textAnchor="middle" fontSize="8" fontFamily="Courier New" fill="currentColor">X</text>
      <rect x="110" y="20" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="120" y="34" textAnchor="middle" fontSize="8" fontFamily="Courier New" fill="currentColor">Rz</text>
      <circle cx="150" cy="60" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="150" y1="30" x2="150" y2="54" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="150" y1="66" x2="150" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
      <rect x="170" y="50" width="20" height="20" stroke="#F7931A" strokeWidth="2" fill="none"/>
      <text x="180" y="64" textAnchor="middle" fontSize="8" fontFamily="Courier New" fill="#F7931A">M</text>
    </svg>
  );
}

export function SketchTwoKeys({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="28" r="14" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="28" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M34 32 L72 32 L72 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M72 27 L72 37" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M64 32 L64 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="96" cy="52" r="14" stroke="#F7931A" strokeWidth="2.5" fill="none"/>
      <circle cx="96" cy="52" r="7" stroke="#F7931A" strokeWidth="1.5" fill="none"/>
      <path d="M82 56 L48 56 L48 51" stroke="#F7931A" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M48 51 L48 61" stroke="#F7931A" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M56 56 L56 62" stroke="#F7931A" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M58 40 L62 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M62 40 L58 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
