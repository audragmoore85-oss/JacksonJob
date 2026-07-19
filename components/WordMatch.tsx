"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { AgeGroup, generateWordMatchSet, WordMatchPair } from "@/lib/gameData";
import { playCorrect, playWrong, playClick } from "@/lib/sounds";

interface Props {
  ageGroup: AgeGroup;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

export default function WordMatch({ ageGroup, onComplete, onBack }: Props) {
  const pairs = useMemo(() => generateWordMatchSet(ageGroup), [ageGroup]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<{ word: string; emoji: string } | null>(null);
  const [attempts, setAttempts] = useState(0);

  const shuffledWords = useMemo(() => [...pairs].sort(() => Math.random() - 0.5), [pairs]);
  const shuffledEmojis = useMemo(() => [...pairs].sort(() => Math.random() - 0.5), [pairs]);

  useEffect(() => {
    if (selectedWord && selectedEmoji) {
      setAttempts((a) => a + 1);
      if (selectedWord === selectedEmoji) {
        playCorrect();
        setMatched((prev) => [...prev, selectedWord]);
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } else {
        playWrong();
        setWrongPair({ word: selectedWord, emoji: selectedEmoji });
      }
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedEmoji(null);
        setWrongPair(null);
      }, 800);
    }
  }, [selectedWord, selectedEmoji]);

  const allMatched = matched.length === pairs.length;

  useEffect(() => {
    if (allMatched) {
      const stars = attempts <= pairs.length ? 3 : attempts <= pairs.length + 2 ? 2 : 1;
      setTimeout(() => onComplete(stars), 1500);
    }
  }, [allMatched, attempts, pairs.length, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-purple-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => { playClick(); onBack(); }}
            className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="font-bold text-gray-700">Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-kid-purple">🔤 Word Match</h1>
          <div className="bg-white rounded-full px-4 py-2 shadow-md">
            <span className="font-bold text-gray-700">{matched.length}/{pairs.length}</span>
          </div>
        </div>

        <p className="text-center text-gray-600 mb-6">Match each word with its emoji!</p>

        {allMatched && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center text-6xl mb-4"
          >
            🎉
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <div className="space-y-3">
            <h3 className="text-center font-bold text-gray-500 text-sm">Words</h3>
            {shuffledWords.map((pair) => {
              const isMatched = matched.includes(pair.word);
              const isSelected = selectedWord === pair.word;
              const isWrong = wrongPair?.word === pair.word;
              return (
                <motion.button
                  key={pair.word}
                  onClick={() => { if (!isMatched && !selectedWord) { playClick(); setSelectedWord(pair.word); } }}
                  disabled={isMatched}
                  whileHover={!isMatched ? { scale: 1.05 } : {}}
                  whileTap={!isMatched ? { scale: 0.95 } : {}}
                  className={`w-full py-4 px-4 rounded-2xl font-bold text-lg shadow-md transition-all ${
                    isMatched
                      ? "bg-green-200 text-green-600 opacity-50"
                      : isWrong
                      ? "bg-red-300 text-white"
                      : isSelected
                      ? "bg-kid-purple text-white ring-4 ring-kid-purple/30"
                      : "bg-white text-gray-700 hover:bg-purple-50"
                  }`}
                >
                  {isMatched ? <Check className="w-5 h-5 mx-auto" /> : pair.word}
                </motion.button>
              );
            })}
          </div>

          <div className="space-y-3">
            <h3 className="text-center font-bold text-gray-500 text-sm">Emojis</h3>
            {shuffledEmojis.map((pair) => {
              const isMatched = matched.includes(pair.word);
              const isSelected = selectedEmoji === pair.word;
              const isWrong = wrongPair?.emoji === pair.word;
              return (
                <motion.button
                  key={pair.word + "_emoji"}
                  onClick={() => { if (!isMatched && !selectedEmoji) { playClick(); setSelectedEmoji(pair.word); } }}
                  disabled={isMatched}
                  whileHover={!isMatched ? { scale: 1.05 } : {}}
                  whileTap={!isMatched ? { scale: 0.95 } : {}}
                  className={`w-full py-4 px-4 rounded-2xl text-3xl shadow-md transition-all ${
                    isMatched
                      ? "bg-green-200 opacity-50"
                      : isWrong
                      ? "bg-red-300"
                      : isSelected
                      ? "bg-kid-blue ring-4 ring-kid-blue/30"
                      : "bg-white hover:bg-blue-50"
                  }`}
                >
                  {isMatched ? "✅" : pair.emoji}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
