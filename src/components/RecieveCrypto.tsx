import { motion } from "framer-motion";
import QRCode from "qrcode.react";
import { Check, Share2, X, Copy } from "lucide-react";
const ReceiveCrypto = ({
  publicKey,
  copyPublicKey,
  shareAddress,
  copiedPublicKey,
  setReceiveModalOpen,
}) => {
  return (
    <>
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
            <h2 className="text-2xl font-semibold">Receive Cryptocurrency</h2>
            <button
              onClick={() => setReceiveModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Share your public key address to receive payments
          </p>
          <div className="flex justify-center mb-4">
            <QRCode value={publicKey} size={200} />
          </div>
          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-2 mb-4">
            <span className="text-sm">{publicKey}</span>
            <button
              onClick={copyPublicKey}
              className="text-red-500 hover:text-red-600"
            >
              {copiedPublicKey ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <button
            onClick={shareAddress}
            className="w-full bg-red-500 text-white rounded-full py-2 px-4 hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Address
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ReceiveCrypto;
