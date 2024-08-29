import { Wallet, parseEther } from 'ethers';
import { JsonRpcProvider, TransactionResponse, TransactionReceipt } from 'ethers';

export const sendEth = async (net: string, from: string, to: string, amount: number): Promise<TransactionReceipt> => {
    let url: string;

    if (net === "MainNet") {
        url = "https://eth-mainnet.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB";
    } else if (net === "Sepolia") {
        url = "https://eth-sepolia.g.alchemy.com/v2/AnuiwUGPagWQk_nyL9mZNK_cfPlJBkKD";
    } else if (net === "Holesky") {
        url = "https://eth-holesky.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB";
    } else {
        throw new Error("Invalid Network");
    }

    const provider = new JsonRpcProvider(url);
    const signer = new Wallet(from).connect(provider);

    try {
        const tx: TransactionResponse = await signer.sendTransaction({
            to,
            value: parseEther(amount.toString()),
            // Optionally set gas price and gas limit
            // gasPrice: ethers.utils.parseUnits('20', 'gwei'),
            // gasLimit: 21000
        });

        console.log("Mining transaction...");
        console.log(`Transaction URL: https://etherscan.io/tx/${tx.hash}`);
        
        // Waiting for the transaction to be mined
        const receipt: TransactionReceipt | null = await tx.wait();

        if (receipt === null) {
            throw new Error("Transaction receipt is null");
        }

        console.log(`Mined in block ${receipt.blockNumber}`);
        return receipt;
    } catch (error) {
        console.error("Transaction failed:", error);
        throw error;
    }
}


