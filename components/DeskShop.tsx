"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Star, CheckCircle, Lock } from "lucide-react";
import { DESK_DECORATIONS } from "@/lib/gameData";

interface Props {
  stars: number;
  ownedDecorations: string[];
  onBuy: (decorationId: string, cost: number) => void;
  onBack: () => void;
}

export default function DeskShop({ stars, ownedDecorations, onBuy, onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen p-4 md:p-8 flex flex-col items-center"
    >
      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Desk
        </button>
        <div className="flex items-center gap-1 bg-white rounded-full px-4 py-2 shadow-md">
          <Star className="w-5 h-5 fill-kid-yellow text-kid-yellow" />
          <span className="font-bold text-gray-700">{stars}</span>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="kid-card border-kid-yellow w-full max-w-3xl"
      >
        <h2 className="text-3xl font-bold text-kid-orange text-center mb-2">
          🛒 Desk Decoration Shop
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Spend your hard-earned stars to decorate your desk!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DESK_DECORATIONS.map((item, idx) => {
            const owned = ownedDecorations.includes(item.id);
            const canAfford = stars >= item.cost;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl p-4 text-center border-4 transition-all ${
                  owned
                    ? "bg-kid-green/10 border-kid-green"
                    : canAfford
                    ? "bg-white border-kid-yellow hover:scale-105 cursor-pointer"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
                onClick={() => !owned && canAfford && onBuy(item.id, item.cost)}
              >
                <motion.div
                  animate={owned ? { scale: [1, 1.1, 1] } : { y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                  className="text-5xl mb-2"
                >
                  {item.emoji}
                </motion.div>
                <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                {owned ? (
                  <div className="flex items-center justify-center gap-1 text-kid-green font-bold text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Owned
                  </div>
                ) : (
                  <div className={`flex items-center justify-center gap-1 font-bold text-sm ${canAfford ? "text-kid-orange" : "text-gray-400"}`}>
                    {canAfford ? <Star className="w-4 h-4 fill-kid-yellow text-kid-yellow" /> : <Lock className="w-4 h-4" />}
                    {item.cost} stars
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
