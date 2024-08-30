import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type DashboardCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

type CryptoRowProps = {
  name: string;
  type: string;
  iconPath: string;
  balance: number | string;
  value: string;
  onClick: () => void;
};

type TransactionProps = {
  type: string;
  amount: string;
  recipient: string;
  sender: string;
};

type QuickActionButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export function DashboardCard({ title, value, icon }: DashboardCardProps) {
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

export function CryptoRow({
  name,
  type,
  iconPath,
  balance,
  value,
  onClick,
}: CryptoRowProps) {
  return (
    <motion.tr
      className="border-b dark:border-gray-700 cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        backgroundColor: "rgba(255, 99, 71, 0.1)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <td className="py-2">
        <div className="flex items-center">
          <motion.div
            className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src={iconPath}
              alt={`${name} icon`}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <span className="group-hover:text-red-500 transition-colors duration-200">
            {type} ({name})
          </span>
        </div>
      </td>
      <td className="text-right py-2 group-hover:text-red-500 transition-colors duration-200">
        {balance}
      </td>
      <td className="text-right py-2 group-hover:text-red-500 transition-colors duration-200">
        {value}
      </td>
    </motion.tr>
  );
}

export function Transaction({
  type,
  amount,
  recipient,
  sender,
}: TransactionProps) {
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

export function QuickActionButton({
  label,
  icon,
  onClick,
}: QuickActionButtonProps) {
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
