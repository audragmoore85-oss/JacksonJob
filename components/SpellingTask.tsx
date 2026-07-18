"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lightbulb, Check, X } from "lucide-react";
import { AgeGroup, DifficultyConfig, SPELLING_WORDS, FILL_IN_BLANKS } from "@/lib/gameData";
import { playCorrect, playWrong, playClick } from "@/lib/sounds";

interface Props {
  config: DifficultyConfig;
  ageGroup: AgeGroup;
  onComplete: (earnedStars: number) => void;
  onBack: () => void;
}

export default function SpellingTask({ ageGroup, onComplete, onBack }: Props) {
  const words = useMemo(() => SPELLING_WORDS[ageGroup], [ageGroup]);
  const blanks = useMemo(() => FILL_IN_BLANKS[ageGroup], [ageGroup]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [fillBlankIdx, setFillBlankIdx] = useState(0);
  const [fillBlankCorrect, setFillBlankCorrect] = useState(0);
  const [phase, setPhase] = useState<"unscramble" | "fillblank" | "done">("unscramble");

  const currentWord = words[currentIdx];
  const currentBlank = blanks[fillBlankIdx];
  const totalRounds = words.length + blanks.length;

  const handleUnscrambleSubmit = () => {
    if (input.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      setIsCorrect(true);
      setShowResult(true);
      setCorrectCount((prev: number) => prev + 1);
      playCorrect();
    } else {
      setIsCorrect(false);
      setShowResult(true);
      playWrong();
    }
  };

  const handleFillBlankAnswer = (idx: number) => {
    if (idx === currentBlank.answer) {
      setIsCorrect(true);
      setShowResult(true);
      setFillBlankCorrect((prev: number) => prev + 1);
      playCorrect();
    } else {
      setIsCorrect(false);
      setShowResult(true);
      playWrong();
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setShowHint(false);
    setInput("");

    if (phase === "unscramble") {
      if (currentIdx + 1 < words.length) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setPhase("fillblank");
      }
    } else if (phase === "fillblank") {
      if (fillBlankIdx + 1 < blanks.length) {
        setFillBlankIdx(fillBlankIdx + 1);
      } else {
        setPhase("done");
        const totalCorrect = correctCount + fillBlankCorrect;
        const stars = totalCorrect >= totalRounds * 0.9 ? 3 : totalCorrect >= totalRounds * 0.6 ? 2 : 1;
        playClick();
        onComplete(stars);
        return;
      }
    }
  };

  const progress = phase === "unscramble" ? currentIdx + 1 : words.length + fillBlankIdx + 1;

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
            {progress}/{totalRounds}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalRounds }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i < progress ? "bg-kid-orange" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="kid-card border-kid-orange w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-kid-orange text-center mb-2">
          📝 Word Processing Task
        </h2>

        <AnimatePresence mode="wait">
          {phase === "unscramble" && (
            <motion.div
              key={`unscramble-${currentIdx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-sm text-gray-500 text-center mb-4">Unscramble the word!</p>
              <div className="flex justify-center gap-2 mb-6">
                {currentWord.scrambled.split("").map((letter, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="w-12 h-12 bg-kid-yellow rounded-xl flex items-center justify-center text-2xl font-bold text-gray-800 shadow-md"
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>

              {showHint && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-kid-purple font-bold mb-3"
                >
                  💡 Hint: {currentWord.hint}
                </motion.p>
              )}

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !showResult && handleUnscrambleSubmit()}
                  placeholder="Type the unscrambled word..."
                  disabled={showResult}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-kid-orange focus:outline-none focus:border-kid-purple text-lg"
                />
                {!showResult && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="bg-kid-yellow rounded-xl px-3 shadow-md hover:scale-105 transition-transform"
                    title="Show hint"
                  >
                    <Lightbulb className="w-5 h-5 text-gray-700" />
                  </button>
                )}
              </div>

              {!showResult && (
                <button
                  onClick={handleUnscrambleSubmit}
                  disabled={!input.trim()}
                  className="kid-button bg-kid-orange hover:bg-orange-600 w-full disabled:opacity-50"
                >
                  Check Answer
                </button>
              )}

              {showResult && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`text-center p-4 rounded-xl mb-3 ${isCorrect ? "bg-kid-green/20" : "bg-red-100"}`}
                >
                  {isCorrect ? (
                    <p className="text-kid-green font-bold flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" /> Correct! The word is "{currentWord.word}"
                    </p>
                  ) : (
                    <p className="text-red-500 font-bold flex items-center justify-center gap-2">
                      <X className="w-5 h-5" /> The answer was "{currentWord.word}"
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{currentWord.definition}</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === "fillblank" && (
            <motion.div
              key={`fillblank-${fillBlankIdx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-sm text-gray-500 text-center mb-4">Fill in the blank!</p>
              <div className="bg-kid-blue/10 rounded-2xl p-6 mb-4 text-center">
                <p className="text-xl font-bold text-gray-800">{currentBlank.sentence}</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {currentBlank.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={showResult}
                    onClick={() => handleFillBlankAnswer(idx)}
                    className={`kid-button ${
                      showResult
                        ? idx === currentBlank.answer
                          ? "bg-kid-green"
                          : "bg-gray-300"
                        : "bg-white border-2 border-kid-blue text-gray-700 hover:bg-kid-blue/10"
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
                  className={`text-center p-3 rounded-xl mt-3 ${isCorrect ? "bg-kid-green/20" : "bg-red-100"}`}
                >
                  <p className={`font-bold ${isCorrect ? "text-kid-green" : "text-red-500"}`}>
                    {isCorrect ? "✅ Correct!" : "❌ Not quite!"}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {showResult && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleNext}
            className="kid-button bg-kid-green hover:bg-green-600 w-full mt-3"
          >
            {phase === "fillblank" && fillBlankIdx + 1 >= blanks.length ? "Finish Task" : "Next Word"}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
