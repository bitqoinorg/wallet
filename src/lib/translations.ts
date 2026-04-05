export type Language = 'en' | 'ja' | 'zh' | 'de' | 'es' | 'ar';

export const LANGUAGES: { code: Language; label: string; name: string; rtl?: boolean }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ja', label: 'JA', name: '日本語' },
  { code: 'zh', label: 'ZH', name: '中文' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'ar', label: 'AR', name: 'العربية', rtl: true },
];

export interface FaqItem { q: string; a: string; }

export interface Translations {
  nav: {
    announcement: string;
    whyQoin: string; howItWorks: string; proof: string; faq: string;
    openQoin: string; createQoin: string;
    subWhy: { label: string; href: string }[];
    subHow: { label: string; href: string }[];
    subProof: { label: string; href: string }[];
  };
  hero: {
    line1: string; line2: string; line3: string;
    body: string; handwritten: string;
    ctaCreate: string; ctaOpen: string; ctaHow: string;
  };
  stats: {
    keysValue: string; keysLabel: string;
    clientValue: string; clientLabel: string;
    serversValue: string; serversLabel: string;
    enforcerValue: string; enforcerLabel: string;
  };
  proof: {
    badge: string; title: string; body: string;
    key1Title: string; key1Sub: string; pubKeyLabel: string;
    copyBtn: string; copiedBtn: string; copyKey: string;
    statsPublished: string; statsNeeded: string; statsYouHave: string;
    cannotMove: string;
    liveTitle: string; liveSub: string; fetchingRpc: string;
    solBalance: string; holdings: string; qoinjointLock: string;
    qoinAddress: string; verifyBtn: string; reloadBtn: string;
    vaultLabel: string; loading: string; refresh: string;
    viewExplorer: string; noTokens: string;
  };
  how: {
    badge: string; title: string; body: string;
    step1title: string; step1desc: string; step1note: string;
    step2title: string; step2desc: string; step2note: string;
    step3title: string; step3desc: string; step3note: string;
  };
  why: {
    badge: string; title: string;
    p1: string; p2: string; p3: string; handwritten: string;
    threat1Title: string; threat1Desc: string;
    threat2Title: string; threat2Desc: string;
    solutionTitle: string; solutionDesc: string;
  };
  faq: { badge: string; title: string; items: FaqItem[] };
  generate: {
    title: string; subtitle: string;
    step1: string; step2: string; step3: string; step4: string;
    pk1Label: string; pk2Label: string; pk1Sub: string; pk2Sub: string;
    generateBtn: string; activateBtn: string; activating: string;
    fundNote: string; successTitle: string; successSub: string;
    addressLabel: string; txLabel: string; openBtn: string;
    warningTitle: string; warningBody: string;
    confirmed: string; confirmLabel: string;
  };
  access: {
    enterKeys: string; pk1: string; pk2: string;
    openBtn: string; opening: string;
    receive: string; send: string;
    receiveTitle: string; receiveNote: string;
    sendTitle: string; recipientLabel: string; amountLabel: string;
    maxBtn: string; sendBtn: string; sending: string; signedBy: string;
    balanceLabel: string; copyAddr: string; copied: string;
    viewOrb: string; portfolio: string; totalValue: string;
    tokens: string; depositAddress: string; noBalance: string;
  };
  subpages: {
    problem: { badge: string; title: string; p1: string; p2: string; p3: string; handwritten: string; };
    solution: { badge: string; title: string; p1: string; p2: string; p3: string; handwritten: string; };
    quantum: { badge: string; title: string; p1: string; p2: string; p3: string; handwritten: string; };
    gettingStarted: { badge: string; title: string; p1: string; handwritten: string; };
    protocol: { badge: string; title: string; p1: string; p2: string; handwritten: string; };
    keyManagement: { badge: string; title: string; p1: string; p2: string; handwritten: string; };
    hackChallenge: { badge: string; title: string; body: string; };
    liveBalance: { badge: string; title: string; body: string; subtitle: string; };
    faqPage: { badge: string; title: string; subtitle: string; };
  };
  common: { darkMode: string; lightMode: string; };
}

const en: Translations = {
  nav: {
    announcement: 'Qonjoint protection. Both keys must sign. No server. No exceptions. Solana and Ethereum.',
    whyQoin: 'Why Qoin Shield', howItWorks: 'How it Works', proof: 'Proof', faq: 'FAQ',
    openQoin: 'Open Qoin Shield', createQoin: 'Create Qoin Shield',
    subWhy: [
      { label: 'The Problem', href: '/why/problem' },
      { label: 'The Solution', href: '/why/solution' },
      { label: 'Quantum Threat', href: '/why/quantum' },
    ],
    subHow: [
      { label: 'Getting Started', href: '/how/start' },
      { label: 'Qonjoint Protocol', href: '/how/protocol' },
      { label: 'Key Management', href: '/how/keys' },
    ],
    subProof: [
      { label: 'Hack Challenge', href: '/proof/challenge' },
      { label: 'Live Balance', href: '/proof/balance' },
    ],
  },
  hero: {
    line1: "The World's First", line2: 'Quantum-Resistant', line3: 'Shield for Your Coins',
    body: 'When people still store every memecoin, every ERC-20, every SPL token in a single wallet, one leaked private key and poof, gone forever. We said no thanks, and built Qoin Shield instead.',
    handwritten: 'Both keys must sign. No exceptions. Not negotiable. The math said so.',
    ctaCreate: 'Create Your Qoin Shield', ctaOpen: 'Open Your Qoin Shield', ctaHow: 'How it works',
  },
  stats: {
    keysValue: 'Multiple', keysLabel: 'Keys Required',
    clientValue: '100%', clientLabel: 'Client Side',
    serversValue: '0', serversLabel: 'Servers',
    enforcerValue: 'Math', enforcerLabel: 'The Enforcer',
  },
  proof: {
    badge: 'Proof of Qoin Shield', title: 'We Published One of Our Keys. Try It.',
    body: 'We built our own Qoin Shield as proof of concept. Both Qonjoint keys required to move a single token. Key 1 is public below. We have the other one. Go ahead and try.',
    key1Title: 'Key 1. Publicly Released.',
    key1Sub: 'This is one of the two Qonjoint keys registered to our proof-of-concept Qoin Shield.',
    pubKeyLabel: 'Public Key (Key 1)', copyBtn: 'Copy Key 1', copiedBtn: 'Key Copied. Good luck.',
    statsPublished: 'Keys Published', statsNeeded: 'Keys Needed to Move', statsYouHave: 'Keys You Have',
    cannotMove: 'You can sign with Key 1. You cannot move anything. The protocol rejects incomplete signatures. This is the point.',
    liveTitle: 'Live Qoin Shield Balance',
    liveSub: 'Verified live on-chain. No server. No middleware. Direct RPC call from your browser right now.',
    fetchingRpc: 'Fetching on-chain data...',
    solBalance: 'SOL Balance', holdings: 'bitQoin Holdings', qoinjointLock: 'Qonjoint Lock',
    qoinAddress: 'Qoin Shield address:', verifyBtn: 'Verify yourself on Orb', reloadBtn: 'Reload Balance',
    copyKey: 'Copy Key 1', vaultLabel: 'Live Qoin Shield Balance', loading: 'Loading...', refresh: 'Refresh',
    viewExplorer: 'View on Solana Explorer', noTokens: 'No tokens in this Qoin Shield yet.',
  },
  how: {
    badge: 'Three Steps', title: 'Protect Your Tokens in 60 Seconds',
    body: 'No account needed. No server. No third party. Cold keys or wallet connect. Solana and Ethereum.',
    step1title: 'Create Your Qoin Shield', step1desc: 'Deploy a dual-key Qoin Shield on Solana or Ethereum in under a minute. Keys are generated in your browser. Gas is covered by BITQ during beta. No account. No KYC.', step1note: 'One-time setup. Permanent on-chain.',
    step2title: 'Access Your Qoin Shield', step2desc: 'Open with cold keys by pasting private key strings locally, or connect your wallets. Phantom and Solflare on Solana. Two MetaMask accounts on EVM. Nothing reaches any server.', step2note: 'Cold keys or wallet connect. Your choice.',
    step3title: 'Both Keys Must Sign', step3desc: 'Every send needs Key 1 and Key 2 to authorize. Two approvals, one on-chain transaction. Swap between tokens in your Qoin Shield is coming soon.', step3note: 'Protocol-level enforcement. No exceptions.',
  },
  why: {
    badge: 'Single Key Risk', title: 'Your Current Wallet Has One Point of Failure',
    p1: 'Every single crypto wallet in existence works the same way: one private key controls everything. Lose it, get phished, get SIM-swapped, get quantum-attacked, and that\'s it. Game over.',
    p2: 'bitQoin\'s token protection requires multiple keys to authorize any movement. One key compromised? The tokens don\'t budge. The other keys still have to agree. They don\'t know each other. They don\'t communicate. The protocol simply rejects incomplete signatures.',
    p3: 'This is not software-level protection that can be patched or bypassed. This is enforced at the protocol layer. Not us. The blockchain.',
    handwritten: '"What if I lose a key?" Fair. Store them separately. Not the same hard drive.',
    threat1Title: 'Quantum Threat', threat1Desc: "Quantum computers running Shor's Algorithm can derive private keys from public keys. Every single-key wallet is eventually at risk. Multi-key protection means compromising one key achieves nothing.",
    threat2Title: 'Phishing and Social Engineering', threat2Desc: 'Most crypto losses are not from math failures. They are from humans being tricked into sharing their seed phrase. With split-key protection, even if an attacker gets one key, they still cannot move anything.',
    solutionTitle: 'bitQoin Solution', solutionDesc: 'Hold tokens protected by multiple independent keys. Each key knows nothing about the others. All of them must agree before a single token moves. The blockchain enforces this at runtime.',
  },
  faq: {
    badge: 'Common Questions', title: 'FAQ',
    items: [
      { q: 'What happens if I lose one key?', a: 'Your tokens are locked until all keys are present. This is a feature, not a bug. Store each key in a different physical location. Both are required. If you lose one permanently, the tokens are inaccessible. Plan accordingly.' },
      { q: 'Is this quantum-resistant?', a: "Multi-key protection means that even if a quantum computer derives one private key from its public key using Shor's Algorithm, it still cannot move anything. Both keys must sign. One compromised key achieves nothing." },
      { q: 'Do you have access to my tokens?', a: 'No. Keys are generated locally in your browser and never transmitted to any server. We have no access to your keys or your tokens. Zero.' },
      { q: 'What tokens can I protect?', a: 'Any SPL token on Solana, or any ERC-20 token on Ethereum. Memecoins, stablecoins, NFTs, anything. If it lives on-chain, it can be held in a Qoin Shield.' },
      { q: 'Do I need SOL for gas fees?', a: 'No. BITQ covers all gas fees during beta. Create and use your Qoin Shield for free, no SOL or ETH needed for transactions.' },
      { q: 'Can I use this on mobile?', a: 'Cold key mode works on any device with a modern browser. For wallet connect mode, you need Phantom and Solflare (Solana) or MetaMask (EVM) which are desktop browser extensions.' },
      { q: 'How do I access my Qoin Shield?', a: 'Go to Open Qoin Shield and enter your Qoin Shield address. Choose cold key mode by pasting your private key strings locally, or choose wallet connect mode. For Solana wallet connect, use Phantom for Key 1 and Solflare for Key 2. For EVM wallet connect, connect two separate MetaMask accounts.' },
      { q: 'What is cold key mode?', a: 'Paste your private key strings directly into the browser. They are used to sign transactions locally and never sent to any server. No browser extension required. Best for maximum-security or air-gapped setups.' },
      { q: 'What is wallet connect mode?', a: 'Connect your browser wallets instead of pasting keys. On Solana, Key 1 uses Phantom and Key 2 uses Solflare. On EVM, two separate MetaMask accounts serve as Key 1 and Key 2. Both wallets must approve each send.' },
      { q: 'Will swap be available?', a: 'Yes. Token swaps within your Qoin Shield are coming soon. Send and receive are live now on both Solana and EVM.' },
      { q: 'Do I need a browser extension?', a: 'Not for cold key mode, which works in any browser with no extensions. For wallet connect mode on Solana you need Phantom and Solflare. For EVM wallet connect you need MetaMask with two separate accounts.' },
    ],
  },
  generate: {
    title: 'Create Your Qoin Shield', subtitle: 'Generate Qonjoint keys and register your Qoin Shield on-chain. Both keys must sign every transaction. The math enforces it.',
    step1: 'Start', step2: 'Keys', step3: 'Activate', step4: 'Locked',
    pk1Label: 'KEY 1 PRIVATE KEY', pk2Label: 'KEY 2 PRIVATE KEY',
    pk1Sub: 'Generated locally. Never transmitted.', pk2Sub: 'Generated locally. Never transmitted.',
    generateBtn: 'Generate Both Keys', activateBtn: 'Activate Qonjoint Protection', activating: 'Activating...',
    fundNote: 'Gas fees covered by BITQ, no SOL or ETH needed from you.',
    successTitle: 'Qoin Shield Activated.', successSub: 'Your Qonjoint Qoin Shield is live on-chain.',
    addressLabel: 'Qoin Shield Address', txLabel: 'Activation Transaction', openBtn: 'Open Your Qoin Shield',
    warningTitle: 'Store Both Keys Safely', warningBody: 'If you lose either key, your tokens are permanently inaccessible. Store each key in a separate secure location.',
    confirmed: 'I have saved both keys in separate secure locations.',
    confirmLabel: 'Confirm you have saved your keys before activating.',
  },
  access: {
    enterKeys: 'Enter a Qonjoint Key', pk1: 'KEY 1 PRIVATE KEY', pk2: 'KEY 2 PRIVATE KEY',
    openBtn: 'Open Qoin Shield', opening: 'Opening...',
    receive: 'Receive', send: 'Send',
    receiveTitle: 'Receive', receiveNote: 'Send tokens to this address',
    sendTitle: 'Send', recipientLabel: 'RECIPIENT ADDRESS', amountLabel: 'AMOUNT',
    maxBtn: 'MAX', sendBtn: 'Send. Both Keys or Nothing.', sending: 'Signing and Broadcasting...', signedBy: 'Signed by Key 1 and Key 2. Both signatures verified on-chain.',
    balanceLabel: 'balance:', copyAddr: 'Copy', copied: 'Copied',
    viewOrb: 'View on Orb', portfolio: 'Portfolio', totalValue: 'Total Value',
    tokens: 'tokens', depositAddress: 'Deposit address', noBalance: 'No tokens found.',
  },
  subpages: {
    problem: {
      badge: 'Single Key Risk', title: 'Your Wallet Has One Point of Failure',
      p1: 'Every crypto wallet works the same: one private key controls everything. Lose it, get phished, get SIM-swapped, get hacked, and that is it. Game over. Your tokens are gone.',
      p2: 'This is not hypothetical. It happens constantly. Billions lost every year to seed phrase theft, exchange hacks, phishing attacks, and compromised devices. One key. One failure. Total loss.',
      p3: 'The existing model was never designed for the scale of value people store today. A single password protecting life savings. This is the problem Qoin Shield solves at the protocol level.',
      handwritten: 'One key. One failure. Game over.',
    },
    solution: {
      badge: 'The Qoin Shield Solution', title: 'Two Keys. One Protocol. Zero Compromise.',
      p1: 'Qoin Shield uses the Qonjoint protocol to require multiple independent keys for every transaction. No single key can move anything. The blockchain enforces this at runtime, not at the software level.',
      p2: 'Your keys are generated locally in your browser. They never touch a server. We never see them. You hold them separately. When you want to send tokens, both must sign. The blockchain verifies both. No exceptions.',
      p3: 'This is not a custodial service or a hardware wallet subscription. There is no company in the middle. It is math, enforced by the blockchain, running exactly as designed.',
      handwritten: 'Not software protection. Protocol protection.',
    },
    quantum: {
      badge: 'Quantum Threat', title: 'Quantum Computers Are Coming for Single Keys',
      p1: "Quantum computers running Shor's Algorithm can derive a private key from a public key. Every single-key wallet on earth will eventually be at risk. This is not science fiction. It is a matter of when.",
      p2: "With Qoin Shield's Qonjoint protection, compromising one key achieves nothing. Even if a quantum computer cracks Key 1, the tokens still cannot move. Key 2 must also sign. The attacker would need to crack both keys simultaneously.",
      p3: 'Split-key architecture is the most practical quantum-resistant approach available today. No special hardware required. No exotic cryptography. Just two independent keys and the math that requires both.',
      handwritten: 'Crack one key. Get nothing.',
    },
    gettingStarted: {
      badge: 'Getting Started', title: 'Up and Running in Under 60 Seconds',
      p1: 'Creating a Qoin Shield takes two steps: generate two keys locally in your browser, then activate Qonjoint protection on-chain. To access your Qoin Shield, use cold key mode by pasting your private key strings locally, or connect Phantom and Solflare on Solana, or two MetaMask accounts on EVM. Gas is covered. No account. No KYC.',
      handwritten: 'Your keys. Your tokens. Your math.',
    },
    protocol: {
      badge: 'Qonjoint Protocol', title: 'How the On-Chain Protection Works',
      p1: "Qonjoint supports Solana and Ethereum. When you create a Qoin, two public keys are registered on-chain as joint Qonjoint controllers. The protocol requires both corresponding private keys to sign every transaction. One signature is not enough. The transaction will be rejected.",
      p2: 'This enforcement happens at the protocol level, not in our code. Even if our entire frontend were compromised or shut down, your tokens would still require both keys to move. The math does not care about the UI. It runs on the blockchain.',
      handwritten: 'On-chain. Verifiable. Permanent.',
    },
    keyManagement: {
      badge: 'Key Management', title: 'How to Store Your Qonjoint Keys',
      p1: 'The security of your Qoin Shield depends entirely on where you store your keys. The point of having two keys is that no single location controls your funds. Key 1 and Key 2 must be stored in separate physical locations. Different devices. Different places.',
      p2: 'Recommended: write each key down on paper and store in separate secure locations. Hardware wallets, encrypted USB drives, and password managers are also valid options. The key rule: never store both keys in the same place.',
      handwritten: 'Two keys. Two places. Never together.',
    },
    hackChallenge: {
      badge: 'Hack Challenge', title: 'We Published One of Our Keys. Try It.',
      body: 'We built our own Qoin Shield as proof of concept and published Key 1 publicly. It is right here. You can copy it, import it, sign with it. You still cannot move a single token. Key 2 is required. The Qonjoint protocol rejects any transaction missing a signature from both keys.',
    },
    liveBalance: {
      badge: 'Live Balance', title: 'Real Tokens. Real Blockchain. No Middleware.',
      subtitle: 'Live on-chain. No server. No middleware.',
      body: 'The balance shown below is fetched directly from the blockchain via RPC. No server. No caching. No middleware. Your browser talks directly to the blockchain and reads what is there. This is how Qoin Shield works for your own wallet too.',
    },
    faqPage: {
      badge: 'Common Questions', title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about Qoin Shield, Qonjoint protection, and how it all works.',
    },
  },
  common: { darkMode: 'Dark mode', lightMode: 'Light mode' },
};

