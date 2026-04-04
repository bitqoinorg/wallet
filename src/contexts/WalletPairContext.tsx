import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { Transaction } from "@solana/web3.js";

export type WalletCombo = "phantom+solflare" | "phantom+phantom";

type SignFn = (tx: Transaction) => Promise<Transaction>;

interface WalletPairState {
  walletCombo: WalletCombo;
  setWalletCombo: (c: WalletCombo) => void;

  phantomPubkey: string | null;
  solflarePubkey: string | null;
  phantom2Pubkey: string | null;

  phantomConnecting: boolean;
  solflareConnecting: boolean;
  phantom2Connecting: boolean;

  phantomError: string;
  solflareError: string;
  phantom2Error: string;

  connectPhantom(): Promise<void>;
  connectSolflare(): Promise<void>;
  connectPhantom2(): Promise<void>;
  disconnectPhantom(): Promise<void>;
  disconnectSolflare(): Promise<void>;
  disconnectPhantom2(): Promise<void>;

  signWithPhantom: SignFn | null;
  signWithSolflare: SignFn | null;
  signWithPhantom2: SignFn | null;
}

const WalletPairContext = createContext<WalletPairState | null>(null);

export function WalletPairProvider({ children }: { children: ReactNode }) {
  const phantomRef = useRef<PhantomWalletAdapter | null>(null);
  const solflareRef = useRef<SolflareWalletAdapter | null>(null);
  const phantom2Ref = useRef<PhantomWalletAdapter | null>(null);

  const [walletCombo, setWalletCombo] = useState<WalletCombo>("phantom+solflare");

  const [phantomPubkey, setPhantomPubkey] = useState<string | null>(null);
  const [solflarePubkey, setSolflarePubkey] = useState<string | null>(null);
  const [phantom2Pubkey, setPhantom2Pubkey] = useState<string | null>(null);

  const [phantomConnecting, setPhantomConnecting] = useState(false);
  const [solflareConnecting, setSolflareConnecting] = useState(false);
  const [phantom2Connecting, setPhantom2Connecting] = useState(false);

  const [phantomError, setPhantomError] = useState("");
  const [solflareError, setSolflareError] = useState("");
  const [phantom2Error, setPhantom2Error] = useState("");

  const [phantomReady, setPhantomReady] = useState(false);
  const [solflareReady, setSolflareReady] = useState(false);
  const [phantom2Ready, setPhantom2Ready] = useState(false);

  useEffect(() => {
    const ph = new PhantomWalletAdapter();
    const sf = new SolflareWalletAdapter();
    const ph2 = new PhantomWalletAdapter();
    phantomRef.current = ph;
    solflareRef.current = sf;
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

    return () => {
      ph.disconnect().catch(() => {});
      sf.disconnect().catch(() => {});
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

  const disconnectSolflare = useCallback(async () => {
    await solflareRef.current?.disconnect();
    setSolflarePubkey(null);
    setSolflareReady(false);
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

  const signWithSolflare: SignFn | null = solflareReady
    ? (tx: Transaction) => {
        if (!solflareRef.current) throw new Error("Solflare not connected.");
        return solflareRef.current.signTransaction(tx);
      }
    : null;

  const signWithPhantom2: SignFn | null = phantom2Ready
    ? (tx: Transaction) => {
        if (!phantom2Ref.current) throw new Error("Phantom (Key 2) not connected.");
        return phantom2Ref.current.signTransaction(tx);
      }
    : null;

  return (
    <WalletPairContext.Provider value={{
      walletCombo,
      setWalletCombo,
      phantomPubkey,
      solflarePubkey,
      phantom2Pubkey,
      phantomConnecting,
      solflareConnecting,
      phantom2Connecting,
      phantomError,
      solflareError,
      phantom2Error,
      connectPhantom,
      connectSolflare,
      connectPhantom2,
      disconnectPhantom,
      disconnectSolflare,
      disconnectPhantom2,
      signWithPhantom,
      signWithSolflare,
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
