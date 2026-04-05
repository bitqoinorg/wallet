import SubpageLayout from "@/components/SubpageLayout";
import { useApp } from "@/contexts/AppContext";
import { SketchAtom, SketchShield, SketchTwoKeys, SketchKey, SketchQuantumCircuit } from "@/components/sketches";

const HeroDecor = () => (
  <svg viewBox="0 0 900 280" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <ellipse cx="450" cy="140" rx="180" ry="60" stroke="#F7931A" strokeWidth="0.8" opacity="0.25" transform="rotate(-20 450 140)"/>
    <ellipse cx="450" cy="140" rx="180" ry="60" stroke="#F7931A" strokeWidth="0.8" opacity="0.2" transform="rotate(40 450 140)"/>
    <ellipse cx="450" cy="140" rx="180" ry="60" stroke="white" strokeWidth="0.6" opacity="0.15" transform="rotate(90 450 140)"/>
    <circle cx="450" cy="140" r="10" fill="#F7931A" opacity="0.7"/>
    <circle cx="450" cy="140" r="20" stroke="#F7931A" strokeWidth="1" fill="none" opacity="0.4"/>
    <circle cx="450" cy="140" r="35" stroke="#F7931A" strokeWidth="0.7" fill="none" opacity="0.25"/>
    <path d="M100,140 Q200,80 300,140 Q400,200 500,140 Q600,80 700,140 Q800,200 880,140" stroke="white" strokeWidth="0.7" opacity="0.2" fill="none"/>
    <path d="M100,170 Q200,110 300,170 Q400,230 500,170 Q600,110 700,170 Q800,230 880,170" stroke="white" strokeWidth="0.5" opacity="0.12" fill="none"/>
    <circle cx="270" cy="140" r="8" stroke="#F7931A" strokeWidth="1.2" fill="rgba(247,147,26,0.15)" opacity="0.8"/>
    <circle cx="630" cy="140" r="8" stroke="#F7931A" strokeWidth="1.2" fill="rgba(247,147,26,0.15)" opacity="0.8"/>
    <line x1="80" y1="60" x2="180" y2="90" stroke="white" strokeWidth="1" opacity="0.15"/>
    <line x1="180" y1="90" x2="180" y2="60" stroke="white" strokeWidth="1" opacity="0.15"/>
    <line x1="130" y1="90" x2="230" y2="90" stroke="white" strokeWidth="1" opacity="0.15"/>
    <line x1="700" y1="50" x2="800" y2="80" stroke="white" strokeWidth="1" opacity="0.15"/>
    <line x1="800" y1="80" x2="800" y2="50" stroke="white" strokeWidth="1" opacity="0.15"/>
    <line x1="750" y1="80" x2="850" y2="80" stroke="white" strokeWidth="1" opacity="0.15"/>
    <circle cx="130" cy="220" r="5" stroke="white" strokeWidth="1" fill="none" opacity="0.18"/>
    <circle cx="160" cy="240" r="3" stroke="white" strokeWidth="1" fill="none" opacity="0.15"/>
    <circle cx="800" cy="210" r="4" stroke="white" strokeWidth="1" fill="none" opacity="0.18"/>
    <circle cx="830" cy="235" r="6" stroke="white" strokeWidth="1" fill="none" opacity="0.15"/>
  </svg>
);

