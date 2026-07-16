"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, BookOpen, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { DifficultyConfig, ReadingPassage } from "@/lib/gameData";

interface Props {
  config: DifficultyConfig;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

export default function ReadingTask({ config, onComplete, onBack }: Props) {
  const passage: ReadingPassage =
    config.readingPassages[Math.floor(Math.random() * config.readingPassages.length)];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);

  const handleAnswer = (optionIdx: number) => {
    if (showResult) return;
    setSelected(optionIdx);
    setShowResult(true);

    const isCorrect = optionIdx === passage.questions[currentQuestion].answer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FFD93D", "#6BCB77", "#4A90D9", "#FF6B9D"],
      });
    } else {
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }

    setTimeout(() => {
      if (currentQuestion + 1 >= passage.questions.length) {
        const total = correctCount + (isCorrect ? 1 : 0);
        const stars = total >= passage.questions.length ? 3 : total >= Math.ceil(passage.questions.length / 2) ? 2 : 1;
        onComplete(stars);
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setSelected(null);
        setShowResult(false);
      }
    }, 1800);
  };

  const q = passage.questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen p-4 md:p-8 flex flex-col items-center"
    >
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Desk
        </button>
        <div className="flex items-center gap-2">
          {passage.questions.map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < currentQuestion
                  ? "bg-kid-green text-white"
                  : i === currentQuestion
                  ? "bg-kid-green text-white animate-pulse"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {i < currentQuestion ? "✓" : i + 1}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        animate={wrongShake ? { x: [-10, 10, -10, 10, 0] } : {}}
        className="kid-card border-kid-green w-full max-w-2xl"
      >
        <div className="text-center mb-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl mb-2"
          >
            📚
          </motion.div>
          <h2 className="text-2xl font-bold text-kid-green">Reading Report</h2>
        </div>

        {/* Passage */}
        <div className="bg-kid-cream rounded-2xl p-4 mb-6 max-h-48 overflow-y-auto">
          <h3 className="font-bold text-gray-700 mb-2 text-lg">{passage.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{passage.text}</p>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-lg font-bold text-gray-700 mb-4 text-center">
              {q.question}
            </p>

            <div className="space-y-3">
              {q.options.map((option, idx) => {
                const isCorrect = idx === q.answer;
                const isSelected = idx === selected;
                let buttonClass = "bg-white border-kid-blue text-gray-800 hover:bg-kid-blue hover:text-white";

                if (showResult) {
                  if (isCorrect) {
                    buttonClass = "bg-kid-green border-kid-green text-white";
                  } else if (isSelected) {
                    buttonClass = "bg-red-400 border-red-400 text-white";
                  } else {
                    buttonClass = "bg-gray-100 border-gray-200 text-gray-400";
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(idx)}
                    disabled={showResult}
                    className={`w-full py-4 px-4 rounded-xl border-4 text-lg font-bold transition-all flex items-center justify-between ${buttonClass}`}
                  >
                    <span>{option}</span>
                    {showResult && isCorrect && <Check className="w-5 h-5" />}
                    {showResult && isSelected && !isCorrect && <X className="w-5 h-5" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Score */}
        <div className="flex items-center justify-center gap-2 text-gray-600 mt-6">
          <Star className="w-5 h-5 fill-kid-yellow text-kid-yellow" />
          <span className="font-bold">{correctCount} correct so far!</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
