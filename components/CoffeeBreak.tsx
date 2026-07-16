"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { COFFEE_BREAK_ITEMS } from "@/lib/gameData";
import { playClick, playPop } from "@/lib/sounds";

interface Props {
  onComplete: () => void;
}

export default function CoffeeBreak({ onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [collected, setCollected] = useState<string[]>([]);
  const [targetItem, setTargetItem] = useState(COFFEE_BREAK_ITEMS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  useEffect(() => {
    const remaining = COFFEE_BREAK_ITEMS.filter((item) => !collected.includes(item.id));
    if (remaining.length > 0) {
      setTargetItem(remaining[Math.floor(Math.random() * remaining.length)]);
    }
  }, [collected]);

  const handleClick = (itemId: string) => {
    if (itemId === targetItem.id) {
      setCollected((prev) => [...prev, itemId]);
      playPop();
    } else {
      playClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-kid-cream/95 p-6"
    >
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-kid-orange">☕ Coffee Break!</h2>
          <div className="flex items-center gap-2">
            <motion.div
              key={timeLeft}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className={`text-3xl font-bold ${timeLeft <= 5 ? "text-red-500" : "text-kid-orange"}`}
            >
              {timeLeft}s
            </motion.div>
            <button onClick={onComplete} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 mb-4 text-center shadow-lg">
          <p className="text-sm text-gray-500 mb-2">Grab the item shown below!</p>
          <motion.div
            key={targetItem.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-5xl mb-1"
          >
            {targetItem.emoji}
          </motion.div>
          <p className="font-bold text-gray-700">{targetItem.name}</p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {COFFEE_BREAK_ITEMS.map((item) => {
            const isCollected = collected.includes(item.id);
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => !isCollected && handleClick(item.id)}
                disabled={isCollected}
                className={`aspect-square rounded-2xl flex items-center justify-center text-4xl border-4 transition-all ${
                  isCollected
                    ? "bg-kid-green/20 border-kid-green opacity-50"
                    : "bg-white border-gray-200 hover:border-kid-orange shadow-md"
                }`}
              >
                {isCollected ? "✅" : item.emoji}
              </motion.button>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Collected: {collected.length}/{COFFEE_BREAK_ITEMS.length}
        </p>
      </div>
    </motion.div>
  );
}
