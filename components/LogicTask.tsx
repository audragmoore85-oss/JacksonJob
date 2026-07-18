"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";
import { AgeGroup, DifficultyConfig, PATTERN_PUZZLES } from "@/lib/gameData";
import { playCorrect, playWrong, playClick } from "@/lib/sounds";

interface Props {
  config: DifficultyConfig;
  ageGroup: AgeGroup;
  onComplete: (earnedStars: number) => void;
  onBack: () => void;
}

export default function LogicTask({ ageGroup, onComplete, onBack }: Props) {
  const puzzles = useMemo(() => PATTERN_PUZZLES[ageGroup], [ageGroup]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);

  const currentPuzzle = puzzles[currentIdx];

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedIdx(idx);
    const selected = currentPuzzle.options[idx];
    if (selected === currentPuzzle.answer) {
      setIsCorrect(true);
      setCorrectCount((prev: number) => prev + 1);
      playCorrect();
    } else {
      setIsCorrect(false);
      playWrong();
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedIdx(-1);
    if (currentIdx + 1 < puzzles.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      const total = correctCount;
      const stars = total >= puzzles.length * 0.9 ? 3 : total >= puzzles.length * 0.6 ? 2 : 1;
      playClick();
      onComplete(stars);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen p-4 md:p-8 flex flex-col items-center"
    >
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold">
          <ArrowLeft className="w-5 h-5" />
          Back to Desk
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-500">
            {currentIdx + 1}/{puzzles.length}
          </span>
          <div className="flex gap-1">
            {puzzles.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i < currentIdx ? "bg-kid-green" : i === currentIdx ? "bg-kid-orange" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="kid-card border-kid-purple w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-kid-purple text-center mb-2">
          📁 Filing Task - What comes next?
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-sm text-gray-500 text-center mb-4">
              Look at the pattern and pick what comes next:
            </p>

            <div className="flex justify-center items-center gap-2 mb-6 flex-wrap">
              {currentPuzzle.sequence.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-md border-2 border-gray-200"
                >
                  {item}
                </motion.div>
              ))}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-14 h-14 bg-kid-yellow/30 rounded-xl flex items-center justify-center text-2xl font-bold border-2 border-kid-yellow border-dashed"
              >
                ?
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {currentPuzzle.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showResult}
                  onClick={() => handleAnswer(idx)}
                  className={`p-4 rounded-2xl text-2xl font-bold border-4 transition-all ${
                    showResult
                      ? option === currentPuzzle.answer
                        ? "bg-kid-green/20 border-kid-green"
                        : idx === selectedIdx
                        ? "bg-red-100 border-red-400"
                        : "bg-white border-gray-200 opacity-50"
                      : "bg-white border-gray-200 hover:border-kid-purple"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`text-center p-3 rounded-xl mt-4 ${isCorrect ? "bg-kid-green/20" : "bg-red-100"}`}
              >
                <p className={`font-bold flex items-center justify-center gap-2 ${isCorrect ? "text-kid-green" : "text-red-500"}`}>
                  {isCorrect ? <><Check className="w-5 h-5" /> Correct!</> : <><X className="w-5 h-5" /> The answer was {currentPuzzle.answer}</>}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {showResult && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleNext}
            className="kid-button bg-kid-green hover:bg-green-600 w-full mt-3"
          >
            {currentIdx + 1 < puzzles.length ? "Next Pattern" : "Finish Task"}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
