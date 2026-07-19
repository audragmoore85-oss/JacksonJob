"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { AgeGroup, generateMemoryCards } from "@/lib/gameData";
import { playCorrect, playWrong, playClick } from "@/lib/sounds";

interface Props {
  ageGroup: AgeGroup;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

export default function MemoryMatch({ ageGroup, onComplete, onBack }: Props) {
  const cards = useMemo(() => generateMemoryCards(ageGroup), [ageGroup]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves((m) => m + 1);
      const [i, j] = flipped;
      if (cards[i] === cards[j]) {
        playCorrect();
        setMatched((prev) => [...prev, i, j]);
        confetti({ particleCount: 20, spread: 40, origin: { y: 0.6 } });
        setFlipped([]);
      } else {
        playWrong();
        setWrongIndices([i, j]);
        setTimeout(() => {
          setFlipped([]);
          setWrongIndices([]);
        }, 900);
      }
    }
  }, [flipped, cards]);

  const allMatched = matched.length === cards.length;

  useEffect(() => {
    if (allMatched) {
      const perfect = cards.length / 2;
      const stars = moves <= perfect ? 3 : moves <= perfect + 2 ? 2 : 1;
      setTimeout(() => onComplete(stars), 1500);
    }
  }, [allMatched, moves, cards.length, onComplete]);

  const handleCardClick = (idx: number) => {
    if (flipped.length >= 2 || matched.includes(idx) || flipped.includes(idx)) return;
    playClick();
    setFlipped((prev) => [...prev, idx]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-teal-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => { playClick(); onBack(); }}
            className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="font-bold text-gray-700">Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-kid-green">🧠 Memory Match</h1>
          <div className="bg-white rounded-full px-4 py-2 shadow-md">
            <span className="font-bold text-gray-700">{moves} moves</span>
          </div>
        </div>

        <p className="text-center text-gray-600 mb-6">Flip cards to find matching pairs!</p>

        {allMatched && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center text-6xl mb-4"
          >
            🎉
          </motion.div>
        )}

        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {cards.map((emoji, idx) => {
            const isFlipped = flipped.includes(idx) || matched.includes(idx);
            const isMatched = matched.includes(idx);
            const isWrong = wrongIndices.includes(idx);
            return (
              <motion.button
                key={idx}
                onClick={() => handleCardClick(idx)}
                whileHover={!isFlipped ? { scale: 1.05 } : {}}
                whileTap={!isFlipped ? { scale: 0.95 } : {}}
                className="aspect-square rounded-2xl shadow-md flex items-center justify-center text-3xl md:text-5xl transition-all"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full rounded-2xl flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                      isWrong
                        ? "bg-red-300 text-white"
                        : isMatched
                        ? "bg-green-200"
                        : "bg-gradient-to-br from-kid-purple to-kid-blue text-white"
                    }`}
                  >
                    {isFlipped ? emoji : "?"}
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
