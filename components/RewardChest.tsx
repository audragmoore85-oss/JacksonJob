"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { playClick, playCorrect } from "@/lib/sounds";

interface Props {
  onOpen: (stars: number) => void;
  onDismiss: () => void;
}

export default function RewardChest({ onOpen, onDismiss }: Props) {
  const [opened, setOpened] = useState(false);
  const [stars, setStars] = useState(0);

  const handleOpen = () => {
    if (opened) return;
    const reward = Math.floor(Math.random() * 5) + 2;
    setStars(reward);
    setOpened(true);
    playCorrect();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#FFD93D", "#FF8C42", "#FF6B9D", "#A86BE0", "#4A90D9"],
    });
    onOpen(reward);
    setTimeout(() => onDismiss(), 3500);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 100, opacity: 0, scale: 0.5 }}
      className="fixed bottom-20 right-4 md:right-8 z-40"
    >
      <motion.div
        animate={opened ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: opened ? 0 : Infinity }}
        className="relative"
      >
        {/* Glow */}
        {!opened && (
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-yellow-400 blur-2xl"
          />
        )}

        {/* Chest */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpen}
          disabled={opened}
          className="relative text-6xl select-none"
        >
          <motion.div
            animate={opened ? { rotate: -30, y: -10 } : {}}
            transition={{ duration: 0.5 }}
          >
            {opened ? "🎉" : "🎁"}
          </motion.div>
        </motion.button>

        {/* Label */}
        {!opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg"
          >
            Tap to open! ✨
          </motion.div>
        )}

        {/* Result */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -40 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-4 py-2 rounded-full shadow-lg text-sm"
            >
              +{stars} ⭐ Stars!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
