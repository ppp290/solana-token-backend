const { Connection, Keypair, PublicKey, clusterApiUrl } = require("@solana/web3.js");
const { createMint, getOrCreateAssociatedTokenAccount, mintTo } = require("@solana/spl-token");

async function mintToken(privateKeyString, name, symbol, decimals = 9) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const secretKey = Uint8Array.from(JSON.parse(privateKeyString));
  const payer = Keypair.fromSecretKey(secretKey);

  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    decimals
  );

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  await mintTo(connection, payer, mint, tokenAccount.address, payer, 1_000_000_000_000);

  return {
    mint: mint.toBase58(),
    tokenAccount: tokenAccount.address.toBase58(),
  };
}

module.exports = mintToken;
