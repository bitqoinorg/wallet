import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  createInitializeMultisigInstruction,
  createTransferInstruction,
  getAccount,
  TOKEN_PROGRAM_ID,
  MULTISIG_SIZE,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import bs58 from "bs58";

export const SOLANA_RPC = "https://api.mainnet-beta.solana.com";
export const SOLANA_DEVNET_RPC = "https://api.devnet.solana.com";

export function getConnection(devnet = true) {
  return new Connection(devnet ? SOLANA_DEVNET_RPC : SOLANA_RPC, "confirmed");
}

export function generateKeypair(): { publicKey: string; privateKey: string } {
  const kp = Keypair.generate();
  return {
    publicKey: kp.publicKey.toBase58(),
    privateKey: bs58.encode(kp.secretKey),
  };
}

export function keypairFromPrivateKey(privateKeyB58: string): Keypair {
  const secretKey = bs58.decode(privateKeyB58.trim());
  return Keypair.fromSecretKey(secretKey);
}

export function isValidPrivateKey(key: string): boolean {
  try {
    const decoded = bs58.decode(key.trim());
    return decoded.length === 64;
  } catch {
    return false;
  }
}

export function isValidPublicKey(key: string): boolean {
  try {
    new PublicKey(key.trim());
    return true;
  } catch {
    return false;
  }
}

/**
 * Derives the ATA (Associated Token Account) for a given mint, owned by the
 * Qonjoint vault account. THIS is the address users should send SPL tokens to.
 * The vault account itself cannot receive tokens only its ATAs can.
 */
export function getTokenDepositAddress(multisigAddress: string, mintAddress: string): string {
  const multisigPubkey = new PublicKey(multisigAddress);
  const mintPubkey = new PublicKey(mintAddress);
  const ata = getAssociatedTokenAddressSync(mintPubkey, multisigPubkey, true);
  return ata.toBase58();
}

export async function airdropIfDevnet(
  connection: Connection,
  pubkey: PublicKey,
  devnet: boolean
): Promise<void> {
  if (!devnet) return;
  const balance = await connection.getBalance(pubkey);
  if (balance >= 0.01 * LAMPORTS_PER_SOL) return;

  // Try airdrop up to 3 times
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const sig = await connection.requestAirdrop(pubkey, 0.5 * LAMPORTS_PER_SOL);
      await connection.confirmTransaction(sig, "confirmed");
      return;
    } catch {
      if (attempt < 3) await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }

  // Airdrop failed check if balance is now sufficient anyway
  const finalBalance = await connection.getBalance(pubkey);
  if (finalBalance >= 0.01 * LAMPORTS_PER_SOL) return;

  throw new Error(
    `Devnet airdrop failed. The Solana devnet faucet may be rate-limited. ` +
    `Visit https://faucet.solana.com and airdrop SOL to: ${pubkey.toBase58()}, then try again.`
  );
}

/**
 * Creates a Qonjoint vault on-chain.
 * Both signers are required to authorize any transfer.
 * pk1 is the payer.
 */
