import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { Transaction } from "@solana/web3.js";

type SignFn = (tx: Transaction) => Promise<Transaction>;

interface WalletPairState {
  phantomPubkey: string | null;
  solflarePubkey: string | null;
  phantomConnecting: boolean;
  solflareConnecting: boolean;
  phantomError: string;
  solflareError: string;
  connectPhantom(): Promise<void>;
  connectSolflare(): Promise<void>;
  disconnectPhantom(): Promise<void>;
  disconnectSolflare(): Promise<void>;
  signWithPhantom: SignFn | null;
  signWithSolflare: SignFn | null;
}

const WalletPairContext = createContext<WalletPairState | null>(null);

export function WalletPairProvider({ children }: { children: ReactNode }) {
  const phantomRef = useRef<PhantomWalletAdapter | null>(null);
  const solflareRef = useRef<SolflareWalletAdapter | null>(null);

  const [phantomPubkey, setPhantomPubkey] = useState<string | null>(null);
  const [solflarePubkey, setSolflarePubkey] = useState<string | null>(null);
  const [phantomConnecting, setPhantomConnecting] = useState(false);
  const [solflareConnecting, setSolflareConnecting] = useState(false);
  const [phantomError, setPhantomError] = useState("");
  const [solflareError, setSolflareError] = useState("");
  const [phantomReady, setPhantomReady] = useState(false);
  const [solflareReady, setSolflareReady] = useState(false);

  useEffect(() => {
    const ph = new PhantomWalletAdapter();
    const sf = new SolflareWalletAdapter();
    phantomRef.current = ph;
    solflareRef.current = sf;

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

    sf.on("connect", () => {
      setSolflarePubkey(sf.publicKey?.toBase58() ?? null);
      setSolflareConnecting(false);
      setSolflareReady(true);
    });
    sf.on("disconnect", () => {
      setSolflarePubkey(null);
      setSolflareReady(false);
    });
    sf.on("error", (err) => {
      setSolflareConnecting(false);
      setSolflareError(err instanceof Error ? err.message : "Solflare connection failed.");
    });

    return () => {
      ph.disconnect().catch(() => {});
      sf.disconnect().catch(() => {});
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

  const connectSolflare = useCallback(async () => {
    if (!solflareRef.current) return;
    setSolflareError("");
    setSolflareConnecting(true);
    try {
      await solflareRef.current.connect();
    } catch (e: unknown) {
      setSolflareConnecting(false);
      setSolflareError(e instanceof Error ? e.message : "Solflare connection failed.");
    }
  }, []);

  const disconnectPhantom = useCallback(async () => {
    await phantomRef.current?.disconnect();
    setPhantomPubkey(null);
    setPhantomReady(false);
  }, []);

  const disconnectSolflare = useCallback(async () => {
    await solflareRef.current?.disconnect();
    setSolflarePubkey(null);
    setSolflareReady(false);
  }, []);

  const signWithPhantom: SignFn | null = phantomReady
    ? (tx: Transaction) => {
        if (!phantomRef.current) throw new Error("Phantom not connected.");
        return phantomRef.current.signTransaction(tx);
      }
    : null;

  const signWithSolflare: SignFn | null = solflareReady
    ? (tx: Transaction) => {
        if (!solflareRef.current) throw new Error("Solflare not connected.");
        return solflareRef.current.signTransaction(tx);
      }
    : null;

  return (
    <WalletPairContext.Provider value={{
      phantomPubkey,
      solflarePubkey,
      phantomConnecting,
      solflareConnecting,
      phantomError,
      solflareError,
      connectPhantom,
      connectSolflare,
      disconnectPhantom,
      disconnectSolflare,
      signWithPhantom,
      signWithSolflare,
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
