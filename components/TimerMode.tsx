"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Check, X, Zap, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { AgeGroup, TIMER_DURATIONS, generateQuickTask, QuickTask } from "@/lib/gameData";
import { playCorrect, playWrong, playClick } from "@/lib/sounds";

interface Props {
  ageGroup: AgeGroup;
  onComplete: (stars: number, solvedCount: number) => void;
  onBack: () => void;
}

export default function TimerMode({ ageGroup, onComplete, onBack }: Props) {
  const duration = TIMER_DURATIONS[ageGroup];
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentTask, setCurrentTask] = useState<QuickTask>(() => generateQuickTask(ageGroup));
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleTimeUp = useCallback(() => {
    setPhase("done");
    playClick();
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev: number) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, timeLeft, handleTimeUp]);

  const handleAnswer = (option: string) => {
    if (showResult || phase !== "playing") return;
    setSelected(option);
    setShowResult(true);

    if (option === currentTask.answer) {
      setSolvedCount((prev: number) => prev + 1);
      setStreak((prev: number) => prev + 1);
      playCorrect();
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#FFD93D", "#6BCB77", "#4A90D9", "#FF6B9D"],
      });
    } else {
      setWrongCount((prev: number) => prev + 1);
      setStreak(0);
      playWrong();
    }

    setTimeout(() => {
      setCurrentTask(generateQuickTask(ageGroup));
      setSelected(null);
      setShowResult(false);
    }, 600);
  };

  const handleStart = () => {
    playClick();
    setPhase("playing");
    setTimeLeft(duration);
    setSolvedCount(0);
    setWrongCount(0);
    setStreak(0);
    setSelected(null);
    setShowResult(false);
    setCurrentTask(generateQuickTask(ageGroup));
  };

  const handleFinish = () => {
    const stars = solvedCount >= 10 ? 3 : solvedCount >= 6 ? 2 : solvedCount >= 1 ? 1 : 0;
    onComplete(stars, solvedCount);
  };

  const handleExit = () => {
    playClick();
    onBack();
  };

  if (phase === "ready") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center"
      >
        <div className="w-full max-w-2xl flex items-center justify-between mb-4 absolute top-4 left-4 right-4">
          <button onClick={handleExit} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold">
            <ArrowLeft className="w-5 h-5" />
            Back to Desk
          </button>
        </div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="kid-card border-kid-pink text-center max-w-md w-full"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            ⏱️
          </motion.div>
          <h2 className="text-3xl font-bold text-kid-pink mb-2">Timer Mode!</h2>
          <p className="text-gray-600 mb-4">
            Answer as many Quick Tasks as you can before time runs out!
          </p>
          <div className="bg-kid-pink/10 rounded-2xl p-4 mb-4 border-2 border-kid-pink/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-kid-pink" />
              <span className="font-bold text-kid-pink text-lg">{duration} seconds</span>
            </div>
            <p className="text-sm text-gray-500">
              Mix of math, words, and logic puzzles. Fast and fun!
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-kid-yellow text-kid-yellow" />
              <span className="font-bold text-gray-600">10+ = 3 stars</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-kid-yellow text-kid-yellow" />
              <span className="font-bold text-gray-600">6+ = 2 stars</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-kid-yellow text-kid-yellow" />
              <span className="font-bold text-gray-600">1+ = 1 star</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="kid-button bg-kid-pink hover:bg-pink-600 w-full"
          >
            <span className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Start Timer!
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  if (phase === "done") {
    const stars = solvedCount >= 10 ? 3 : solvedCount >= 6 ? 2 : solvedCount >= 1 ? 1 : 0;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="kid-card border-kid-pink text-center max-w-md w-full"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            {stars > 0 ? "🎉" : "⏰"}
          </motion.div>
          <h2 className="text-3xl font-bold text-kid-pink mb-2">
            {stars > 0 ? "Time's Up!" : "Time's Up!"}
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            You solved <span className="font-bold text-kid-pink">{solvedCount}</span> Quick Task{solvedCount !== 1 ? "s" : ""}!
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.2, type: "spring" }}
              >
                <Star
                  className={`w-10 h-10 ${
                    i <= stars ? "fill-kid-yellow text-kid-yellow" : "fill-gray-200 text-gray-200"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-3 mb-4">
            <div className="flex justify-around text-sm">
              <div>
                <p className="font-bold text-kid-green">✓ {solvedCount}</p>
                <p className="text-xs text-gray-500">Correct</p>
              </div>
              <div>
                <p className="font-bold text-red-400">✗ {wrongCount}</p>
                <p className="text-xs text-gray-500">Wrong</p>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinish}
            className="kid-button bg-kid-green hover:bg-green-600 w-full"
          >
            Back to Desk 🖥️
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen p-4 md:p-8 flex flex-col items-center"
    >
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <button onClick={handleExit} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold">
          <ArrowLeft className="w-5 h-5" />
          Quit
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-md">
            <span className="text-sm font-bold text-kid-green">✓ {solvedCount}</span>
          </div>
          <div className={`flex items-center gap-1 rounded-full px-4 py-1 shadow-md ${
            timeLeft <= 10 ? "bg-red-500 text-white animate-pulse" : "bg-kid-pink text-white"
          }`}>
            <Clock className="w-4 h-4" />
            <span className="font-bold text-lg">{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full max-w-2xl mb-4">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${(timeLeft / duration) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
            className={`h-full rounded-full ${timeLeft <= 10 ? "bg-red-500" : "bg-kid-pink"}`}
          />
        </div>
      </div>

      {/* Quick Task Card */}
      <motion.div
        key={`task-${solvedCount}-${wrongCount}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="kid-card border-kid-pink w-full max-w-2xl"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-5xl mb-2"
          >
            {currentTask.emoji}
          </motion.div>
          <h2 className="text-2xl font-bold text-kid-pink mb-2">Quick Task!</h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-800">
            {currentTask.question}
          </p>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4">
          {currentTask.options.map((option, idx) => {
            const isCorrect = option === currentTask.answer;
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
                className={`py-6 px-4 rounded-2xl border-4 text-2xl font-bold transition-all ${buttonClass}`}
              >
                {option}
                {showResult && isCorrect && <Check className="inline-block ml-2 w-6 h-6" />}
                {showResult && isSelected && !isCorrect && <X className="inline-block ml-2 w-6 h-6" />}
              </motion.button>
            );
          })}
        </div>

        {/* Streak indicator */}
        {streak >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-1 mt-4 text-kid-orange font-bold"
          >
            <Zap className="w-4 h-4" />
            <span>{streak} in a row! 🔥</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
