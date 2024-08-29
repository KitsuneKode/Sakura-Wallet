import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { formatEther, JsonRpcProvider } from "ethers";

export const solBalance = async (publicKey:string) => {
  const connection = new Connection(
    "https://solana-devnet.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB"
  );
  const address = new PublicKey(publicKey);
  const balance = await connection.getBalance(address);

  const sol = balance / LAMPORTS_PER_SOL;
  // console.log(`The balance of the account at ${address} is ${sol} SOL`);
  // console.log(`✅ Finished! Solana`);
  return sol;
};


export const ethBalance = async (address:string) => {
  const provider = new JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB"
  );

  const balance = await provider.getBalance(address, "latest");

  const eth = formatEther(balance);
  // console.log("u got this much eth", eth);
  return parseFloat(eth);
};

// ethBalance();
// solBalance("5t2pxmuCuXCn5fskxaLY8YjZY4HHNjrm4vYhqtQ3Jqkp");
