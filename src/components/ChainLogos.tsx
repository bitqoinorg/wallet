const SOL_LOGO = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
const ETH_LOGO = "/eth-logo.png";

interface ChainLogosProps {
  size?: number;
}

export function ChainLogos({ size = 36 }: ChainLogosProps) {
  const px = `${size}px`;
  const offset = Math.round(size * 0.55);
  return (
    <div className="relative flex-shrink-0 inline-flex" style={{ width: size + offset, height: px }}>
      {/* SOL: left/behind */}
      <img
        src={SOL_LOGO}
        alt="SOL"
        style={{ width: px, height: px, position: "absolute", left: 0, zIndex: 1 }}
        className="rounded-full object-cover"
      />
      {/* ETH: right/front */}
      <img
        src={ETH_LOGO}
        alt="ETH"
        style={{ width: px, height: px, position: "absolute", left: offset, zIndex: 2 }}
        className="rounded-full object-cover ring-2 ring-white"
      />
    </div>
  );
}
