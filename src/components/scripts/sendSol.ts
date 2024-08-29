import {
  Connection,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  PublicKey,
  Keypair,
  sendAndConfirmTransaction,
  TransactionSignature,
} from "@solana/web3.js";

import pkg from "bs58";

export async function SendSol(net: string, from: string, to: string, amount: number): Promise<TransactionSignature> {
  const { decode } = pkg;

  let rpc;

  if (net === "MainNet") {
    rpc = "https://solana-api.projectserum.com"; // MainNet endpoint
  } else if (net === "DevNet") {
    rpc = "https://api.devnet.solana.com/";  // DevNet endpoint
  } else if (net === "TestNet") {
    rpc = "https://api.testnet.solana.com/"; // TestNet endpoint
  } else {
    throw new Error("Invalid Network"); 
  }


  
  const connection = new Connection(rpc, "confirmed");

  const secret = decode(from);

// console.log(JSON.stringify(Array.from(secret)));

  const sendersKeypair = Keypair.fromSecretKey(secret);


  const LAMPORTS_TO_SEND = amount * LAMPORTS_PER_SOL;

  const transaction = new Transaction();
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sendersKeypair.publicKey,
    toPubkey: new PublicKey(to),
    lamports: LAMPORTS_TO_SEND,
  });

  transaction.add(sendSolInstruction);
  // console.log(
  //   `💸 Finished! Sent ${amount} Sol to the address ${to}. `
  // );

  // Fetch recent blockhash and set it for the transaction
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = sendersKeypair.publicKey;

  await transaction.sign(sendersKeypair);

  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [sendersKeypair], {
      commitment: "confirmed",
      preflightCommitment: "processed",
    });
    console.log(`Transaction signature is ${signature}`);
    return signature;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}




