import { Wallet, parseEther } from 'ethers';
import { JsonRpcProvider } from "ethers";
// import { ethBalance } from "./balance.js";

export const sendEth = async (net:string, from:string, to:string, amount:number ) => {

    let url:string;

  if(net == "MainNet"){
    
      url = "https://eth-mainnet.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB";
    }

    else if (net === "Sepholia"){
      url ="https://eth-sepolia.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB";
    }
    else if (net==="Holesky"){
      url = "https://eth-holesky.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB";
    } else {
      throw new Error("Invalid Network");
    }
    
    const provider = new JsonRpcProvider(url);

const signer = new Wallet(from).connect(provider);

const tx = await signer.sendTransaction({
  to,
  value: parseEther(amount.toString()),
});

console.log("Mining transaction...");
console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
// Waiting for the transaction to be mined

  const receipt = await tx.wait();
  

// The transaction is now on chain!
console.log(`Mined in block ${receipt.blockNumber}`);

return receipt;



}

// (async () => ethBalance())();

// sendEth("Sepholia", "0xac3331c86ac2a14791d010cec30f7cf5bb2472f84b66e8c1057bb00c1bc22bf3" , "0xcb7f1973A70d1E396380DD73eb41D4b3BFEb62b0", 0.0005);