const ja: Translations = {
  nav: {
    announcement: 'Qonjoint保護。両方の鍵の署名が必須。サーバー不使用。例外なし。SolanaとEthereum対応。',
    whyQoin: 'なぜQoin Shield', howItWorks: '仕組み', proof: '証明', faq: 'よくある質問',
    openQoin: 'Qoin Shieldを開く', createQoin: 'Qoin Shieldを作成',
    subWhy: [
      { label: '問題点', href: '/why/problem' },
      { label: '解決策', href: '/why/solution' },
      { label: '量子の脅威', href: '/why/quantum' },
    ],
    subHow: [
      { label: 'はじめに', href: '/how/start' },
      { label: 'Qonjointプロトコル', href: '/how/protocol' },
      { label: '鍵の管理', href: '/how/keys' },
    ],
    subProof: [
      { label: 'ハックチャレンジ', href: '/proof/challenge' },
      { label: 'ライブ残高', href: '/proof/balance' },
    ],
  },
  hero: {
    line1: '世界初の', line2: '量子耐性', line3: 'コイン保護シールド',
    body: '今でも全てのミームコイン、SPLトークン、全資産を一つのウォレットに保存する人が多い。秘密鍵が一つ漏れたら、全て消える。私たちは断り、代わりにQoin Shieldを作った。',
    handwritten: '両方の鍵が必須。例外なし。交渉余地なし。数学がそう言っている。',
    ctaCreate: 'Qoin Shieldを作成', ctaOpen: 'Qoin Shieldを開く', ctaHow: '仕組みを見る',
  },
  stats: {
    keysValue: '複数', keysLabel: '必要な鍵',
    clientValue: '100%', clientLabel: 'クライアント側',
    serversValue: '0', serversLabel: 'サーバー',
    enforcerValue: '数学', enforcerLabel: '強制者',
  },
  proof: {
    badge: 'Qoin Shieldの証明', title: '私たちの鍵を公開しました。試してみてください。',
    body: '私たちは概念実証として自分たちのQoin Shieldを構築しました。1トークンを動かすには両方のQonjoint鍵が必要です。鍵1は以下に公開されています。もう一方は私たちが持っています。どうぞ試してみてください。',
    key1Title: '鍵1。公開済み。', key1Sub: 'これは概念実証Qoin Shieldに登録された2つのQonjoint鍵のうちの1つです。',
    pubKeyLabel: '公開鍵（鍵1）', copyBtn: '鍵1をコピー', copiedBtn: 'コピーしました。頑張ってください。',
    statsPublished: '公開された鍵', statsNeeded: '移動に必要な鍵', statsYouHave: 'あなたが持つ鍵',
    cannotMove: '鍵1で署名できます。しかし何も動かせません。プロトコルは不完全な署名を拒否します。これが要点です。',
    liveTitle: 'ライブQoin Shield残高', liveSub: 'オンチェーンで直接確認。サーバーなし。ミドルウェアなし。',
    fetchingRpc: 'オンチェーンデータを取得中...',
    solBalance: 'SOL残高', holdings: 'bitQoin保有量', qoinjointLock: 'Qonjointロック',
    qoinAddress: 'Qoin Shieldアドレス:', verifyBtn: 'Orbで確認する', reloadBtn: '残高を更新',
    copyKey: '鍵1をコピー', vaultLabel: 'ライブQoin Shield残高', loading: '読み込み中...', refresh: '更新',
    viewExplorer: 'Solanaエクスプローラーで確認', noTokens: 'このQoin Shieldにはまだトークンがありません。',
  },
  how: {
    badge: '3ステップ', title: '60秒でトークンを保護',
    body: 'アカウント不要。サーバーなし。第三者なし。コールドキーまたはウォレット接続。SolanaとEthereum対応。',
    step1title: 'Qoin Shieldを作成', step1desc: 'SolanaまたはEthereum上にデュアルキーQoin Shieldを1分以内にデプロイします。鍵はブラウザ内で生成。ベータ期間中はBITQがガス代を負担。アカウント不要。KYC不要。', step1note: '一回限りのセットアップ。オンチェーンに永続。',
    step2title: 'Qoin Shieldにアクセス', step2desc: 'コールドキーモード（秘密鍵をローカルで貼り付け）またはウォレット接続でQoin Shieldを開きます。SolanaはPhantomとSolflare。EVMは2つのMetaMaskアカウント。サーバーには何も届きません。', step2note: 'コールドキーまたはウォレット接続。あなたの選択。',
    step3title: '両方の鍵が署名必須', step3desc: 'すべての送金にKey 1とKey 2の承認が必要です。2つの承認、1つのオンチェーントランザクション。Qoin Shield内のトークンスワップは近日公開予定。', step3note: 'プロトコルレベルの強制。例外なし。',
  },
  why: {
    badge: '単一鍵のリスク', title: '現在のウォレットには1つの弱点があります',
    p1: '既存のすべての暗号通貨ウォレットは同じように機能します。1つの秘密鍵がすべてを支配します。失うか、フィッシングされるか、SIMスワップされるか、量子攻撃を受けたら終わりです。',
    p2: 'bitQoinのトークン保護は、あらゆる移動に複数の鍵の承認を必要とします。1つの鍵が侵害されても？トークンは動きません。プロトコルが不完全な署名を単純に拒否します。',
    p3: 'これはパッチ可能なソフトウェアレベルの保護ではありません。プロトコル層で強制されます。私たちではなく、ブロックチェーンが。',
    handwritten: '「鍵を失ったら？」もっともです。別々に保管してください。同じハードドライブには入れないこと。',
    threat1Title: '量子の脅威', threat1Desc: 'ショアのアルゴリズムを実行する量子コンピューターは公開鍵から秘密鍵を導出できます。すべての単一鍵ウォレットはいずれリスクに晒されます。',
    threat2Title: 'フィッシングとソーシャルエンジニアリング', threat2Desc: 'ほとんどの暗号資産損失は数学の失敗ではなく、人間がシードフレーズを共有するよう騙されることによります。分割鍵保護では、攻撃者が1つの鍵を取得しても何も動かせません。',
    solutionTitle: 'bitQoinの解決策', solutionDesc: '複数の独立した鍵で保護されたトークンを保有。各鍵は他の鍵について何も知りません。1トークンが動く前に全鍵が同意する必要があります。',
  },
  faq: {
    badge: 'よくある質問', title: 'よくある質問',
    items: [
      { q: '鍵を1つ失ったらどうなりますか？', a: '全ての鍵が揃うまでトークンはロックされます。これはバグではなく機能です。各鍵を異なる場所に保管してください。' },
      { q: '量子耐性はありますか？', a: '量子コンピューターが1つの秘密鍵を導出しても、何も動かせません。両方の鍵が必要です。1つの侵害では何も達成できません。' },
      { q: 'あなたたちはトークンにアクセスできますか？', a: 'いいえ。鍵はブラウザでローカルに生成され、サーバーに送信されることはありません。私たちはあなたの鍵にもトークンにもアクセスできません。' },
      { q: 'どのトークンを保護できますか？', a: 'SolanaのあらゆるSPLトークン、またはEthereumのERC-20トークン。ミームコイン、ステーブルコイン、NFT、何でも。オンチェーンにあれば、Qoin Shieldで保持できます。' },
      { q: 'ガス代は必要ですか？', a: 'いいえ。ベータ期間中、BITQが全ガス代を負担します。トランザクションのためのSOLもETHも不要です。' },
      { q: 'モバイルで使えますか？', a: 'はい。アプリは完全にブラウザベースです。モダンブラウザを持つ任意のデバイスで動作します。' },
    ],
  },
  generate: {
    title: 'Qoin Shieldを作成', subtitle: 'Qonjoint鍵を生成し、Qoin ShieldをオンチェーンにQonjoint登録します。すべての取引に両方の鍵の署名が必要です。',
    step1: '開始', step2: '鍵', step3: '有効化', step4: 'ロック済み',
    pk1Label: '鍵1 秘密鍵', pk2Label: '鍵2 秘密鍵',
    pk1Sub: 'ローカルで生成。送信されません。', pk2Sub: 'ローカルで生成。送信されません。',
    generateBtn: '両方の鍵を生成', activateBtn: 'Qonjoint保護を有効化', activating: '有効化中...',
    fundNote: 'ガス代はBITQが負担。SOLもETHも不要です。',
    successTitle: 'Qoin Shield有効化完了。', successSub: 'QonjointのQoin Shieldがオンチェーンで稼動しています。',
    addressLabel: 'Qoin Shieldアドレス', txLabel: '有効化トランザクション', openBtn: 'Qoin Shieldを開く',
    warningTitle: '両方の鍵を安全に保管', warningBody: 'いずれかの鍵を失うと、トークンは永久にアクセス不能になります。各鍵を別々の安全な場所に保管してください。',
    confirmed: '両方の鍵を別々の安全な場所に保存しました。', confirmLabel: '有効化前に鍵を保存したことを確認してください。',
  },
  access: {
    enterKeys: 'Qonjoint鍵を入力', pk1: '鍵1 秘密鍵', pk2: '鍵2 秘密鍵',
    openBtn: 'Qoin Shieldを開く', opening: '開いています...',
    receive: '受取', send: '送金',
    receiveTitle: '受取', receiveNote: 'このアドレスにトークンを送金してください',
    sendTitle: '送金', recipientLabel: '受取アドレス', amountLabel: '金額',
    maxBtn: '最大', sendBtn: '送金。両方の鍵か、なし。', sending: '署名してブロードキャスト中...',
    signedBy: '鍵1と鍵2が署名。両方の署名をオンチェーンで検証済み。',
    balanceLabel: '残高:', copyAddr: 'コピー', copied: 'コピー済み',
    viewOrb: 'Orbで表示', portfolio: 'ポートフォリオ', totalValue: '総価値',
    tokens: 'トークン', depositAddress: '入金アドレス', noBalance: 'トークンが見つかりません。',
  },
  subpages: {
    problem: { badge: '単一鍵のリスク', title: 'ウォレットには1つの弱点があります', p1: '全ての暗号通貨ウォレットは同じように機能します。1つの秘密鍵が全てを支配します。失うか、フィッシングされたら終わりです。', p2: 'これは仮定の話ではありません。毎年数十億ドルが失われています。1つの鍵、1つの失敗、全損失。', p3: '既存のモデルは今日の人々が保管する価値の規模に対応するよう設計されていませんでした。Qoin Shieldはこの問題をプロトコルレベルで解決します。', handwritten: '1つの鍵。1つの失敗。ゲームオーバー。' },
    solution: { badge: 'Qoin Shieldの解決策', title: '2つの鍵。1つのプロトコル。妥協なし。', p1: 'Qoin ShieldはQonjointプロトコルを使用し、すべての取引に複数の独立した鍵を要求します。単一の鍵は何も動かせません。', p2: '鍵はブラウザでローカルに生成されます。サーバーには触れません。私たちには見えません。', p3: '中間に会社は存在しません。ブロックチェーンによって強制される数学です。', handwritten: 'ソフトウェア保護ではなく、プロトコル保護。' },
    quantum: { badge: '量子の脅威', title: '量子コンピューターが単一鍵を狙っています', p1: 'ショアのアルゴリズムを実行する量子コンピューターは公開鍵から秘密鍵を導出できます。これはSFではありません。', p2: 'Qonjoint保護により、1つの鍵が侵害されても何も達成できません。両方の鍵が同時に必要です。', p3: '分割鍵アーキテクチャは、現在利用可能な最も実用的な量子耐性アプローチです。', handwritten: '1つの鍵を解読しても、何も得られない。' },
    gettingStarted: { badge: 'はじめに', title: '60秒以内に起動', p1: 'Qoin Shieldの作成は2ステップです。ブラウザでローカルに2つの鍵を生成し、オンチェーンでQonjoint保護を有効化します。Qoin Shieldへのアクセスには、コールドキーモード（秘密鍵を直接貼り付け）またはウォレット接続（SolanaはPhantom+Solflare、EVMは2つのMetaMaskアカウント）を使用します。ガス代無料。アカウント不要。KYC不要。', handwritten: 'あなたの鍵。あなたのトークン。あなたの数学。' },
    protocol: { badge: 'Qonjointプロトコル', title: 'オンチェーン保護の仕組み', p1: 'QonjointはSolanaとEthereumをサポートします。Qoin Shieldを作成すると、2つの公開鍵がオンチェーンにQonjointコントローラーとして登録されます。', p2: 'この強制はプロトコルレベルで発生します。フロントエンドが完全に侵害または停止されても、トークンを動かすには両方の鍵が必要です。', handwritten: 'オンチェーン。検証可能。永続的。' },
    keyManagement: { badge: '鍵の管理', title: 'Qonjoint鍵の保管方法', p1: 'Qoin Shieldのセキュリティはどこに鍵を保管するかにすべて依存します。鍵1と鍵2は別々の物理的な場所に保管する必要があります。', p2: '推奨：各鍵を紙に書き、別々の安全な場所に保管。同じ場所に両方を保管しないことが唯一のルールです。', handwritten: '2つの鍵。2つの場所。絶対に一緒にしない。' },
    hackChallenge: { badge: 'ハックチャレンジ', title: '私たちの鍵を公開しました。試してください。', body: '私たちは概念実証として鍵1を公開しました。コピーして、インポートして、署名することができます。しかし1トークンも動かせません。鍵2が必要です。' },
    liveBalance: { badge: 'ライブ残高', title: 'リアルトークン。リアルブロックチェーン。ミドルウェアなし。', subtitle: 'オンチェーンから直接。サーバーなし。ミドルウェアなし。', body: '以下の残高はRPC経由でブロックチェーンから直接取得されます。サーバーなし。キャッシュなし。ミドルウェアなし。' },
    faqPage: { badge: 'よくある質問', title: 'よくある質問', subtitle: 'Qoin Shield、Qonjoint保護、およびその仕組みについて知る必要があることすべて。' },
  },
  common: { darkMode: 'ダークモード', lightMode: 'ライトモード' },
};

