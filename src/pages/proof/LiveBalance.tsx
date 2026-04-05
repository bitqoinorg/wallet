import { useState, useEffect, useCallback } from "react";
import SubpageLayout from "@/components/SubpageLayout";
import { useApp } from "@/contexts/AppContext";
import { SketchShield, SketchCoin, SketchNetwork } from "@/components/sketches";
import { explorerAddressUrl } from "@/lib/solana";

const SOL_VAULT = "6TkW8UojBM9g9uanoSGHzm24DJwmu8333yaBMHbrGKR5";
const EVM_VAULT = "0x0000000000000000000000000000000000000000";
const SOL_LOGO = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
const ETH_LOGO = "https://assets.coingecko.com/coins/images/279/small/ethereum.png";

const HeroDecor = () => (
  <svg viewBox="0 0 900 280" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <line x1="80" y1="200" x2="160" y2="150" stroke="#F7931A" strokeWidth="0.9" opacity="0.4"/>
    <line x1="160" y1="150" x2="240" y2="180" stroke="#F7931A" strokeWidth="0.9" opacity="0.4"/>
    <line x1="240" y1="180" x2="320" y2="100" stroke="#F7931A" strokeWidth="0.9" opacity="0.4"/>
    <line x1="320" y1="100" x2="400" y2="130" stroke="#F7931A" strokeWidth="0.9" opacity="0.4"/>
    <line x1="400" y1="130" x2="480" y2="70" stroke="#F7931A" strokeWidth="0.9" opacity="0.4"/>
    <line x1="480" y1="70" x2="560" y2="110" stroke="#F7931A" strokeWidth="0.9" opacity="0.4"/>
    <line x1="560" y1="110" x2="640" y2="80" stroke="#F7931A" strokeWidth="0.9" opacity="0.4"/>
    <line x1="640" y1="80" x2="720" y2="120" stroke="#F7931A" strokeWidth="0.9" opacity="0.4"/>
    <line x1="720" y1="120" x2="820" y2="90" stroke="#F7931A" strokeWidth="0.9" opacity="0.4"/>
    <rect x="155" y="155" width="10" height="45" fill="#F7931A" opacity="0.25"/>
    <rect x="240" y="185" width="10" height="30" fill="#F7931A" opacity="0.2"/>
    <rect x="320" y="105" width="10" height="60" fill="#F7931A" opacity="0.3"/>
    <rect x="400" y="135" width="10" height="40" fill="#F7931A" opacity="0.22"/>
    <rect x="480" y="75" width="10" height="70" fill="#F7931A" opacity="0.35"/>
    <rect x="560" y="115" width="10" height="50" fill="#F7931A" opacity="0.25"/>
    <rect x="640" y="85" width="10" height="60" fill="#F7931A" opacity="0.3"/>
    <rect x="720" y="125" width="10" height="45" fill="#F7931A" opacity="0.22"/>
    <rect x="155" y="140" width="10" height="15" stroke="#F7931A" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <rect x="320" y="82" width="10" height="23" stroke="#F7931A" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <rect x="480" y="55" width="10" height="20" stroke="#F7931A" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <rect x="640" y="65" width="10" height="20" stroke="#F7931A" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <rect x="100" y="215" width="25" height="25" stroke="white" strokeWidth="0.8" fill="none" opacity="0.15"/>
    <line x1="112" y1="215" x2="125" y2="215" stroke="white" strokeWidth="0.8" opacity="0.15"/>
    <rect x="135" y="215" width="25" height="25" stroke="white" strokeWidth="0.8" fill="none" opacity="0.15"/>
    <line x1="147" y1="215" x2="160" y2="215" stroke="white" strokeWidth="0.8" opacity="0.15"/>
    <rect x="170" y="215" width="25" height="25" stroke="white" strokeWidth="0.8" fill="none" opacity="0.15"/>
    <circle cx="820" cy="90" r="6" stroke="white" strokeWidth="1" fill="none" opacity="0.2"/>
  </svg>
);

type TokenRow = { symbol: string; name: string; balance: number; logo: string | null };

