import {PublicKey, Connection, LAMPORTS_PER_SOL} from "@solana/web3.js";


export const airdrop = async (address: string, amount: number) => {
    const public_key = new PublicKey(address);
    const conn = new Connection("https://api.devnet.solana.com", "confirmed");
    const signature = await conn.requestAirdrop(public_key, amount * LAMPORTS_PER_SOL)
    
    const latestBlockhash = await conn.getLatestBlockhash()


    await conn.confirmTransaction({
        blockhash:latestBlockhash.blockhash,
        lastValidBlockHeight:latestBlockhash.lastValidBlockHeight,
        signature:signature,});
} 

