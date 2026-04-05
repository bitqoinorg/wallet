import { useState } from "react";
import SubpageLayout from "@/components/SubpageLayout";
import { useApp } from "@/contexts/AppContext";
import { SketchKey, SketchTwoKeys, SketchShield, SketchX } from "@/components/sketches";

const SOL_K1_KEY  = "FNBTMRNyuYxPaFHSCZosmGqWLMcDQiVGLwbGGSgNnzmo";
const SOL_VAULT   = "6TkW8UojBM9g9uanoSGHzm24DJwmu8333yaBMHbrGKR5";

const EVM_K1_KEY  = "0x0000000000000000000000000000000000000000000000000000000000000001";
const EVM_VAULT   = "0x0000000000000000000000000000000000000000";

const HeroDecor = () => (
  <svg viewBox="0 0 900 280" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <circle cx="450" cy="140" r="110" stroke="#F7931A" strokeWidth="1.5" opacity="0.35"/>
    <circle cx="450" cy="140" r="78"  stroke="#F7931A" strokeWidth="1"   opacity="0.25"/>
    <circle cx="450" cy="140" r="50"  stroke="#F7931A" strokeWidth="0.8" opacity="0.2"/>
    <circle cx="450" cy="140" r="25"  stroke="#F7931A" strokeWidth="1.5" fill="rgba(247,147,26,0.1)" opacity="0.6"/>
    <circle cx="450" cy="140" r="8"   fill="#F7931A" opacity="0.5"/>
    <line x1="450" y1="20"  x2="450" y2="260" stroke="white" strokeWidth="0.6" opacity="0.12"/>
    <line x1="330" y1="140" x2="570" y2="140" stroke="white" strokeWidth="0.6" opacity="0.12"/>
    <line x1="100" y1="80"  x2="330" y2="140" stroke="white" strokeWidth="0.5" opacity="0.15"/>
    <line x1="800" y1="80"  x2="570" y2="140" stroke="white" strokeWidth="0.5" opacity="0.15"/>
    <line x1="100" y1="200" x2="330" y2="140" stroke="white" strokeWidth="0.5" opacity="0.15"/>
    <line x1="800" y1="200" x2="570" y2="140" stroke="white" strokeWidth="0.5" opacity="0.15"/>
    <circle cx="100" cy="80"  r="8" stroke="rgba(239,68,68,0.5)" strokeWidth="1.2" fill="rgba(239,68,68,0.05)"/>
    <line x1="96" y1="76" x2="104" y2="84" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5"/>
    <line x1="104" y1="76" x2="96"  y2="84" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5"/>
    <circle cx="100" cy="200" r="8" stroke="rgba(239,68,68,0.5)" strokeWidth="1.2" fill="rgba(239,68,68,0.05)"/>
    <line x1="96" y1="196" x2="104" y2="204" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5"/>
    <line x1="104" y1="196" x2="96"  y2="204" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5"/>
    <circle cx="800" cy="80"  r="8" stroke="rgba(239,68,68,0.5)" strokeWidth="1.2" fill="rgba(239,68,68,0.05)"/>
    <line x1="796" y1="76" x2="804" y2="84" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5"/>
    <line x1="804" y1="76" x2="796" y2="84" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5"/>
    <circle cx="800" cy="200" r="8" stroke="rgba(239,68,68,0.5)" strokeWidth="1.2" fill="rgba(239,68,68,0.05)"/>
    <line x1="796" y1="196" x2="804" y2="204" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5"/>
    <line x1="804" y1="196" x2="796" y2="204" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5"/>
  </svg>
);

interface ChallengePanelProps {
  chain: "evm" | "sol";
  dark: boolean;
}

