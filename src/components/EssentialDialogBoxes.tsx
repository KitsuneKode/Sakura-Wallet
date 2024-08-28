// Add all the essential daily box logics here from setupWallets

//@ts-nocheck

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const EssentialDailogBox = ({}) => {
  return (
    <>
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
    </>
  );
};

export default EssentialDailogBox;