export async function createMultisigVault(
  pk1: string,
  pk2: string,
  devnet = true
): Promise<{ multisigAddress: string; signature: string }> {
  const connection = getConnection(devnet);
  const kp1 = keypairFromPrivateKey(pk1);
  const kp2 = keypairFromPrivateKey(pk2);

  await airdropIfDevnet(connection, kp1.publicKey, devnet);

  const multisigKeypair = Keypair.generate();
  const minimumBalance = await connection.getMinimumBalanceForRentExemption(MULTISIG_SIZE);

  const { blockhash } = await connection.getLatestBlockhash();
  const tx = new Transaction({ recentBlockhash: blockhash, feePayer: kp1.publicKey });
  tx.add(
    SystemProgram.createAccount({
      fromPubkey: kp1.publicKey,
      newAccountPubkey: multisigKeypair.publicKey,
      space: MULTISIG_SIZE,
      lamports: minimumBalance,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMultisigInstruction(
      multisigKeypair.publicKey,
      [kp1.publicKey, kp2.publicKey],
      2,
      TOKEN_PROGRAM_ID
    )
  );

  tx.sign(kp1, multisigKeypair);
  const rawTx = tx.serialize();
  const signature = await connection.sendRawTransaction(rawTx);
  await connection.confirmTransaction(signature, "confirmed");

  return {
    multisigAddress: multisigKeypair.publicKey.toBase58(),
    signature,
  };
}

/**
 * Admin-only: Creates a 3-key Qonjoint vault on-chain.
 * All three signers must authorize every transfer.
 * pk1 is the payer. Used for the BITQOIN treasury where one key is public.
 */
export async function createMultisigVault3(
  pk1: string,
  pk2: string,
  pk3: string,
  devnet = true
): Promise<{ multisigAddress: string; signature: string }> {
  const connection = getConnection(devnet);
  const kp1 = keypairFromPrivateKey(pk1);
  const kp2 = keypairFromPrivateKey(pk2);
  const kp3 = keypairFromPrivateKey(pk3);

  await airdropIfDevnet(connection, kp1.publicKey, devnet);

  const multisigKeypair = Keypair.generate();
  const minimumBalance = await connection.getMinimumBalanceForRentExemption(MULTISIG_SIZE);

  const { blockhash } = await connection.getLatestBlockhash();
  const tx = new Transaction({ recentBlockhash: blockhash, feePayer: kp1.publicKey });
  tx.add(
    SystemProgram.createAccount({
      fromPubkey: kp1.publicKey,
      newAccountPubkey: multisigKeypair.publicKey,
      space: MULTISIG_SIZE,
      lamports: minimumBalance,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMultisigInstruction(
      multisigKeypair.publicKey,
      [kp1.publicKey, kp2.publicKey, kp3.publicKey],
      3,
      TOKEN_PROGRAM_ID
    )
  );

  tx.sign(kp1, multisigKeypair);
  const rawTx = tx.serialize();
  const signature = await connection.sendRawTransaction(rawTx);
  await connection.confirmTransaction(signature, "confirmed");

  return {
    multisigAddress: multisigKeypair.publicKey.toBase58(),
    signature,
  };
}

/**
 * Admin-only: Transfer from a 3-of-3 shield. All three keys must sign.
 */
export async function transferSPLToken3(
  pk1: string,
  pk2: string,
  pk3: string,
  multisigAddress: string,
  mintAddress: string,
  sourceTokenAccount: string,
  recipientAddress: string,
  amount: number,
  decimals: number,
  devnet = true
): Promise<string> {
  const connection = getConnection(devnet);
  const kp1 = keypairFromPrivateKey(pk1);
  const kp2 = keypairFromPrivateKey(pk2);
  const kp3 = keypairFromPrivateKey(pk3);
  const multisigPubkey = new PublicKey(multisigAddress);
  const mintPubkey = new PublicKey(mintAddress);
  const recipientPubkey = new PublicKey(recipientAddress);
  const sourceATA = new PublicKey(sourceTokenAccount);

  const destATA = await getAssociatedTokenAddress(mintPubkey, recipientPubkey);

  const { blockhash } = await connection.getLatestBlockhash();
  const tx = new Transaction({ recentBlockhash: blockhash, feePayer: kp1.publicKey });

  try {
    await getAccount(connection, destATA);
  } catch {
    tx.add(
      createAssociatedTokenAccountInstruction(kp1.publicKey, destATA, recipientPubkey, mintPubkey)
    );
  }

  const rawAmount = BigInt(Math.round(amount * Math.pow(10, decimals)));
  tx.add(
    createTransferInstruction(
      sourceATA,
      destATA,
      multisigPubkey,
      rawAmount,
      [kp1.publicKey, kp2.publicKey, kp3.publicKey],
      TOKEN_PROGRAM_ID
    )
  );

  tx.sign(kp1, kp2, kp3);
  const rawTx = tx.serialize();
  const sig = await connection.sendRawTransaction(rawTx);
  await connection.confirmTransaction(sig, "confirmed");
  return sig;
}

/**
 * Creates the Associated Token Account for a specific mint, owned by the Qonjoint vault.
 * This must be done before users can deposit that token into the vault.
 * pk1 pays for the ATA creation.
 */
export async function createVaultTokenAccount(
  pk1: string,
  multisigAddress: string,
  mintAddress: string,
  devnet = true
): Promise<{ tokenAccountAddress: string; signature: string | null }> {
  const connection = getConnection(devnet);
  const payerKp = keypairFromPrivateKey(pk1);
  const multisigPubkey = new PublicKey(multisigAddress);
  const mintPubkey = new PublicKey(mintAddress);

  const ataAddress = await getAssociatedTokenAddress(mintPubkey, multisigPubkey, true);

  // Check if it already exists
  try {
    await getAccount(connection, ataAddress);
    return { tokenAccountAddress: ataAddress.toBase58(), signature: null };
  } catch {
    // Doesn't exist create it
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new Transaction({ recentBlockhash: blockhash, feePayer: payerKp.publicKey });
    tx.add(
      createAssociatedTokenAccountInstruction(
        payerKp.publicKey,
        ataAddress,
        multisigPubkey,
        mintPubkey
      )
    );
    tx.sign(payerKp);
    const rawTx = tx.serialize();
    const signature = await connection.sendRawTransaction(rawTx);
    await connection.confirmTransaction(signature, "confirmed");
    return { tokenAccountAddress: ataAddress.toBase58(), signature };
  }
}

/**
 * Fetches SPL token balances for the Qonjoint vault address.
 */
export async function getSPLTokenBalances(
  multisigAddress: string,
  devnet = true
): Promise<Array<{ mint: string; balance: number; decimals: number; tokenAccount: string }>> {
  const connection = getConnection(devnet);
  const pubkey = new PublicKey(multisigAddress);

  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubkey, {
    programId: TOKEN_PROGRAM_ID,
  });

  return tokenAccounts.value
    .map((item) => {
      const info = item.account.data.parsed.info;
      return {
        mint: info.mint as string,
        balance: (info.tokenAmount.uiAmount as number) ?? 0,
        decimals: info.tokenAmount.decimals as number,
        tokenAccount: item.pubkey.toBase58(),
      };
    })
    .filter((t) => t.balance > 0);
}

export async function getSOLBalance(address: string, devnet = true): Promise<number> {
  const connection = getConnection(devnet);
  const pubkey = new PublicKey(address);
  const lamports = await connection.getBalance(pubkey);
  return lamports / LAMPORTS_PER_SOL;
}

/**
 * Transfers SPL tokens from the Qonjoint vault.
 * Source token account is the ATA of the Qonjoint vault for the given mint.
 * Both pk1 AND pk2 must sign enforced at the Solana protocol level.
 */
export async function transferSPLToken(
  pk1: string,
  pk2: string,
  multisigAddress: string,
  mintAddress: string,
  sourceTokenAccount: string,
  recipientAddress: string,
  amount: number,
  decimals: number
): Promise<string> {
  const kp1 = keypairFromPrivateKey(pk1);
  const kp2 = keypairFromPrivateKey(pk2);
  const multisigPubkey = new PublicKey(multisigAddress);
  const mintPubkey = new PublicKey(mintAddress);
  const recipientPubkey = new PublicKey(recipientAddress);
  const sourceATA = new PublicKey(sourceTokenAccount);

  const destATA = await getAssociatedTokenAddress(mintPubkey, recipientPubkey);

  // Fetch platform payer pubkey (it pays fees, not the signing keys)
  const ppRes = await fetch("/api/qoin/platform-pubkey");
  const { publicKey: platformPubkeyStr } = await ppRes.json();
  const platformPubkey = new PublicKey(platformPubkeyStr);

  // Get blockhash via API (avoids CORS)
  const bhRes = await fetch("/api/qoin/blockhash");
  const { blockhash } = await bhRes.json();

  // Platform payer is fee payer the Qonjoint signing keys have no SOL
  const tx = new Transaction({ recentBlockhash: blockhash, feePayer: platformPubkey });

  // Check if destination ATA exists; if not, create it (platform payer funds rent)
  const acctRes = await fetch(`/api/qoin/account?address=${destATA.toBase58()}`);
  const { exists } = await acctRes.json();
  if (!exists) {
    tx.add(
      createAssociatedTokenAccountInstruction(
        platformPubkey,
        destATA,
        recipientPubkey,
        mintPubkey
      )
    );
  }

  const rawAmount = BigInt(Math.round(amount * Math.pow(10, decimals)));

  tx.add(
    createTransferInstruction(
      sourceATA,
      destATA,
      multisigPubkey,
      rawAmount,
      [kp1.publicKey, kp2.publicKey],
      TOKEN_PROGRAM_ID
    )
  );

  // Partial sign with both Qonjoint keys platform payer signs in broadcast endpoint
  tx.partialSign(kp1, kp2);
  const rawTx = tx.serialize({ requireAllSignatures: false });

  // Broadcast via API (avoids CORS)
  const broadcastRes = await fetch("/api/qoin/broadcast", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transaction: Array.from(rawTx) }),
  });
  const broadcastData = await broadcastRes.json();
  if (!broadcastRes.ok) throw new Error(broadcastData.error || "Broadcast failed.");
  return broadcastData.signature;
}

