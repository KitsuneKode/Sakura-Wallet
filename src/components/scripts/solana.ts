import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Buffer } from "buffer";
// import crypto from "crypto";
import pkg from "bs58";

// Generate mnemonic phrase and seed
// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

// Function to generate a random mnemonic
export async function generateRandom() {
  return generateMnemonic();
}

// Function to generate a wallet for a specific mneomnic
export function getSolWallet(mnemonicPhrase:string, accNum:number) {
  
  const { encode } = pkg;
  const seed = mnemonicToSeedSync(mnemonicPhrase);

  // Derive the private key using the derivation path
  const walletIndex = accNum; // Change this index for different accounts
  const path = `m/44'/501'/${walletIndex}'/0'`; // Solana's derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;

  // Generate the keypair
  const keypair = Keypair.fromSecretKey(
    Buffer.from(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
  );

  // Extract the public and private keys
  const privateKey = encode(Buffer.from(keypair.secretKey));
  const publicKey = keypair.publicKey.toBase58();

  // Print out the results
  // console.log("Mnemonic Phrase:", mnemonicPhrase);
  // console.log("Private Key:", privateKey);
  // console.log("Public Key:", publicKey);

  // You can also derive the wallet address from the public key (in Solana, the public key is typically the address)
  const walletDetails = [privateKey, publicKey];

  //   console.log("Wallet Address:", walletAddress);

  return walletDetails;
}

//test-run
// getWallet(mnemonicPhrase);
