import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface LoadingAnimationProps {
  duration: number; // Duration in milliseconds
  onLoadingComplete: () => void;
}

export default function LoadingAnimation({
  duration,
  onLoadingComplete,
}: LoadingAnimationProps) {
  const [counter, setCounter] = useState(0);
  const ballAnimation = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 100) {
          clearInterval(interval);
          onLoadingComplete();
          return 100;
        }
        return prevCounter + 1;
      });
    }, duration / 100); // Divide duration by 100 to get the interval for each 1% increment

    return () => clearInterval(interval);
  }, [duration, onLoadingComplete]);

  useEffect(() => {
    const animateBall = async () => {
      while (true) {
        await ballAnimation.start({
          y: [0, -50, 0],
          transition: {
            duration: 0.8,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          },
        });
      }
    };
    animateBall();
  }, [ballAnimation]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-200 overflow-hidden">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 blur-xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={ballAnimation}
          className="w-4 h-4 bg-black rounded-full mb-2"
        />
        <div className="w-8 h-0.5 bg-black mb-8"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold font-light text-black"
        >
          {counter}
        </motion.div>
      </div>
    </div>
  );
}
