import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../contexts/AppContext";

interface Props {
  onClose: () => void;
}

interface SceneProps {
  phase: number;
  c: Colors;
}

interface Colors {
  bg: string;
  txt: string;
  txt2: string;
  txt3: string;
  cardBg: string;
  cardBorder: string;
  progressBg: string;
  dotInactive: string;
  bottomGrad: string;
}

function makeColors(dark: boolean): Colors {
  return dark
    ? {
        bg: "#0a0a0a",
        txt: "#FAFAF5",
        txt2: "rgba(250,250,245,0.45)",
        txt3: "rgba(250,250,245,0.28)",
        cardBg: "rgba(250,250,245,0.04)",
        cardBorder: "rgba(250,250,245,0.1)",
        progressBg: "rgba(250,250,245,0.08)",
        dotInactive: "rgba(250,250,245,0.18)",
        bottomGrad: "linear-gradient(to top, #0a0a0a, transparent)",
      }
    : {
        bg: "#f7f7f2",
        txt: "#1a1a1a",
        txt2: "rgba(26,26,26,0.5)",
        txt3: "rgba(26,26,26,0.32)",
        cardBg: "rgba(26,26,26,0.04)",
        cardBorder: "rgba(26,26,26,0.12)",
        progressBg: "rgba(26,26,26,0.1)",
        dotInactive: "rgba(26,26,26,0.2)",
        bottomGrad: "linear-gradient(to top, #f7f7f2, transparent)",
      };
}

function SolanaLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 397 312" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sol-a" x1="360" y1="35" x2="37" y2="278" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9945FF"/>
          <stop offset="100%" stopColor="#14F195"/>
        </linearGradient>
        <linearGradient id="sol-b" x1="360" y1="35" x2="37" y2="278" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9945FF"/>
          <stop offset="100%" stopColor="#14F195"/>
        </linearGradient>
        <linearGradient id="sol-c" x1="360" y1="35" x2="37" y2="278" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9945FF"/>
          <stop offset="100%" stopColor="#14F195"/>
        </linearGradient>
      </defs>
      <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="url(#sol-a)"/>
      <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" fill="url(#sol-b)"/>
      <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="url(#sol-c)"/>
    </svg>
  );
}

const SCENES = [
  { id: "intro", duration: 5000 },
  { id: "create", duration: 5500 },
  { id: "coldkey", duration: 5500 },
  { id: "walletconnect", duration: 5500 },
  { id: "protocol", duration: 5500 },
];