function VaultPanel({
  chain, logo, loading, error, onRetry,
  nativeBalance, nativeSymbol, tokens, vault, explorerUrl, dark,
}: {
  chain: string;
  logo: string;
  loading: boolean;
  error: string;
  onRetry: () => void;
  nativeBalance: number | null;
  nativeSymbol: string;
  tokens: TokenRow[];
  vault: string;
  explorerUrl: string;
  dark: boolean;
}) {
  const muted = dark ? "text-[#FAFAF5]/65" : "text-[#1a1a1a]/65";
  const text = dark ? "text-[#FAFAF5]" : "text-[#1a1a1a]";
  const cardBg = dark ? "bg-[#1a1a1a] border-[#FAFAF5]/10" : "bg-white border-[#1a1a1a]/15";

  return (
    <div className="space-y-3">
      <div className={`border-2 ${cardBg} p-4 flex items-center gap-3`}>
        <img src={logo} alt={nativeSymbol} className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <div className={`font-sketch text-base ${text}`}>{chain}</div>
          <div className={`font-body font-bold text-xs ${muted}`}>{nativeSymbol}</div>
        </div>
        <div className={`font-sketch text-lg ${text}`}>
          {loading ? <span className="animate-pulse text-sm">...</span> : nativeBalance !== null ? nativeBalance.toFixed(6) : "0"}
        </div>
      </div>

      {!loading && error && (
        <div className="border-2 border-red-400/20 p-3 flex items-center justify-between">
          <span className={`font-body font-bold text-xs ${muted}`}>{error}</span>
          <button onClick={onRetry} className="font-body font-bold text-xs text-[#F7931A] hover:underline ml-3">Retry</button>
        </div>
      )}

      {!loading && !error && tokens.map((tk) => (
        <div key={tk.symbol} className={`border-2 ${cardBg} p-4 flex items-center gap-3`}>
          {tk.logo ? (
            <img src={tk.logo} alt={tk.symbol} className="w-8 h-8 rounded-full flex-shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full border-2 border-[#F7931A]/30 flex items-center justify-center flex-shrink-0">
              <SketchCoin className="w-4 h-4 opacity-50" />
            </div>
          )}
          <div className="flex-1">
            <div className={`font-sketch text-base ${text}`}>{tk.name}</div>
            <div className={`font-body font-bold text-xs ${muted}`}>{tk.symbol}</div>
          </div>
          <div className={`font-sketch text-lg ${text}`}>{tk.balance.toLocaleString()}</div>
        </div>
      ))}

      {!loading && !error && tokens.length === 0 && (
        <div className={`border-2 ${cardBg} p-4 text-center`}>
          <p className={`font-handwritten text-base ${muted}`}>No token holdings</p>
        </div>
      )}

      <div className={`font-mono text-xs break-all p-2 border ${dark ? "bg-[#0f0f0f] border-[#FAFAF5]/10 text-[#FAFAF5]/40" : "bg-[#FAFAF5] border-[#1a1a1a]/10 text-[#1a1a1a]/50"}`}>{vault}</div>
      <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="font-body font-bold text-sm text-[#F7931A] hover:underline block">View on explorer →</a>
    </div>
  );
}

