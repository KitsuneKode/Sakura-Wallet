import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cherry,
  Sun,
  Moon,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3,
  Settings,
  MoreVertical,
  ChevronDown,
  Copy,
  Check,
  X,
  CloudDrizzle,
} from "lucide-react";
import ReceiveCrypto from "./RecieveCrypto";
import SendCrypto from "./SendCrypto";
import ShowKeys from "./ShowKeys";
// import { AlertStack } from "./../../alternatives/hold/AlertStack";
import {
  CryptoRow,
  DashboardCard,
  Transaction,
  QuickActionButton,
} from "./DashboardComponents";

import { useLocation, useNavigate } from "react-router-dom";
import { solBalance, ethBalance } from "./scripts/balance.ts";
import { airdrop } from "./scripts/airdropSol.ts";
// import { Toast } from "@radix-ui/react-toast";
// import toast, { Toaster } from "react-hot-toast";

export default function Component() {
  const location = useLocation();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [secretPhrase, setSecretPhrase] = useState("");
  const [accountSelectorOpen, setAccountSelectorOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("Main Account");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("mainnet");
  const [showWelcome, setShowWelcome] = useState(true);
  const [copiedPublicKey, setCopiedPublicKey] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompletedNotification, setShowCompletedNotification] =
    useState(false);
  const [showKeysModal, setShowKeysModal] = useState(false);
  const [copiedPrivateKey, setCopiedPrivateKey] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [airdropAmount, setAirdropAmount] = useState(1);

  const [nickname, setNickname] = useState("");

  //state vars for fetching balance
  const [sol, setSol] = useState<number | null>(null);
  const [eth, setEth] = useState<number | null>(null);
  const [multipleWallets, setMultipleWallets] = useState(false);
  const [multiWalletKeys, setMultiWalletKeys] = useState({});

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSettings = () => setSettingsOpen(!settingsOpen);
  const toggleAccountSelector = () =>
    setAccountSelectorOpen(!accountSelectorOpen);

  useEffect(() => {
    // If user directly tries to access the dashboard without giving accounts and stuff
    if (!location.state?.currentWalletDetails) {
      alert(
        "Can't access the dashboard without account selection/creation! Redirecting to Homepage"
      );
      navigate("/"); // Redirect to the homepage
      return; // Return early
    }

    type SingleWalletDetails = {
      count: number;
      type: string;
      nickname: string;
      privateKey: string;
      publicKey: string;
      secretPhrase: string;
    };

    type MultipleWalletDetails = {
      solana?: SingleWalletDetails;
      ethereum?: SingleWalletDetails;
    };
    type LocationState = {
      currentWalletDetails?: SingleWalletDetails | MultipleWalletDetails;
    };

    const { currentWalletDetails } = location.state as LocationState;

    type WalletDetails = {
      type: string;
      publicKey: string;
      privateKey: string;
      secretPhrase: string;
      nickname: string;
    };

    let walletDetails: WalletDetails | undefined;
    let multipleWalletDetails: MultipleWalletDetails | undefined;

    if (currentWalletDetails) {
      if ("type" in currentWalletDetails) {
        // Single wallet case
        walletDetails = currentWalletDetails as WalletDetails;
      } else if (currentWalletDetails.solana && currentWalletDetails.ethereum) {
        // Multiple wallets case - handle as needed
        walletDetails = currentWalletDetails.ethereum as WalletDetails;
        setMultipleWallets(true);
        multipleWalletDetails = currentWalletDetails as MultipleWalletDetails;
        setMultiWalletKeys({
          solana: {
            publicKey: currentWalletDetails.solana.publicKey,
            privateKey: currentWalletDetails.solana.privateKey,
          },
          ethereum: {
            publicKey: currentWalletDetails.ethereum.publicKey,
            privateKey: currentWalletDetails.ethereum.privateKey,
          },
        });
      } else {
        alert("no wallet details found");
      }
    }

    // All wallet set the public key and private key
    if (walletDetails) {
      const { type, publicKey, privateKey, secretPhrase, nickname } =
        walletDetails;
      setSelectedCurrency(type);
      setPublicKey(publicKey);
      setPrivateKey(privateKey);
      setSecretPhrase(secretPhrase);
      const name = nickname ? nickname.split(" ")[0] : "User";
      setNickname(name);
    }

    // Define the fetch function for fetching balances
    const fetchBalance = async () => {
      try {
        if (multipleWallets) {
          // Fetch balance for multiple wallets
          const { solana, ethereum } = multipleWalletDetails as {
            solana: WalletDetails;
            ethereum: WalletDetails;
          };

          const solanaPublicKey = solana.publicKey;
          const ethereumPublicKey = ethereum.publicKey;

          const fetchedSolBalance = await solBalance(solanaPublicKey);
          setSol(fetchedSolBalance);
          const fetchedEthBalance = await ethBalance(ethereumPublicKey);
          setEth(fetchedEthBalance);
        } else {
          if (selectedCurrency === "SOL") {
            const fetchedSolBalance = await solBalance(publicKey);
            setSol(fetchedSolBalance);
          } else if (selectedCurrency === "ETH") {
            const fetchedEthBalance = await ethBalance(publicKey);
            setEth(fetchedEthBalance);
          }
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    // Initial fetch of balances
    fetchBalance();

    // Periodic fetch of balances every 2 seconds
    const intervalId = setInterval(fetchBalance, 1000);

    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => clearInterval(intervalId);
  }, [location.state, multipleWallets, navigate]);

  //
  //
  //

  //

  //Fetches the Dark mode state from earlier and also shows the welcome notification
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  //darkMode Changer
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const accounts = ["Main Account", "Savings Account", "Trading Account"];

  const handleAirdropRequest = async () => {
    try {
      const response = await airdrop(publicKey, airdropAmount);
      console.log(response);
    } catch (e) {
      alert(e.message);
      console.error(e.response.data.error.message);
    }
  };

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const addNotification = (
    type: "success" | "error" | "info",
    message: string
  ) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 5000);
  };

  const copyPublicKey = () => {
    navigator.clipboard.writeText(publicKey);
    setCopiedPublicKey(true);
    addNotification("success", "Public key copied!");
    setTimeout(() => setCopiedPublicKey(false), 2000);
  };

  const copyPrivateKey = () => {
    navigator.clipboard.writeText(privateKey);
    setCopiedPrivateKey(true);
    addNotification("success", "Private key copied!");
    setTimeout(() => setCopiedPrivateKey(false), 2000);
  };

  const handleSendSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSendModalOpen(false);
      addNotification("success", "Transaction completed successfully!");
    }, 3000);
  };

  const alertMessage = (message?: string) => {
    const alertMessage = !message
      ? "This feature is not available yet. Please wait for the next update"
      : message;
    alert(alertMessage);
  };

  const shareAddress = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My Crypto Address",
          text: `Here's my public key: ${publicKey}`,
          url: `https:///${publicKey}`,
        })
        .then(() => {
          addNotification("success", "Address shared successfully!");
        })
        .catch((error: Error) => {
          addNotification("error", "Failed to share address");
        });
    } else {
      addNotification("error", "Sharing is not supported on this device");
    }
  };
  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Cherry className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">桜ウォレット</span>
              <button className=" bg-red-200 dark:bg-red-700 text-xs font-bold mt-3 px-2 rounded-xl text-red-600 dark:text-red-200 transition-colors">
                BETA
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={toggleAccountSelector}
                  className="flex items-center space-x-2 bg-red-100 dark:bg-red-900 rounded-full px-4 py-2 text-sm font-medium"
                >
                  <span>{selectedAccount}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {accountSelectorOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20"
                    >
                      {accounts.map((account) => (
                        <button
                          key={account}
                          onClick={() => {
                            setSelectedAccount(account);
                            setAccountSelectorOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {account}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <div className="relative">
                <button
                  onClick={toggleSettings}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
                  aria-label="Settings"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
                <AnimatePresence>
                  {settingsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20"
                    >
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Profile Settings
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Security
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Notifications
                      </button>
                      <button
                        onClick={() => {
                          setSettingsOpen(false);
                          setShowKeysModal(true);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        View Account Keys
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <motion.h1
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ダッシュボード (Dashboard)
          </motion.h1>

          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Public Key:</span>
              <span className="text-sm bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                {publicKey}
              </span>
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
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Network:</span>
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="text-sm bg-gray-100 dark:bg-gray-800 rounded px-2 py-1"
              >
                <option value="mainnet">Mainnet</option>
                <option value="devnet">Devnet</option>
              </select>
            </div>
          </div>
          {/* Airdrop */}
          {selectedNetwork === "devnet" && (
            <div className="mb-8 flex items-center space-x-4">
              <span className="text-sm font-medium">Airdrop</span>
              <select
                value={airdropAmount}
                onChange={(e) => setAirdropAmount(e.target.value)}
                className="text-sm bg-gray-100 dark:bg-gray-800 rounded px-2 py-1"
              >
                <option value="0.5">0.5 SOL</option>
                <option value="1">1 SOL</option>
                <option value="2">2 SOL</option>
                <option value="2.5">2.5 SOL</option>
              </select>
              <button
                onClick={handleAirdropRequest}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center"
              >
                <CloudDrizzle className="h-5 w-5 mr-2" />
                Request Airdrop
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="総資産 (Total Balance)"
              value="¥1,234,567"
              icon={<Wallet className="h-6 w-6" />}
            />
            <DashboardCard
              title="24時間の変化 (24h Change)"
              value="+5.67%"
              icon={<BarChart3 className="h-6 w-6" />}
            />
            <DashboardCard
              title="アクティブな通貨 (Active Currencies)"
              value="7"
              icon={<Settings className="h-6 w-6" />}
            />
          </div>
          {/*  Holding balance section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">
                保有資産 (Holdings)
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left pb-2">通貨 (Currency)</th>
                      <th className="text-right pb-2">残高 (Balance)</th>
                      <th className="text-right pb-2">価値 (Value)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CryptoRow
                      name="Bitcoin"
                      type="BTC"
                      iconPath="/LogoWallets/Bitcoin.png"
                      balance="0.5"
                      value="¥2,500,000"
                      onClick={() => setSelectedCurrency("BTC")}
                    />
                    <CryptoRow
                      name="Ethereum"
                      type="ETH"
                      iconPath="/LogoWallets/ethereum.png"
                      balance={eth ? eth : 0}
                      value="¥1,000,000"
                      onClick={() => {
                        setSelectedCurrency("ETH");
                        if (multipleWallets) {
                          setPrivateKey(multiWalletKeys.ethereum.privateKey);
                          setPublicKey(multiWalletKeys.ethereum.publicKey);
                        }
                      }}
                    />
                    <CryptoRow
                      name="Solana"
                      type="SOL"
                      iconPath="/LogoWallets/Solana_logo.png"
                      balance={sol ? sol : 0}
                      value="¥500,000"
                      onClick={() => {
                        setSelectedCurrency("SOL");
                        if (multipleWallets) {
                          setPrivateKey(multiWalletKeys.solana.privateKey);
                          setPublicKey(multiWalletKeys.solana.publicKey);
                        }
                      }}
                    />
                    <CryptoRow
                      name="Ripple"
                      type="XRP"
                      iconPath="/LogoWallets/ripple.png"
                      balance="1000"
                      value="¥50,000"
                      onClick={() => setSelectedCurrency("XRP")}
                    />
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                最近の取引 (Recent Transactions)
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
                <Transaction
                  type="sent"
                  amount="0.1 BTC"
                  recipient="0x1234...5678"
                />
                <Transaction
                  type="received"
                  amount="100 XRP"
                  sender="0xabcd...efgh"
                />
                <Transaction
                  type="sent"
                  amount="1.5 ETH"
                  recipient="0x9876...5432"
                />
              </div>
            </div>
          </div>

          {/* When Currency is selected this shows the details of the Current chain  */}
          {selectedCurrency && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-red-100 hover: dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {selectedCurrency} ウォレット残高 (Wallet Balance)
              </h2>
              <p className="text-lg font-medium">
                {selectedCurrency === "ETH" ? eth : sol} {selectedCurrency}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ¥
                {selectedCurrency === "ETH"
                  ? eth
                    ? eth * 356238.3
                    : 0
                  : sol
                  ? sol * 21041
                  : 0}
              </p>
            </motion.div>
          )}

          {/* Quick ACtion, Send, Recieve */}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              クイックアクション (Quick Actions)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <QuickActionButton
                label="送金 (Send)"
                icon={<ArrowUpRight className="h-6 w-6" />}
                onClick={() => setSendModalOpen(true)}
              />
              <QuickActionButton
                label="受取 (Receive)"
                icon={<ArrowDownLeft className="h-6 w-6" />}
                onClick={() => setReceiveModalOpen(true)}
              />
              <QuickActionButton
                label="交換 (Swap)"
                icon={<ArrowUpRight className="h-6 w-6 transform rotate-90" />}
                onClick={() => alertMessage()}
              />
              <QuickActionButton
                label="購入 (Buy)"
                icon={<Wallet className="h-6 w-6" />}
                onClick={() => alertMessage()}
              />
            </div>
          </div>
        </main>
        <footer className="bg-red-500 dark:bg-red-900 text-white py-10 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Cherry className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold">桜ウォレット</span>
                <span className="text-size-xl font-700"> by </span>
                <a
                  className="text-xl font-bold underline-coolgray"
                  href="https://github.com/kitsunekode"
                  target="_blank"
                >
                  KitsuneKode
                </a>
              </div>
              <nav className="flex flex-wrap justify-center md:justify-end space-x-4 mb-4 md:mb-0">
                <a
                  className="hover:underline"
                  onClick={() =>
                    alert("Well do that if things goes as expected")
                  }
                >
                  Privacy Policy
                </a>
                <a
                  className="hover:underline"
                  onClick={() =>
                    alert("Well not a business yet so lets leave it at there")
                  }
                >
                  Terms of Service
                </a>
                <a
                  href="https://mailto:manashpratimbhuyan8134@gmail.com"
                  className="hover:underline"
                  target="_blank"
                >
                  Contact Us
                </a>
                <a className="hover:underline">FAQ</a>
              </nav>
              <div className=" text-center text-sm">
                <p>© 2024 Sakura Wallet. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>

        {/* welcome modal  */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed top-6 right-2 border-2 border-red-500 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50 "
            >
              <button
                className="ml-80 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200  "
                onClick={() => setShowWelcome(false)}
              >
                <X className=" h-4 w-4" />
              </button>
              <p className="text-lg font-semibold mb-2">
                ようこそ、{nickname}様 (Welcome, {nickname})
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                桜ウォレットへようこそ。安全な取引を！
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {/* Send Crypto Modal */}
          {sendModalOpen && (
            <SendCrypto
              privateKey={privateKey}
              selectedCurrency={selectedCurrency}
              setShowCompletedNotification={setShowCompletedNotification}
              publicKey={publicKey}
              isSubmitting={isSubmitting}
              setSendModalOpen={setSendModalOpen}
              setIsSubmitting={setIsSubmitting}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showCompletedNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white rounded-lg shadow-lg p-4 z-50"
            >
              <p className="text-lg font-semibold">
                取引完了 (Transaction Completed)
              </p>
              <p className="text-sm">
                あなたの取引は正常に処理されました。(Your transaction has been
                processed successfully.)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {receiveModalOpen && (
            <>
              <ReceiveCrypto
                publicKey={publicKey}
                copiedPublicKey={copiedPublicKey}
                copyPublicKey={copyPublicKey}
                shareAddress={shareAddress}
                setReceiveModalOpen={setReceiveModalOpen}
              />
            </>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showKeysModal && (
            <ShowKeys
              classname={""}
              setShowKeysModal={setShowKeysModal}
              privateKey={privateKey}
              publicKey={publicKey}
              copyPrivateKey={copyPrivateKey}
              copyPublicKey={copyPublicKey}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
function Notification({ id, type, message }: Notification) {
  const icons = {
    success: <Check className="h-6 w-6 text-green-500" />,
    error: <AlertCircle className="h-6 w-6 text-red-500" />,
    info: <AlertCircle className="h-6 w-6 text-blue-500" />,
  };

  const colors = {
    success: "bg-green-100 dark:bg-green-800 border-green-500",
    error: "bg-red-100 dark:bg-red-800 border-red-500",
    info: "bg-blue-100 dark:bg-blue-800 border-blue-500",
  };

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`fixed bottom-4 right-4 flex items-center space-x-2 rounded-lg border-l-4 p-4 shadow-lg ${colors[type]}`}
    >
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
}