function ChallengePanel({ chain, dark }: ChallengePanelProps) {
  const [keyCopied, setKeyCopied] = useState(false);
  const [vaultCopied, setVaultCopied] = useState(false);

  const isEvm = chain === "evm";
  const k1Key   = isEvm ? EVM_K1_KEY  : SOL_K1_KEY;
  const vault   = isEvm ? EVM_VAULT   : SOL_VAULT;
  const accent  = isEvm ? "#627EEA" : "#9945FF";
  const network = isEvm ? "Ethereum mainnet" : "Solana mainnet";
  const protocol = isEvm ? "Gnosis Safe 2-of-2" : "SPL multisig";
  const importHint = isEvm
    ? "Import into MetaMask or any Ethereum wallet. Sign anything. The Safe still needs K2."
    : "Import into Phantom or Solflare. Sign all you want. The program still needs K2.";
  const explorerUrl = isEvm
    ? `https://etherscan.io/address/${vault}`
    : `https://solscan.io/account/${vault}`;

  const muted   = dark ? "text-[#FAFAF5]/65" : "text-[#1a1a1a]/65";
  const text    = dark ? "text-[#FAFAF5]"    : "text-[#1a1a1a]";
  const cardBg  = dark ? "bg-[#1a1a1a] border-[#FAFAF5]/10" : "bg-white border-[#1a1a1a]/15";
  const codeBg  = dark ? "bg-[#0f0f0f] border-[#FAFAF5]/10 text-[#FAFAF5]/80" : "bg-[#FAFAF5] border-[#1a1a1a]/10 text-[#1a1a1a]/80";
  const divider = dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]/10";

  function copyKey() {
    navigator.clipboard.writeText(k1Key);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  }

  function copyVault() {
    navigator.clipboard.writeText(vault);
    setVaultCopied(true);
    setTimeout(() => setVaultCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div className={`border-2 ${cardBg} p-6`}>
        <div className="flex items-start gap-4 mb-5">
          <SketchKey className="w-10 h-10 flex-shrink-0" style={{ color: accent }} />
          <div>
            <div className={`font-sketch text-xl mb-1 ${text}`}>Key 1. Private. Published.</div>
            <div className={`font-handwritten text-base ${muted}`}>
              {isEvm ? "Ethereum" : "Solana"} — {protocol}
            </div>
          </div>
        </div>

        <div className={`font-body font-bold text-xs tracking-widest uppercase mb-2 ${muted}`}>
          Private Key (Key 1)
        </div>
        <div className={`font-mono text-xs break-all p-3 border mb-3 select-all ${codeBg}`}>
          {k1Key}
        </div>
        <p className={`font-handwritten text-sm mb-4 ${muted}`}>{importHint}</p>
        <button
          onClick={copyKey}
          className={`font-body font-bold text-sm px-5 py-2.5 border-2 transition-colors ${
            keyCopied
              ? "border-[#F7931A] text-[#F7931A]"
              : dark
              ? "border-[#FAFAF5]/20 text-[#FAFAF5]/60 hover:border-[#F7931A] hover:text-[#F7931A]"
              : "border-[#1a1a1a]/20 text-[#1a1a1a]/60 hover:border-[#F7931A] hover:text-[#F7931A]"
          }`}
        >
          {keyCopied ? "Copied. Good luck." : "Copy Private Key"}
        </button>
      </div>

      <div className={`border-2 ${cardBg} p-6`}>
        <div className={`font-sketch text-xl mb-4 ${text}`}>The Vault</div>
        <div className={`font-body font-bold text-xs tracking-widest uppercase mb-2 ${muted}`}>
          {isEvm ? "Gnosis Safe Address" : "SPL Multisig Address"}
        </div>
        <div className={`font-mono text-xs break-all p-3 border mb-3 select-all ${codeBg}`}>
          {vault}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={copyVault}
            className={`font-body font-bold text-sm px-4 py-2 border-2 transition-colors ${
              vaultCopied
                ? "border-[#F7931A] text-[#F7931A]"
                : dark
                ? "border-[#FAFAF5]/20 text-[#FAFAF5]/60 hover:border-[#F7931A] hover:text-[#F7931A]"
                : "border-[#1a1a1a]/20 text-[#1a1a1a]/60 hover:border-[#F7931A] hover:text-[#F7931A]"
            }`}
          >
            {vaultCopied ? "Copied" : "Copy Address"}
          </button>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-handwritten text-base text-[#F7931A] hover:underline"
          >
            View on {isEvm ? "Etherscan" : "Solscan"} →
          </a>
        </div>
      </div>

      <div className={`border-2 ${cardBg} p-6`}>
        <div className={`font-sketch text-xl mb-4 ${text}`}>Rules of This Challenge</div>
        <div className="space-y-3">
          {[
            `The vault is live on ${network}.`,
            "Key 1's private key is posted on this page. Copy it. Import it.",
            "Key 2 has never been published anywhere.",
            `The ${protocol} requires both K1 and K2 to sign any outbound transaction.`,
            "The challenge has no end date and no prize. Breaking it is the prize.",
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F7931A] mt-2 flex-shrink-0" />
              <span className={`font-body font-bold text-sm ${muted}`}>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`border-2 ${cardBg} p-6`}>
        <div className={`font-sketch text-xl mb-4 ${text}`}>What You Cannot Do</div>
        <div className="space-y-3">
          {[
            "Derive Key 2 from Key 1 or from the vault address",
            "Move funds with only one signature",
            `Bypass the ${protocol}`,
            "Brute-force the second key on classical hardware",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span style={{ color: "#ef4444" }} className="font-sketch text-base flex-shrink-0">x</span>
              <span className={`font-body font-bold text-sm ${muted}`}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`border-2 border-[#F7931A]/30 p-5 ${dark ? "bg-[#F7931A]/5" : "bg-[#FFF8EE]"}`}>
        <div className="font-handwritten text-xl text-[#F7931A] mb-2">The Math</div>
        <p className={`font-body font-bold text-sm leading-relaxed ${muted}`}>
          You have Key 1. With it you can produce a valid K1 signature. The {protocol} checks for exactly two signatures. One is valid. The other is missing. The transaction is rejected. The funds stay in the vault.
        </p>
      </div>
    </div>
  );
}

export default function HackChallenge() {
  const { t, dark } = useApp();
  const s = t.subpages.hackChallenge;
  const [mobileTab, setMobileTab] = useState<"evm" | "sol">("evm");

  const text    = dark ? "text-[#FAFAF5]"    : "text-[#1a1a1a]";
  const divider = dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]/10";

  const darkContent = (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { value: "2",     label: "Active Challenges",      color: "#F7931A" },
        { value: "1+1",   label: "Keys Published (K1 x2)", color: "#ef4444" },
        { value: "2",     label: "Keys Needed Each",       color: "rgba(250,250,245,0.5)" },
        { value: "0",     label: "Successful Hacks",       color: "rgba(250,250,245,0.3)" },
      ].map((item) => (
        <div key={item.label} className="bg-white/[0.04] border border-white/10 p-5 text-center">
          <div className="font-sketch text-4xl mb-1" style={{ color: item.color }}>{item.value}</div>
          <div className="font-handwritten text-base text-white/50">{item.label}</div>
        </div>
      ))}
    </div>
  );

  return (
    <SubpageLayout
      badge={s.badge}
      title="We Published Both K1 Keys. Try It."
      heroDecor={<HeroDecor />}
      Illustration={
        <div className="relative w-44 h-44 flex-shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <SketchTwoKeys className="w-36 h-36 opacity-85" />
          </div>
          <div className="absolute bottom-0 right-0">
            <SketchShield className="w-14 h-14 opacity-60" />
          </div>
          <div className="absolute top-0 left-0">
            <SketchX className="w-10 h-10 opacity-40" />
          </div>
        </div>
      }
      quote="One key per chain, published. Both chains still locked. You do the math."
      darkSectionContent={darkContent}
      ctas={[
        { label: t.nav.subProof[1].label + " →", href: "/proof/balance", primary: true },
        { label: t.nav.openQoin, href: "/qoin/open" },
      ]}
    >
      <div className="space-y-8">
        <div className={`p-5 border-l-4 border-[#F7931A] ${dark ? "bg-[#F7931A]/5" : "bg-[#FFF8EE]"}`}>
          <p className={`font-body font-bold text-base leading-relaxed ${text}`}>
            We published Key 1's private key for both our Ethereum and Solana vaults. You can import it, sign with it, construct transactions. You still need Key 2. Neither vault has been moved. This is not a bug. This is the protocol.
          </p>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden">
          <div className={`flex border-2 ${dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]"} mb-6`}>
            {(["evm", "sol"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMobileTab(tab)}
                className={`flex-1 py-3 font-sketch text-lg transition-colors ${
                  mobileTab === tab
                    ? "bg-[#F7931A] text-white"
                    : dark
                    ? "text-[#FAFAF5]/50 hover:text-[#FAFAF5]"
                    : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
                }`}
              >
                {tab === "evm" ? "Ethereum" : "Solana"}
              </button>
            ))}
          </div>
          <ChallengePanel chain={mobileTab} dark={dark} />
        </div>

        {/* Desktop side-by-side */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          <div>
            <div className={`font-sketch text-2xl mb-5 pb-3 border-b-2 ${divider} ${text}`}>
              Ethereum
            </div>
            <ChallengePanel chain="evm" dark={dark} />
          </div>
          <div>
            <div className={`font-sketch text-2xl mb-5 pb-3 border-b-2 ${divider} ${text}`}>
              Solana
            </div>
            <ChallengePanel chain="sol" dark={dark} />
          </div>
        </div>

        <div className={`border-2 border-[#F7931A]/30 p-6 ${dark ? "bg-[#F7931A]/5" : "bg-[#FFF8EE]"}`}>
          <div className="font-handwritten text-xl text-[#F7931A] mb-2">If You Succeed</div>
          <p className={`font-body font-bold text-sm leading-relaxed ${dark ? "text-[#FAFAF5]/65" : "text-[#1a1a1a]/65"}`}>
            If you move the funds in either vault, you have broken either the Qonjoint protocol or the underlying elliptic curve cryptography. Please publish your method. The cryptography community would like to know immediately.
          </p>
        </div>
      </div>
    </SubpageLayout>
  );
}
