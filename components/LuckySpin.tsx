"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { playClick, playCorrect, playWrong } from "@/lib/sounds";

interface SpinReward {
  emoji: string;
  label: string;
  stars: number;
  color: string;
}

const REWARDS: SpinReward[] = [
  { emoji: "⭐", label: "1 Star", stars: 1, color: "#FFD93D" },
  { emoji: "🌟", label: "2 Stars", stars: 2, color: "#FF8C42" },
  { emoji: "💫", label: "3 Stars", stars: 3, color: "#FF6B9D" },
  { emoji: "🎁", label: "5 Stars!", stars: 5, color: "#A86BE0" },
  { emoji: "✨", label: "1 Star", stars: 1, color: "#4A90D9" },
  { emoji: "🪙", label: "2 Stars", stars: 2, color: "#6BCB77" },
  { emoji: "💎", label: "3 Stars", stars: 3, color: "#FF6B9D" },
  { emoji: "🎉", label: "Try Again", stars: 0, color: "#FFD93D" },
];

interface Props {
  onReward: (stars: number) => void;
  onClose: () => void;
  canSpin: boolean;
}

export default function LuckySpin({ onReward, onClose, canSpin }: Props) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<SpinReward | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const spinRef = useRef(0);

  const segmentAngle = 360 / REWARDS.length;

  const handleSpin = () => {
    if (spinning || !canSpin || hasSpun) return;
    setSpinning(true);
    setResult(null);
    playClick();

    const winningIndex = Math.floor(Math.random() * REWARDS.length);
    const targetAngle = 360 * 5 + (360 - winningIndex * segmentAngle - segmentAngle / 2);
    const newRotation = spinRef.current + targetAngle;
    spinRef.current = newRotation;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setHasSpun(true);
      const reward = REWARDS[winningIndex];
      setResult(reward);

      if (reward.stars > 0) {
        playCorrect();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#FFD93D", "#6BCB77", "#4A90D9", "#FF6B9D", "#A86BE0"],
        });
        onReward(reward.stars);
      } else {
        playWrong();
      }
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 50 }}
        className="bg-gradient-to-b from-indigo-900 to-purple-900 rounded-3xl p-6 md:p-8 max-w-md w-full mx-4 border-4 border-yellow-400/50 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Daily Lucky Spin!</h2>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-center text-white/70 text-sm mb-4">
          {canSpin ? "Spin the wheel for free stars! One spin per day." : "Come back tomorrow for another spin!"}
        </p>

        {/* Wheel */}
        <div className="relative w-64 h-64 mx-auto mb-4">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 text-2xl">
            🔽
          </div>

          {/* Wheel body */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-4 border-yellow-400 overflow-hidden"
            style={{ boxShadow: "0 0 30px rgba(255, 217, 61, 0.5)" }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {REWARDS.map((reward, i) => {
                const startAngle = i * segmentAngle - 90;
                const endAngle = (i + 1) * segmentAngle - 90;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const x1 = 100 + 100 * Math.cos(startRad);
                const y1 = 100 + 100 * Math.sin(startRad);
                const x2 = 100 + 100 * Math.cos(endRad);
                const y2 = 100 + 100 * Math.sin(endRad);
                const midAngle = (startAngle + endAngle) / 2;
                const midRad = (midAngle * Math.PI) / 180;
                const textX = 100 + 60 * Math.cos(midRad);
                const textY = 100 + 60 * Math.sin(midRad);

                return (
                  <g key={i}>
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                      fill={reward.color}
                      stroke="#fff"
                      strokeWidth="1"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="20"
                    >
                      {reward.emoji}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>

          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center text-xl z-10">
            🎯
          </div>
        </div>

        {/* Spin Button */}
        <motion.button
          whileHover={canSpin && !hasSpun ? { scale: 1.05 } : {}}
          whileTap={canSpin && !hasSpun ? { scale: 0.95 } : {}}
          disabled={!canSpin || spinning || hasSpun}
          onClick={handleSpin}
          className={`w-full py-3 rounded-2xl font-bold text-lg transition-all ${
            canSpin && !hasSpun && !spinning
              ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {spinning ? "Spinning..." : hasSpun ? "Already Spun Today!" : "SPIN! 🎡"}
        </motion.button>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-4 text-center"
            >
              {result.stars > 0 ? (
                <div className="bg-yellow-400/20 rounded-xl p-3 border-2 border-yellow-400/50">
                  <p className="text-3xl mb-1">{result.emoji}</p>
                  <p className="text-white font-bold text-lg">
                    You won {result.stars} star{result.stars > 1 ? "s" : ""}! {result.emoji}
                  </p>
                </div>
              ) : (
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-3xl mb-1">{result.emoji}</p>
                  <p className="text-white/80 font-bold">Better luck next time!</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
