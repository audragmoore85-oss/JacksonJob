"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { AgeGroup, generateDailyQuiz, DailyQuizQuestion } from "@/lib/gameData";
import { playCorrect, playWrong, playClick } from "@/lib/sounds";

interface Props {
  ageGroup: AgeGroup;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

export default function DailyQuiz({ ageGroup, onComplete, onBack }: Props) {
  const questions = useMemo(() => generateDailyQuiz(ageGroup), [ageGroup]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIdx];

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === current.answer;
      if (isCorrect) {
        playCorrect();
        setCorrectCount((c) => c + 1);
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } else {
        playWrong();
      }
      setTimeout(() => {
        setShowResult(true);
      }, 600);
    }
  }, [selectedAnswer, current]);

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setFinished(true);
      const stars = correctCount >= questions.length ? 3 : correctCount >= questions.length - 1 ? 2 : 1;
      if (correctCount >= questions.length - 1) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
      setTimeout(() => onComplete(stars), 2000);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  if (finished) {
    const stars = correctCount >= questions.length ? 3 : correctCount >= questions.length - 1 ? 2 : 1;
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md"
        >
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-3xl font-bold text-kid-orange mb-2">Quiz Complete!</h2>
          <p className="text-lg text-gray-600 mb-4">
            You got {correctCount} out of {questions.length} correct!
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.2, type: "spring" }}
              >
                <Star className={`w-12 h-12 ${i <= stars ? "fill-kid-yellow text-kid-yellow" : "fill-gray-200 text-gray-200"}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => { playClick(); onBack(); }}
            className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="font-bold text-gray-700">Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-kid-orange">🎓 Daily Quiz</h1>
          <div className="bg-white rounded-full px-4 py-2 shadow-md">
            <span className="font-bold text-gray-700">{currentIdx + 1}/{questions.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-full h-3 shadow-inner mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-kid-orange rounded-full"
            animate={{ width: `${((currentIdx) / questions.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">{current.emoji}</span>
              <span className="bg-kid-orange/10 text-kid-orange text-xs font-bold px-3 py-1 rounded-full">
                {current.category}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              {current.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === current.answer;
                const showCorrect = showResult && isCorrect;
                const showWrong = isSelected && !isCorrect && showResult;

                return (
                  <motion.button
                    key={idx}
                    onClick={() => { if (selectedAnswer === null) { playClick(); setSelectedAnswer(idx); } }}
                    disabled={selectedAnswer !== null}
                    whileHover={selectedAnswer === null ? { scale: 1.03 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
                    className={`py-4 px-4 rounded-2xl font-bold text-lg shadow-md transition-all flex items-center justify-between ${
                      showCorrect
                        ? "bg-green-300 text-white"
                        : showWrong
                        ? "bg-red-300 text-white"
                        : isSelected
                        ? "bg-kid-orange text-white ring-4 ring-kid-orange/30"
                        : "bg-gray-50 text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    {option}
                    {showCorrect && <Check className="w-5 h-5" />}
                    {showWrong && <X className="w-5 h-5" />}
                  </motion.button>
                );
              })}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <p className={`font-bold text-lg mb-3 ${selectedAnswer === current.answer ? "text-green-600" : "text-red-500"}`}>
                  {selectedAnswer === current.answer ? "✅ Correct!" : `❌ Answer: ${current.options[current.answer]}`}
                </p>
                <button
                  onClick={() => { playClick(); handleNext(); }}
                  className="bg-kid-orange text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                  {currentIdx + 1 >= questions.length ? "See Results" : "Next Question"}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
