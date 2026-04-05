import { useState, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { isValidPublicKey, explorerAddressUrl } from "@/lib/solana";
import {
  SketchAtom, SketchShield, SketchTwoKeys, SketchLock,
  SketchWave, SketchDecorLine, SketchStar,
  SketchNetwork, SketchCoin, SketchWarning
} from "@/components/sketches";
import Navbar from "@/components/Navbar";
import { useApp } from "@/contexts/AppContext";
import HowItWorksModal from "@/components/HowItWorksModal";

const SOL_VAULT = "6TkW8UojBM9g9uanoSGHzm24DJwmu8333yaBMHbrGKR5";
const TREASURY_DEVNET = false;
const EVM_VAULT = "0x0000000000000000000000000000000000000000";

const SOL_K1_KEY = "FNBTMRNyuYxPaFHSCZosmGqWLMcDQiVGLwbGGSgNnzmo";
const EVM_K1_KEY = "0x0000000000000000000000000000000000000000000000000000000000000001";

function BalancePanel({
  loading, error, onRetry,
  nativeBalance, nativeSymbol, nativeLabel,
  tokens, vault, explorerUrl, dark, mutedText,
}: {
  loading: boolean;
  error: string;
  onRetry: () => void;
  nativeBalance: number | null;
  nativeSymbol: string;
  nativeLabel: string;
  tokens: Array<{ symbol: string; name: string; balance: number; logo: string | null }>;
  vault: string;
  explorerUrl: string;
  dark: boolean;
  mutedText: string;
}) {
  const text = dark ? "text-[#FAFAF5]" : "text-[#1a1a1a]";
  if (loading) {
    return <div className={`font-handwritten text-base animate-pulse py-4 ${mutedText}`}>Fetching...</div>;
  }
  if (error) {
    return (
      <div>
        <div className="font-handwritten text-sm text-red-400 mb-3">{error}</div>
        <button onClick={onRetry} className={`font-body font-bold text-xs px-3 py-1.5 border ${dark ? "border-[#FAFAF5]/20 text-[#FAFAF5]/50" : "border-[#1a1a1a]/20 text-[#1a1a1a]/50"} hover:border-[#F7931A] hover:text-[#F7931A] transition-colors`}>Retry</button>
      </div>
    );
  }
  return (
    <div>
      <div className={`border ${dark ? "border-[#FAFAF5]/10 bg-[#0f0f0f]" : "border-[#1a1a1a]/10 bg-[#f5f5f0]"} p-3 mb-3 flex items-center justify-between`}>
        <span className={`font-handwritten text-sm ${mutedText}`}>{nativeLabel}</span>
        <span className={`font-sketch text-lg ${text}`}>{nativeBalance !== null ? nativeBalance.toFixed(6) : "0"} {nativeSymbol}</span>
      </div>
      {tokens.length > 0 && tokens.map((tk) => (
        <div key={tk.symbol} className={`border ${dark ? "border-[#FAFAF5]/10 bg-[#0f0f0f]" : "border-[#1a1a1a]/10 bg-[#f5f5f0]"} p-3 mb-2 flex items-center gap-2`}>
          {tk.logo && <img src={tk.logo} alt={tk.symbol} className="w-5 h-5 rounded-full flex-shrink-0" />}
          <span className={`font-handwritten text-sm flex-1 ${mutedText}`}>{tk.name}</span>
          <span className={`font-sketch text-base ${text}`}>{tk.balance.toLocaleString()} {tk.symbol}</span>
        </div>
      ))}
      <div className={`font-mono text-xs break-all p-2 border mb-2 ${dark ? "border-[#FAFAF5]/10 bg-[#0f0f0f] text-[#FAFAF5]/40" : "border-[#1a1a1a]/10 bg-[#f5f5f0] text-[#888]"}`}>{vault}</div>
      <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="font-handwritten text-sm text-[#F7931A] hover:underline">
        View on explorer →
      </a>
    </div>
  );
}

export default function Landing() {
  const [, navigate] = useLocation();
  const { t, dark } = useApp();
  const [treasurySol, setTreasurySol] = useState<number | null>(null);
  const [treasuryTokens, setTreasuryTokens] = useState<Array<{ mint: string; balance: number; name: string | null; symbol: string | null; logo: string | null }>>([]);
  const [treasuryLoading, setTreasuryLoading] = useState(true);
  const [treasuryError, setTreasuryError] = useState("");
  const [evmEth, setEvmEth] = useState<number | null>(null);
  const [evmTokens, setEvmTokens] = useState<Array<{ contract: string; name: string; symbol: string; balance: number; logo: string }>>([]);
  const [evmLoading, setEvmLoading] = useState(true);
  const [evmError, setEvmError] = useState("");
  const [balanceTab, setBalanceTab] = useState<"eth" | "sol">("eth");
  const [challengeTab, setChallengeTab] = useState<"evm" | "sol">("evm");
  const [evmKeyCopied, setEvmKeyCopied] = useState(false);
  const [solKeyCopied, setSolKeyCopied] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const fetchTreasury = useCallback(async () => {
    setTreasuryLoading(true);
    setTreasuryError("");
    try {
      const res = await fetch(`/api/qoin/balance?address=${SOL_VAULT}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json() as { solBalance: number; tokens: Array<{ mint: string; balance: number; name: string | null; symbol: string | null; logo: string | null }> };
      setTreasurySol(data.solBalance);
      setTreasuryTokens(data.tokens);
    } catch {
      setTreasuryError("Could not reach Solana network. Try refreshing.");
    } finally {
      setTreasuryLoading(false);
    }
  }, []);

  const fetchEvmTreasury = useCallback(async () => {
    setEvmLoading(true);
    setEvmError("");
    try {
      const res = await fetch(`/api/evm/balance?address=${EVM_VAULT}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json() as { ethBalance: number; ethLogo: string; tokens: Array<{ contract: string; name: string; symbol: string; balance: number; logo: string }> };
      setEvmEth(data.ethBalance);
      setEvmTokens(data.tokens);
    } catch {
      setEvmError("Could not reach Ethereum network. Try refreshing.");
    } finally {
      setEvmLoading(false);
    }
  }, []);

  useEffect(() => { fetchTreasury(); fetchEvmTreasury(); }, [fetchTreasury, fetchEvmTreasury]);

  const bg = dark ? "bg-[#0f0f0f] text-[#FAFAF5]" : "bg-[#FAFAF5] text-[#1a1a1a]";
  const cardBg = dark ? "bg-[#1a1a1a] border-[#FAFAF5]/10" : "bg-white border-[#1a1a1a]";
  const cardShadow = dark ? "" : "shadow-[6px_6px_0_#1a1a1a]";
  const mutedText = dark ? "text-[#FAFAF5]/60" : "text-[#555]";
  const mutedText2 = dark ? "text-[#FAFAF5]/50" : "text-[#444]";

  return (
    <div className={`min-h-screen font-body ${bg}`}>

      <Navbar />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-20 text-center">
        <h1 className="font-sketch text-5xl md:text-7xl leading-tight mb-6">
          {t.hero.line1}
          <br />
          <span className="text-[#F7931A]">{t.hero.line2}</span>
          <br />
          {t.hero.line3}
        </h1>
        <SketchWave className="w-48 mx-auto mb-8" />
        <p className={`text-xl md:text-2xl leading-relaxed mb-4 max-w-4xl mx-auto ${mutedText2}`}>
          {t.hero.body}
        </p>
        <p className="font-handwritten text-2xl text-[#F7931A] mb-10">
          {t.hero.handwritten}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => navigate("/qoin/create")} className="btn-sketch text-lg px-8 py-4">
            {t.hero.ctaCreate}
          </button>
          <button onClick={() => navigate("/qoin/open")} className="btn-sketch-outline text-lg px-8 py-4">
            {t.hero.ctaOpen}
          </button>
          <button
            onClick={() => setShowVideo(true)}
            className={`font-body font-bold text-base transition-colors flex items-center gap-2 ${dark ? "text-[#FAFAF5]/50 hover:text-[#F7931A]" : "text-[#1a1a1a]/50 hover:text-[#F7931A]"}`}
          >
            <span className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm ${dark ? "border-[#FAFAF5]/20" : "border-[#1a1a1a]/20"}`}>▶</span>
            {t.hero.ctaHow}
          </button>
        </div>
      </section>

      <SketchDecorLine className="w-full" />

      {/* STATS BAR */}
      <section className="bg-[#F7931A] border-y-2 border-[#1a1a1a] py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: t.stats.keysValue, label: t.stats.keysLabel },
            { value: t.stats.clientValue, label: t.stats.clientLabel },
            { value: t.stats.serversValue, label: t.stats.serversLabel },
            { value: t.stats.enforcerValue, label: t.stats.enforcerLabel },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-sketch text-3xl text-white">{stat.value}</div>
              <div className="font-handwritten text-white/80 text-xl">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF OF QOIN */}
      <section className="py-20" id="proof">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="badge-sketch-orange mb-4">{t.proof.badge}</div>
            <h2 className="font-sketch text-4xl mb-4">{t.proof.title}</h2>
            <SketchWave className="w-40 mb-4" />
            <p className={`text-xl max-w-4xl ${mutedText}`}>{t.proof.body}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">

            {/* HACK CHALLENGE — tabs on mobile, side-by-side on desktop */}
            <div className={`border-2 ${cardBg} ${cardShadow} rounded-sm overflow-hidden`}>
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-5">
                  <SketchWarning className="w-9 h-9 flex-shrink-0" />
                  <div>
                    <div className="font-sketch text-xl">Key 1 Private Keys Published.</div>
                    <div className={`font-handwritten text-base ${mutedText}`}>One per chain. Both vaults still locked.</div>
                  </div>
                </div>

                {/* Mobile tabs */}
                <div className={`flex md:hidden border-2 ${dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]"} mb-4`}>
                  {(["evm", "sol"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setChallengeTab(tab)}
                      className={`flex-1 py-2.5 font-sketch text-base transition-colors ${
                        challengeTab === tab
                          ? "bg-[#F7931A] text-white"
                          : dark
                          ? "text-[#FAFAF5]/40 hover:text-[#FAFAF5]"
                          : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
                      }`}
                    >
                      {tab === "evm" ? "Ethereum" : "Solana"}
                    </button>
                  ))}
                </div>

                {/* Desktop column headers */}
                <div className={`hidden md:grid grid-cols-2 gap-4 mb-4`}>
                  {["Ethereum", "Solana"].map((label) => (
                    <div key={label} className={`font-sketch text-lg pb-2 border-b-2 ${dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]/10"}`}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile: single active panel */}
              <div className="md:hidden px-6 pb-6">
                {(["evm", "sol"] as const).map((tab) => {
                  const k1 = tab === "evm" ? EVM_K1_KEY : SOL_K1_KEY;
                  const copied = tab === "evm" ? evmKeyCopied : solKeyCopied;
                  const setCopied = tab === "evm"
                    ? (v: boolean) => setEvmKeyCopied(v)
                    : (v: boolean) => setSolKeyCopied(v);
                  if (tab !== challengeTab) return null;
                  return (
                    <div key={tab}>
                      <div className="bg-[#F7931A] border-2 border-[#1a1a1a] rounded-sm p-4 mb-3">
                        <div className="font-handwritten text-xs text-white/70 uppercase tracking-wide mb-1.5">Private Key (Key 1)</div>
                        <div className="font-mono text-xs text-white break-all leading-relaxed">{k1}</div>
                      </div>
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(k1);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="btn-sketch-outline w-full py-2.5 text-sm mb-3"
                      >
                        {copied ? "Copied. Good luck." : "Copy Private Key"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Desktop: both panels side by side */}
              <div className="hidden md:grid grid-cols-2 gap-4 px-6 pb-6">
                {(["evm", "sol"] as const).map((tab) => {
                  const k1 = tab === "evm" ? EVM_K1_KEY : SOL_K1_KEY;
                  const copied = tab === "evm" ? evmKeyCopied : solKeyCopied;
                  const setCopied = tab === "evm"
                    ? (v: boolean) => setEvmKeyCopied(v)
                    : (v: boolean) => setSolKeyCopied(v);
                  return (
                    <div key={tab}>
                      <div className="bg-[#F7931A] border-2 border-[#1a1a1a] rounded-sm p-3 mb-3">
                        <div className="font-handwritten text-xs text-white/70 uppercase tracking-wide mb-1.5">Private Key (Key 1)</div>
                        <div className="font-mono text-xs text-white break-all leading-relaxed">{k1}</div>
                      </div>
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(k1);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="btn-sketch-outline w-full py-2.5 text-sm"
                      >
                        {copied ? "Copied. Good luck." : "Copy Private Key"}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className={`px-6 pb-6 grid grid-cols-3 gap-3 text-center border-t ${dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]/10"} pt-4`}>
                {[
                  { label: "Keys Published", value: "1+1", color: "#F7931A" },
                  { label: "Keys Needed Each", value: "2", color: "#ef4444" },
                  { label: "Successful Hacks", value: "0", color: "#888" },
                ].map((item) => (
                  <div key={item.label} className={`border rounded-sm p-3 ${dark ? "border-[#FAFAF5]/10" : "border-[#eee]"}`}>
                    <div className="font-sketch text-2xl" style={{ color: item.color }}>{item.value}</div>
                    <div className={`font-handwritten text-sm ${mutedText}`}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-6">
                <p className={`font-handwritten text-base italic ${mutedText}`}>
                  {t.proof.cannotMove}
                </p>
              </div>
            </div>

            {/* LIVE BALANCE — dual chain */}
            <div className={`${dark ? "border-2 border-[#FAFAF5]/10 bg-[#1a1a1a]" : "sketch-card"} overflow-hidden`}>
              <div className="p-6 pb-0">
                <div className="font-sketch text-2xl mb-1">{t.proof.liveTitle}</div>
                <p className={`font-handwritten text-base mb-4 ${mutedText}`}>{t.proof.liveSub}</p>

                {/* Mobile tabs */}
                <div className={`flex md:hidden border-2 ${dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]"} mb-4`}>
                  {(["eth", "sol"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setBalanceTab(tab)}
                      className={`flex-1 py-2.5 font-sketch text-base transition-colors ${
                        balanceTab === tab
                          ? "bg-[#F7931A] text-white"
                          : dark ? "text-[#FAFAF5]/40 hover:text-[#FAFAF5]" : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
                      }`}
                    >
                      {tab === "eth" ? "Ethereum" : "Solana"}
                    </button>
                  ))}
                </div>

                {/* Desktop column headers */}
                <div className={`hidden md:grid grid-cols-2 gap-4 mb-4`}>
                  {["Ethereum", "Solana"].map((label) => (
                    <div key={label} className={`font-sketch text-lg pb-2 border-b-2 ${dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]/10"}`}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile: single active panel */}
              <div className="md:hidden px-6 pb-6">
                {balanceTab === "eth" ? (
                  <BalancePanel
                    loading={evmLoading} error={evmError}
                    onRetry={fetchEvmTreasury}
                    nativeBalance={evmEth} nativeSymbol="ETH" nativeLabel="ETH Balance"
                    tokens={evmTokens.filter(tk => tk.balance > 0).map(tk => ({ symbol: tk.symbol, name: tk.name, balance: tk.balance, logo: tk.logo }))}
                    vault={EVM_VAULT}
                    explorerUrl={`https://etherscan.io/address/${EVM_VAULT}`}
                    dark={dark} mutedText={mutedText}
                  />
                ) : (
                  <BalancePanel
                    loading={treasuryLoading} error={treasuryError}
                    onRetry={fetchTreasury}
                    nativeBalance={treasurySol} nativeSymbol="SOL" nativeLabel="SOL Balance"
                    tokens={treasuryTokens.filter(tk => tk.balance > 0).map(tk => ({ symbol: tk.symbol ?? tk.mint.slice(0,6), name: tk.name ?? tk.symbol ?? "Token", balance: tk.balance, logo: tk.logo ?? null }))}
                    vault={SOL_VAULT}
                    explorerUrl={explorerAddressUrl(SOL_VAULT, TREASURY_DEVNET)}
                    dark={dark} mutedText={mutedText}
                  />
                )}
              </div>

              {/* Desktop: both panels side by side */}
              <div className="hidden md:grid grid-cols-2 gap-4 px-6 pb-6">
                <BalancePanel
                  loading={evmLoading} error={evmError}
                  onRetry={fetchEvmTreasury}
                  nativeBalance={evmEth} nativeSymbol="ETH" nativeLabel="ETH Balance"
                  tokens={evmTokens.filter(tk => tk.balance > 0).map(tk => ({ symbol: tk.symbol, name: tk.name, balance: tk.balance, logo: tk.logo }))}
                  vault={EVM_VAULT}
                  explorerUrl={`https://etherscan.io/address/${EVM_VAULT}`}
                  dark={dark} mutedText={mutedText}
                />
                <BalancePanel
                  loading={treasuryLoading} error={treasuryError}
                  onRetry={fetchTreasury}
                  nativeBalance={treasurySol} nativeSymbol="SOL" nativeLabel="SOL Balance"
                  tokens={treasuryTokens.filter(tk => tk.balance > 0).map(tk => ({ symbol: tk.symbol ?? tk.mint.slice(0,6), name: tk.name ?? tk.symbol ?? "Token", balance: tk.balance, logo: tk.logo ?? null }))}
                  vault={SOL_VAULT}
                  explorerUrl={explorerAddressUrl(SOL_VAULT, TREASURY_DEVNET)}
                  dark={dark} mutedText={mutedText}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mountain divider */}
      <div className="relative -mb-px overflow-hidden leading-none" style={{ background: dark ? "#0f0f0f" : "#FAFAF5" }}>
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full block" style={{ height: 72 }} fill={dark ? "#141414" : "#1a1a1a"}>
          <path d="M0,72 L0,56 C80,36 140,68 240,48 C340,28 400,62 520,44 C640,26 700,60 820,42 C940,24 1000,58 1120,40 C1240,22 1340,54 1440,38 L1440,72 Z" />
        </svg>
      </div>

      {/* HOW IT WORKS */}
      <section className={`pt-10 pb-24 relative overflow-hidden ${dark ? "bg-[#141414] border-y border-[#FAFAF5]/5" : "bg-[#1a1a1a]"}`} id="how">
        <div className="absolute inset-0 pointer-events-none select-none">
          <svg viewBox="0 0 1440 480" fill="none" className="w-full h-full opacity-50" preserveAspectRatio="xMidYMid slice">
            <line x1="150" y1="100" x2="480" y2="165" stroke="white" strokeWidth="0.8" opacity="0.35"/>
            <line x1="480" y1="165" x2="790" y2="75" stroke="white" strokeWidth="0.8" opacity="0.35"/>
            <line x1="790" y1="75" x2="1060" y2="185" stroke="white" strokeWidth="0.8" opacity="0.35"/>
            <line x1="1060" y1="185" x2="1310" y2="95" stroke="white" strokeWidth="0.8" opacity="0.35"/>
            <line x1="150" y1="100" x2="50" y2="330" stroke="white" strokeWidth="0.6" opacity="0.25"/>
            <line x1="480" y1="165" x2="290" y2="360" stroke="white" strokeWidth="0.6" opacity="0.25"/>
            <line x1="790" y1="75" x2="610" y2="340" stroke="white" strokeWidth="0.6" opacity="0.25"/>
            <line x1="1060" y1="185" x2="900" y2="390" stroke="white" strokeWidth="0.6" opacity="0.25"/>
            <line x1="1310" y1="95" x2="1160" y2="355" stroke="white" strokeWidth="0.6" opacity="0.25"/>
            <line x1="50" y1="330" x2="290" y2="360" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            <line x1="290" y1="360" x2="610" y2="340" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            <line x1="610" y1="340" x2="900" y2="390" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            <line x1="900" y1="390" x2="1160" y2="355" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            <line x1="1160" y1="355" x2="1420" y2="290" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            <line x1="1310" y1="95" x2="1420" y2="290" stroke="white" strokeWidth="0.6" opacity="0.25"/>
            <g transform="translate(150,100)" opacity="0.9">
              <circle r="24" stroke="#F7931A" strokeWidth="1" fill="rgba(247,147,26,0.1)"/>
              <circle r="11" stroke="#F7931A" strokeWidth="2" fill="none"/>
              <circle r="4" fill="#F7931A"/>
              <line x1="11" y1="0" x2="30" y2="0" stroke="#F7931A" strokeWidth="2.5"/>
              <line x1="26" y1="0" x2="26" y2="8" stroke="#F7931A" strokeWidth="2"/>
              <line x1="21" y1="0" x2="21" y2="6" stroke="#F7931A" strokeWidth="2"/>
            </g>
            <g transform="translate(480,165)" opacity="0.9">
              <circle r="22" stroke="#F7931A" strokeWidth="1" fill="rgba(247,147,26,0.1)"/>
              <rect x="-10" y="-4" width="20" height="17" rx="2" stroke="#F7931A" strokeWidth="2" fill="none"/>
              <path d="M-6,-4 L-6,-12 Q0,-18 6,-12 L6,-4" stroke="#F7931A" strokeWidth="2" fill="none"/>
              <circle cy="4" r="3.5" fill="#F7931A"/>
            </g>
            <g transform="translate(790,75)" opacity="1">
              <circle r="28" stroke="#F7931A" strokeWidth="1.5" fill="rgba(247,147,26,0.12)"/>
              <circle r="13" stroke="#F7931A" strokeWidth="2.5" fill="none"/>
              <circle r="5" fill="#F7931A"/>
              <line x1="13" y1="0" x2="34" y2="0" stroke="#F7931A" strokeWidth="3"/>
              <line x1="30" y1="0" x2="30" y2="9" stroke="#F7931A" strokeWidth="2.5"/>
              <line x1="24" y1="0" x2="24" y2="7" stroke="#F7931A" strokeWidth="2.5"/>
            </g>
            <g transform="translate(1060,185)" opacity="0.9">
              <circle r="22" stroke="#F7931A" strokeWidth="1" fill="rgba(247,147,26,0.1)"/>
              <rect x="-10" y="-4" width="20" height="17" rx="2" stroke="#F7931A" strokeWidth="2" fill="none"/>
              <path d="M-6,-4 L-6,-12 Q0,-18 6,-12 L6,-4" stroke="#F7931A" strokeWidth="2" fill="none"/>
              <circle cy="4" r="3.5" fill="#F7931A"/>
            </g>
            <g transform="translate(1310,95)" opacity="0.85">
              <circle r="20" stroke="#F7931A" strokeWidth="1" fill="rgba(247,147,26,0.1)"/>
              <circle r="9" stroke="#F7931A" strokeWidth="2" fill="none"/>
              <circle r="3.5" fill="#F7931A"/>
              <line x1="9" y1="0" x2="26" y2="0" stroke="#F7931A" strokeWidth="2"/>
              <line x1="22" y1="0" x2="22" y2="7" stroke="#F7931A" strokeWidth="2"/>
              <line x1="18" y1="0" x2="18" y2="5" stroke="#F7931A" strokeWidth="2"/>
            </g>
            <circle cx="50" cy="330" r="9" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35"/>
            <circle cx="290" cy="360" r="6" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3"/>
            <circle cx="610" cy="340" r="9" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3"/>
            <circle cx="900" cy="390" r="6" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3"/>
            <circle cx="1160" cy="355" r="9" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35"/>
            <circle cx="1420" cy="290" r="10" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block border border-[#F7931A] text-[#F7931A] font-handwritten text-sm px-3 py-1 mb-4 uppercase tracking-widest">{t.how.badge}</div>
            <h2 className="font-sketch text-4xl mb-4 text-white">{t.how.title}</h2>
            <p className="text-lg text-white/50 max-w-3xl mx-auto">{t.how.body}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", title: t.how.step1title, desc: t.how.step1desc, note: t.how.step1note, Icon: SketchTwoKeys },
              { n: "02", title: t.how.step2title, desc: t.how.step2desc, note: t.how.step2note, Icon: SketchShield },
              { n: "03", title: t.how.step3title, desc: t.how.step3desc, note: t.how.step3note, Icon: SketchLock },
            ].map((step) => (
              <div key={step.n} className="flex flex-col bg-white/[0.04] border border-white/10 p-6 rounded-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="font-sketch text-3xl text-[#F7931A]">{step.n}</div>
                  <span className="text-white opacity-50"><step.Icon className="w-14 h-14" /></span>
                </div>
                <h3 className="font-sketch text-2xl mb-3 text-white">{step.title}</h3>
                <p className="text-base text-white/50 leading-relaxed mb-4 flex-1">{step.desc}</p>
                <div className="border-l-2 border-[#F7931A] pl-3">
                  <p className="font-handwritten text-base text-white/30">{step.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY UPGRADE */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="why">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="badge-sketch-orange mb-4">{t.why.badge}</div>
            <h2 className="font-sketch text-4xl mb-6 leading-tight">{t.why.title}</h2>
            <p className={`text-lg leading-relaxed mb-4 ${mutedText2}`}>{t.why.p1}</p>
            <p className={`text-lg leading-relaxed mb-4 ${mutedText2}`}>{t.why.p2}</p>
            <p className={`text-lg leading-relaxed mb-6 ${mutedText2}`}>{t.why.p3}</p>
            <div className="font-handwritten text-2xl text-[#F7931A]">{t.why.handwritten}</div>
          </div>
          <div className="space-y-4">
            <div className={dark ? "border border-[#FAFAF5]/10 bg-[#1a1a1a] p-6" : "sketch-card p-6"}>
              <div className="flex items-start gap-4">
                <SketchAtom className="w-14 h-14 flex-shrink-0" />
                <div>
                  <div className="font-sketch text-xl mb-1">{t.why.threat1Title}</div>
                  <p className={`text-base ${mutedText}`}>{t.why.threat1Desc}</p>
                </div>
              </div>
            </div>
            <div className={dark ? "border border-[#FAFAF5]/10 bg-[#1a1a1a] p-6" : "sketch-card p-6"}>
              <div className="flex items-start gap-4">
                <SketchNetwork className="w-14 h-14 flex-shrink-0" />
                <div>
                  <div className="font-sketch text-xl mb-1">{t.why.threat2Title}</div>
                  <p className={`text-base ${mutedText}`}>{t.why.threat2Desc}</p>
                </div>
              </div>
            </div>
            <div className={dark ? "border border-[#F7931A]/30 bg-[#F7931A]/5 p-6" : "sketch-card-orange p-6"}>
              <div className="flex items-start gap-4">
                <SketchShield className="w-14 h-14 flex-shrink-0" />
                <div>
                  <div className="font-sketch text-xl mb-1 text-[#F7931A]">{t.why.solutionTitle}</div>
                  <p className={`text-base ${mutedText}`}>{t.why.solutionDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 py-20" id="faq">
        <div className="text-center mb-12">
          <div className="badge-sketch-orange mb-4">{t.faq.badge}</div>
          <h2 className="font-sketch text-4xl">{t.faq.title}</h2>
        </div>
        <div className="space-y-4">
          {t.faq.items.map((item, i) => (
            <div key={i} className={`border-2 ${dark ? "border-[#FAFAF5]/10 bg-[#1a1a1a]" : "border-[#1a1a1a] bg-white"}`}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-5 flex items-start justify-between gap-3 text-left"
              >
                <span className="font-sketch text-xl">{item.q}</span>
                <span className="font-body text-[#F7931A] text-xl ml-4 flex-shrink-0 transition-transform duration-200 inline-block" style={{ transform: openFaq === i ? "rotate(45deg)" : "" }}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 pt-0">
                  <p className={`text-lg leading-relaxed font-body ${mutedText}`}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/faq")}
            className="font-body font-bold text-sm text-[#F7931A] hover:underline"
          >
            {t.faq.badge} →
          </button>
        </div>
      </section>

      {/* Mountain divider */}
      <div className="relative -mb-px overflow-hidden leading-none" style={{ background: dark ? "#0f0f0f" : "#FAFAF5" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: 60 }} fill={dark ? "#141414" : "#1a1a1a"}>
          <path d="M0,60 L0,44 C100,22 180,55 320,36 C460,18 520,50 660,32 C800,14 880,48 1020,30 C1160,12 1280,46 1440,28 L1440,60 Z" />
        </svg>
      </div>

      {/* CTA */}
      <section className={`px-6 py-24 text-center relative overflow-hidden ${dark ? "bg-[#141414] border-y border-[#FAFAF5]/5" : "bg-[#1a1a1a]"}`}>
        <div className="absolute inset-0 pointer-events-none select-none">
          <svg viewBox="0 0 1440 300" fill="none" className="w-full h-full opacity-45" preserveAspectRatio="xMidYMid slice">
            <line x1="200" y1="80" x2="600" y2="50" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="600" y1="50" x2="1000" y2="90" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="1000" y1="90" x2="1300" y2="60" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="200" y1="80" x2="100" y2="220" stroke="white" strokeWidth="0.6" opacity="0.2"/>
            <line x1="600" y1="50" x2="440" y2="240" stroke="white" strokeWidth="0.6" opacity="0.2"/>
            <line x1="1000" y1="90" x2="800" y2="200" stroke="white" strokeWidth="0.6" opacity="0.2"/>
            <line x1="1300" y1="60" x2="1150" y2="230" stroke="white" strokeWidth="0.6" opacity="0.2"/>
            <line x1="100" y1="220" x2="440" y2="240" stroke="white" strokeWidth="0.5" opacity="0.18"/>
            <line x1="440" y1="240" x2="800" y2="200" stroke="white" strokeWidth="0.5" opacity="0.18"/>
            <line x1="800" y1="200" x2="1150" y2="230" stroke="white" strokeWidth="0.5" opacity="0.18"/>
            <g transform="translate(600,50)" opacity="1">
              <circle r="26" stroke="#F7931A" strokeWidth="1.5" fill="rgba(247,147,26,0.12)"/>
              <circle r="12" stroke="#F7931A" strokeWidth="2.5" fill="none"/>
              <circle r="5" fill="#F7931A"/>
              <line x1="12" y1="0" x2="32" y2="0" stroke="#F7931A" strokeWidth="3"/>
              <line x1="28" y1="0" x2="28" y2="8" stroke="#F7931A" strokeWidth="2.5"/>
              <line x1="23" y1="0" x2="23" y2="6" stroke="#F7931A" strokeWidth="2.5"/>
            </g>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <span className="text-white/20"><SketchStar className="w-10 h-10 mx-auto mb-6" /></span>
          <h2 className="font-sketch text-5xl mb-6 text-white">
            {t.hero.ctaCreate}
          </h2>
          <p className="text-xl text-white/50 mb-10 max-w-4xl mx-auto">
            {t.hero.body}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate("/qoin/create")} className="btn-sketch text-xl px-10 py-4">
              {t.hero.ctaCreate}
            </button>
            <button
              onClick={() => navigate("/qoin/open")}
              className="border-2 border-white text-white font-handwritten text-xl px-10 py-4 hover:bg-white hover:text-[#1a1a1a] transition-colors"
            >
              {t.hero.ctaOpen}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a1a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <SketchCoin className="w-7 h-7" />
                <span className="font-body font-bold text-lg text-white">bitQoin</span>
              </div>
              <p className="font-body text-sm text-white/40 leading-relaxed">
                Quantum-resistant multi-chain protection for your digital assets. Built on Solana and Ethereum.
              </p>
            </div>
            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <span className="font-body font-bold text-xs text-white/30 uppercase tracking-widest">Product</span>
              <div className="flex flex-col gap-2">
                <a onClick={() => navigate("/how/start")} className="font-body text-sm text-white/50 hover:text-[#F7931A] transition-colors cursor-pointer">Getting Started</a>
                <a onClick={() => navigate("/how/protocol")} className="font-body text-sm text-white/50 hover:text-[#F7931A] transition-colors cursor-pointer">Qonjoint Protocol</a>
                <a onClick={() => navigate("/proof/balance")} className="font-body text-sm text-white/50 hover:text-[#F7931A] transition-colors cursor-pointer">Live Balance Proof</a>
                <a onClick={() => navigate("/faq")} className="font-body text-sm text-white/50 hover:text-[#F7931A] transition-colors cursor-pointer">FAQ</a>
              </div>
            </div>
            {/* Links */}
            <div className="flex flex-col gap-3">
              <span className="font-body font-bold text-xs text-white/30 uppercase tracking-widest">Connect</span>
              <div className="flex flex-col gap-2">
                <a href="https://github.com/bitqoinorg" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/50 hover:text-[#F7931A] transition-colors">GitHub</a>
                <a href="https://x.com/thebitcoin" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/50 hover:text-[#F7931A] transition-colors">𝕏 (Twitter)</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-body text-xs text-white/20">&copy; {new Date().getFullYear()} bitQoin. All rights reserved.</span>
            <span className="font-body text-xs text-white/20">Powered by Qonjoint Protocol</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showVideo && <HowItWorksModal onClose={() => setShowVideo(false)} />}
      </AnimatePresence>
    </div>
  );
}
