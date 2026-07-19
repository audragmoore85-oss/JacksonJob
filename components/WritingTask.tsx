"use client";

import { useState, useMemo, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Star, Lightbulb, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { AgeGroup, DifficultyConfig, getRandomWritingPrompt, WritingPrompt } from "@/lib/gameData";
import { playCorrect, playWrong, playClick } from "@/lib/sounds";

interface Props {
  config: DifficultyConfig;
  ageGroup: AgeGroup;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

export default function WritingTask({ ageGroup, onComplete, onBack }: Props) {
  const prompt = useMemo(() => getRandomWritingPrompt(ageGroup), [ageGroup]);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const sentenceCount = text.trim().split(/[.!?]+/).filter((s: string) => s.trim().length > 0).length;

  const meetsRequirements = wordCount >= prompt.minWords && sentenceCount >= prompt.minSentences;

  const handleSubmit = () => {
    if (submitted) return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (meetsRequirements) {
      setFeedback("correct");
      setSubmitted(true);
      playCorrect();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFD93D", "#6BCB77", "#4A90D9", "#FF6B9D"],
      });

      const stars = newAttempts === 1 ? 3 : newAttempts === 2 ? 2 : 1;
      setTimeout(() => onComplete(stars), 2500);
    } else {
      setFeedback("incorrect");
      playWrong();
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const handleWordBankClick = (word: string) => {
    if (submitted) return;
    setText((prev: string) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed} ${word} ` : `${word} `;
    });
    playClick();
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
        <div className="flex items-center gap-2 bg-kid-yellow/20 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 fill-kid-yellow text-kid-yellow" />
          <span className="font-bold text-sm">Writing Task</span>
        </div>
      </div>

      <motion.div
        animate={feedback === "incorrect" ? { x: [-10, 10, -10, 10, 0] } : {}}
        className="kid-card border-kid-pink w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-2"
          >
            {prompt.emoji}
          </motion.div>
          <h2 className="text-2xl font-bold text-kid-pink">{prompt.title}</h2>
        </div>

        {/* Picture Prompt */}
        <div className="bg-kid-cream rounded-2xl py-6 px-4 mb-4 text-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl md:text-6xl mb-2"
          >
            {prompt.picture}
          </motion.div>
          <p className="text-lg text-gray-700 font-bold">{prompt.prompt}</p>
        </div>

        {/* Word Bank */}
        <div className="mb-4">
          <p className="text-sm font-bold text-gray-500 mb-2">Word Bank (tap to add):</p>
          <div className="flex flex-wrap gap-2">
            {prompt.wordBank.map((word: string, idx: number) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={submitted}
                onClick={() => handleWordBankClick(word)}
                className="px-3 py-1 rounded-full bg-kid-purple/10 border-2 border-kid-purple/30 text-sm font-bold text-kid-purple hover:bg-kid-purple hover:text-white transition-all disabled:opacity-50"
              >
                {word}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Writing Area */}
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            disabled={submitted}
            placeholder="Start writing your story here..."
            className="w-full min-h-[180px] p-4 rounded-2xl border-4 border-kid-blue/30 bg-white text-gray-800 text-base font-medium focus:outline-none focus:border-kid-blue resize-none disabled:opacity-70"
            style={{ fontFamily: "Comic Sans MS, Chalkboard SE, Comic Neue, sans-serif" }}
          />
          <div className="flex items-center justify-between mt-2 px-2">
            <span className={`text-sm font-bold ${wordCount >= prompt.minWords ? "text-kid-green" : "text-gray-400"}`}>
              Words: {wordCount} / {prompt.minWords} min
            </span>
            <span className={`text-sm font-bold ${sentenceCount >= prompt.minSentences ? "text-kid-green" : "text-gray-400"}`}>
              Sentences: {sentenceCount} / {prompt.minSentences} min
            </span>
          </div>
        </div>

        {/* Hint */}
        {showHint && !submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-kid-yellow/10 rounded-xl p-3 mb-4 border-2 border-kid-yellow/30"
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-kid-yellow flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                {ageGroup === "4-6"
                  ? "Use words from the word bank! Write at least 1 sentence about the picture."
                  : ageGroup === "7-9"
                  ? "Think about who, what, and where. Use the word bank to help. Write at least 3 sentences!"
                  : "Think about setting, characters, and plot. Use descriptive words. Write at least 5 sentences!"}
              </p>
            </div>
          </motion.div>
        )}

        {/* Feedback */}
        <AnimatePresence>
          {feedback === "incorrect" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-red-100 rounded-xl p-3 mb-4 text-center border-2 border-red-300"
            >
              <p className="font-bold text-red-500 flex items-center justify-center gap-2">
                <X className="w-5 h-5" />
                {wordCount < prompt.minWords && sentenceCount < prompt.minSentences
                  ? `Write more! You need ${prompt.minWords - wordCount} more words and ${prompt.minSentences - sentenceCount} more sentences.`
                  : wordCount < prompt.minWords
                  ? `Write more! You need ${prompt.minWords - wordCount} more words.`
                  : `Add more sentences! You need ${prompt.minSentences - sentenceCount} more.`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {submitted && feedback === "correct" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-kid-green/20 rounded-xl p-4 mb-4 text-center"
          >
            <p className="font-bold text-kid-green flex items-center justify-center gap-2 text-lg">
              <Check className="w-6 h-6" />
              Great Story! You're a creative writer!
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {attempts === 1 ? "Perfect on the first try! 3 stars!" : attempts === 2 ? "Great job! 2 stars!" : "You did it! 1 star!"}
            </p>
          </motion.div>
        )}

        {/* Buttons */}
        {!submitted && (
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm bg-kid-yellow/20 text-kid-yellow hover:bg-kid-yellow/30 transition-all"
            >
              <Lightbulb className="w-4 h-4" />
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm bg-kid-green text-white hover:bg-green-600 transition-all"
            >
              <Send className="w-4 h-4" />
              Submit Story!
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