export default function QuantumThreat() {
  const { t, dark } = useApp();
  const s = t.subpages.quantum;
  const muted = dark ? "text-[#FAFAF5]/65" : "text-[#1a1a1a]/65";
  const text = dark ? "text-[#FAFAF5]" : "text-[#1a1a1a]";
  const cardBg = dark ? "bg-[#1a1a1a] border-[#FAFAF5]/10" : "bg-white border-[#1a1a1a]/15";
  const divider = dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]/10";

  const darkContent = (
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { icon: <SketchAtom className="w-10 h-10" />, label: "Shor's Algorithm", sub: "Derives private keys from public keys. Runs on quantum hardware." },
        { icon: <SketchKey className="w-10 h-10" />, label: "Single Key Risk", sub: "One exposed public key is enough. Your whole wallet is compromised." },
        { icon: <SketchShield className="w-10 h-10" />, label: "Qoin Defense", sub: "Cracking one key gets nothing. Both must be cracked simultaneously." },
      ].map((item) => (
        <div key={item.label} className="bg-white/[0.04] border border-white/10 p-5">
          <div className="text-white/50 mb-3">{item.icon}</div>
          <div className="font-sketch text-xl text-white mb-1">{item.label}</div>
          <div className="font-handwritten text-base text-white/50">{item.sub}</div>
        </div>
      ))}
    </div>
  );

  return (
    <SubpageLayout
      badge={s.badge}
      title={s.title}
      heroDecor={<HeroDecor />}
      Illustration={
        <div className="relative w-44 h-44 flex-shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <SketchQuantumCircuit className="w-40 h-40 opacity-80" />
          </div>
          <div className="absolute bottom-0 right-0">
            <SketchAtom className="w-14 h-14 opacity-65" />
          </div>
        </div>
      }
      quote={s.handwritten}
      darkSectionContent={darkContent}
      ctas={[
        { label: t.hero.ctaCreate, href: "/qoin/create", primary: true },
        { label: t.nav.subHow[0].label + " →", href: "/how/start" },
      ]}
    >
      <div className="grid md:grid-cols-2 gap-14 items-start">
        <div className="space-y-6">
          {[s.p1, s.p2, s.p3].map((p, i) => (
            <p key={i} className={`font-body font-bold text-lg leading-relaxed ${text}`}>{p}</p>
          ))}
          <div className={`border-t ${divider} pt-6`}>
            <div className={`font-sketch text-2xl mb-4 ${text}`}>How Shor's Algorithm Works</div>
            <p className={`font-body font-bold text-base leading-relaxed mb-3 ${muted}`}>
              Classical computers cannot factor large numbers efficiently. Bitcoin and Solana rely on this assumption. Elliptic curve cryptography exposes a public key from which your private key can theoretically be derived, but only if you have enough classical compute. Today that is impossible.
            </p>
            <p className={`font-body font-bold text-base leading-relaxed ${muted}`}>
              Shor's algorithm running on a sufficiently powerful quantum computer breaks this assumption. It factors the mathematical relationship between your public and private key in polynomial time instead of exponential time. Every wallet address you have ever used broadcasts your public key to the world.
            </p>
          </div>
          <div className={`border-t ${divider} pt-6`}>
            <div className={`font-sketch text-2xl mb-4 ${text}`}>The Timeline Problem</div>
            <div className="space-y-4">
              {[
                {
                  year: "2019",
                  event: "Google achieves quantum supremacy on narrow tasks",
                  source: "Nature",
                  href: "https://www.nature.com/articles/s41586-019-1666-5",
                },
                {
                  year: "2023",
                  event: "IBM reaches 1,121 qubit processor (IBM Condor)",
                  source: "IBM Newsroom",
                  href: "https://newsroom.ibm.com/2023-12-04-IBM-Debuts-Next-Generation-Quantum-Processor-IBM-Quantum-Heron,-Adds-Groundbreaking-IBM-Quantum-System-Two",
                },
                {
                  year: "2024",
                  event: "Google Willow chip solves benchmark problem in 5 minutes that would take classical supercomputer 10 septillion years",
                  source: "Google Blog",
                  href: "https://blog.google/technology/research/google-willow-quantum-chip/",
                },
                {
                  year: "2025",
                  event: "Microsoft achieves first topological qubit, opening new hardware path for fault-tolerant quantum computing",
                  source: "Microsoft Azure Blog",
                  href: "https://azure.microsoft.com/en-us/blog/quantum/2025/02/19/microsoft-unveils-the-majorana-1-chip-charting-the-path-to-1-million-qubits/",
                },
                {
                  year: "NIST",
                  event: "First finalized post-quantum encryption standards released, confirming the threat is taken seriously at government level",
                  source: "NIST",
                  href: "https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards",
                },
                {
                  year: "Near",
                  event: "Cryptographically relevant quantum computers enter planning stages at major state actors",
                  source: null,
                  href: null,
                },
              ].map((item) => (
                <div key={item.year} className="flex items-start gap-4">
                  <span className="font-sketch text-sm text-[#F7931A] w-12 flex-shrink-0 pt-0.5">{item.year}</span>
                  <div className="flex-1">
                    <span className={`font-body font-bold text-sm ${muted}`}>{item.event}</span>
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center gap-0.5 font-body text-xs text-[#F7931A]/70 hover:text-[#F7931A] transition-colors underline underline-offset-2 decoration-[#F7931A]/30"
                      >
                        {item.source}
                        <svg className="w-2.5 h-2.5 opacity-70" viewBox="0 0 12 12" fill="none">
                          <path d="M2 2h8v8M10 2 4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className={`border-2 ${cardBg} p-6`}>
            <div className="flex items-start gap-4">
              <SketchAtom className="w-12 h-12 flex-shrink-0 text-[#F7931A]" />
              <div>
                <div className={`font-sketch text-xl mb-2 ${text}`}>{t.why.threat1Title}</div>
                <p className={`font-body font-bold text-sm leading-relaxed ${muted}`}>{t.why.threat1Desc}</p>
              </div>
            </div>
          </div>
          <div className={`border-2 border-[#F7931A]/30 p-6 ${dark ? "bg-[#F7931A]/5" : "bg-[#FFF8EE]"}`}>
            <div className="flex items-start gap-4">
              <SketchTwoKeys className="w-12 h-12 flex-shrink-0 text-[#F7931A]" />
              <div>
                <div className="font-sketch text-xl mb-2 text-[#F7931A]">Qoin vs Quantum</div>
                <p className={`font-body font-bold text-sm leading-relaxed ${muted}`}>
                  Two independent keys. A quantum computer cracking Key 1 still cannot move anything. Key 2 must also be cracked simultaneously. That is not a technical problem to solve. That is an exponential security multiplier built into the protocol.
                </p>
              </div>
            </div>
          </div>
          <div className={`border-2 ${cardBg} p-6`}>
            <div className={`font-sketch text-xl mb-4 ${text}`}>Quantum Threat by Wallet Type</div>
            <div className="space-y-2.5">
              {[
                { type: "Standard hot wallet", risk: "Critical" },
                { type: "Hardware wallet (single key)", risk: "Critical" },
                { type: "Multisig (partial)", risk: "High" },
                { type: "Qonjoint (two keys, separate)", risk: "Mitigated" },
              ].map((row) => (
                <div key={row.type} className={`flex items-center justify-between py-2 border-b ${divider} last:border-0`}>
                  <span className={`font-body font-bold text-sm ${muted}`}>{row.type}</span>
                  <span className="font-sketch text-sm" style={{
                    color: row.risk === "Critical" ? "#ef4444" : row.risk === "High" ? "#f97316" : "#F7931A"
                  }}>{row.risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
