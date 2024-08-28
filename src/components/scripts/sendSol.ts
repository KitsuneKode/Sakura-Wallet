import {
  Connection,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  PublicKey,
  Keypair,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import pkg from "bs58";


export async function SendSol(net:string, from:string, to:string, amount:number) {
const { decode } = pkg;

let rpc;


if(net == "MainNet"){
  rpc = "https://solana-devnet.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB"
}else if (net === "DevNet") {
  rpc = "https://solana-devnet.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB"
}else if (net === "TestNet") {
  rpc = "https://api.testnet.solana.com/"
}else{
  throw new Error("Invalid Network"); 
  
}

const connection = new Connection(
  rpc,
  "confirmed"
);

// console.log(from)

const secret = decode(from);

// console.log(JSON.stringify(Array.from(secret)));

const sendersKeypair = Keypair.fromSecretKey(secret);

// console.log(sendersKeypair);

const LAMPORTS_TO_SEND = amount * LAMPORTS_PER_SOL;

const transaction = new Transaction();
const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sendersKeypair.publicKey,
  toPubkey: new PublicKey(to),
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sendersKeypair,
]);

console.log(
  `💸 Finished! Sent ${amount} Sol to the address ${to}. `
);
// console.log(`Transaction signature is ${signature}!`);


return signature;
}




