import { motion } from "framer-motion";

export default function BackgroundKanji() {
  const backgroundKanjis = ["桜", "暗号", "安全", "速い", "信頼", "美"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {backgroundKanjis.map((kanji, index) => (
        <motion.div
          key={index}
          className="absolute text-6xl md:text-8xl font-bold text-gray-200 dark:text-gray-800 opacity-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 0.1,
            scale: 1,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 2,
          }}
        >
          {kanji}
        </motion.div>
      ))}
    </div>
  );
}