const zh: Translations = {
  nav: {
    announcement: 'Qonjoint保护。两把密钥必须签名。无服务器。无例外。支持Solana和Ethereum。',
    whyQoin: '为什么选Qoin Shield', howItWorks: '工作原理', proof: '证明', faq: '常见问题',
    openQoin: '打开Qoin Shield', createQoin: '创建Qoin Shield',
    subWhy: [
      { label: '问题所在', href: '/why/problem' },
      { label: '解决方案', href: '/why/solution' },
      { label: '量子威胁', href: '/why/quantum' },
    ],
    subHow: [
      { label: '入门指南', href: '/how/start' },
      { label: 'Qonjoint协议', href: '/how/protocol' },
      { label: '密钥管理', href: '/how/keys' },
    ],
    subProof: [
      { label: '黑客挑战', href: '/proof/challenge' },
      { label: '实时余额', href: '/proof/balance' },
    ],
  },
  hero: {
    line1: '全球首个', line2: '量子防护', line3: '代币防护盾',
    body: '当人们仍将每一枚Meme币、每个SPL代币、所有资产存放在单一钱包中，一个泄露的私钥就能让一切化为乌有。我们拒绝这样做，并构建了Qoin Shield。',
    handwritten: '两把密钥都必须签名。无例外。不可谈判。数学说了算。',
    ctaCreate: '创建您的Qoin Shield', ctaOpen: '打开您的Qoin Shield', ctaHow: '了解工作原理',
  },
  stats: {
    keysValue: '多把', keysLabel: '所需密钥',
    clientValue: '100%', clientLabel: '客户端',
    serversValue: '0', serversLabel: '服务器',
    enforcerValue: '数学', enforcerLabel: '执行者',
  },
  proof: {
    badge: 'Qoin Shield证明', title: '我们公开了其中一把密钥。来试试吧。',
    body: '我们构建了自己的Qoin Shield作为概念验证。移动单个代币需要两个Qonjoint密钥。密钥1如下公开。我们持有另一把。请尝试。',
    key1Title: '密钥1。已公开发布。', key1Sub: '这是注册到我们概念验证Qoin Shield的两个Qonjoint密钥之一。',
    pubKeyLabel: '公钥（密钥1）', copyBtn: '复制密钥1', copiedBtn: '已复制。祝你好运。',
    statsPublished: '已发布密钥', statsNeeded: '移动所需密钥', statsYouHave: '您拥有的密钥',
    cannotMove: '您可以用密钥1签名。但您无法移动任何东西。协议拒绝不完整的签名。这就是重点。',
    liveTitle: '实时Qoin Shield余额', liveSub: '直接链上验证。无服务器。无中间件。',
    fetchingRpc: '链上数据获取中...',
    solBalance: 'SOL余额', holdings: 'bitQoin持仓', qoinjointLock: 'Qonjoint锁定',
    qoinAddress: 'Qoin Shield地址:', verifyBtn: '在Orb上自行验证', reloadBtn: '重新加载余额',
    copyKey: '复制密钥1', vaultLabel: '实时Qoin Shield余额', loading: '加载中...', refresh: '刷新',
    viewExplorer: '在Solana浏览器中查看', noTokens: '此Qoin Shield中尚无代币。',
  },
  how: {
    badge: '三个步骤', title: '60秒内保护您的代币',
    body: '无需账户。无需服务器。无第三方。冷钥匙或钱包连接。支持Solana和Ethereum。',
    step1title: '创建您的Qoin Shield', step1desc: '在Solana或Ethereum上一分钟内部署双密钥Qoin Shield。密钥在浏览器中生成。Beta期间BITQ承担Gas费用。无需账户。无需KYC。', step1note: '一次性设置。永久上链。',
    step2title: '访问您的Qoin Shield', step2desc: '使用冷钥匙模式（本地粘贴私钥字符串）或连接钱包打开Qoin Shield。Solana使用Phantom和Solflare。EVM使用两个MetaMask账户。任何信息都不会到达服务器。', step2note: '冷钥匙或钱包连接。您的选择。',
    step3title: '两把密钥必须签名', step3desc: '每次发送都需要Key 1和Key 2授权。两次确认，一笔链上交易。Qoin Shield内的代币兑换即将推出。', step3note: '协议级执行。无例外。',
  },
  why: {
    badge: '单密钥风险', title: '您当前的钱包有一个故障点',
    p1: '现存的每个加密货币钱包都以相同方式工作：一个私钥控制一切。丢失它、被网络钓鱼、被SIM卡交换、被量子攻击，就完了。游戏结束。',
    p2: 'bitQoin的代币保护需要多个密钥来授权任何移动。一个密钥被攻破？代币不动。其他密钥仍必须同意。协议只是拒绝不完整的签名。',
    p3: '这不是可以被修补或绕过的软件级保护。这是在协议层面强制执行的。不是我们。是区块链。',
    handwritten: '"如果我丢失了一把密钥怎么办？"合理。分开存储。不要在同一个硬盘上。',
    threat1Title: '量子威胁', threat1Desc: '运行Shor算法的量子计算机可以从公钥推导出私钥。每个单密钥钱包最终都面临风险。',
    threat2Title: '网络钓鱼和社会工程学', threat2Desc: '大多数加密资产损失不是来自数学失败，而是人类被骗分享助记词。通过分割密钥保护，即使攻击者获得一把密钥，仍然无法移动任何东西。',
    solutionTitle: 'bitQoin解决方案', solutionDesc: '持有受多个独立密钥保护的代币。每个密钥对其他密钥一无所知。所有密钥必须同意才能移动单个代币。',
  },
  faq: {
    badge: '常见问题', title: '常见问题',
    items: [
      { q: '如果我丢失了一把密钥会怎样？', a: '您的代币将被锁定，直到所有密钥都存在。这是功能而非缺陷。将每把密钥存放在不同的物理位置。' },
      { q: '这是量子防护的吗？', a: '即使量子计算机推导出一个私钥，也无法移动任何东西。两把密钥都必须签名。一把被攻破的密钥什么都做不到。' },
      { q: '你们能访问我的代币吗？', a: '不能。密钥在您的浏览器中本地生成，从不传输到任何服务器。我们无法访问您的密钥或代币。零。' },
      { q: '我可以保护哪些代币？', a: 'Solana上的任何SPL代币，或Ethereum上的ERC-20代币。Meme币、稳定币、NFT，任何东西。只要它在链上，就可以在Qoin Shield中持有。' },
      { q: '需要SOL支付Gas费吗？', a: '不需要。BITQ在测试期间承担所有Gas费用。无需持有SOL或ETH即可免费创建和使用Qoin Shield。' },
      { q: '可以在手机上使用吗？', a: '可以。该应用完全基于浏览器。任何具有现代浏览器的设备都可以使用。' },
    ],
  },
  generate: {
    title: '创建您的Qoin Shield', subtitle: '生成Qonjoint密钥并在链上注册您的Qoin Shield。每笔交易都需要两把密钥签名。数学强制执行。',
    step1: '开始', step2: '密钥', step3: '激活', step4: '已锁定',
    pk1Label: '密钥1 私钥', pk2Label: '密钥2 私钥',
    pk1Sub: '本地生成。从不传输。', pk2Sub: '本地生成。从不传输。',
    generateBtn: '生成两把密钥', activateBtn: '激活Qonjoint保护', activating: '激活中...',
    fundNote: 'Gas费由BITQ承担，无需SOL或ETH。',
    successTitle: 'Qoin Shield已激活。', successSub: '您的Qonjoint Qoin Shield已在链上运行。',
    addressLabel: 'Qoin Shield地址', txLabel: '激活交易', openBtn: '打开您的Qoin Shield',
    warningTitle: '安全保存两把密钥', warningBody: '如果您丢失任何一把密钥，您的代币将永久无法访问。将每把密钥存储在单独的安全位置。',
    confirmed: '我已将两把密钥保存在独立的安全位置。', confirmLabel: '激活前确认您已保存密钥。',
  },
  access: {
    enterKeys: '输入Qonjoint密钥', pk1: '密钥1 私钥', pk2: '密钥2 私钥',
    openBtn: '打开Qoin Shield', opening: '打开中...',
    receive: '接收', send: '发送',
    receiveTitle: '接收', receiveNote: '将代币发送到此地址',
    sendTitle: '发送', recipientLabel: '接收地址', amountLabel: '金额',
    maxBtn: '最大', sendBtn: '发送。两把密钥或什么都没有。', sending: '签名并广播中...',
    signedBy: '由密钥1和密钥2签名。两个签名均已在链上验证。',
    balanceLabel: '余额:', copyAddr: '复制', copied: '已复制',
    viewOrb: '在Orb上查看', portfolio: '投资组合', totalValue: '总价值',
    tokens: '代币', depositAddress: '充值地址', noBalance: '未找到代币。',
  },
  subpages: {
    problem: { badge: '单密钥风险', title: '您的钱包有一个故障点', p1: '每个加密货币钱包都以相同方式工作：一个私钥控制一切。丢失它就完了。', p2: '这不是假设。每年数十亿美元因私钥被盗而损失。一把密钥，一次失败，全部损失。', p3: '现有模型从未设计用于今天人们存储的价值规模。Qoin Shield在协议层面解决了这个问题。', handwritten: '一把密钥。一次失败。游戏结束。' },
    solution: { badge: 'Qoin Shield解决方案', title: '两把密钥。一个协议。零妥协。', p1: 'Qoin Shield使用Qonjoint协议要求每笔交易有多个独立密钥。没有任何单个密钥可以移动任何东西。', p2: '您的密钥在浏览器中本地生成。它们从不接触服务器。我们永远看不到它们。', p3: '中间没有公司。这是由区块链强制执行的数学。', handwritten: '不是软件保护。是协议保护。' },
    quantum: { badge: '量子威胁', title: '量子计算机正在瞄准单密钥', p1: '运行Shor算法的量子计算机可以从公钥推导出私钥。这不是科幻小说。', p2: '通过Qonjoint保护，攻击一把密钥什么都得不到。需要同时攻破两把密钥。', p3: '分割密钥架构是目前最实用的量子抗性方法。', handwritten: '破解一把密钥。一无所获。' },
    gettingStarted: { badge: '入门指南', title: '60秒内启动运行', p1: '创建Qoin Shield只需两步：在浏览器中本地生成两个密钥，然后在链上激活Qonjoint保护。访问Qoin Shield可使用冷钥匙模式（直接粘贴私钥）或连接钱包（Solana用Phantom和Solflare，EVM用两个MetaMask账户）。Gas费免费。无需账户。无需KYC。', handwritten: '您的密钥。您的代币。您的数学。' },
    protocol: { badge: 'Qonjoint协议', title: '链上保护如何运作', p1: 'Qonjoint支持Solana和Ethereum。当您创建Qoin Shield时，两个公钥在链上注册为Qonjoint联合控制者。', p2: '这种强制在协议层面发生。即使我们的前端被完全攻破，您的代币仍需要两把密钥才能移动。', handwritten: '链上。可验证。永久。' },
    keyManagement: { badge: '密钥管理', title: '如何存储您的Qonjoint密钥', p1: 'Qoin Shield的安全性完全取决于您在哪里存储密钥。密钥1和密钥2必须存储在不同的物理位置。', p2: '建议：将每把密钥写在纸上并存储在不同的安全位置。永远不要在同一个地方存储两把密钥。', handwritten: '两把密钥。两个地方。永不在一起。' },
    hackChallenge: { badge: '黑客挑战', title: '我们公开了其中一把密钥。来试试吧。', body: '我们公开发布了密钥1作为概念验证。您可以复制、导入、用它签名。但仍然无法移动任何代币。需要密钥2。' },
    liveBalance: { badge: '实时余额', title: '真实代币。真实区块链。无中间件。', subtitle: '直接来自链上。无服务器。无中间件。', body: '以下余额直接通过RPC从区块链获取。无服务器。无缓存。无中间件。' },
    faqPage: { badge: '常见问题', title: '常见问题', subtitle: '关于Qoin Shield、Qonjoint保护及其工作原理的一切您需要知道的信息。' },
  },
  common: { darkMode: '深色模式', lightMode: '浅色模式' },
};

