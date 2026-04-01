import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  generateKeypair,
  getTokenDepositAddress,
  createVaultTokenAccount,
  isValidPublicKey,
  explorerUrl,
} from "@/lib/solana";
import { saveVaultAssociation, saveTokenDeposit, getTokenDeposits, type TokenDeposit } from "@/lib/vaultStore";
import {
  SketchKey, SketchTwoKeys, SketchLock, SketchCoin, SketchCheckmark,
  SketchWarning, SketchWave, SketchAtom, SketchShield
} from "@/components/sketches";
import Navbar from "@/components/Navbar";
import { useApp } from "@/contexts/AppContext";

type Step = "intro" | "keys" | "creating" | "done";
interface KeyPair {
  publicKey: string;
  privateKey: string;
}

const stepDefs = [
  { id: "intro", label: "Start" },
  { id: "keys", label: "Keys" },
  { id: "creating", label: "Activate" },
  { id: "done", label: "Locked" },
] as const;

function CheckSVG() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-5 h-5">
      <path d="M3 8.5L6.5 12L13 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GenerateVault() {
  const [, navigate] = useLocation();
  const { dark } = useApp();
  const [step, setStep] = useState<Step>("intro");
  const [pk1, setPk1] = useState<KeyPair | null>(null);
  const [pk2, setPk2] = useState<KeyPair | null>(null);
  const [shieldAddress, setShieldAddress] = useState("");
  const [txSig, setTxSig] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [keysConfirmed, setKeysConfirmed] = useState(false);

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [mintInput, setMintInput] = useState("");
  const [depositAddress, setDepositAddress] = useState("");
  const [creatingTA, setCreatingTA] = useState(false);
  const [taSig, setTaSig] = useState("");
  const [taError, setTaError] = useState("");
  const [depositCopied, setDepositCopied] = useState(false);
  const [savedDeposits, setSavedDeposits] = useState<TokenDeposit[]>([]);
  const [tokenMeta, setTokenMeta] = useState<Record<string, { name: string; symbol: string; image: string }>>({});
  const [showAllTokens, setShowAllTokens] = useState(false);
  const QUICK_SHOW_COUNT = 4;

  const POPULAR_TOKENS = [
    { symbol: "USDC",    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" },
    { symbol: "USDT",    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB" },
    { symbol: "BONK",    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" },
    { symbol: "TRUMP",   mint: "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN" },
    { symbol: "FARTCOIN",mint: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump" },
    { symbol: "PUMP",    mint: "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn" },
    { symbol: "BUTTCOIN",mint: "Cm6fNnMk7NfzStP9CZpsQA2v3jjzbcYGAxdJySmHpump" },
  ];

  useEffect(() => {
    const mints = POPULAR_TOKENS.map((t) => t.mint).join(",");
    fetch(`/api/storaqe/token-meta?mints=${mints}`)
      .then((r) => r.json())
      .then((arr: { mint: string; name: string; symbol: string; image: string }[]) => {
        const map: Record<string, { name: string; symbol: string; image: string }> = {};
        arr.forEach((item) => { map[item.mint] = item; });
        setTokenMeta(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (shieldAddress) {
      setSavedDeposits(getTokenDeposits(shieldAddress));
    }
  }, [shieldAddress]);

  useEffect(() => {
    if (!mintInput.trim() || !shieldAddress) return;
    const existing = savedDeposits.find((d) => d.mintAddress === mintInput.trim());
    if (existing) {
      setDepositAddress(existing.depositAddress);
      setTaSig("");
    } else {
      setDepositAddress("");
    }
  }, [mintInput, savedDeposits, shieldAddress]);

  function handleGenerateKeys() {
    setPk1(generateKeypair());
    setPk2(generateKeypair());
    setStep("keys");
  }

  async function handleActivateShield() {
    if (!pk1 || !pk2) return;
    setError("");
    setStep("creating");
    try {
      const res = await fetch("/api/storaqe/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pk1PublicKey: pk1.publicKey,
          pk2PublicKey: pk2.publicKey,
          network: "mainnet",
        }),
      });
      const data = await res.json() as { multisigAddress?: string; signature?: string; error?: string };
      if (!res.ok || data.error) throw new Error(data.error || "Failed to create Qoin.");
      setShieldAddress(data.multisigAddress!);
      setTxSig(data.signature!);
      saveVaultAssociation(pk1.publicKey, pk2.publicKey, data.multisigAddress!, "mainnet");
      setStep("done");
    } catch (e: unknown) {
      setError((e as Error).message || "Failed to create Qoin on-chain.");
      setStep("keys");
    }
  }

  async function handleComputeDepositAddress() {
    if (!isValidPublicKey(mintInput.trim()) || !shieldAddress) return;
    setTaError("");
    setDepositAddress("");
    const addr = getTokenDepositAddress(shieldAddress, mintInput.trim());
    setDepositAddress(addr);
  }

  async function handleCreateTokenAccount() {
    if (!shieldAddress || !mintInput) return;
    setCreatingTA(true);
    setTaError("");
    try {
      const res = await fetch("/api/storaqe/create-token-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ multisigAddress: shieldAddress, mintAddress: mintInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create token account.");
      setDepositAddress(data.tokenAccountAddress);
      if (data.signature) setTaSig(data.signature);
      saveTokenDeposit(shieldAddress, mintInput.trim(), data.tokenAccountAddress);
      setSavedDeposits(getTokenDeposits(shieldAddress));
    } catch (e: unknown) {
      setTaError((e as Error).message || "Failed to create token account.");
    } finally {
      setCreatingTA(false);
    }
  }

  async function copyText(text: string, id: string) {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const steps: Step[] = ["intro", "keys", "creating", "done"];
  const currentIdx = steps.indexOf(step);

  return (
    <div className={`min-h-screen font-body ${dark ? "bg-[#0f0f0f] text-[#FAFAF5]" : "bg-[#FAFAF5] text-[#1a1a1a]"}`}>

      <Navbar />

      {/* DARK HEADER SECTION */}
      <section className="bg-[#1a1a1a] py-14 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none opacity-30">
          <svg viewBox="0 0 1440 200" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <line x1="200" y1="40" x2="600" y2="80" stroke="white" strokeWidth="0.7" opacity="0.3"/>
            <line x1="600" y1="80" x2="1000" y2="50" stroke="white" strokeWidth="0.7" opacity="0.3"/>
            <line x1="1000" y1="50" x2="1300" y2="90" stroke="white" strokeWidth="0.7" opacity="0.3"/>
            <circle cx="200" cy="40" r="8" stroke="#F7931A" strokeWidth="1.5" fill="rgba(247,147,26,0.15)"/>
            <circle cx="600" cy="80" r="12" stroke="#F7931A" strokeWidth="2" fill="rgba(247,147,26,0.12)"/>
            <circle cx="1000" cy="50" r="8" stroke="#F7931A" strokeWidth="1.5" fill="rgba(247,147,26,0.15)"/>
            <circle cx="1300" cy="90" r="6" stroke="#F7931A" strokeWidth="1.5" fill="rgba(247,147,26,0.1)"/>
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-[#F7931A] text-[#F7931A] font-body font-bold text-xs px-4 py-2 mb-6 uppercase tracking-widest">
            Qonjoint Protected
          </div>
          <h1 className="font-sketch text-4xl md:text-5xl text-white mb-4">Create Your Qoin</h1>
          <p className="text-lg text-white/50 font-body">
            Two keys generated locally. Registered on-chain. All transactions require both keys to sign.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* CONNECTED STEPPER */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            {stepDefs.map((s, i) => {
              const done = i < currentIdx;
              const active = i === currentIdx;
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-sketch text-sm transition-all duration-300 ${
                      done
                        ? "bg-[#1a1a1a] border-[#1a1a1a] text-[#F7931A] shadow-[2px_2px_0_#F7931A]"
                        : active
                        ? "bg-[#F7931A] border-[#1a1a1a] text-white shadow-[3px_3px_0_#1a1a1a]"
                        : "bg-white border-[#1a1a1a] border-opacity-20 text-[#1a1a1a] opacity-30"
                    }`}>
                      {done ? <CheckSVG /> : <span>{i + 1}</span>}
                    </div>
                    <span className={`font-handwritten text-sm leading-none hidden sm:block ${
                      active ? "text-[#F7931A] font-bold" : done ? "text-[#1a1a1a]" : "text-[#1a1a1a] opacity-30"
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {i < stepDefs.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 mt-0 sm:-mt-5 transition-colors duration-500 ${
                      i < currentIdx ? "bg-[#F7931A]" : "bg-[#1a1a1a] opacity-10"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1: INTRO */}
        {step === "intro" && (
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* Left: copy + CTA */}
            <div>
              <div className="mb-6">
                <SketchTwoKeys className="w-28 h-20 mb-5" />
                <h1 className="font-sketch text-4xl sm:text-5xl mb-4 leading-tight">Activate Quantum Shield</h1>
                <SketchWave className="w-40 mb-5" />
                <p className="text-lg text-[#1a1a1a]/60 leading-relaxed">
                  We generate independent signing keys and deploy your Qoin on-chain. All registered keys must sign every transfer. Enforced by the Solana protocol, not just this UI.
                </p>
              </div>

              <button onClick={handleGenerateKeys} className="btn-sketch w-full text-xl py-5 mb-4">
                Generate My 2 Keys
              </button>
              <p className="text-center font-handwritten text-lg text-[#1a1a1a]/50">
                Already have a Qoin?{" "}
                <button onClick={() => navigate("/qoin/open")} className="text-[#F7931A] underline underline-offset-2">
                  Open it
                </button>
              </p>
            </div>

            {/* Right: vault diagram card */}
            <div className="sketch-card p-6">
              {/* Vault diagram: Qonjoint key composition */}
              <div className="flex items-center justify-center gap-4 mb-5 py-3 border-b-2 border-dashed border-[#1a1a1a]/10">
                <div className="flex flex-col items-center gap-1">
                  <SketchKey className="w-12 h-8 text-[#1a1a1a]" />
                  <span className="font-handwritten text-xs text-[#1a1a1a]/50">Key 1</span>
                </div>
                <svg viewBox="0 0 60 24" fill="none" className="w-14 flex-shrink-0">
                  <path d="M2 12 L20 12" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
                  <path d="M40 12 L58 12" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
                  <circle cx="30" cy="12" r="5" stroke="#F7931A" strokeWidth="2" fill="none"/>
                  <path d="M27.5 12.5 L29.5 14.5 L33 10.5" stroke="#F7931A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex flex-col items-center gap-1">
                  <SketchKey className="w-12 h-8 text-[#F7931A]" />
                  <span className="font-handwritten text-xs text-[#1a1a1a]/50">Key 2</span>
                </div>
                <svg viewBox="0 0 20 40" fill="none" className="w-5 h-10 flex-shrink-0">
                  <path d="M10 2 L10 38" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
                </svg>
                <SketchLock className="w-10 h-10 flex-shrink-0 text-[#1a1a1a]" />
              </div>
              <div className="font-handwritten text-sm text-[#1a1a1a]/30 uppercase tracking-widest mb-5">What You Will Get</div>

              <div className="space-y-4 mb-6">
                {[
                  { label: "Key 1", desc: "Your first private key. Keep it secret.", color: "#1a1a1a" },
                  { label: "Key 2", desc: "Your second private key. Store it separately.", color: "#F7931A" },
                  { label: "Qoin Address", desc: "On-chain. Public. Safe to share.", color: "#1a1a1a" },
                  { label: "Deposit Address", desc: "Per-token address. Where people send tokens.", color: "#1a1a1a" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: item.color }}>
                      <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3">
                        <path d="M2 5.5L4 7.5L8 3" stroke={item.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <span className="font-handwritten text-lg font-bold" style={{ color: item.color }}>{item.label}:</span>
                      <span className="font-body text-base text-[#1a1a1a]/60 ml-1">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-[#1a1a1a]/10 pt-4">
                <div className="flex items-center gap-3 p-3 bg-[#FAFAF5] border border-[#1a1a1a]/10 rounded-sm">
                  <SketchShield className="w-10 h-10 flex-shrink-0" />
                  <div>
                    <div className="font-sketch text-sm">Qonjoint</div>
                    <div className="font-handwritten text-sm text-[#1a1a1a]/50">Both keys sign. Protocol enforces. No exceptions.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: KEYS */}
        {step === "keys" && pk1 && pk2 && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="font-sketch text-4xl mb-2">Save Both Keys First</h1>
              <p className="text-lg text-[#1a1a1a]/60">Copy and store both keys before activating. After this, we hit the blockchain.</p>
            </div>

            {error && <div className="error-sketch mb-6 font-body text-base text-[#1a1a1a]/70">{error}</div>}

            {/* Key 1 LEFT / Key 2 RIGHT side by side */}
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {[
                { label: "Key 1", tag: "You hold this", tagColor: "#1a1a1a", key: pk1, id: "pk1" },
                { label: "Key 2", tag: "Store separately", tagColor: "#F7931A", key: pk2, id: "pk2" },
              ].map(({ label, tag, tagColor, key, id }) => (
                <div key={id} className="overflow-hidden border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a] flex flex-col">
                  {/* Card header */}
                  <div className="flex items-center justify-between px-5 py-3 bg-white border-b-2 border-[#1a1a1a]">
                    <span className="font-sketch text-xl">{label}</span>
                    <span className="font-handwritten text-sm px-2.5 py-0.5 border rounded-sm" style={{ color: tagColor, borderColor: tagColor }}>{tag}</span>
                  </div>

                  {/* Public key zone */}
                  <div className="px-5 py-4 bg-[#FAFAF5] border-b border-dashed border-[#1a1a1a]/10">
                    <div className="font-handwritten text-xs text-[#1a1a1a]/30 uppercase tracking-widest mb-1.5">Public Key (safe to share)</div>
                    <div className="font-mono text-xs text-[#1a1a1a]/40 break-all leading-relaxed">{key.publicKey}</div>
                  </div>

                  {/* Private key zone */}
                  <div className="px-5 py-4 bg-[#FAFAF5] flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <SketchWarning className="w-4 h-4 flex-shrink-0" />
                      <div className="font-handwritten text-xs text-[#F7931A] uppercase tracking-widest">Private Key. Save This Now.</div>
                    </div>
                    <div className="font-mono text-sm text-[#1a1a1a] break-all leading-relaxed mb-3 p-2.5 bg-white border border-[#F7931A] rounded-sm flex-1">{key.privateKey}</div>
                    <button
                      onClick={() => copyText(key.privateKey, id)}
                      className={`w-full py-2.5 text-base font-sketch border-2 border-[#1a1a1a] rounded-sm transition-all ${
                        copied === id
                          ? "bg-[#1a1a1a] text-white shadow-none translate-x-0.5 translate-y-0.5"
                          : "bg-[#F7931A] text-white shadow-[3px_3px_0_#1a1a1a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1a1a1a]"
                      }`}
                    >
                      {copied === id ? "Copied!" : `Copy ${label} Private Key`}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Confirmation block */}
            <div className="border-2 border-[#F7931A] bg-[#FAFAF5] rounded-sm shadow-[4px_4px_0_#F7931A] mb-6 overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-[#F7931A] border-opacity-30 bg-[#F7931A]">
                <span className="flex-shrink-0" style={{ filter: "brightness(10)" }}><SketchWarning className="w-6 h-6" /></span>
                <span className="font-sketch text-lg text-white">Before You Continue</span>
              </div>
              <label className="flex items-start gap-4 px-5 py-4 cursor-pointer">
                <div className={`mt-0.5 w-6 h-6 flex-shrink-0 border-2 rounded-sm flex items-center justify-center transition-all ${
                  keysConfirmed ? "bg-[#F7931A] border-[#F7931A]" : "bg-white border-[#F7931A]"
                }`}>
                  {keysConfirmed && (
                    <svg viewBox="0 0 12 12" fill="none" className="w-4 h-4">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={keysConfirmed}
                  onChange={(e) => setKeysConfirmed(e.target.checked)}
                  className="sr-only"
                />
                <span className="font-body text-base text-[#1a1a1a]/60 leading-relaxed">
                  I have saved both private keys in secure, separate locations. I understand these keys are generated locally and bitQoin never stores them. Losing both keys means losing my tokens permanently. There is no recovery.
                </span>
              </label>
            </div>

            <button
              onClick={handleActivateShield}
              disabled={!keysConfirmed}
              className="btn-sketch w-full text-xl py-5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Create Qoin On-Chain
            </button>
          </div>
        )}

        {/* STEP 3: CREATING */}
        {step === "creating" && (
          <div className="max-w-md mx-auto">
            <div className="sketch-card p-10 text-center border-[#F7931A] shadow-[6px_6px_0_#F7931A]" style={{ borderColor: "#F7931A" }}>
              <div className="w-24 h-24 mx-auto mb-6 animate-spin" style={{ animationDuration: "3s" }}>
                <SketchAtom className="w-full h-full" />
              </div>
              <h2 className="font-sketch text-3xl mb-3">Activating on Solana...</h2>
              <div className="space-y-2">
                <p className="font-handwritten text-xl text-[#1a1a1a]/50">Deploying your Qoin on Solana.</p>
                <p className="font-handwritten text-base text-[#1a1a1a]/25">Registering keys, confirming on-chain...</p>
              </div>
              <div className="flex justify-center gap-1.5 mt-6">
                <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: DONE */}
        {step === "done" && pk1 && pk2 && (
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* LEFT COLUMN */}
              <div>
                {/* Success header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 flex-shrink-0">
                    <SketchLock className="w-full h-full text-[#1a1a1a]" />
                  </div>
                  <div>
                    <h1 className="font-sketch text-4xl text-[#1a1a1a]">Qoin Created!</h1>
                    <p className="font-handwritten text-lg text-[#1a1a1a]/50">Your Qoin is live on Solana mainnet. Save everything below.</p>
                  </div>
                </div>

                {/* Qoin address hero card */}
                <div className="mb-8 overflow-hidden border-2 border-[#1a1a1a] rounded-sm shadow-[5px_5px_0_#1a1a1a]">
                  <div className="flex items-center justify-between px-5 py-3 bg-[#F7931A] border-b-2 border-[#1a1a1a]">
                    <span className="font-sketch text-xl text-[#FAFAF5]">Qoin Address</span>
                    <span className="font-handwritten text-sm text-[#1a1a1a] bg-[#FAFAF5] border border-[#1a1a1a] px-2.5 py-0.5 rounded-sm font-bold shadow-[2px_2px_0_#1a1a1a]">Share Publicly</span>
                  </div>
                  <div className="px-5 py-5 bg-[#FAFAF5]">
                    <p className="font-handwritten text-base text-[#1a1a1a]/60 mb-1">Save this to open your vault later.</p>
                    <p className="font-body font-bold text-sm text-[#F7931A] mb-4">Do not send tokens here. Tokens will be lost.</p>
                    <div className="code-sketch text-sm text-[#1a1a1a] mb-5 p-3 bg-white">{shieldAddress}</div>
                    <div className="flex gap-3">
                      <button onClick={() => copyText(shieldAddress, "shield")} className="btn-sketch-outline flex-1 text-base py-3 bg-white">
                        {copied === "shield" ? "Copied!" : "Copy Qoin Address"}
                      </button>
                      <a
                        href={explorerUrl(txSig, false)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-sketch flex-1 text-base py-3 text-center"
                      >
                        View on Orb
                      </a>
                    </div>
                  </div>
                </div>

                {/* Key recap accordion */}
                <div className="space-y-4">
                  <div className="font-sketch text-2xl text-[#1a1a1a] mb-2">Your Private Keys</div>
                  {[{ label: "Key 1", key: pk1, id: "done-pk1" }, { label: "Key 2", key: pk2, id: "done-pk2" }].map(({ label, key, id }) => {
                    const isOpen = openAccordion === id;
                    return (
                      <div key={id} className="overflow-hidden border-2 border-[#1a1a1a] rounded-sm shadow-[3px_3px_0_#1a1a1a]">
                        <button
                          onClick={() => setOpenAccordion(isOpen ? null : id)}
                          className="flex items-center justify-between w-full px-5 py-4 bg-[#F7931A] border-b-2 border-[#1a1a1a] text-left hover:brightness-95 transition-all"
                        >
                          <span className="font-sketch text-lg text-[#FAFAF5]">{label} Private Key</span>
                          <svg viewBox="0 0 20 20" fill="none" className={`w-6 h-6 text-[#FAFAF5] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                            <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-5 py-4 bg-[#FAFAF5] mode-panel-enter">
                            <div className="font-handwritten text-sm text-[#1a1a1a]/40 mb-2 uppercase tracking-wide">Private Key</div>
                            <div className="font-mono text-sm text-[#1a1a1a] break-all mb-4 leading-relaxed p-3 bg-white border border-[#1a1a1a] border-opacity-10 rounded-sm">{key.privateKey}</div>
                            <button onClick={() => copyText(key.privateKey, id)} className="btn-sketch-outline w-full text-base py-3 bg-white">
                              {copied === id ? "Copied!" : `Copy ${label} Private Key`}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div>
                {/* Token deposit section unified sidebar style */}
                <div className="sketch-card bg-[#FAFAF5] overflow-hidden mb-6">
                  <div className="px-5 py-4 border-b border-[#1a1a1a]/10">
                    <div className="font-sketch text-xl text-[#1a1a1a] mb-0.5">Token Deposit Addresses</div>
                    <p className="font-handwritten text-sm text-[#1a1a1a]/40">Each token needs its own address. Pick one to get started.</p>
                  </div>

                  {/* YOUR TOKENS section */}
                  {savedDeposits.length > 0 && (
                    <div className="border-b border-[#1a1a1a]/10">
                      <div className="px-5 py-2 bg-[#1a1a1a]">
                        <span className="font-handwritten text-xs text-white/50 uppercase tracking-widest">Your Tokens</span>
                      </div>
                      {savedDeposits.map((d) => {
                        const meta = tokenMeta[d.mintAddress];
                        const fallbackSymbol = POPULAR_TOKENS.find((t) => t.mint === d.mintAddress)?.symbol;
                        const logo = meta?.image ?? "";
                        const label = meta?.symbol ?? fallbackSymbol ?? d.mintAddress.slice(0, 6) + "...";
                        const isActive = mintInput === d.mintAddress;
                        return (
                          <button
                            key={d.mintAddress}
                            onClick={() => { setMintInput(d.mintAddress); setTaError(""); }}
                            className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all border-b border-[#1a1a1a]/5 last:border-0 ${isActive ? "bg-[#F7931A]/10 border-l-4 border-l-[#F7931A]" : "bg-white hover:bg-[#FAFAF5]"}`}
                          >
                            {logo ? (
                              <img src={logo} alt={label} className="w-8 h-8 rounded-full object-cover flex-shrink-0" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-[#1a1a1a]/10 flex-shrink-0 flex items-center justify-center">
                                <span className="font-sketch text-xs text-[#1a1a1a]/40">{label.slice(0, 2)}</span>
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="font-body font-bold text-sm text-[#1a1a1a]">{label}</div>
                              <div className="font-mono text-xs text-[#1a1a1a]/30 truncate">{d.depositAddress.slice(0, 20)}...</div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="font-handwritten text-xs text-[#F7931A]">Ready</span>
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  await navigator.clipboard.writeText(d.depositAddress);
                                  setCopied("dep-" + d.mintAddress);
                                  setTimeout(() => setCopied(null), 2000);
                                }}
                                className="font-body font-bold text-xs px-2 py-1 border border-[#1a1a1a]/20 rounded-sm hover:bg-[#F7931A] hover:text-white hover:border-[#F7931A] transition-all"
                              >
                                {copied === "dep-" + d.mintAddress ? "Copied!" : "Copy"}
                              </button>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* POPULAR section */}
                  <div className="border-b border-[#1a1a1a]/10">
                    <div className="px-5 py-2 bg-[#FAFAF5]">
                      <span className="font-handwritten text-xs text-[#1a1a1a]/40 uppercase tracking-widest">Popular</span>
                    </div>
                    {POPULAR_TOKENS.slice(0, showAllTokens ? POPULAR_TOKENS.length : QUICK_SHOW_COUNT).map((t) => {
                      const meta = tokenMeta[t.mint];
                      const isActive = mintInput === t.mint;
                      const alreadySaved = savedDeposits.some((d) => d.mintAddress === t.mint);
                      return (
                        <button
                          key={t.mint}
                          onClick={() => { setMintInput(t.mint); setTaError(""); }}
                          className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all border-b border-[#1a1a1a]/5 last:border-0 ${isActive ? "bg-[#F7931A]/10 border-l-4 border-l-[#F7931A]" : "bg-white hover:bg-[#FAFAF5]"}`}
                        >
                          {meta?.image ? (
                            <img src={meta.image} alt={t.symbol} className="w-8 h-8 rounded-full object-cover flex-shrink-0" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#1a1a1a]/10 flex-shrink-0 flex items-center justify-center">
                              <span className="font-sketch text-xs text-[#1a1a1a]/40">{t.symbol.slice(0, 2)}</span>
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="font-body font-bold text-sm text-[#1a1a1a]">{meta?.symbol ?? t.symbol}</div>
                            <div className="font-handwritten text-xs text-[#1a1a1a]/30">{meta?.name ?? ""}</div>
                          </div>
                          {alreadySaved && <span className="font-handwritten text-xs text-[#F7931A] flex-shrink-0">Ready</span>}
                          {isActive && !alreadySaved && <span className="font-handwritten text-xs text-[#1a1a1a]/30 flex-shrink-0">Selected</span>}
                        </button>
                      );
                    })}
                    {!showAllTokens && POPULAR_TOKENS.length > QUICK_SHOW_COUNT && (
                      <button
                        onClick={() => setShowAllTokens(true)}
                        className="w-full px-5 py-3 text-left font-handwritten text-sm text-[#1a1a1a]/40 hover:text-[#F7931A] hover:bg-[#FAFAF5] transition-all flex items-center gap-2 bg-white"
                      >
                        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {POPULAR_TOKENS.length - QUICK_SHOW_COUNT} more tokens
                      </button>
                    )}
                  </div>

                  {/* OTHER custom mint input */}
                  <div className="px-5 py-4 bg-white border-b border-[#1a1a1a]/10">
                    <label className="font-handwritten text-xs text-[#1a1a1a]/40 uppercase tracking-wide mb-2 block">Other token mint address</label>
                    <input
                      type="text"
                      value={mintInput}
                      onChange={(e) => { setMintInput(e.target.value); setTaError(""); }}
                      placeholder="Paste any mint address..."
                      className="input-sketch text-sm py-2.5 bg-[#FAFAF5]"
                    />
                  </div>

                  {/* Action + result */}
                  <div className="px-5 py-4 bg-[#FAFAF5]">
                    {taError && <div className="border-2 border-[#F7931A] bg-white p-3 rounded-sm mb-3 text-[#1a1a1a]/70 font-body text-sm">{taError}</div>}
                    <button
                      onClick={handleCreateTokenAccount}
                      disabled={!isValidPublicKey(mintInput.trim()) || creatingTA || !!depositAddress}
                      className="btn-sketch w-full text-base py-3.5 mb-2 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {creatingTA ? "Creating..." : depositAddress ? "Deposit Address Ready" : "Get Deposit Address"}
                    </button>
                    <p className="font-handwritten text-xs text-[#1a1a1a]/25 text-center mb-3">One time per token. Saved to this device.</p>
                    {depositAddress && (
                      <div className="border-2 border-[#1a1a1a] bg-white rounded-sm p-4 shadow-[3px_3px_0_#1a1a1a]">
                        <div className="font-handwritten text-xs text-[#1a1a1a]/40 uppercase tracking-wide mb-2">Deposit Address</div>
                        <div className="font-mono text-xs text-[#1a1a1a] break-all mb-3 p-2 bg-[#FAFAF5] rounded-sm">{depositAddress}</div>
                        {taSig && <div className="font-handwritten text-sm text-[#F7931A] mb-3">Created on-chain.</div>}
                        <button
                          onClick={async () => { await navigator.clipboard.writeText(depositAddress); setDepositCopied(true); setTimeout(() => setDepositCopied(false), 2000); }}
                          className="btn-sketch-outline bg-[#FAFAF5] w-full text-sm py-2.5"
                        >
                          {depositCopied ? "Copied!" : "Copy Deposit Address"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Save reminder warning */}
                <div className="border-2 border-[#F7931A] bg-[#FAFAF5] rounded-sm shadow-[4px_4px_0_#F7931A] p-5 mb-8">
                  <div className="flex items-start gap-4">
                    <SketchWarning className="w-8 h-8 flex-shrink-0 text-[#F7931A]" />
                    <div>
                      <div className="font-sketch text-xl text-[#1a1a1a] mb-1">Keys Needed to Move: Both</div>
                      <p className="font-body text-base text-[#1a1a1a]/70">
                        Save Key 1, Key 2, and the Qoin Address. All three. We do not store any of this. Losing them means losing your tokens permanently.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Open My Qoin button */}
                <button onClick={() => navigate("/qoin/open")} className="btn-sketch w-full text-2xl py-6 shadow-[6px_6px_0_#1a1a1a]">
                  Open My Qoin
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
