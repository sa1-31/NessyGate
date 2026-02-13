document.getElementById("analyzeBtn")
  .addEventListener("click", run);

async function run() {

  const address = document.getElementById("wallet").value.trim();
  const output = document.getElementById("output");

  if (!address) {
    output.innerText = "Enter wallet address";
    return;
  }

  output.innerText = "Analyzing...";

  try {

    const nfts = await fetchNFTs(address);

    const tier = calculateTier(nfts);

    // Dummy wallet age for demo
    const walletScore = calculateWalletAgeScore("2022-01-01");

    const result = ruleEngine(tier, walletScore);

    output.innerText = JSON.stringify({
      wallet: address,
      nftCount: nfts.length,
      tier,
      walletScore,
      finalScore: result.totalScore,
      trustLevel: result.trustLevel
    }, null, 2);

  } catch (err) {
    output.innerText = "Error: " + err.message;
  }
}