function Orb({ size, left, top, color, dur, del }: { size: number; left: string; top: string; color: string; dur: number; del: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left, top, background: color, opacity: 0.15, filter: "blur(60px)" }}
      animate={{ x: [0, 25, -18, 0], y: [0, -20, 14, 0], scale: [1, 1.1, 0.93, 1] }}
      transition={{ duration: dur, delay: del, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function SceneIntro({ phase, c }: SceneProps) {
  const chars = "bitQoin".split("");
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 text-center gap-6">
      <div className="flex items-center gap-0">
        {chars.map((ch, i) => (
          <motion.span
            key={i}
            className="font-sketch leading-none"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              color: i < 3 ? c.txt : "#F7931A",
              display: "inline-block",
            }}
            initial={{ opacity: 0, y: 40, rotateX: -45 }}
            animate={phase >= 1 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -45 }}
            transition={{ type: "spring", stiffness: 300, damping: 22, delay: i * 0.06 }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="h-px w-12 bg-[#F7931A]/40" />
        <span className="font-handwritten text-[#F7931A]" style={{ fontSize: "clamp(1.1rem, 3vw, 1.6rem)" }}>
          Quantum-resistant wallets
        </span>
        <div className="h-px w-12 bg-[#F7931A]/40" />
      </motion.div>

      <motion.div
        className="flex gap-4 items-center"
        initial={{ opacity: 0, y: 12 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5 }}
      >
        {["EVM", "Solana"].map((chain, i) => (
          <motion.div
            key={chain}
            className="border border-[#F7931A]/40 px-6 py-2"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <span className="font-sketch text-[#F7931A]" style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}>{chain}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="font-body font-bold tracking-widest uppercase"
        style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)", color: c.txt3 }}
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        Two keys. One protocol. No server.
      </motion.p>
    </div>
  );
}

function SceneCreate({ phase, c }: SceneProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 text-center gap-5">
      <motion.div
        className="font-sketch text-[#F7931A] tracking-widest uppercase"
        style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)" }}
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        Step 1
      </motion.div>

      <motion.h2
        className="font-sketch"
        style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.1, color: c.txt }}
        initial={{ opacity: 0, y: 28 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Create Your Qoin
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {[
          {
            chain: "EVM", sub: "Ethereum mainnet",
            logo: <img src="/eth-logo.png" alt="Ethereum" className="w-10 h-10 object-contain" />,
          },
          {
            chain: "Solana", sub: "Solana mainnet",
            logo: <SolanaLogo size={40} />,
          },
        ].map((item, i) => (
          <motion.div
            key={item.chain}
            className="p-5"
            style={{ border: `1px solid ${c.cardBorder}`, background: c.cardBg }}
            initial={{ opacity: 0, x: i === 0 ? -28 : 28 }}
            animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: i === 0 ? -28 : 28 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
          >
            <div className="mb-3">{item.logo}</div>
            <div className="font-sketch" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: c.txt }}>{item.chain}</div>
            <div className="font-body mt-1" style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)", color: c.txt2 }}>{item.sub}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-2">
          {[1, 2].map((k) => (
            <motion.div
              key={k}
              className="w-10 h-10 border flex items-center justify-center"
              animate={{ borderColor: ["rgba(247,147,26,0.25)", "rgba(247,147,26,0.9)", "rgba(247,147,26,0.25)"] }}
              transition={{ duration: 2, delay: k * 0.4, repeat: Infinity }}
            >
              <span className="font-sketch text-[#F7931A]" style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)" }}>K{k}</span>
            </motion.div>
          ))}
        </div>
        <span className="font-body" style={{ fontSize: "clamp(0.7rem, 1.6vw, 0.9rem)", color: c.txt2 }}>Generated locally in your browser</span>
      </motion.div>

      <motion.p
        className="font-handwritten text-[#F7931A]/70"
        style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        Gas covered. No KYC. No account.
      </motion.p>
    </div>
  );
}

