import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardCard({ title, value, icon }) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="mr-4 bg-red-100 dark:bg-red-900 rounded-full p-3">
        {icon}
      </div>
      <div>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </motion.div>
  );
}

export function CryptoRow({ name, type, iconPath, balance, value, onClick }) {
  return (
    <motion.tr
      className="border-b dark:border-gray-700 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <td className="py-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 overflow-hidden">
            <img src={iconPath} alt="" />
          </div>
          <span>
            {name} ({type})
          </span>
        </div>
      </td>
      <td className="text-right py-2">{balance}</td>
      <td className="text-right py-2">{value}</td>
    </motion.tr>
  );
}

export function Transaction({ type, amount, recipient, sender }) {
  const isReceived = type === "received";
  return (
    <motion.div
      className="flex items-center justify-between"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isReceived
              ? "bg-green-100 dark:bg-green-900"
              : "bg-red-100 dark:bg-red-900"
          }`}
        >
          {isReceived ? (
            <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
          )}
        </div>
        <div className="ml-2">
          <p className="text-sm font-medium">
            {isReceived ? "Received" : "Sent"}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {isReceived ? `From ${sender}` : `To ${recipient}`}
          </p>
        </div>
      </div>
      <p className="text-sm font-medium">{amount}</p>
    </motion.div>
  );
}

export function QuickActionButton({ label, icon, onClick }) {
  return (
    <motion.button
      className="bg-white  dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:bg-red-200 dark:hover:bg-gray-700 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {icon}
      <span className="mt-2 text-sm">{label}</span>
    </motion.button>
  );
}