export default function LiveBalance() {
  const { t, dark } = useApp();
  const s = t.subpages.liveBalance;
  const proof = t.proof;

  const [sol, setSol] = useState<number | null>(null);
  const [solTokens, setSolTokens] = useState<TokenRow[]>([]);
  const [solLoading, setSolLoading] = useState(true);
  const [solError, setSolError] = useState("");

  const [evmEth, setEvmEth] = useState<number | null>(null);
  const [evmTokens, setEvmTokens] = useState<TokenRow[]>([]);
  const [evmLoading, setEvmLoading] = useState(true);
  const [evmError, setEvmError] = useState("");

  const [tab, setTab] = useState<"eth" | "sol">("eth");

  const muted = dark ? "text-[#FAFAF5]/65" : "text-[#1a1a1a]/65";
  const text = dark ? "text-[#FAFAF5]" : "text-[#1a1a1a]";
  const cardBg = dark ? "bg-[#1a1a1a] border-[#FAFAF5]/10" : "bg-white border-[#1a1a1a]/15";
  const divider = dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]/10";

  const fetchSol = useCallback(async () => {
    setSolLoading(true); setSolError("");
    try {
      const res = await fetch(`/api/qoin/balance?address=${SOL_VAULT}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json() as { solBalance: number; tokens: Array<{ mint: string; balance: number; name: string | null; symbol: string | null; logo: string | null }> };
      setSol(data.solBalance);
      setSolTokens((data.tokens || []).filter(tk => tk.balance > 0).map(tk => ({
        symbol: tk.symbol ?? tk.mint.slice(0, 6),
        name: tk.name ?? tk.symbol ?? "Token",
        balance: tk.balance,
        logo: tk.logo,
      })));
    } catch {
      setSolError("Could not fetch Solana balance.");
    } finally {
      setSolLoading(false);
    }
  }, []);

  const fetchEvm = useCallback(async () => {
    setEvmLoading(true); setEvmError("");
    try {
      const res = await fetch(`/api/evm/balance?address=${EVM_VAULT}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json() as { ethBalance: number; ethLogo: string; tokens: Array<{ contract: string; name: string; symbol: string; balance: number; logo: string }> };
      setEvmEth(data.ethBalance);
      setEvmTokens((data.tokens || []).filter(tk => tk.balance > 0).map(tk => ({
        symbol: tk.symbol,
        name: tk.name,
        balance: tk.balance,
        logo: tk.logo,
      })));
    } catch {
      setEvmError("Could not fetch Ethereum balance.");
    } finally {
      setEvmLoading(false);
    }
  }, []);

  useEffect(() => { fetchSol(); fetchEvm(); }, [fetchSol, fetchEvm]);

  const anyLoading = solLoading || evmLoading;

  const darkContent = (
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { icon: <SketchCoin className="w-9 h-9" />, label: "Real Vaults", sub: "Live on Ethereum and Solana mainnet. Real tokens. Real addresses." },
        { icon: <SketchShield className="w-9 h-9" />, label: "Qonjoint Protected", sub: "Two keys required to spend. Published here for verification." },
        { icon: <SketchNetwork className="w-9 h-9" />, label: "Open to Inspect", sub: "View on any chain explorer. All transactions are public." },
      ].map((item) => (
        <div key={item.label} className="bg-white/[0.04] border border-white/10 p-5 flex items-start gap-4">
          <div className="text-white/50 flex-shrink-0">{item.icon}</div>
          <div>
            <div className="font-sketch text-xl text-white mb-1">{item.label}</div>
            <div className="font-handwritten text-base text-white/50">{item.sub}</div>
          </div>
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
            <SketchCoin className="w-36 h-36 opacity-85" />
          </div>
          <div className="absolute bottom-0 right-0">
            <SketchShield className="w-16 h-16 opacity-60" />
          </div>
        </div>
      }
      quote="If the math says no, the answer is no."
      darkSectionContent={darkContent}
      ctas={[
        { label: t.hero.ctaCreate, href: "/qoin/create", primary: true },
        { label: t.nav.subProof[0].label + " →", href: "/proof/challenge" },
      ]}
    >
      <div className="space-y-8">
        <p className={`font-body font-bold text-lg ${muted}`}>{s.subtitle}</p>

        {/* Refresh button */}
        <div className="flex justify-end">
          <button
            onClick={() => { fetchSol(); fetchEvm(); }}
            disabled={anyLoading}
            className={`font-body font-bold text-sm px-4 py-2 border-2 transition-colors ${
              dark ? "border-[#FAFAF5]/20 text-[#FAFAF5]/60 hover:border-[#F7931A] hover:text-[#F7931A]" : "border-[#1a1a1a]/20 text-[#1a1a1a]/60 hover:border-[#F7931A] hover:text-[#F7931A]"
            }`}
          >
            {anyLoading ? proof.loading : proof.refresh}
          </button>
        </div>

        {/* Mobile tabs */}
        <div className={`flex md:hidden border-2 ${dark ? "border-[#FAFAF5]/10" : "border-[#1a1a1a]"}`}>
          {(["eth", "sol"] as const).map((t2) => (
            <button
              key={t2}
              onClick={() => setTab(t2)}
              className={`flex-1 py-3 font-sketch text-base transition-colors ${
                tab === t2 ? "bg-[#F7931A] text-white" : dark ? "text-[#FAFAF5]/40 hover:text-[#FAFAF5]" : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
              }`}
            >
              {t2 === "eth" ? "Ethereum" : "Solana"}
            </button>
          ))}
        </div>

        {/* Mobile: single panel */}
        <div className="md:hidden">
          {tab === "eth" ? (
            <VaultPanel
              chain="Ethereum" logo={ETH_LOGO}
              loading={evmLoading} error={evmError} onRetry={fetchEvm}
              nativeBalance={evmEth} nativeSymbol="ETH" tokens={evmTokens}
              vault={EVM_VAULT} explorerUrl={`https://etherscan.io/address/${EVM_VAULT}`}
              dark={dark}
            />
          ) : (
            <VaultPanel
              chain="Solana" logo={SOL_LOGO}
              loading={solLoading} error={solError} onRetry={fetchSol}
              nativeBalance={sol} nativeSymbol="SOL" tokens={solTokens}
              vault={SOL_VAULT} explorerUrl={explorerAddressUrl(SOL_VAULT, false)}
              dark={dark}
            />
          )}
        </div>

        {/* Desktop: two columns */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          <div>
            <div className={`font-sketch text-xl mb-4 pb-3 border-b-2 ${dark ? "border-[#FAFAF5]/10 text-[#FAFAF5]" : "border-[#1a1a1a]/10 text-[#1a1a1a]"}`}>Ethereum</div>
            <VaultPanel
              chain="Ethereum" logo={ETH_LOGO}
              loading={evmLoading} error={evmError} onRetry={fetchEvm}
              nativeBalance={evmEth} nativeSymbol="ETH" tokens={evmTokens}
              vault={EVM_VAULT} explorerUrl={`https://etherscan.io/address/${EVM_VAULT}`}
              dark={dark}
            />
          </div>
          <div>
            <div className={`font-sketch text-xl mb-4 pb-3 border-b-2 ${dark ? "border-[#FAFAF5]/10 text-[#FAFAF5]" : "border-[#1a1a1a]/10 text-[#1a1a1a]"}`}>Solana</div>
            <VaultPanel
              chain="Solana" logo={SOL_LOGO}
              loading={solLoading} error={solError} onRetry={fetchSol}
              nativeBalance={sol} nativeSymbol="SOL" tokens={solTokens}
              vault={SOL_VAULT} explorerUrl={explorerAddressUrl(SOL_VAULT, false)}
              dark={dark}
            />
          </div>
        </div>

        <div className={`border-t ${divider} pt-8`}>
          <div className={`font-sketch text-2xl mb-5 ${text}`}>Why These Vaults Are Public</div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className={`font-body font-bold text-base leading-relaxed mb-4 ${muted}`}>
                Showing live balances on both Ethereum and Solana is not a risk. Both chains are public by nature. The addresses, balances, and full transaction histories of every wallet are visible to anyone, anywhere, at any time.
              </p>
              <p className={`font-body font-bold text-base leading-relaxed ${muted}`}>
                Neither vault can be moved without both private keys. Publishing the addresses and even one of the two private keys per chain does not weaken that guarantee. It makes it verifiable.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Balances visible", value: "Yes, always" },
                { label: "Transaction history", value: "Yes, public" },
                { label: "Transfer without both keys", value: "Impossible" },
                { label: "Derivable from public data", value: "No" },
                { label: "Override by any party", value: "No" },
              ].map((row) => (
                <div key={row.label} className={`flex items-center justify-between py-2.5 border-b ${divider} last:border-0`}>
                  <span className={`font-body font-bold text-sm ${muted}`}>{row.label}</span>
                  <span className="font-sketch text-sm text-[#F7931A]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vault address cards */}
        <div className={`border-2 ${cardBg} p-6`}>
          <div className={`font-sketch text-xl mb-4 ${text}`}>{proof.vaultLabel}</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className={`font-handwritten text-sm mb-1 ${muted}`}>Ethereum (Gnosis Safe)</div>
              <div className={`font-mono text-xs break-all p-3 border mb-2 ${dark ? "bg-[#0f0f0f] border-[#FAFAF5]/10 text-[#FAFAF5]/60" : "bg-[#FAFAF5] border-[#1a1a1a]/10 text-[#1a1a1a]/50"}`}>{EVM_VAULT}</div>
              <a href={`https://etherscan.io/address/${EVM_VAULT}`} target="_blank" rel="noopener noreferrer" className="font-body font-bold text-sm text-[#F7931A] hover:underline">Etherscan →</a>
            </div>
            <div>
              <div className={`font-handwritten text-sm mb-1 ${muted}`}>Solana (SPL Multisig)</div>
              <div className={`font-mono text-xs break-all p-3 border mb-2 ${dark ? "bg-[#0f0f0f] border-[#FAFAF5]/10 text-[#FAFAF5]/60" : "bg-[#FAFAF5] border-[#1a1a1a]/10 text-[#1a1a1a]/50"}`}>{SOL_VAULT}</div>
              <a href={explorerAddressUrl(SOL_VAULT, false)} target="_blank" rel="noopener noreferrer" className="font-body font-bold text-sm text-[#F7931A] hover:underline">{proof.viewExplorer} →</a>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
