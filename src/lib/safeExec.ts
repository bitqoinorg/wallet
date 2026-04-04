import { Interface, parseUnits } from "ethers";

export interface SafeTxData {
  to: string;
  value: string;
  data: string;
  operation: 0 | 1;
  safeTxGas: string;
  baseGas: string;
  gasPrice: string;
  gasToken: string;
  refundReceiver: string;
  nonce: string;
}

const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

export function buildSafeTx(opts: {
  to: string;
  value: bigint;
  data: string;
  nonce: string;
}): SafeTxData {
  return {
    to: opts.to,
    value: opts.value.toString(),
    data: opts.data,
    operation: 0,
    safeTxGas: "0",
    baseGas: "0",
    gasPrice: "0",
    gasToken: ZERO_ADDR,
    refundReceiver: ZERO_ADDR,
    nonce: opts.nonce,
  };
}

export function buildTypedData(
  safeAddress: string,
  chainId: number,
  tx: SafeTxData,
) {
  return {
    types: {
      EIP712Domain: [
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      SafeTx: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
        { name: "operation", type: "uint8" },
        { name: "safeTxGas", type: "uint256" },
        { name: "baseGas", type: "uint256" },
        { name: "gasPrice", type: "uint256" },
        { name: "gasToken", type: "address" },
        { name: "refundReceiver", type: "address" },
        { name: "nonce", type: "uint256" },
      ],
    },
    domain: { chainId, verifyingContract: safeAddress },
    primaryType: "SafeTx" as const,
    message: { ...tx },
  };
}

export function encodeERC20Transfer(recipient: string, amount: bigint): string {
  const iface = new Interface([
    "function transfer(address to, uint256 amount) returns (bool)",
  ]);
  return iface.encodeFunctionData("transfer", [recipient, amount]);
}

export function packSignatures(
  sig1: string,
  addr1: string,
  sig2: string,
  addr2: string,
): string {
  const [first, second] =
    addr1.toLowerCase() < addr2.toLowerCase()
      ? [sig1, sig2]
      : [sig2, sig1];
  return "0x" + first.replace("0x", "") + second.replace("0x", "");
}

export function encodeExecTransaction(
  tx: SafeTxData,
  packedSigs: string,
): string {
  const iface = new Interface([
    "function execTransaction(address to, uint256 value, bytes data, uint8 operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, bytes signatures) returns (bool)",
  ]);
  return iface.encodeFunctionData("execTransaction", [
    tx.to,
    tx.value,
    tx.data,
    tx.operation,
    tx.safeTxGas,
    tx.baseGas,
    tx.gasPrice,
    tx.gasToken,
    tx.refundReceiver,
    packedSigs,
  ]);
}

export function parseTokenAmount(amountStr: string, decimals: number): bigint {
  return parseUnits(amountStr.trim(), decimals);
}
