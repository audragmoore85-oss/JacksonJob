"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { DifficultyConfig } from "@/lib/gameData";
import { playCorrect } from "@/lib/sounds";

interface Props {
  config: DifficultyConfig;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

export default function TypingTask({ config, onComplete, onBack }: Props) {
  const [mode, setMode] = useState<"words" | "sentences">("words");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = mode === "words" ? config.typingWords : config.typingSentences;
  const totalRounds = mode === "words" ? 5 : 3;
  const currentItem = items[currentIdx % items.length];

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIdx, mode]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    if (val.toLowerCase().trim() === currentItem.toLowerCase().trim()) {
      setFeedback("correct");
      setCompleted((prev) => [...prev, currentItem]);
      playCorrect();
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#FFD93D", "#6BCB77", "#4A90D9"],
      });

      setTimeout(() => {
        if (completed.length + 1 >= totalRounds) {
          const accuracy = totalKeystrokes > 0 ? correctKeystrokes / totalKeystrokes : 1;
          const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1;
          onComplete(stars);
        } else {
          setCurrentIdx((prev) => prev + 1);
          setInput("");
          setFeedback("idle");
        }
      }, 800);
    } else if (currentItem.toLowerCase().startsWith(val.toLowerCase()) && val.length > 0) {
      setFeedback("idle");
      setTotalKeystrokes((prev) => prev + 1);
      setCorrectKeystrokes((prev) => prev + 1);
    } else if (val.length >= currentItem.length) {
      setFeedback("wrong");
      setTotalKeystrokes((prev) => prev + 1);
    } else {
      setFeedback("idle");
      setTotalKeystrokes((prev) => prev + 1);
      const matchCount = val.split("").filter((c, i) => c.toLowerCase() === currentItem[i]?.toLowerCase()).length;
      setCorrectKeystrokes((prev) => prev + (matchCount > correctKeystrokes % currentItem.length ? 1 : 0));
    }
  };

  const renderColoredText = () => {
    const target = currentItem;
    const typed = input;
    const chars = target.split("").map((char, i) => {
      const typedChar = typed[i];
      let color = "text-gray-300";
      if (typedChar !== undefined) {
        color = typedChar.toLowerCase() === char.toLowerCase() ? "text-kid-green" : "text-red-400";
      }
      return (
        <span key={i} className={color}>
          {char}
        </span>
      );
    });
    return chars;
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
          {Array.from({ length: totalRounds }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < completed.length
                  ? "bg-kid-blue text-white"
                  : i === completed.length
                  ? "bg-kid-blue text-white animate-pulse"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {i < completed.length ? "✓" : i + 1}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        animate={feedback === "wrong" ? { x: [-10, 10, -10, 10, 0] } : {}}
        className="kid-card border-kid-blue w-full max-w-2xl"
      >
        <div className="text-center mb-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl mb-2"
          >
            ⌨️
          </motion.div>
          <h2 className="text-2xl font-bold text-kid-blue">Typing Task</h2>
          <p className="text-gray-500 text-sm">Type {totalRounds} {mode === "words" ? "words" : "sentences"} correctly!</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 justify-center mb-6">
          <button
            onClick={() => { setMode("words"); setCurrentIdx(0); setInput(""); setCompleted([]); setFeedback("idle"); }}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              mode === "words" ? "bg-kid-blue text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            Words
          </button>
          <button
            onClick={() => { setMode("sentences"); setCurrentIdx(0); setInput(""); setCompleted([]); setFeedback("idle"); }}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              mode === "sentences" ? "bg-kid-blue text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            Sentences
          </button>
        </div>

        {/* Target Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-kid-cream rounded-2xl p-6 mb-4 text-center"
          >
            <p className="text-3xl md:text-4xl font-bold tracking-wide" style={{ fontFamily: "monospace" }}>
              {renderColoredText()}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Input */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInput}
            disabled={feedback === "correct"}
            placeholder="Start typing here..."
            className={`w-full px-4 py-4 rounded-xl border-4 text-2xl font-bold text-center transition-all focus:outline-none ${
              feedback === "correct"
                ? "border-kid-green bg-green-50 text-kid-green"
                : feedback === "wrong"
                ? "border-red-400 bg-red-50 text-red-500"
                : "border-kid-blue bg-white text-gray-800"
            }`}
            style={{ fontFamily: "monospace" }}
          />
          {feedback === "correct" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl"
            >
              ✅
            </motion.div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-500">Progress</span>
            <span className="text-sm font-bold text-gray-500">
              {completed.length} / {totalRounds}
              {totalKeystrokes > 0 && (
                <span className="ml-2 text-kid-blue">
                  ({Math.round((correctKeystrokes / totalKeystrokes) * 100)}% accuracy)
                </span>
              )}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              animate={{ width: `${(completed.length / totalRounds) * 100}%` }}
              className="h-full bg-kid-blue rounded-full"
            />
          </div>
        </div>

        {/* Completed Words */}
        {completed.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {completed.map((word, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-kid-green/20 text-kid-green px-3 py-1 rounded-lg text-sm font-bold"
              >
                {word} ✓
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
