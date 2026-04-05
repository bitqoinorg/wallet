import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { Transaction } from "@solana/web3.js";

type SignFn = (tx: Transaction) => Promise<Transaction>;

interface WalletPairState {
  phantomPubkey: string | null;
  phantom2Pubkey: string | null;

  phantomConnecting: boolean;
  phantom2Connecting: boolean;

  phantomError: string;
  phantom2Error: string;

  connectPhantom(): Promise<void>;
  connectPhantom2(): Promise<void>;
  disconnectPhantom(): Promise<void>;
  disconnectPhantom2(): Promise<void>;

  signWithPhantom: SignFn | null;
  signWithPhantom2: SignFn | null;
}

const WalletPairContext = createContext<WalletPairState | null>(null);

export function WalletPairProvider({ children }: { children: ReactNode }) {
  const phantomRef = useRef<PhantomWalletAdapter | null>(null);
  const phantom2Ref = useRef<SolflareWalletAdapter | null>(null);

  const [phantomPubkey, setPhantomPubkey] = useState<string | null>(null);
  const [phantom2Pubkey, setPhantom2Pubkey] = useState<string | null>(null);

  const [phantomConnecting, setPhantomConnecting] = useState(false);
  const [phantom2Connecting, setPhantom2Connecting] = useState(false);

  const [phantomError, setPhantomError] = useState("");
  const [phantom2Error, setPhantom2Error] = useState("");

  const [phantomReady, setPhantomReady] = useState(false);
  const [phantom2Ready, setPhantom2Ready] = useState(false);

  useEffect(() => {
    const ph = new PhantomWalletAdapter();
    const ph2 = new SolflareWalletAdapter();
    phantomRef.current = ph;
    phantom2Ref.current = ph2;

    ph.on("connect", () => {
      setPhantomPubkey(ph.publicKey?.toBase58() ?? null);
      setPhantomConnecting(false);
      setPhantomReady(true);
    });
    ph.on("disconnect", () => {
      setPhantomPubkey(null);
      setPhantomReady(false);
    });
    ph.on("error", (err) => {
      setPhantomConnecting(false);
      setPhantomError(err instanceof Error ? err.message : "Phantom connection failed.");
    });

    ph2.on("connect", () => {
      setPhantom2Pubkey(ph2.publicKey?.toBase58() ?? null);
      setPhantom2Connecting(false);
      setPhantom2Ready(true);
    });
    ph2.on("disconnect", () => {
      setPhantom2Pubkey(null);
      setPhantom2Ready(false);
    });
    ph2.on("error", (err) => {
      setPhantom2Connecting(false);
      setPhantom2Error(err instanceof Error ? err.message : "Phantom (Key 2) connection failed.");
    });

    // Listen for account switches directly on the Phantom provider.
    // The adapter does not expose accountChanged, so we tap the raw provider.
    // When the user flips accounts in Phantom, update the pubkey in place
    // (no disconnect → no UI reset). AccessVault's useEffect watching
    // phantomPubkey will re-run and auto-detect the Qoin for the new account.
    const provider = (window as Record<string, unknown>).phantom as
      | { solana?: { on?: (e: string, cb: (pk: { toBase58(): string } | null) => void) => void;
                     off?: (e: string, cb: unknown) => void } }
      | undefined;
    const solProvider = provider?.solana;

    const handleAccountChanged = (newPubkey: { toBase58(): string } | null) => {
      if (newPubkey) {
        setPhantomPubkey(newPubkey.toBase58());
        setPhantomReady(true);
      } else {
        // User locked Phantom or disconnected all accounts
        setPhantomPubkey(null);
        setPhantomReady(false);
      }
    };

    solProvider?.on?.("accountChanged", handleAccountChanged);

    return () => {
      solProvider?.off?.("accountChanged", handleAccountChanged);
      ph.disconnect().catch(() => {});
      ph2.disconnect().catch(() => {});
    };
  }, []);

  const connectPhantom = useCallback(async () => {
    if (!phantomRef.current) return;
    setPhantomError("");
    setPhantomConnecting(true);
    try {
      await phantomRef.current.connect();
    } catch (e: unknown) {
      setPhantomConnecting(false);
      setPhantomError(e instanceof Error ? e.message : "Phantom connection failed.");
    }
  }, []);

  const connectPhantom2 = useCallback(async () => {
    if (!phantom2Ref.current) return;
    setPhantom2Error("");
    setPhantom2Connecting(true);
    try {
      await phantom2Ref.current.connect();
    } catch (e: unknown) {
      setPhantom2Connecting(false);
      setPhantom2Error(e instanceof Error ? e.message : "Phantom (Key 2) connection failed.");
    }
  }, []);

  const disconnectPhantom = useCallback(async () => {
    await phantomRef.current?.disconnect();
    setPhantomPubkey(null);
    setPhantomReady(false);
  }, []);

  const disconnectPhantom2 = useCallback(async () => {
    await phantom2Ref.current?.disconnect();
    setPhantom2Pubkey(null);
    setPhantom2Ready(false);
  }, []);

  const signWithPhantom: SignFn | null = phantomReady
    ? (tx: Transaction) => {
        if (!phantomRef.current) throw new Error("Phantom not connected.");
        return phantomRef.current.signTransaction(tx);
      }
    : null;

  const signWithPhantom2: SignFn | null = phantom2Ready
    ? (tx: Transaction) => {
        if (!phantom2Ref.current) throw new Error("Solflare (K2) not connected.");
        return phantom2Ref.current.signTransaction(tx) as Promise<Transaction>;
      }
    : null;

  return (
    <WalletPairContext.Provider value={{
      phantomPubkey,
      phantom2Pubkey,
      phantomConnecting,
      phantom2Connecting,
      phantomError,
      phantom2Error,
      connectPhantom,
      connectPhantom2,
      disconnectPhantom,
      disconnectPhantom2,
      signWithPhantom,
      signWithPhantom2,
    }}>
      {children}
    </WalletPairContext.Provider>
  );
}

export function useWalletPair() {
  const ctx = useContext(WalletPairContext);
  if (!ctx) throw new Error("useWalletPair must be used inside WalletPairProvider");
  return ctx;
}