const de: Translations = {
  nav: {
    announcement: 'Qonjoint-Schutz. Beide Schlüssel müssen signieren. Kein Server. Keine Ausnahmen. Solana und Ethereum.',
    whyQoin: 'Warum Qoin Shield', howItWorks: 'Wie es funktioniert', proof: 'Beweis', faq: 'FAQ',
    openQoin: 'Qoin Shield öffnen', createQoin: 'Qoin Shield erstellen',
    subWhy: [
      { label: 'Das Problem', href: '/why/problem' },
      { label: 'Die Lösung', href: '/why/solution' },
      { label: 'Quantenbedrohung', href: '/why/quantum' },
    ],
    subHow: [
      { label: 'Erste Schritte', href: '/how/start' },
      { label: 'Qonjoint-Protokoll', href: '/how/protocol' },
      { label: 'Schlüsselverwaltung', href: '/how/keys' },
    ],
    subProof: [
      { label: 'Hack-Challenge', href: '/proof/challenge' },
      { label: 'Live-Guthaben', href: '/proof/balance' },
    ],
  },
  hero: {
    line1: 'Der Erste weltweit', line2: 'Quantensicher', line3: 'Schutzschild für Deine Coins',
    body: 'Wenn Menschen noch immer jeden Memecoin, jeden SPL-Token, jedes Asset in einer einzigen Wallet speichern, reicht ein geleakter privater Schlüssel und poof, alles weg. Wir haben Nein gesagt und stattdessen Qoin Shield gebaut.',
    handwritten: 'Beide Schlüssel müssen signieren. Keine Ausnahmen. Nicht verhandelbar. Die Mathematik hat gesprochen.',
    ctaCreate: 'Dein Qoin Shield erstellen', ctaOpen: 'Dein Qoin Shield öffnen', ctaHow: 'So funktioniert es',
  },
  stats: {
    keysValue: 'Mehrere', keysLabel: 'Schlüssel erforderlich',
    clientValue: '100%', clientLabel: 'Client-seitig',
    serversValue: '0', serversLabel: 'Server',
    enforcerValue: 'Mathe', enforcerLabel: 'Der Vollstrecker',
  },
  proof: {
    badge: 'Beweis des Qoin Shield', title: 'Wir haben einen unserer Schlüssel veröffentlicht. Versuche es.',
    body: 'Wir haben unser eigenes Qoin Shield als Proof of Concept gebaut. Beide Qonjoint-Schlüssel sind zum Bewegen eines Tokens erforderlich. Schlüssel 1 ist unten öffentlich. Den anderen haben wir. Nur zu.',
    key1Title: 'Schlüssel 1. Öffentlich veröffentlicht.', key1Sub: 'Dies ist einer der zwei Qonjoint-Schlüssel, die in unserem Proof-of-Concept-Qoin Shield registriert sind.',
    pubKeyLabel: 'Öffentlicher Schlüssel (Schlüssel 1)', copyBtn: 'Schlüssel 1 kopieren', copiedBtn: 'Schlüssel kopiert. Viel Glück.',
    statsPublished: 'Veröffentlichte Schlüssel', statsNeeded: 'Zum Verschieben benötigte Schlüssel', statsYouHave: 'Schlüssel die du hast',
    cannotMove: 'Du kannst mit Schlüssel 1 signieren. Du kannst aber nichts bewegen. Das Protokoll lehnt unvollständige Signaturen ab.',
    liveTitle: 'Live Qoin Shield-Guthaben', liveSub: 'Direkt on-chain verifiziert. Kein Server. Keine Middleware.',
    fetchingRpc: 'On-chain-Daten abrufen...',
    solBalance: 'SOL-Guthaben', holdings: 'bitQoin-Bestand', qoinjointLock: 'Qonjoint-Sperre',
    qoinAddress: 'Qoin Shield-Adresse:', verifyBtn: 'Selbst auf Orb verifizieren', reloadBtn: 'Guthaben laden',
    copyKey: 'Schlüssel 1 kopieren', vaultLabel: 'Live-Qoin Shield-Guthaben', loading: 'Wird geladen...', refresh: 'Aktualisieren',
    viewExplorer: 'Im Solana Explorer anzeigen', noTokens: 'Noch keine Token in diesem Qoin Shield.',
  },
  how: {
    badge: 'Drei Schritte', title: 'Tokens in 60 Sekunden schützen',
    body: 'Kein Konto erforderlich. Kein Server. Kein Dritter. Cold Keys oder Wallet-Verbindung. Solana und Ethereum.',
    step1title: 'Qoin Shield erstellen', step1desc: 'Deploye ein Dual-Key-Qoin Shield auf Solana oder Ethereum in unter einer Minute. Schlüssel werden im Browser generiert. Gas wird während der Beta von BITQ übernommen. Kein Konto. Kein KYC.', step1note: 'Einmalige Einrichtung. Permanent on-chain.',
    step2title: 'Qoin Shield öffnen', step2desc: 'Öffne mit Cold Keys durch lokales Einfügen der privaten Schlüssel, oder verbinde deine Wallets. Phantom und Solflare für Solana. Zwei MetaMask-Konten für EVM. Nichts erreicht einen Server.', step2note: 'Cold Keys oder Wallet-Verbindung. Deine Wahl.',
    step3title: 'Beide Schlüssel müssen signieren', step3desc: 'Jede Übertragung braucht Key 1 und Key 2. Zwei Genehmigungen, eine on-chain Transaktion. Token-Tausch in deinem Qoin Shield kommt bald.', step3note: 'Protokoll-Ebene Durchsetzung. Keine Ausnahmen.',
  },
  why: {
    badge: 'Einzelschlüssel-Risiko', title: 'Deine aktuelle Wallet hat einen einzigen Ausfallpunkt',
    p1: 'Jede Krypto-Wallet funktioniert gleich: Ein privater Schlüssel kontrolliert alles. Verliere ihn, werde gephisht, SIM-geswapt, quantenangegriffen, und das war es. Game over.',
    p2: 'Der Token-Schutz von bitQoin erfordert mehrere Schlüssel für jede Bewegung. Ein Schlüssel kompromittiert? Die Tokens rühren sich nicht. Das Protokoll lehnt einfach unvollständige Signaturen ab.',
    p3: 'Dies ist kein Software-Schutz, der gepatcht oder umgangen werden kann. Er wird auf der Protokollebene durchgesetzt. Nicht von uns. Von der Blockchain.',
    handwritten: '"Was wenn ich einen Schlüssel verliere?" Fair. Separat aufbewahren. Nicht auf derselben Festplatte.',
    threat1Title: 'Quantenbedrohung', threat1Desc: 'Quantencomputer mit Shors Algorithmus können private Schlüssel aus öffentlichen Schlüsseln ableiten. Jede Einzelschlüssel-Wallet ist letztendlich gefährdet.',
    threat2Title: 'Phishing und Social Engineering', threat2Desc: 'Die meisten Krypto-Verluste entstehen nicht durch mathematische Fehler, sondern weil Menschen dazu gebracht werden, ihre Seed-Phrase zu teilen. Mit Schlüsselaufteilung kann ein Angreifer mit einem Schlüssel nichts bewegen.',
    solutionTitle: 'bitQoin-Lösung', solutionDesc: 'Tokens durch mehrere unabhängige Schlüssel geschützt halten. Jeder Schlüssel weiß nichts über die anderen. Alle müssen zustimmen, bevor ein Token bewegt wird.',
  },
  faq: {
    badge: 'Häufige Fragen', title: 'FAQ',
    items: [
      { q: 'Was passiert wenn ich einen Schlüssel verliere?', a: 'Deine Tokens sind gesperrt bis alle Schlüssel vorhanden sind. Das ist ein Feature, kein Bug. Bewahre jeden Schlüssel an einem anderen physischen Ort auf.' },
      { q: 'Ist das quantensicher?', a: 'Selbst wenn ein Quantencomputer einen privaten Schlüssel ableitet, kann er nichts bewegen. Beide Schlüssel müssen signieren. Ein kompromittierter Schlüssel erreicht nichts.' },
      { q: 'Habt ihr Zugriff auf meine Tokens?', a: 'Nein. Schlüssel werden lokal in deinem Browser generiert und nie an einen Server übertragen. Wir haben keinen Zugriff auf deine Schlüssel oder Tokens. Null.' },
      { q: 'Welche Tokens kann ich schützen?', a: 'Jeden SPL-Token auf Solana oder ERC-20-Token auf Ethereum. Memecoins, Stablecoins, NFTs, alles. Wenn es on-chain lebt, kann es in einem Qoin Shield gehalten werden.' },
      { q: 'Brauche ich SOL für Gasgebühren?', a: 'Nein. BITQ übernimmt alle Gasgebühren während der Beta. Erstelle und nutze deinen Qoin Shield kostenlos, kein SOL oder ETH für Transaktionen nötig.' },
      { q: 'Kann ich es auf dem Handy nutzen?', a: 'Ja. Die App ist vollständig browserbasiert. Jedes Gerät mit einem modernen Browser funktioniert.' },
    ],
  },
  generate: {
    title: 'Dein Qoin Shield erstellen', subtitle: 'Generiere Qonjoint-Schlüssel und registriere deinen Qoin Shield on-chain.',
    step1: 'Start', step2: 'Schlüssel', step3: 'Aktivieren', step4: 'Gesperrt',
    pk1Label: 'SCHLÜSSEL 1 PRIVATER SCHLÜSSEL', pk2Label: 'SCHLÜSSEL 2 PRIVATER SCHLÜSSEL',
    pk1Sub: 'Lokal generiert. Nie übertragen.', pk2Sub: 'Lokal generiert. Nie übertragen.',
    generateBtn: 'Beide Schlüssel generieren', activateBtn: 'Qonjoint-Schutz aktivieren', activating: 'Aktivierung...',
    fundNote: 'Gasgebühren von BITQ übernommen, kein SOL oder ETH nötig.',
    successTitle: 'Qoin Shield aktiviert.', successSub: 'Dein Qonjoint Qoin Shield ist on-chain live.',
    addressLabel: 'Qoin Shield-Adresse', txLabel: 'Aktivierungstransaktion', openBtn: 'Dein Qoin Shield öffnen',
    warningTitle: 'Beide Schlüssel sicher aufbewahren', warningBody: 'Wenn du einen Schlüssel verlierst, sind deine Tokens permanent unzugänglich.',
    confirmed: 'Ich habe beide Schlüssel an separaten sicheren Orten gespeichert.', confirmLabel: 'Bestätige, dass du deine Schlüssel gespeichert hast.',
  },
  access: {
    enterKeys: 'Qonjoint-Schlüssel eingeben', pk1: 'SCHLÜSSEL 1 PRIVATER SCHLÜSSEL', pk2: 'SCHLÜSSEL 2 PRIVATER SCHLÜSSEL',
    openBtn: 'Qoin Shield öffnen', opening: 'Öffne...',
    receive: 'Empfangen', send: 'Senden',
    receiveTitle: 'Empfangen', receiveNote: 'Tokens an diese Adresse senden',
    sendTitle: 'Senden', recipientLabel: 'EMPFÄNGERADRESSE', amountLabel: 'BETRAG',
    maxBtn: 'MAX', sendBtn: 'Senden. Beide Schlüssel oder nichts.', sending: 'Signiere und sende...',
    signedBy: 'Von Schlüssel 1 und Schlüssel 2 signiert. Beide Signaturen on-chain verifiziert.',
    balanceLabel: 'Guthaben:', copyAddr: 'Kopieren', copied: 'Kopiert',
    viewOrb: 'Auf Orb ansehen', portfolio: 'Portfolio', totalValue: 'Gesamtwert',
    tokens: 'Token', depositAddress: 'Einzahlungsadresse', noBalance: 'Keine Tokens gefunden.',
  },
  subpages: {
    problem: { badge: 'Einzelschlüssel-Risiko', title: 'Deine Wallet hat einen Ausfallpunkt', p1: 'Jede Krypto-Wallet funktioniert gleich: ein privater Schlüssel kontrolliert alles. Verliere ihn und das war es.', p2: 'Das ist nicht hypothetisch. Jedes Jahr gehen Milliarden durch Schlüsseldiebstahl verloren.', p3: 'Das bestehende Modell war nie für die Wertskala von heute ausgelegt. Qoin Shield löst das auf Protokollebene.', handwritten: 'Ein Schlüssel. Ein Fehler. Game over.' },
    solution: { badge: 'Die Qoin Shield-Lösung', title: 'Zwei Schlüssel. Ein Protokoll. Kein Kompromiss.', p1: 'Qoin Shield verwendet das Qonjoint-Protokoll und erfordert mehrere unabhängige Schlüssel für jede Transaktion. Kein einzelner Schlüssel kann etwas bewegen.', p2: 'Deine Schlüssel werden lokal in deinem Browser generiert. Sie berühren nie einen Server.', p3: 'Kein Unternehmen dazwischen. Es ist Mathematik, durchgesetzt von der Blockchain.', handwritten: 'Kein Software-Schutz. Protokoll-Schutz.' },
    quantum: { badge: 'Quantenbedrohung', title: 'Quantencomputer haben Einzelschlüssel im Visier', p1: 'Quantencomputer mit Shors Algorithmus können private Schlüssel ableiten. Das ist keine Science-Fiction.', p2: 'Mit Qonjoint-Schutz erreicht das Kompromittieren eines Schlüssels nichts. Beide müssen gleichzeitig geknackt werden.', p3: 'Split-Key-Architektur ist der praktischste quantenresistente Ansatz.', handwritten: 'Einen Schlüssel knacken. Nichts bekommen.' },
    gettingStarted: { badge: 'Erste Schritte', title: 'In unter 60 Sekunden einsatzbereit', p1: 'Ein Qoin Shield zu erstellen erfordert zwei Schritte: zwei Schlüssel lokal im Browser generieren, dann den Qonjoint-Schutz on-chain aktivieren. Zum Öffnen des Qoin Shield nutze Cold Keys durch lokales Einfügen der privaten Schlüssel, oder verbinde deine Wallets: Phantom und Solflare für Solana, zwei MetaMask-Konten für EVM. Gas kostenlos. Kein Konto. Kein KYC.', handwritten: 'Deine Schlüssel. Deine Tokens. Deine Mathematik.' },
    protocol: { badge: 'Qonjoint-Protokoll', title: 'Wie der On-Chain-Schutz funktioniert', p1: 'Qonjoint unterstützt Solana und Ethereum. Beim Erstellen eines Qoin Shield werden zwei öffentliche Schlüssel on-chain als gemeinsame Qonjoint-Controller registriert.', p2: 'Diese Durchsetzung findet auf Protokollebene statt. Selbst wenn unser Frontend kompromittiert wird, bleiben deine Tokens sicher.', handwritten: 'On-chain. Verifizierbar. Permanent.' },
    keyManagement: { badge: 'Schlüsselverwaltung', title: 'Wie du deine Qonjoint-Schlüssel aufbewahrst', p1: 'Die Sicherheit deines Qoin Shield hängt ganz davon ab, wo du deine Schlüssel aufbewahrst. Schlüssel 1 und Schlüssel 2 müssen an getrennten physischen Orten aufbewahrt werden.', p2: 'Empfohlen: Jeden Schlüssel auf Papier schreiben und an getrennten sicheren Orten aufbewahren. Niemals beide Schlüssel am selben Ort.', handwritten: 'Zwei Schlüssel. Zwei Orte. Niemals zusammen.' },
    hackChallenge: { badge: 'Hack-Challenge', title: 'Wir haben einen unserer Schlüssel veröffentlicht. Versuche es.', body: 'Wir haben Schlüssel 1 als Proof of Concept veröffentlicht. Du kannst ihn kopieren, importieren und damit signieren. Aber du kannst keinen einzigen Token bewegen. Schlüssel 2 ist erforderlich.' },
    liveBalance: { badge: 'Live-Guthaben', title: 'Echte Tokens. Echte Blockchain. Keine Middleware.', subtitle: 'Live on-chain. Kein Server. Keine Middleware.', body: 'Das unten gezeigte Guthaben wird direkt über RPC von der Blockchain abgerufen. Kein Server. Kein Cache. Keine Middleware.' },
    faqPage: { badge: 'Häufige Fragen', title: 'Häufig gestellte Fragen', subtitle: 'Alles, was du über Qoin Shield, Qonjoint-Schutz und wie es funktioniert wissen musst.' },
  },
  common: { darkMode: 'Dunkelmodus', lightMode: 'Hellmodus' },
};

