import { useState } from "react";
import { motion } from "framer-motion";
import { X, Copy, Check, Eye, EyeOff } from "lucide-react";

const ShowKeys = ({
  classname,
  setShowKeysModal,
  copyPublicKey,
  privateKey,
  publicKey,
  copyPrivateKey,
}) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedPrivateKey, setCopiedPrivateKey] = useState(false);
  const [copiedPublicKey, setCopiedPublicKey] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50"
    >
      <div className={`${classname === "" ? "" : classname}`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-screen-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              アカウントキー (Account Keys)
            </h2>
            {/* <button className=""> */}
            <X
              className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => {
                setShowKeysModal(false);
                setShowPrivateKey(false);
              }}
            />
            {/* </button> */}
          </div>
          <div className="h- space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                アドレス (Address)
              </label>
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-2">
                <span className="text-sm">{publicKey}</span>
                <button
                  onClick={() => {
                    copyPublicKey();
                    setCopiedPublicKey(true);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  {copiedPublicKey ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                プライベートキー (Private Key)
              </label>
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-2 ">
                <span className="text-sm focus:outline-none overflow-hidden">
                  {showPrivateKey ? privateKey : "••••••••••••••••"}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="text-red-500 hover:text-red-600 "
                  >
                    {showPrivateKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      copyPrivateKey();
                      setCopiedPrivateKey(true);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    {copiedPrivateKey ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShowKeys;