function SceneColdKey({ phase, c }: SceneProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 text-center gap-5">
      <motion.div
        className="font-sketch text-[#F7931A] tracking-widest uppercase"
        style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)" }}
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        Access Mode 1
      </motion.div>

      <motion.h2
        className="font-sketch"
        style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.1, color: c.txt }}
        initial={{ opacity: 0, y: 28 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Cold Key Mode
      </motion.h2>

      <div className="w-full max-w-md space-y-3">
        {[
          { label: "Key 1 (private key string)", val: "5KJvsngHeMpm984..." },
          { label: "Key 2 (private key string)", val: "7xFc2mKLsPwQ651..." },
        ].map((field, i) => (
          <motion.div
            key={field.label}
            className="p-4 text-left"
            style={{ border: `1px solid ${c.cardBorder}`, background: c.cardBg }}
            initial={{ opacity: 0, x: -22 }}
            animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -22 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="font-body mb-1.5" style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", color: c.txt2 }}>{field.label}</div>
            <div className="font-mono text-[#F7931A]/80" style={{ fontSize: "clamp(0.7rem, 1.6vw, 0.9rem)" }}>
              {field.val}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>|</motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex gap-8 items-start"
        initial={{ opacity: 0, y: 12 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5 }}
      >
        {[
          { icon: "⬡", text: "Signed locally" },
          { icon: "⊘", text: "Never sent to server" },
          { icon: "◻", text: "Any browser" },
        ].map((item, i) => (
          <motion.div
            key={item.text}
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-[#F7931A]" style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>{item.icon}</span>
            <span className="font-body" style={{ fontSize: "clamp(0.6rem, 1.3vw, 0.78rem)", color: c.txt2 }}>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="font-handwritten text-[#F7931A]/70"
        style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        Maximum security. No extension required.
      </motion.p>
    </div>
  );
}

function SceneWalletConnect({ phase, c }: SceneProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 text-center gap-5">
      <motion.div
        className="font-sketch text-[#F7931A] tracking-widest uppercase"
        style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)" }}
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        Access Mode 2
      </motion.div>

      <motion.h2
        className="font-sketch"
        style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.1, color: c.txt }}
        initial={{ opacity: 0, y: 28 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Wallet Connect Mode
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {[
          {
            chain: "Solana", chainLogo: <SolanaLogo size={20} />, color: "#9945FF",
            wallets: [
              { logo: "/phantom-logo.png", name: "Phantom", role: "Key 1" },
              { logo: "/solflare-logo.png", name: "Solflare", role: "Key 2" },
            ],
          },
          {
            chain: "EVM", chainLogo: <img src="/eth-logo.png" alt="ETH" className="w-5 h-5 object-contain" />, color: "#627EEA",
            wallets: [
              { logo: "/metamask-logo.png", name: "MetaMask", role: "Account 1 (Key 1)" },
              { logo: "/metamask-logo.png", name: "MetaMask", role: "Account 2 (Key 2)" },
            ],
          },
        ].map((block, bi) => (
          <motion.div
            key={block.chain}
            className="p-5 text-left"
            style={{ border: `1px solid ${c.cardBorder}`, background: c.cardBg }}
            initial={{ opacity: 0, x: bi === 0 ? -28 : 28 }}
            animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: bi === 0 ? -28 : 28 }}
            transition={{ duration: 0.55, delay: bi * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              {block.chainLogo}
              <span className="font-sketch" style={{ color: block.color, fontSize: "clamp(0.8rem, 1.8vw, 1rem)" }}>{block.chain}</span>
            </div>
            <div className="space-y-3">
              {block.wallets.map((w) => (
                <div key={w.role} className="flex items-center gap-2.5">
                  <img src={w.logo} alt={w.name} className="w-7 h-7 rounded-xl flex-shrink-0 object-contain" />
                  <div>
                    <div className="font-sketch" style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.82rem)", color: c.txt }}>{w.name}</div>
                    <div className="font-body" style={{ fontSize: "clamp(0.58rem, 1.1vw, 0.7rem)", color: c.txt3 }}>{w.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="font-body"
        style={{ fontSize: "clamp(0.7rem, 1.6vw, 0.9rem)", color: c.txt2 }}
        initial={{ opacity: 0, y: 10 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        Both wallets must approve every transaction
      </motion.p>

      <motion.p
        className="font-handwritten text-[#F7931A]/70"
        style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        Your wallets. Your keys. Your Qoin.
      </motion.p>
    </div>
  );
}

function SceneProtocol({ phase, c }: SceneProps) {
  const steps = [
    { label: "Key 1 Signs", sub: "Transaction built locally" },
    { label: "Key 2 Signs", sub: "Partially signed tx approved" },
    { label: "On-Chain Verify", sub: "Qonjoint program confirms both" },
    { label: "Transfer Executes", sub: "Funds move. No exceptions." },
  ];
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 text-center gap-5">
      <motion.div
        className="font-sketch text-[#F7931A] tracking-widest uppercase"
        style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)" }}
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        Qonjoint Protocol
      </motion.div>

      <motion.h2
        className="font-sketch"
        style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.1, color: c.txt }}
        initial={{ opacity: 0, y: 28 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Both Keys Must Sign
      </motion.h2>

      <div className="w-full max-w-md space-y-2 text-left">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-center gap-3 border-l-2 border-[#F7931A]/25 pl-4 py-2"
            initial={{ opacity: 0, x: -18 }}
            animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
            transition={{ duration: 0.45, delay: i * 0.12 }}
          >
            <motion.div
              className="w-7 h-7 flex-shrink-0 border flex items-center justify-center"
              animate={phase >= 2 ? { borderColor: "rgba(247,147,26,0.8)", backgroundColor: "rgba(247,147,26,0.08)" } : {}}
              transition={{ duration: 0.3, delay: i * 0.12 + 0.3 }}
            >
              <span className="font-sketch text-[#F7931A]" style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)" }}>{i + 1}</span>
            </motion.div>
            <div>
              <div className="font-sketch" style={{ fontSize: "clamp(0.75rem, 1.8vw, 1rem)", color: c.txt }}>{step.label}</div>
              <div className="font-body" style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", color: c.txt2 }}>{step.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="border border-[#F7931A]/30 bg-[#F7931A]/[0.06] px-6 py-3"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-sketch text-[#F7931A]" style={{ fontSize: "clamp(0.7rem, 1.6vw, 0.9rem)" }}>
          Protocol-level enforcement. No exceptions.
        </span>
      </motion.div>

      <motion.p
        className="font-handwritten text-[#F7931A]/70"
        style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        Crack one key. Get nothing.
      </motion.p>
    </div>
  );
}

export default function HowItWorksModal({ onClose }: Props) {
  const { dark } = useApp();
  const c = makeColors(dark);

  const [currentScene, setCurrentScene] = useState(0);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setPhase(0);
    setProgress(0);

    const phaseTimers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 650),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2700),
    ];

    const dur = SCENES[currentScene].duration;
    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min((elapsed / dur) * 100, 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      setCurrentScene((s) => (s + 1) % SCENES.length);
    }, dur);

    return () => {
      phaseTimers.forEach(clearTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentScene]);

  const goTo = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentScene(i);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo((currentScene + 1) % SCENES.length);
      if (e.key === "ArrowLeft") goTo((currentScene - 1 + SCENES.length) % SCENES.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentScene, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        className="relative w-full h-full flex flex-col overflow-hidden"
        style={{
          maxWidth: "min(95vw, 1100px)",
          maxHeight: "min(92vh, 700px)",
          background: c.bg,
          border: `1px solid ${c.cardBorder}`,
        }}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <Orb size={350} left="55%" top="-15%" color="radial-gradient(circle,#F7931A,transparent)" dur={14} del={0} />
        <Orb size={250} left="-8%" top="50%" color="radial-gradient(circle,#6366f1,transparent)" dur={18} del={2} />
        <Orb size={200} left="70%" top="60%" color="radial-gradient(circle,#F7931A,transparent)" dur={12} del={5} />

        <motion.div
          className="absolute top-0 left-0 w-full h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg,transparent,#F7931A,transparent)" }}
          animate={{ opacity: [0.08, 0.25, 0.08] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center transition-colors"
          style={{ color: c.txt3 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = c.txt)}
          onMouseLeave={(e) => (e.currentTarget.style.color = c.txt3)}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="sync">
            {currentScene === 0 && (
              <motion.div key="intro" className="absolute inset-0 flex flex-col"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                animate={{ clipPath: "circle(150% at 50% 50%)" }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
                <SceneIntro phase={phase} c={c} />
              </motion.div>
            )}
            {currentScene === 1 && (
              <motion.div key="create" className="absolute inset-0 flex flex-col"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                exit={{ clipPath: "inset(0 0 0 100%)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <SceneCreate phase={phase} c={c} />
              </motion.div>
            )}
            {currentScene === 2 && (
              <motion.div key="coldkey" className="absolute inset-0 flex flex-col"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                exit={{ clipPath: "inset(0 0 0 100%)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <SceneColdKey phase={phase} c={c} />
              </motion.div>
            )}
            {currentScene === 3 && (
              <motion.div key="walletconnect" className="absolute inset-0 flex flex-col"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                exit={{ clipPath: "inset(0 0 0 100%)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <SceneWalletConnect phase={phase} c={c} />
              </motion.div>
            )}
            {currentScene === 4 && (
              <motion.div key="protocol" className="absolute inset-0 flex flex-col"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                exit={{ clipPath: "circle(0% at 50% 50%)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <SceneProtocol phase={phase} c={c} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="relative z-20 flex-shrink-0 px-6 pb-5 pt-3"
          style={{ background: c.bottomGrad }}
        >
          <div
            className="h-[2px] w-full mb-3 rounded-full overflow-hidden"
            style={{ background: c.progressBg }}
          >
            <motion.div
              className="h-full bg-[#F7931A] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              {SCENES.map((s, i) => (
                <button key={s.id} onClick={() => goTo(i)} className="flex items-center">
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: i === currentScene ? 22 : 6,
                      height: 6,
                      backgroundColor: i === currentScene ? "#F7931A" : c.dotInactive,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
            </div>

            <span className="font-sketch" style={{ fontSize: "0.72rem", color: c.txt3 }}>
              {currentScene + 1} / {SCENES.length}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
