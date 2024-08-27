import { useState } from "react";

export function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#f0f0f0]">
      <aside
        className={`flex flex-col border-r bg-[#ffffff] p-4 transition-all duration-500 ease-in-out ${
          isOpen ? "w-64 sm:flex" : "w-0 sm:w-16"
        }`}
      >
        <div className="flex items-center gap-2 py-4">
          <div className="h-8 w-8 rounded-full bg-[#8c1aff] text-lg font-semibold text-white">
            C
          </div>
          <span
            className={`text-lg font-semibold text-[#333333] transition-opacity duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Crypto Wallet
          </span>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-[#666666] transition-colors hover:bg-[#f0f0f0] hover:text-[#333333]"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5" />
            <span
              className={`text-sm transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Overview
            </span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-[#666666] transition-colors hover:bg-[#f0f0f0] hover:text-[#333333]"
            prefetch={false}
          >
            <ActivityIcon className="h-5 w-5" />
            <span
              className={`text-sm transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Transactions
            </span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 bg-[#f0f0f0] text-[#333333]"
            prefetch={false}
          >
            <WalletIcon className="h-5 w-5" />
            <span
              className={`text-sm transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Wallet
            </span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-[#666666] transition-colors hover:bg-[#f0f0f0] hover:text-[#333333]"
            prefetch={false}
          >
            <SettingsIcon className="h-5 w-5" />
            <span
              className={`text-sm transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Settings
            </span>
          </Link>
        </nav>
      </aside>
      <div className="flex-1">
        <button
          className="fixed top-4 left-4 z-10 rounded-md bg-[#8c1aff] p-2 text-white transition-colors hover:bg-[#7315e6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7315e6]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <VolumeXIcon className="h-5 w-5" />
          <span className="sr-only">{isOpen ? "Close" : "Open"} menu</span>
        </button>
      </div>
    </div>
  );
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function VolumeXIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