const es: Translations = {
  nav: {
    announcement: 'Protección Qonjoint. Ambas claves deben firmar. Sin servidor. Sin excepciones. Solana y Ethereum.',
    whyQoin: 'Por qué Qoin Shield', howItWorks: 'Cómo funciona', proof: 'Prueba', faq: 'FAQ',
    openQoin: 'Abrir Qoin Shield', createQoin: 'Crear Qoin Shield',
    subWhy: [
      { label: 'El Problema', href: '/why/problem' },
      { label: 'La Solución', href: '/why/solution' },
      { label: 'Amenaza Cuántica', href: '/why/quantum' },
    ],
    subHow: [
      { label: 'Primeros Pasos', href: '/how/start' },
      { label: 'Protocolo Qonjoint', href: '/how/protocol' },
      { label: 'Gestión de Claves', href: '/how/keys' },
    ],
    subProof: [
      { label: 'Desafío de Hackeo', href: '/proof/challenge' },
      { label: 'Balance en Vivo', href: '/proof/balance' },
    ],
  },
  hero: {
    line1: 'El Primero en el Mundo', line2: 'Resistente al Quantum', line3: 'Escudo para tus Monedas',
    body: 'Cuando la gente todavía guarda cada memecoin, cada token SPL, cada activo en una sola wallet, una clave privada filtrada y puf, desaparecido para siempre. Dijimos que no, y construimos Qoin Shield.',
    handwritten: 'Ambas claves deben firmar. Sin excepciones. No negociable. Las matemáticas lo dijeron.',
    ctaCreate: 'Crear tu Qoin Shield', ctaOpen: 'Abrir tu Qoin Shield', ctaHow: 'Cómo funciona',
  },
  stats: {
    keysValue: 'Múltiples', keysLabel: 'Claves Requeridas',
    clientValue: '100%', clientLabel: 'Lado del Cliente',
    serversValue: '0', serversLabel: 'Servidores',
    enforcerValue: 'Matemáticas', enforcerLabel: 'El Garante',
  },
  proof: {
    badge: 'Prueba de Qoin Shield', title: 'Publicamos una de nuestras claves. Inténtalo.',
    body: 'Construimos nuestro propio Qoin Shield como prueba de concepto. Se necesitan ambas claves Qonjoint para mover un solo token. La Clave 1 está pública abajo. Tenemos la otra. Adelante, inténtalo.',
    key1Title: 'Clave 1. Publicada.', key1Sub: 'Esta es una de las dos claves Qonjoint registradas en nuestro Qoin Shield de prueba de concepto.',
    pubKeyLabel: 'Clave Pública (Clave 1)', copyBtn: 'Copiar Clave 1', copiedBtn: 'Clave Copiada. Buena suerte.',
    statsPublished: 'Claves Publicadas', statsNeeded: 'Claves Necesarias para Mover', statsYouHave: 'Claves que Tienes',
    cannotMove: 'Puedes firmar con la Clave 1. No puedes mover nada. El protocolo rechaza firmas incompletas.',
    liveTitle: 'Balance en Vivo de Qoin Shield', liveSub: 'Verificado en vivo on-chain. Sin servidor. Sin middleware.',
    fetchingRpc: 'Obteniendo datos on-chain...',
    solBalance: 'Balance SOL', holdings: 'Tenencias bitQoin', qoinjointLock: 'Bloqueo Qonjoint',
    qoinAddress: 'Dirección Qoin Shield:', verifyBtn: 'Verificar en Orb', reloadBtn: 'Recargar Balance',
    copyKey: 'Copiar Clave 1', vaultLabel: 'Saldo Qoin Shield en Vivo', loading: 'Cargando...', refresh: 'Actualizar',
    viewExplorer: 'Ver en Solana Explorer', noTokens: 'No hay tokens en este Qoin Shield aún.',
  },
  how: {
    badge: 'Tres Pasos', title: 'Protege tus Tokens en 60 Segundos',
    body: 'Sin cuenta. Sin servidor. Sin terceros. Claves frías o conexión de wallet. Solana y Ethereum.',
    step1title: 'Crea tu Qoin Shield', step1desc: 'Despliega un Qoin Shield de doble clave en Solana o Ethereum en menos de un minuto. Las claves se generan en tu navegador. El gas está cubierto por BITQ durante la beta. Sin cuenta. Sin KYC.', step1note: 'Configuración única. Permanente on-chain.',
    step2title: 'Accede a tu Qoin Shield', step2desc: 'Abre con claves frías pegando las cadenas de clave privada localmente, o conecta tus wallets. Phantom y Solflare en Solana. Dos cuentas MetaMask en EVM. Nada llega a ningún servidor.', step2note: 'Claves frías o conexión de wallet. Tu elección.',
    step3title: 'Ambas Claves Deben Firmar', step3desc: 'Cada envío necesita que Key 1 y Key 2 autoricen. Dos aprobaciones, una transacción on-chain. El intercambio de tokens en tu Qoin Shield llega pronto.', step3note: 'Aplicación a nivel de protocolo. Sin excepciones.',
  },
  why: {
    badge: 'Riesgo de Clave Única', title: 'Tu Wallet Actual Tiene un Único Punto de Falla',
    p1: 'Cada wallet de criptomonedas funciona igual: una clave privada controla todo. Piérdela, sufre phishing, intercambio de SIM, ataque cuántico, y eso es todo. Game over.',
    p2: 'La protección de tokens de bitQoin requiere múltiples claves para autorizar cualquier movimiento. ¿Una clave comprometida? Los tokens no se mueven. El protocolo simplemente rechaza firmas incompletas.',
    p3: 'No es una protección a nivel de software que pueda parchearse o eludirse. Se aplica en la capa del protocolo. No nosotros. La blockchain.',
    handwritten: '"¿Y si pierdo una clave?" Justo. Guárdalas por separado. No en el mismo disco duro.',
    threat1Title: 'Amenaza Cuántica', threat1Desc: 'Las computadoras cuánticas ejecutando el Algoritmo de Shor pueden derivar claves privadas de claves públicas. Cada wallet de clave única está eventualmente en riesgo.',
    threat2Title: 'Phishing e Ingeniería Social', threat2Desc: 'La mayoría de las pérdidas de criptomonedas no son por fallas matemáticas. Son por humanos engañados para compartir su frase semilla. Con protección de clave dividida, incluso si un atacante obtiene una clave, aún no puede mover nada.',
    solutionTitle: 'Solución bitQoin', solutionDesc: 'Mantén tokens protegidos por múltiples claves independientes. Cada clave no sabe nada de las otras. Todas deben acordar antes de que se mueva un token.',
  },
  faq: {
    badge: 'Preguntas Frecuentes', title: 'FAQ',
    items: [
      { q: '¿Qué pasa si pierdo una clave?', a: 'Tus tokens están bloqueados hasta que estén todas las claves presentes. Esto es una característica, no un error. Guarda cada clave en un lugar físico diferente.' },
      { q: '¿Es resistente al quantum?', a: 'Incluso si una computadora cuántica deriva una clave privada, no puede mover nada. Ambas claves deben firmar. Una clave comprometida no logra nada.' },
      { q: '¿Tienen acceso a mis tokens?', a: 'No. Las claves se generan localmente en tu navegador y nunca se transmiten a ningún servidor. No tenemos acceso a tus claves ni tokens. Cero.' },
      { q: '¿Qué tokens puedo proteger?', a: 'Cualquier token SPL en Solana, o token ERC-20 en Ethereum. Memecoins, stablecoins, NFTs, cualquier cosa. Si vive on-chain, puede guardarse en un Qoin Shield.' },
      { q: '¿Necesito SOL para las tarifas de gas?', a: 'No. BITQ cubre todas las tarifas de gas durante la beta. Crea y usa tu Qoin Shield gratis, no necesitas SOL ni ETH para las transacciones.' },
      { q: '¿Puedo usarlo en móvil?', a: 'Sí. La app es completamente basada en navegador. Cualquier dispositivo con un navegador moderno funciona.' },
    ],
  },
  generate: {
    title: 'Crear tu Qoin Shield', subtitle: 'Genera claves Qonjoint y registra tu Qoin Shield on-chain.',
    step1: 'Inicio', step2: 'Claves', step3: 'Activar', step4: 'Bloqueado',
    pk1Label: 'CLAVE 1 CLAVE PRIVADA', pk2Label: 'CLAVE 2 CLAVE PRIVADA',
    pk1Sub: 'Generada localmente. Nunca transmitida.', pk2Sub: 'Generada localmente. Nunca transmitida.',
    generateBtn: 'Generar Ambas Claves', activateBtn: 'Activar Protección Qonjoint', activating: 'Activando...',
    fundNote: 'Tarifas de gas cubiertas por BITQ, no necesitas SOL ni ETH.',
    successTitle: 'Qoin Shield Activado.', successSub: 'Tu Qoin Shield Qonjoint está en vivo on-chain.',
    addressLabel: 'Dirección Qoin Shield', txLabel: 'Transacción de Activación', openBtn: 'Abrir tu Qoin Shield',
    warningTitle: 'Guarda Ambas Claves de Forma Segura', warningBody: 'Si pierdes alguna clave, tus tokens son permanentemente inaccesibles.',
    confirmed: 'He guardado ambas claves en ubicaciones seguras separadas.', confirmLabel: 'Confirma que guardaste tus claves antes de activar.',
  },
  access: {
    enterKeys: 'Ingresa una Clave Qonjoint', pk1: 'CLAVE 1 CLAVE PRIVADA', pk2: 'CLAVE 2 CLAVE PRIVADA',
    openBtn: 'Abrir Qoin Shield', opening: 'Abriendo...',
    receive: 'Recibir', send: 'Enviar',
    receiveTitle: 'Recibir', receiveNote: 'Enviar tokens a esta dirección',
    sendTitle: 'Enviar', recipientLabel: 'DIRECCIÓN DESTINATARIA', amountLabel: 'CANTIDAD',
    maxBtn: 'MAX', sendBtn: 'Enviar. Ambas Claves o Nada.', sending: 'Firmando y difundiendo...',
    signedBy: 'Firmado por Clave 1 y Clave 2. Ambas firmas verificadas on-chain.',
    balanceLabel: 'balance:', copyAddr: 'Copiar', copied: 'Copiado',
    viewOrb: 'Ver en Orb', portfolio: 'Portafolio', totalValue: 'Valor Total',
    tokens: 'tokens', depositAddress: 'Dirección de depósito', noBalance: 'No se encontraron tokens.',
  },
  subpages: {
    problem: { badge: 'Riesgo de Clave Única', title: 'Tu Wallet Tiene un Único Punto de Falla', p1: 'Cada wallet de criptomonedas funciona igual: una clave privada controla todo. Piérdela y game over.', p2: 'No es hipotético. Miles de millones se pierden cada año por robo de claves.', p3: 'El modelo existente nunca fue diseñado para la escala de valor que la gente almacena hoy. Qoin Shield resuelve esto a nivel de protocolo.', handwritten: 'Una clave. Un fallo. Game over.' },
    solution: { badge: 'La Solución Qoin Shield', title: 'Dos Claves. Un Protocolo. Cero Compromisos.', p1: 'Qoin Shield usa el protocolo Qonjoint para requerir múltiples claves independientes en cada transacción. Ninguna clave única puede mover nada.', p2: 'Tus claves se generan localmente en tu navegador. Nunca tocan un servidor.', p3: 'No hay empresa en el medio. Es matemática, aplicada por la blockchain.', handwritten: 'No es protección de software. Es protección de protocolo.' },
    quantum: { badge: 'Amenaza Cuántica', title: 'Las Computadoras Cuánticas van por las Claves Únicas', p1: 'Las computadoras cuánticas con el Algoritmo de Shor pueden derivar claves privadas. Esto no es ciencia ficción.', p2: 'Con la protección Qonjoint, comprometer una clave no logra nada. Se necesitan ambas simultáneamente.', p3: 'La arquitectura de clave dividida es el enfoque más práctico disponible hoy.', handwritten: 'Romper una clave. No obtener nada.' },
    gettingStarted: { badge: 'Primeros Pasos', title: 'En Marcha en Menos de 60 Segundos', p1: 'Crear un Qoin Shield requiere dos pasos: generar dos claves localmente en tu navegador, luego activar la protección Qonjoint on-chain. Para acceder a tu Qoin Shield, usa claves frías pegando las cadenas de clave privada localmente, o conecta Phantom y Solflare en Solana, o dos cuentas MetaMask en EVM. Gas cubierto. Sin cuenta. Sin KYC.', handwritten: 'Tus claves. Tus tokens. Tus matemáticas.' },
    protocol: { badge: 'Protocolo Qonjoint', title: 'Cómo Funciona la Protección On-Chain', p1: 'Qonjoint soporta Solana y Ethereum. Al crear un Qoin Shield, dos claves públicas se registran on-chain como controladores Qonjoint conjuntos.', p2: 'Esta aplicación ocurre a nivel de protocolo. Incluso si nuestro frontend fuera comprometido, tus tokens aún requieren ambas claves para moverse.', handwritten: 'On-chain. Verificable. Permanente.' },
    keyManagement: { badge: 'Gestión de Claves', title: 'Cómo Guardar tus Claves Qonjoint', p1: 'La seguridad de tu Qoin Shield depende completamente de dónde guardes tus claves. La Clave 1 y la Clave 2 deben guardarse en ubicaciones físicas separadas.', p2: 'Recomendado: escribe cada clave en papel y guárdala en ubicaciones seguras separadas. Nunca guardes ambas claves en el mismo lugar.', handwritten: 'Dos claves. Dos lugares. Nunca juntas.' },
    hackChallenge: { badge: 'Desafío de Hackeo', title: 'Publicamos una de nuestras claves. Inténtalo.', body: 'Publicamos la Clave 1 como prueba de concepto. Puedes copiarla, importarla, firmar con ella. Aún no puedes mover un solo token. Se requiere la Clave 2.' },
    liveBalance: { badge: 'Balance en Vivo', title: 'Tokens Reales. Blockchain Real. Sin Middleware.', subtitle: 'En vivo on-chain. Sin servidor. Sin middleware.', body: 'El balance mostrado abajo se obtiene directamente de la blockchain via RPC. Sin servidor. Sin caché. Sin middleware.' },
    faqPage: { badge: 'Preguntas Frecuentes', title: 'Preguntas Frecuentes', subtitle: 'Todo lo que necesitas saber sobre Qoin Shield, la protección Qonjoint y cómo funciona.' },
  },
  common: { darkMode: 'Modo oscuro', lightMode: 'Modo claro' },
};