/**
 * Transfers SPL tokens from a Qonjoint vault using two connected wallet sign functions
 * (Phantom as Key 1, Solflare as Key 2). Chain-signs: wallet1 signs first,
 * then wallet2 signs the partially-signed tx. Platform pays the fee.
 */
export async function transferSPLTokenWallets(
  pubkey1: string,
  pubkey2: string,
  signWithWallet1: (tx: Transaction) => Promise<Transaction>,
  signWithWallet2: (tx: Transaction) => Promise<Transaction>,
  multisigAddress: string,
  mintAddress: string,
  sourceTokenAccount: string,
  recipientAddress: string,
  amount: number,
  decimals: number
): Promise<string> {
  const multisigPubkey = new PublicKey(multisigAddress);
  const mintPubkey = new PublicKey(mintAddress);
  const recipientPubkey = new PublicKey(recipientAddress);
  const sourceATA = new PublicKey(sourceTokenAccount);
  const destATA = await getAssociatedTokenAddress(mintPubkey, recipientPubkey);
  const signer1Pubkey = new PublicKey(pubkey1);
  const signer2Pubkey = new PublicKey(pubkey2);

  const ppRes = await fetch("/api/qoin/platform-pubkey");
  const { publicKey: platformPubkeyStr } = await ppRes.json();
  const platformPubkey = new PublicKey(platformPubkeyStr);

  const bhRes = await fetch("/api/qoin/blockhash");
  const { blockhash } = await bhRes.json();

  const tx = new Transaction({ recentBlockhash: blockhash, feePayer: platformPubkey });

  const acctRes = await fetch(`/api/qoin/account?address=${destATA.toBase58()}`);
  const { exists } = await acctRes.json();
  if (!exists) {
    tx.add(
      createAssociatedTokenAccountInstruction(
        platformPubkey,
        destATA,
        recipientPubkey,
        mintPubkey
      )
    );
  }

  const rawAmount = BigInt(Math.round(amount * Math.pow(10, decimals)));
  tx.add(
    createTransferInstruction(
      sourceATA,
      destATA,
      multisigPubkey,
      rawAmount,
      [signer1Pubkey, signer2Pubkey],
      TOKEN_PROGRAM_ID
    )
  );

  const signedByWallet1 = await signWithWallet1(tx);
  const signedByBoth = await signWithWallet2(signedByWallet1);

  const rawTx = signedByBoth.serialize({ requireAllSignatures: false });

  const broadcastRes = await fetch("/api/qoin/broadcast", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transaction: Array.from(rawTx) }),
  });
  const broadcastData = await broadcastRes.json();
  if (!broadcastRes.ok) throw new Error(broadcastData.error || "Broadcast failed.");
  return broadcastData.signature;
}

export function explorerUrl(sig: string, _devnet: boolean): string {
  return `https://orbmarkets.io/tx/${sig}?tab=summary`;
}

export function explorerAddressUrl(address: string, _devnet: boolean): string {
  return `https://orbmarkets.io/address/${address}/history`;
}
