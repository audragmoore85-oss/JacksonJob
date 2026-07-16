"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { DifficultyConfig, generateMathProblem, getRandomEncouragement } from "@/lib/gameData";
import { playCorrect, playWrong } from "@/lib/sounds";

interface Props {
  config: DifficultyConfig;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const TOTAL_QUESTIONS = 5;

export default function MathTask({ config, onComplete, onBack }: Props) {
  const [questionNum, setQuestionNum] = useState(0);
  const [problem, setProblem] = useState(() => generateMathProblem(config));
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [encouragement, setEncouragement] = useState("");

  const handleAnswer = (option: number) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);

    if (option === problem.answer) {
      setCorrectCount((prev) => prev + 1);
      setEncouragement(getRandomEncouragement());
      playCorrect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FFD93D", "#6BCB77", "#4A90D9", "#FF6B9D"],
      });
    } else {
      setWrongShake(true);
      playWrong();
      setTimeout(() => setWrongShake(false), 500);
    }

    setTimeout(() => {
      if (questionNum + 1 >= TOTAL_QUESTIONS) {
        const stars = correctCount + (option === problem.answer ? 1 : 0) >= TOTAL_QUESTIONS
          ? 3
          : correctCount + (option === problem.answer ? 1 : 0) >= 3
          ? 2
          : 1;
        onComplete(stars);
      } else {
        setQuestionNum((prev) => prev + 1);
        setProblem(generateMathProblem(config));
        setSelected(null);
        setShowResult(false);
      }
    }, 1800);
  };

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
          {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < questionNum
                  ? "bg-kid-green text-white"
                  : i === questionNum
                  ? "bg-kid-orange text-white animate-pulse"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {i < questionNum ? "✓" : i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Main Card */}
      <motion.div
        animate={wrongShake ? { x: [-10, 10, -10, 10, 0] } : {}}
        className="kid-card border-kid-orange w-full max-w-2xl"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-2"
          >
            🔢
          </motion.div>
          <h2 className="text-2xl font-bold text-kid-orange">Math Mission</h2>
          <p className="text-gray-500 text-sm">Question {questionNum + 1} of {TOTAL_QUESTIONS}</p>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={questionNum}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-8"
          >
            <div className="bg-kid-cream rounded-2xl py-8 px-4 mb-6">
              <p className="text-5xl md:text-6xl font-bold text-gray-800">
                {problem.question} = ?
              </p>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {problem.options.map((option, idx) => {
                const isCorrect = option === problem.answer;
                const isSelected = option === selected;
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
                    whileHover={!showResult ? { scale: 1.05 } : {}}
                    whileTap={!showResult ? { scale: 0.95 } : {}}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={`py-6 px-4 rounded-2xl border-4 text-3xl font-bold transition-all ${buttonClass}`}
                  >
                    {option}
                    {showResult && isCorrect && (
                      <Check className="inline-block ml-2 w-6 h-6" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <X className="inline-block ml-2 w-6 h-6" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Score */}
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Star className="w-5 h-5 fill-kid-yellow text-kid-yellow" />
          <span className="font-bold">{correctCount} correct so far!</span>
          {encouragement && showResult && (
            <span className="ml-2 text-kid-green font-bold animate-pop">{encouragement}!</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
