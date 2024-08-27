// Custom Notification component
type NotificationType = {
  message: string;
  type: "error" | "success";
  onClose: () => void;
};

import { useEffect } from "react";

const Notification = ({ message, type, onClose }: NotificationType) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-md z-300 ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white dark:bg-gray-800 `}
    >
      {message}
    </div>
  );
};

export default Notification;
