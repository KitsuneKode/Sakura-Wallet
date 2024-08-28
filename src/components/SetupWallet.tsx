import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Cherry,
  Wallet,
  Coins,
  Plus,
  Import,
  ArrowRight,
  Eye,
  Copy,
} from "lucide-react";
import Notification from "./Notification";
import ImportWalletDailog from "./AllDailogBox";
import { generateRandom, getSolWallet } from "./scripts/solana";
import { getEthWallet } from "./scripts/ether";
import ShowKeys from "./ShowKeys";

import { useNavigate } from "react-router-dom";

export default function SetupWallet() {
  const [nickname, setNickname] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [walletType, setWalletType] = useState("");
  const [accountNumberSol, setAccountNumberSol] = useState(0);
  const [accountNumberEth, setAccountNumberEth] = useState(0);
  const [currentWalletDetails, setCurrentWalletDetails] = useState<
    Wallet | MultiWallet
  >({});
  const [secretPhrase, setSecretPhrase] = useState("");
  const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);
  const [showMultiplePublicKey, setShowMultiplePublicKey] = useState(false);
  const [solAddressMultiWallet, setsolAddressMultiWallet] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [accountCount, setAccountCount] = useState(0);

  const [showImport, setShowImport] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [showAllWallets, setShowAllWallets] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showPublicKey, setShowPublicKey] = useState(false);
  const [showProceed, setShowProceed] = useState(false);
  const [showKeysModal, setShowKeysModal] = useState(false);

  const [showKeysModalAllKeys, setShowKeysModalAllKeys] = useState(false);

  const navigate = useNavigate();

  type Wallet = {
    count: number;
    type: string;
    nickname: string;
    publicKey: string;
    privateKey: string;
    secretPhrase: string;
  };

  type MultiWallet = {
    solana: Wallet;
    ethereum: Wallet;
  };

  //check if the nickname is empty ? show import  : show add
  const handleWalletClick = (type: string) => {
    if (!nickname) {
      showNotification(
        "Please enter a nickname for your wallet before proceeding.",
        "error"
      );
      return;
    }

    setWalletType(type);
    if (type === "import") {
      setShowImport(true);
    } else if (type === "add") {
      setShowWallets(true);
    }
  };

  //onCopy function
  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification("Copied to clipboard!", "success");
  };

  //needs fixing

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowImport(false);
      addWallet("import", publicKey);
      showNotification("Wallet imported successfully!", "success");
      setShowProceed(true);
    }, 2000);
  };

  //actual add wallet logic for single wallet
  const addWallet = async (type: string) => {
    if (type !== "SOL" && type !== "ETH") {
      alert("Invalid wallet type");
      return;
    }
    let newWallet: Wallet;

    if (type === "SOL") {
      const newAccountNumberSol = accountNumberSol + 1;
      const Keys = getSolWallet(secretPhrase, newAccountNumberSol);
      setAccountNumberSol(newAccountNumberSol);
      setPrivateKey(Keys[0]);
      setPublicKey(Keys[1]);
      setAccountCount(accountCount + 1);

      newWallet = {
        count: accountCount + 1,
        type: type,
        nickname: `${nickname} Solana ${newAccountNumberSol}`,
        publicKey: Keys[1],
        privateKey: Keys[0],
        secretPhrase: secretPhrase,
      };
    }

    if (type === "ETH") {
      const newAccountNumberEth = accountNumberEth + 1;
      const Keys = getEthWallet(secretPhrase, newAccountNumberEth);
      setAccountNumberEth(newAccountNumberEth);
      setPrivateKey(Keys[0]);
      setPublicKey(Keys[1]);
      setAccountCount(accountCount + 1);

      newWallet = {
        count: accountCount + 1,
        type: type,
        nickname: `${nickname} Ethereum ${newAccountNumberEth}`,
        publicKey: Keys[1],
        privateKey: Keys[0],
        secretPhrase: secretPhrase,
      };
    }

    setCurrentWalletDetails(newWallet);

    const updatedWallets = [...wallets, newWallet];
    setWallets(updatedWallets);
  };

  //actual add wallet logic for both wallet at the same time
  const addBothWallet = async () => {
    if (walletType !== "both") {
      alert("Invalid wallet type");
      return;
    }
    const newAccountNumberSol = accountNumberSol + 1;
    const newAccountNumberEth = accountNumberEth + 1;
    const KeysSol = getSolWallet(secretPhrase, newAccountNumberSol);
    const KeysEth = getEthWallet(secretPhrase, newAccountNumberEth);

    setAccountNumberSol(newAccountNumberSol);
    setAccountNumberEth(newAccountNumberEth);
    setAccountCount(accountCount + 1);

    const newMWallet1: Wallet = {
      count: accountCount + 1,
      type: "SOL",
      nickname: `${nickname} Solana ${newAccountNumberSol}`,
      publicKey: KeysSol[1],
      privateKey: KeysSol[0],
      secretPhrase: secretPhrase,
    };

    const newMWallet2: Wallet = {
      count: accountCount + 2,
      type: "ETH",
      nickname: `${nickname} Ethereum ${newAccountNumberEth}`,
      publicKey: KeysEth[1],
      privateKey: KeysEth[0],
      secretPhrase: secretPhrase,
    };

    setsolAddressMultiWallet(KeysSol[1]);
    setPrivateKey(KeysEth[0]);
    setPublicKey(KeysEth[1]);

    setCurrentWalletDetails({ solana: newMWallet1, ethereum: newMWallet2 });
    setWallets([...wallets, newMWallet1, newMWallet2]);
  };

  // Add specific wallet clicked
  const handleAddWallet = async (type: string) => {
    handleWalletClick(type);
    await generateSecretPhrase();
    setShowSecretPhrase(true);
  };

  // Add both wallets clicked
  const handleAddBoth = async (type: string) => {
    handleWalletClick(type);
    await generateSecretPhrase();
    setShowSecretPhrase(true);
  };

  //show notification
  const showNotification = (message: string, type: "error" | "success") => {
    setNotification({ message, type });
  };

  //Generate secret phrase
  const generateSecretPhrase = async () => {
    const mnemonics = await generateRandom();
    setSecretPhrase(mnemonics);
  };

  //On save secret phrase clicked
  const handleSecretPhraseSaved = async () => {
    setShowSecretPhrase(false);
    if (walletType === "both") {
      await addBothWallet();

      showNotification(
        "Both Ethereum and Solana wallets added successfully!",
        "success"
      );
      setShowMultiplePublicKey(true);
    } else {
      await addWallet(walletType);
      showNotification(
        `${
          walletType.charAt(0).toUpperCase() + walletType.slice(1)
        } wallet added successfully!`,
        "success"
      );
      setShowPublicKey(true);
    }
    setShowProceed(true);
  };

  //Proceed button clicked
  const handleProceed = async () => {
    showNotification("Wallet setup complete!", "success");
    // Add any additional logic for proceeding here
    setIsProceeding(true);
    await setTimeout(() => {
      showNotification("Latest Wallet opening", "success");
      console.log("currentWalletDetails", currentWalletDetails);
      setTimeout(() => {
        navigate("/dashboard", {
          state: { currentWalletDetails },
        });
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5] dark:bg-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-700  shadow-xl border-2 border-[#FF6B6B] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E]" />
        {/* Wallet setup Page title */}
        <CardHeader className="text-center relative">
          <CardTitle className="text-3xl font-bold text-[#1A202C]  dark:text-gray-300 mb-2">
            桜ウォレット
          </CardTitle>
          <CardDescription className="text-lg text-[#4A5568] dark:text-gray-200">
            Next-Gen Crypto Wallet
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* wallet name */}
          <div className="space-y-2">
            <Label
              htmlFor="nickname"
              className="text-base font-medium text-[#4A5568] dark:text-gray-300"
            >
              Name(名前)
              <span className="text-xs pl-96">
                (Wallet will have that prefix)
              </span>
            </Label>
            <Input
              required
              id="nickname"
              placeholder="Enter a nickname for your wallet"
              onChange={(e) => setNickname(e.target.value)}
              className="border-[#E2E8F0] focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
            />
          </div>

          {/* Import Wallet and Add Wallet first view  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Button
              variant="outline"
              className={`h-24 flex flex-col items-center justify-center bg-white dark:bg-gray-600 dark:text-200 hover:bg-[#FFF5F5] border-[#FF6B6B] transition-all duration-300 ${
                walletType === "import" ? "ring-2 ring-[#FF6B6B]" : ""
              }`}
              onClick={() => handleWalletClick("import")}
            >
              <Import className="h-8 w-8 mb-2 text-[#FF6B6B]" />
              Import Wallet
            </Button>

            {/* Add Wallets toggle */}
            <Button
              variant="outline"
              className={`h-24 flex flex-col items-center justify-center bg-white dark:bg-gray-600 dark:text-200 hover:bg-[#FFF5F5] border-[#FF6B6B] transition-all duration-300 ${
                walletType === "add" ? "ring-2 ring-[#FF6B6B]" : ""
              }`}
              onClick={() => handleWalletClick("add")}
            >
              <Plus className="h-8 w-8 mb-2 text-[#FF6B6B]" />
              Add Wallets
            </Button>
          </div>

          {/* Add Solana Eth and both wallet */}
          {showWallets && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Eth */}
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center bg-white dark:bg-gray-600 dark:text-200 hover:bg-[#FFF5F5] border-[#FF6B6B] transition-all duration-300"
                onClick={() => handleAddWallet("ETH")}
              >
                <Wallet className="h-8 w-8 mb-2 text-[#FF6B6B]" />
                Ethereum Wallet
              </Button>
              {/* Sol */}
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center bg-white dark:bg-gray-600 dark:text-200 hover:bg-[#FFF5F5] border-[#FF6B6B] transition-all duration-300"
                onClick={() => handleAddWallet("SOL")}
              >
                <Coins className="h-8 w-8 mb-2 text-[#FF6B6B]" />
                Solana Wallet
              </Button>
              {/* Both */}
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center bg-white dark:bg-gray-600 dark:text-200 hover:bg-[#FFF5F5] border-[#FF6B6B] transition-all duration-300"
                onClick={() => handleAddBoth("both")}
              >
                <Plus className="h-8 w-8 mb-2 text-[#FF6B6B]" />
                Add Both
              </Button>
            </div>
          )}
        </CardContent>

        {/* Wallets display */}

        <CardFooter className="flex flex-col items-center space-y-4">
          {wallets.length > 0 && (
            <>
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                {wallets.slice(0, 4).map((wallet, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full overflow-hidden"
                        onClick={() => setShowKeysModal(true)}
                      >
                        {wallet.nickname}
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                ))}
              </div>
              {/* Keys display of the first 4 wallets */}

              {showKeysModal && (
                <ShowKeys
                  classname={"sm:max-w-[425px]"}
                  setShowKeysModal={setShowKeysModal}
                  privateKey={privateKey}
                  publicKey={publicKey}
                  copyPrivateKey={onCopy}
                  copyPublicKey={onCopy}
                />
              )}

              {/* View All Wallet */}
              {wallets.length > 4 && (
                <Button
                  variant="outline"
                  onClick={() => setShowAllWallets(true)}
                  className="mt-4"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View All Wallets
                </Button>
              )}
            </>
          )}

          {/* Proceed Button */}
          {showProceed && (
            <Button
              onClick={handleProceed}
              className="mt-4 bg-[#FF6B6B] hover:bg-[#FF8E8E] text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-opacity-50"
            >
              {isProceeding ? (
                <div className="flex items-center justify-center">
                  <Cherry className="animate-spin h-5 w-5 mr-3" />
                  処理中 (Processing)
                </div>
              ) : (
                <>
                  Proceed <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Import wallet s */}

      <ImportWalletDailog
        showImport={showImport}
        handleImportSubmit={handleImportSubmit}
        isProcessing={isProcessing}
        setShowImport={setShowImport}
        publicKey={publicKey}
        setPublicKey={setPublicKey}
      />

      {/* show all Wallets modal */}

      <Dialog open={showAllWallets} onOpenChange={setShowAllWallets}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#1A202C]">
              All Wallets
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {wallets.map((wallet, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowKeysModalAllKeys(true)}
              >
                {wallet.nickname}
              </Button>
            ))}
            {showKeysModalAllKeys && (
              <ShowKeys
                classname={"sm:max-w-[425px]"}
                setShowKeysModal={setShowKeysModalAllKeys}
                privateKey={privateKey}
                publicKey={publicKey}
                copyPrivateKey={onCopy}
                copyPublicKey={onCopy}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* show secret phrase */}
      <Dialog open={showSecretPhrase} onOpenChange={setShowSecretPhrase}>
        <DialogContent className="sm:max-w-[550px] bg-white dark:bg-gray-600">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#1A202C] dark:text-gray-300">
              Your Secret Recovery Phrase
            </DialogTitle>
            <DialogDescription>
              Write down or copy these 12 mnemonics in order and keep them safe.
              Do not share them with anyone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2 py-4">
            {secretPhrase.split(" ").map((word, index) => (
              <div
                key={index}
                className="bg-[#FFF5F5] p-2 rounded-md text-center dark:bg-gray-700"
              >
                {word}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(secretPhrase);
                showNotification(
                  "Secret phrase copied to clipboard!",
                  "success"
                );
              }}
              className="flex items-center dark:bg-gray-500 dark:text-gray-200"
            >
              <Copy className="mr-2 h-4 w-4 " />
              Copy to Clipboard
            </Button>
            <Button
              onClick={handleSecretPhraseSaved}
              className="bg-[#FF6B6B] text-white"
            >
              I've Saved My Secret Phrase
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* show address of the wallet */}
      <Dialog open={showPublicKey} onOpenChange={setShowPublicKey}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#1A202C] dark:text-gray-200">
              Your Public Key
            </DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              This is your public address for receiving funds.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={publicKey}
              readOnly
              className="font-mono text-sm dark:bg-gray-900 dark:text-gray-200"
            />
          </div>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                wallets[wallets.length - 1]?.publicKey || ""
              );
              showNotification("Public key copied to clipboard!", "success");
            }}
            className="flex items-center dark:bg-gray-900 dark:text-gray-200"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Public Key
          </Button>
        </DialogContent>
      </Dialog>

      {/* show multiple public keys */}
      <Dialog
        open={showMultiplePublicKey}
        onOpenChange={setShowMultiplePublicKey}
      >
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#1A202C] dark:text-gray-300">
              Your Public Keys
            </DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              These are your wallet addresses for receiving funds.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 pb-0 ">
            <div className="py-7 font-semibold text-xl pl-8 pb-3 pt-0">
              Solana Address
            </div>
            <Input
              value={solAddressMultiWallet}
              readOnly
              className="border-gray-900 font-mono text-sm dark:bg-gray-800"
            />
            <div className="py-7 font-semibold text-xl pl-8 pb-3">
              Ethereum Address
            </div>
            <Input
              value={publicKey}
              readOnly
              className="font-mono border-gray-900 text-sm dark:bg-gray-800"
            />
          </div>
          <div className="grid grid-flow-col flex justify-around overflow-auto ">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(solAddressMultiWallet);
                showNotification("Public key copied to clipboard!", "success");
              }}
              className="flex items-center dark:bg-gray-900 dark:text-gray-200"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Sol Address
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(publicKey);
                showNotification("Public key copied to clipboard!", "success");
              }}
              className="flex items-center dark:bg-gray-900 dark:text-gray-200"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Eth Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification popups */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
