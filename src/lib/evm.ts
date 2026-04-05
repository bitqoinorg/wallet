import { Wallet, TypedDataDomain, TypedDataField } from "ethers";

export function generateEvmKeypair(): { publicKey: string; privateKey: string } {
  const wallet = Wallet.createRandom();
  return {
    publicKey: wallet.address,
    privateKey: wallet.privateKey,
  };
}

export function isValidEvmPrivateKey(key: string): boolean {
  if (!key) return false;
  try {
    new Wallet(key.trim());
    return true;
  } catch {
    return false;
  }
}

export function evmAddressFromPrivateKey(privateKey: string): string {
  return new Wallet(privateKey.trim()).address;
}

export async function evmSignTypedData(
  privateKey: string,
  typedData: {
    domain: Record<string, unknown>;
    types: Record<string, Array<{ name: string; type: string }>>;
    message: Record<string, unknown>;
  },
): Promise<string> {
  const wallet = new Wallet(privateKey.trim());
  const { EIP712Domain: _ignored, ...types } = typedData.types as Record<
    string,
    Array<TypedDataField>
  >;
  return wallet.signTypedData(
    typedData.domain as TypedDataDomain,
    types,
    typedData.message,
  );
}
