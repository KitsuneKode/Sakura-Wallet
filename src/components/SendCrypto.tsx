// @ts-nocheck

import { motion, AnimatePresence } from "framer-motion";
import { Cherry, X } from "lucide-react";
import { useState } from "react";
import { SendSol } from "./scripts/sendSol.ts";
import { useToast } from "./ui/use-toast.ts";
import { sendEth } from "./scripts/sendEth.ts";
const SendCrypto = ({
  privateKey,
  selectedCurrency,
  isSubmitting,
  setSendModalOpen,
  publicKey,
  setIsSubmitting,
  setShowCompletedNotification,
}) => {
  const [recipient, setRecipient] = useState("");
  const [transactionSignature, setTransactionSignature] = useState("");
  const [amount, setAmount] = useState(0);
  const { toast } = useToast();

  const handleSendSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSendModalOpen(false);
    }, 2500);

    setShowCompletedNotification(true);

    try {
      if (selectedCurrency === "ETH") {
        const signature = await sendEth(
          "Sepholia",
          privateKey,
          recipient,
          amount
        );
        setTransactionSignature(signature);
        console.log(transactionSignature);
      } else if (selectedCurrency === "SOL") {
        const signature = await SendSol(
          "DevNet",
          privateKey,
          recipient,
          amount
        );
        setTransactionSignature(signature);
        console.log(transactionSignature);
      }
      setShowCompletedNotification(true);
      toast({
        variant: "default",
        title: "Transaction sent successfully",
        description: `Transaction signature: ${signature}`,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.error("Unable to send transaction", e);
    }

    setTimeout(() => {
      setShowCompletedNotification(false);
    }, 6000);
  };
  return (
    <>
      <AnimatePresence>
        {/* {sendModalOpen && (
           
          )} */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">送金 (Send)</h2>
              <button
                onClick={() => setSendModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  送金元 (Sending from)
                </label>
                <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded overflow-hidden p-2">
                  <span>{publicKey}</span>
                  {/* <span className="text-sm text-gray-500 dark:text-gray-400">
                    残高: 1.5 ETH
                  </span> */}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium mb-1"
                >
                  通貨 (Currency)
                </label>
                <select
                  id="currency"
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded p-2"
                >
                  <option>ETH</option>
                  <option>BTC</option>
                  <option>SOL</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="network"
                  className="block text-sm font-medium mb-1"
                >
                  ネットワーク (Network)
                </label>
                <select
                  id="network"
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded p-2"
                >
                  <option>MainNet</option>
                  <option>TestNet</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="recipient"
                  className="block text-sm font-medium mb-1"
                >
                  送金先 (Send to)
                </label>
                <input
                  id="recipient"
                  type="text"
                  placeholder="受取人のアドレスを入力"
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded p-2"
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium mb-1"
                >
                  金額 (Amount)
                </label>
                <input
                  id="amount"
                  type="number"
                  placeholder="0"
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded p-2"
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fee" className="block text-sm font-medium mb-1">
                  取引手数料 (Transaction Fee)
                </label>
                <select
                  id="fee"
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded p-2"
                >
                  <option>低速 (Slow)</option>
                  <option>標準 (Medium)</option>
                  <option>高速 (Fast)</option>
                </select>
              </div>
              <div className="flex justify-between items-center text-sm mb-4">
                <span>取引コスト (Transaction cost)</span>
                <span>0.001 ETH</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-4">
                <span>処理時間 (Process in)</span>
                <span>45秒 (seconds)</span>
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white rounded-full py-2 px-4 hover:bg-red-600 transition-colors duration-300"
                onClick={(e) => {
                  handleSendSubmit(e);
                  toast({
                    title: "Transaction started",
                    description: "Please wait for the transaction to complete.",
                  });
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Cherry className="animate-spin h-5 w-5 mr-3" />
                    処理中 (Processing)
                  </div>
                ) : (
                  "送信 (Submit)"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SendCrypto;
