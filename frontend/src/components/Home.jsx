import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingTexts = [
  "Defy the Limits.",
  "Choose Your Agent.",
  "Plant the Spike.",
  "Clutch or Kick.",
  "Welcome to VALORANT.",
];

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex + 1) % rotatingTexts.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900 text-white p-6">
      <div className="text-center max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.h1
            key={rotatingTexts[currentTextIndex]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg"
          >
            {rotatingTexts[currentTextIndex]}
          </motion.h1>
        </AnimatePresence>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300">
          Dive into the tactical world of VALORANT — find guides, tips, agents
          info, and more.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#agents" className="w-full sm:w-auto">
            <button className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl text-base md:text-lg font-semibold shadow-lg transition-all">
              Explore Agents
            </button>
          </a>
          <a href="#highlights" className="w-full sm:w-auto">
            <button className="w-full bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-2xl text-base md:text-lg font-semibold shadow-lg transition-all">
              Watch Highlights
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
