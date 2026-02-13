async function fetchNFTs(address) {
  const url = `https://api.opensea.io/api/v1/assets?owner=${address}&limit=50`;
  const res = await fetch(url);
  const data = await res.json();
  return data.assets || [];
}

function calculateTier(nfts) {

  if (nfts.length === 0) return "NONE";

  if (nfts.length >= 5) return "GENESIS";
  if (nfts.length >= 2) return "RARE";
  return "COMMON";
}

function calculateWalletAgeScore(firstTxDate) {

  const now = new Date();
  const created = new Date(firstTxDate);

  const months = (now - created) / (1000 * 60 * 60 * 24 * 30);

  if (months > 12) return 20;
  if (months > 6) return 15;
  if (months > 3) return 10;

  return 5;
}

function ruleEngine(tier, walletScore) {

  let base = 0;

  if (tier === "GENESIS") base = 50;
  if (tier === "RARE") base = 30;
  if (tier === "COMMON") base = 10;

  const total = base + walletScore;

  let trustLevel = "Low";

  if (total > 60) trustLevel = "High";
  else if (total > 30) trustLevel = "Medium";

  return {
    totalScore: total,
    trustLevel
  };
}
