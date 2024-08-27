import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { ChevronDown, Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { useState } from "react";

interface Props {
  isProcessing: boolean;
  publicKey: string;
  setPublicKey: (value: string) => void;
  handleImportSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  showImport: boolean;
  setShowImport: (value: boolean) => void;
}

const ImportWalletDailog = ({
  isProcessing,
  publicKey,
  setPublicKey,
  handleImportSubmit,
  showImport,
  setShowImport,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState("ETH");

  const handleOptionSelect = (option: "ETH" | "SOL") => {
    setSelectedOption(option);
  };

  return (
    <>
      <Dialog open={showImport} onOpenChange={setShowImport}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader className="flex items-center justify-between">
            <div className="flex space-x-6">
              <div className="flex pt-1 pr-12">
                {/* Dropdown Menu for Wallet Options */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center bg-red-200  text-[#1A202C] hover:text-[#4A5568] border border-[#1A202C] rounded-md px-2 py-1">
                      {selectedOption} <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border border-[#1A202C]">
                    <DropdownMenuItem
                      onSelect={() => handleOptionSelect("ETH")}
                    >
                      ETH
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleOptionSelect("SOL")}
                    >
                      SOL
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <DialogTitle className="pr-8 text-2xl font-semibold text-[#1A202C]">
                Import Wallet
              </DialogTitle>
            </div>
          </DialogHeader>
          <DialogDescription className="text-[#4A5568]  pl-7 mt-4 ">
            Enter the private key of the wallet you want to import.
          </DialogDescription>

          <form onSubmit={handleImportSubmit}>
            <div className="grid gap-4 py-4 pt-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="importPublicKey"
                  className="text-right text-[#4A5568]"
                >
                  Private Key
                </Label>
                <Input
                  id="importPublicKey"
                  value={publicKey}
                  onChange={(e) => setPublicKey(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter private key"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isProcessing}
                className="bg-[#FF6B6B] hover:bg-[#FF8E8E] text-white"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  "Import Wallet"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportWalletDailog;