const ar: Translations = {
  nav: {
    announcement: 'حماية Qonjoint. كلا المفتاحين يجب أن يوقعا. لا خادم. لا استثناءات. يدعم Solana وEthereum.',
    whyQoin: 'لماذا Qoin Shield', howItWorks: 'كيف يعمل', proof: 'الإثبات', faq: 'الأسئلة الشائعة',
    openQoin: 'فتح Qoin Shield', createQoin: 'إنشاء Qoin Shield',
    subWhy: [
      { label: 'المشكلة', href: '/why/problem' },
      { label: 'الحل', href: '/why/solution' },
      { label: 'التهديد الكمي', href: '/why/quantum' },
    ],
    subHow: [
      { label: 'البداية', href: '/how/start' },
      { label: 'بروتوكول Qonjoint', href: '/how/protocol' },
      { label: 'إدارة المفاتيح', href: '/how/keys' },
    ],
    subProof: [
      { label: 'تحدي الاختراق', href: '/proof/challenge' },
      { label: 'الرصيد المباشر', href: '/proof/balance' },
    ],
  },
  hero: {
    line1: 'الأول في العالم', line2: 'مقاوم للكم', line3: 'درع لعملاتك',
    body: 'عندما لا يزال الناس يخزنون كل عملة ميمية، وكل رمز SPL، وكل أصل في محفظة واحدة، فإن تسريب مفتاح خاص واحد يكفي ليختفي كل شيء إلى الأبد. قلنا لا شكرا، وبنينا Qoin Shield عوضا عن ذلك.',
    handwritten: 'كلا المفتاحين يجب أن يوقعا. لا استثناءات. غير قابل للتفاوض. الرياضيات قالت ذلك.',
    ctaCreate: 'إنشاء Qoin Shield الخاص بك', ctaOpen: 'فتح Qoin Shield الخاص بك', ctaHow: 'كيف يعمل',
  },
  stats: {
    keysValue: 'متعددة', keysLabel: 'المفاتيح المطلوبة',
    clientValue: '100%', clientLabel: 'جانب العميل',
    serversValue: '0', serversLabel: 'الخوادم',
    enforcerValue: 'الرياضيات', enforcerLabel: 'المنفذ',
  },
  proof: {
    badge: 'إثبات Qoin Shield', title: 'نشرنا أحد مفاتيحنا. جربه.',
    body: 'بنينا Qoin Shield الخاص بنا كإثبات مفهوم. يلزم كلا مفتاحي Qonjoint لنقل أي رمز. المفتاح 1 منشور أدناه. لدينا الآخر. تفضل وجرب.',
    key1Title: 'المفتاح 1. تم نشره علنا.', key1Sub: 'هذا أحد مفتاحي Qonjoint المسجلين في Qoin Shield الإثبات الخاص بنا.',
    pubKeyLabel: 'المفتاح العام (المفتاح 1)', copyBtn: 'نسخ المفتاح 1', copiedBtn: 'تم نسخ المفتاح. حظا سعيدا.',
    statsPublished: 'المفاتيح المنشورة', statsNeeded: 'المفاتيح اللازمة للنقل', statsYouHave: 'المفاتيح التي لديك',
    cannotMove: 'يمكنك التوقيع بالمفتاح 1. لا يمكنك نقل أي شيء. البروتوكول يرفض التوقيعات غير المكتملة.',
    liveTitle: 'رصيد Qoin Shield المباشر', liveSub: 'تم التحقق مباشرة on-chain. لا خادم. لا وسيط.',
    fetchingRpc: 'جارٍ جلب البيانات on-chain...',
    solBalance: 'رصيد SOL', holdings: 'حيازات bitQoin', qoinjointLock: 'قفل Qonjoint',
    qoinAddress: 'عنوان Qoin Shield:', verifyBtn: 'تحقق بنفسك على Orb', reloadBtn: 'إعادة تحميل الرصيد',
    copyKey: 'نسخ المفتاح 1', vaultLabel: 'رصيد Qoin Shield المباشر', loading: 'جارٍ التحميل...', refresh: 'تحديث',
    viewExplorer: 'عرض في Solana Explorer', noTokens: 'لا توجد رموز في هذا Qoin Shield بعد.',
  },
  how: {
    badge: 'ثلاث خطوات', title: 'احمِ رموزك في 60 ثانية',
    body: 'لا حاجة لحساب. لا خادم. لا طرف ثالث. مفاتيح باردة أو اتصال بالمحفظة. Solana وEthereum.',
    step1title: 'إنشاء Qoin Shield الخاص بك', step1desc: 'انشر Qoin Shield ثنائي المفاتيح على Solana أو Ethereum في أقل من دقيقة. المفاتيح تُولَّد في متصفحك. BITQ يغطي رسوم الغاز خلال البيتا. بلا حساب. بلا KYC.', step1note: 'إعداد لمرة واحدة. دائم على السلسلة.',
    step2title: 'الوصول إلى Qoin Shield الخاص بك', step2desc: 'افتح باستخدام المفاتيح الباردة بلصق سلاسل المفاتيح الخاصة محليا، أو اتصل بمحافظك. Phantom وSolflare لـSolana. حسابان MetaMask لـEVM. لا شيء يصل إلى أي خادم.', step2note: 'مفاتيح باردة أو اتصال بالمحفظة. اختيارك.',
    step3title: 'يجب أن يوقع كلا المفتاحين', step3desc: 'كل إرسال يحتاج Key 1 وKey 2 للتفويض. موافقتان، معاملة واحدة على السلسلة. تبادل الرموز في Qoin Shield قادم قريبا.', step3note: 'تطبيق على مستوى البروتوكول. لا استثناءات.',
  },
  why: {
    badge: 'خطر المفتاح الواحد', title: 'محفظتك الحالية لديها نقطة فشل واحدة',
    p1: 'كل محفظة عملات مشفرة موجودة تعمل بنفس الطريقة: مفتاح خاص واحد يتحكم في كل شيء. فقده، أو التعرض للتصيد، أو مبادلة SIM، أو الهجوم الكمي، وانتهى الأمر.',
    p2: 'تتطلب حماية رموز bitQoin مفاتيح متعددة لتفويض أي حركة. مفتاح واحد مخترق؟ الرموز لا تتحرك. البروتوكول ببساطة يرفض التوقيعات غير المكتملة.',
    p3: 'هذه ليست حماية على مستوى البرنامج يمكن تصحيحها أو تجاوزها. يتم تطبيقها على طبقة البروتوكول. ليس نحن. البلوكشين.',
    handwritten: '"ماذا لو فقدت مفتاحا؟" معقول. خزنهما بشكل منفصل. ليس على نفس القرص الصلب.',
    threat1Title: 'التهديد الكمي', threat1Desc: 'يمكن لأجهزة الكمبيوتر الكمية التي تعمل بخوارزمية Shor اشتقاق المفاتيح الخاصة من المفاتيح العامة. كل محفظة بمفتاح واحد معرضة للخطر في نهاية المطاف.',
    threat2Title: 'التصيد والهندسة الاجتماعية', threat2Desc: 'معظم خسائر العملات المشفرة ليست من فشل الرياضيات. إنها من البشر الذين يُخدعون لمشاركة عبارة المصدر. مع حماية المفتاح المقسم، حتى لو حصل المهاجم على مفتاح، فلا يزال لا يمكنه نقل أي شيء.',
    solutionTitle: 'حل bitQoin', solutionDesc: 'احتفظ برموز محمية بمفاتيح مستقلة متعددة. كل مفتاح لا يعرف شيئا عن الآخرين. يجب أن يوافق الجميع قبل أن يتحرك رمز واحد.',
  },
  faq: {
    badge: 'أسئلة شائعة', title: 'الأسئلة الشائعة',
    items: [
      { q: 'ماذا يحدث إذا فقدت مفتاحا واحدا؟', a: 'رموزك مقفلة حتى تكون جميع المفاتيح موجودة. هذه ميزة وليس خللا. خزن كل مفتاح في موقع مادي مختلف.' },
      { q: 'هل هذا مقاوم للكم؟', a: 'حتى لو اشتق كمبيوتر كمي مفتاحا خاصا، لا يمكنه نقل أي شيء. كلا المفتاحين يجب أن يوقعا. مفتاح واحد مخترق لا يحقق شيئا.' },
      { q: 'هل لديكم وصول إلى رموزي؟', a: 'لا. المفاتيح تُولد محليا في متصفحك ولا تُرسل أبدا إلى أي خادم. ليس لدينا وصول إلى مفاتيحك أو رموزك. صفر.' },
      { q: 'ما الرموز التي يمكنني حمايتها؟', a: 'أي رمز SPL على Solana، أو ERC-20 على Ethereum. عملات الميم، العملات المستقرة، NFTs، أي شيء. إذا كان يعيش on-chain، يمكن الاحتفاظ به في Qoin Shield.' },
      { q: 'هل أحتاج SOL لرسوم الغاز؟', a: 'لا. BITQ يغطي جميع رسوم الغاز خلال الفترة التجريبية. أنشئ واستخدم Qoin Shield مجانا، لا تحتاج SOL ولا ETH للمعاملات.' },
      { q: 'هل يمكنني استخدامه على الجوال؟', a: 'نعم. التطبيق مبني بالكامل على المتصفح. أي جهاز بمتصفح حديث يعمل.' },
    ],
  },
  generate: {
    title: 'إنشاء Qoin Shield الخاص بك', subtitle: 'أنشئ مفاتيح Qonjoint وسجل Qoin Shield الخاص بك on-chain.',
    step1: 'البدء', step2: 'المفاتيح', step3: 'التفعيل', step4: 'مقفل',
    pk1Label: 'المفتاح 1 المفتاح الخاص', pk2Label: 'المفتاح 2 المفتاح الخاص',
    pk1Sub: 'تم التوليد محليا. لا يُرسل أبدا.', pk2Sub: 'تم التوليد محليا. لا يُرسل أبدا.',
    generateBtn: 'توليد كلا المفتاحين', activateBtn: 'تفعيل حماية Qonjoint', activating: 'جارٍ التفعيل...',
    fundNote: 'رسوم الغاز مغطاة من BITQ، لا تحتاج إلى SOL أو ETH.',
    successTitle: 'تم تفعيل Qoin Shield.', successSub: 'Qoin Shield Qonjoint الخاص بك يعمل الآن on-chain.',
    addressLabel: 'عنوان Qoin Shield', txLabel: 'معاملة التفعيل', openBtn: 'فتح Qoin Shield الخاص بك',
    warningTitle: 'خزن كلا المفتاحين بأمان', warningBody: 'إذا فقدت أي مفتاح، رموزك تصبح غير قابلة للوصول بشكل دائم.',
    confirmed: 'لقد خزنت كلا المفتاحين في مواقع آمنة منفصلة.', confirmLabel: 'تأكيد أنك خزنت مفاتيحك قبل التفعيل.',
  },
  access: {
    enterKeys: 'أدخل مفتاح Qonjoint', pk1: 'المفتاح 1 المفتاح الخاص', pk2: 'المفتاح 2 المفتاح الخاص',
    openBtn: 'فتح Qoin Shield', opening: 'جارٍ الفتح...',
    receive: 'استقبال', send: 'إرسال',
    receiveTitle: 'استقبال', receiveNote: 'أرسل الرموز إلى هذا العنوان',
    sendTitle: 'إرسال', recipientLabel: 'عنوان المستقبل', amountLabel: 'المبلغ',
    maxBtn: 'الحد الأقصى', sendBtn: 'إرسال. كلا المفتاحين أو لا شيء.', sending: 'جارٍ التوقيع والبث...',
    signedBy: 'موقع من المفتاح 1 والمفتاح 2. كلا التوقيعين تم التحقق منهما on-chain.',
    balanceLabel: 'الرصيد:', copyAddr: 'نسخ', copied: 'تم النسخ',
    viewOrb: 'عرض على Orb', portfolio: 'المحفظة', totalValue: 'القيمة الإجمالية',
    tokens: 'الرموز', depositAddress: 'عنوان الإيداع', noBalance: 'لم يتم العثور على رموز.',
  },
  subpages: {
    problem: { badge: 'خطر المفتاح الواحد', title: 'محفظتك لديها نقطة فشل واحدة', p1: 'كل محفظة عملات مشفرة تعمل بنفس الطريقة: مفتاح خاص واحد يتحكم في كل شيء. فقده وانتهى الأمر.', p2: 'هذا ليس افتراضيا. مليارات تُفقد كل عام بسبب سرقة المفاتيح.', p3: 'النموذج الحالي لم يُصمم أبدا لحجم القيمة التي يخزنها الناس اليوم. Qoin Shield يحل هذا على مستوى البروتوكول.', handwritten: 'مفتاح واحد. فشل واحد. انتهى الأمر.' },
    solution: { badge: 'حل Qoin Shield', title: 'مفتاحان. بروتوكول واحد. صفر تنازلات.', p1: 'يستخدم Qoin Shield بروتوكول Qonjoint لمطالبة مفاتيح مستقلة متعددة لكل معاملة. لا يمكن لأي مفتاح واحد تحريك أي شيء.', p2: 'مفاتيحك تُولد محليا في متصفحك. لا تلمس خادما أبدا.', p3: 'لا توجد شركة في المنتصف. إنها رياضيات يُطبقها البلوكشين.', handwritten: 'ليست حماية برمجية. حماية بروتوكول.' },
    quantum: { badge: 'التهديد الكمي', title: 'أجهزة الكمبيوتر الكمية تستهدف المفاتيح الواحدة', p1: 'يمكن لأجهزة الكمبيوتر الكمية التي تعمل بخوارزمية Shor اشتقاق المفاتيح الخاصة. هذا ليس خيال علمي.', p2: 'مع حماية Qonjoint، اختراق مفتاح واحد لا يحقق شيئا. يلزم اختراق كليهما في آن واحد.', p3: 'بنية المفتاح المقسم هي النهج الأكثر عملية المقاوم للكم المتاح اليوم.', handwritten: 'اكسر مفتاحا واحدا. لا تحصل على شيء.' },
    gettingStarted: { badge: 'البداية', title: 'جاهز للعمل في أقل من 60 ثانية', p1: 'إنشاء Qoin Shield يتطلب خطوتين: توليد مفتاحين محليا في متصفحك، ثم تفعيل حماية Qonjoint على السلسلة. للوصول إلى Qoin Shield، استخدم المفاتيح الباردة بلصق سلاسل المفاتيح الخاصة محليا، أو اتصل بـPhantom وSolflare لـSolana، أو بحسابين MetaMask لـEVM. الغاز مجاني. بلا حساب. بلا KYC.', handwritten: 'مفاتيحك. رموزك. رياضياتك.' },
    protocol: { badge: 'بروتوكول Qonjoint', title: 'كيف تعمل الحماية على السلسلة', p1: 'يدعم Qonjoint Solana وEthereum. عند إنشاء Qoin Shield، يُسجل مفتاحان عاميان on-chain كمتحكمين Qonjoint مشتركين.', p2: 'هذا التطبيق يحدث على مستوى البروتوكول. حتى لو تعرضت واجهتنا للاختراق، رموزك تتطلب كلا المفتاحين للتحرك.', handwritten: 'على السلسلة. قابل للتحقق. دائم.' },
    keyManagement: { badge: 'إدارة المفاتيح', title: 'كيف تخزن مفاتيح Qonjoint الخاصة بك', p1: 'أمان Qoin Shield الخاص بك يعتمد كليا على أين تخزن مفاتيحك. المفتاح 1 والمفتاح 2 يجب تخزينهما في مواقع مادية منفصلة.', p2: 'الموصى به: اكتب كل مفتاح على ورقة وخزنه في مواقع آمنة منفصلة. لا تخزن كلا المفتاحين في نفس المكان أبدا.', handwritten: 'مفتاحان. مكانان. لا معا أبدا.' },
    hackChallenge: { badge: 'تحدي الاختراق', title: 'نشرنا أحد مفاتيحنا. جربه.', body: 'نشرنا المفتاح 1 كإثبات مفهوم. يمكنك نسخه واستيراده والتوقيع به. لا يمكنك نقل رمز واحد. المفتاح 2 مطلوب.' },
    liveBalance: { badge: 'الرصيد المباشر', title: 'رموز حقيقية. بلوكشين حقيقي. بلا وسيط.', subtitle: 'مباشر on-chain. بلا خادم. بلا وسيط.', body: 'الرصيد المعروض أدناه يُجلب مباشرة من البلوكشين عبر RPC. لا خادم. لا ذاكرة تخزين مؤقت. لا وسيط.' },
    faqPage: { badge: 'أسئلة شائعة', title: 'الأسئلة الشائعة', subtitle: 'كل ما تحتاج معرفته عن Qoin Shield وحماية Qonjoint وكيفية عملها.' },
  },
  common: { darkMode: 'الوضع الداكن', lightMode: 'الوضع الفاتح' },
};

export const translations: Record<Language, Translations> = { en, ja, zh, de, es, ar };

export function getTranslations(lang: Language): Translations {
  return translations[lang] ?? translations['en'];
}
