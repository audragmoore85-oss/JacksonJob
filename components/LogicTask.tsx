"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Lightbulb } from "lucide-react";
import { AgeGroup, DifficultyConfig, LOGIC_PUZZLES, LogicPuzzle, SequencePuzzle, OddOneOutPuzzle, CategoryPuzzle, SizeOrderPuzzle } from "@/lib/gameData";
import { playCorrect, playWrong, playClick } from "@/lib/sounds";

interface Props {
  config: DifficultyConfig;
  ageGroup: AgeGroup;
  onComplete: (earnedStars: number) => void;
  onBack: () => void;
}

const PUZZLE_LABELS: Record<LogicPuzzle["type"], { title: string; emoji: string; instruction: string }> = {
  sequence: { title: "What comes next?", emoji: "🔢", instruction: "Look at the pattern and pick what comes next:" },
  oddOneOut: { title: "Odd one out!", emoji: "🔍", instruction: "Which one doesn't belong with the others?" },
  category: { title: "Sort it out!", emoji: "🗂️", instruction: "Which category does this item belong to?" },
  sizeOrder: { title: "Size order!", emoji: "📐", instruction: "Tap the items from smallest to biggest!" },
};

export default function LogicTask({ ageGroup, onComplete, onBack }: Props) {
  const puzzles = useMemo(() => LOGIC_PUZZLES[ageGroup], [ageGroup]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [sizeOrderArr, setSizeOrderArr] = useState<number[]>([]);

  const currentPuzzle: LogicPuzzle = puzzles[currentIdx];
  const label = PUZZLE_LABELS[currentPuzzle.type];

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedIdx(idx);

    let correct = false;
    if (currentPuzzle.type === "sequence") {
      correct = currentPuzzle.options[idx] === currentPuzzle.answer;
    } else if (currentPuzzle.type === "oddOneOut") {
      correct = idx === currentPuzzle.oddIndex;
    } else if (currentPuzzle.type === "category") {
      correct = idx === currentPuzzle.correctCategory;
    }

    setIsCorrect(correct);
    if (correct) {
      setCorrectCount((prev: number) => prev + 1);
      playCorrect();
    } else {
      playWrong();
    }
    setShowResult(true);
  };

  const handleSizeOrderClick = (itemIdx: number) => {
    if (showResult) return;
    if (sizeOrderArr.includes(itemIdx)) {
      setSizeOrderArr(sizeOrderArr.filter((i: number) => i !== itemIdx));
    } else {
      setSizeOrderArr([...sizeOrderArr, itemIdx]);
    }
  };

  const handleSizeOrderSubmit = () => {
    if (showResult || sizeOrderArr.length === 0) return;
    const puzzle = currentPuzzle as SizeOrderPuzzle;
    const sorted = [...puzzle.items].sort((a, b) => a.size - b.size);
    const correct = sizeOrderArr.every((origIdx: number, pos: number) => puzzle.items[origIdx].size === sorted[pos].size);
    setIsCorrect(correct);
    setSelectedIdx(-1);
    if (correct) {
      setCorrectCount((prev: number) => prev + 1);
      playCorrect();
    } else {
      playWrong();
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedIdx(-1);
    setSizeOrderArr([]);
    if (currentIdx + 1 < puzzles.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      const total = correctCount;
      const stars = total >= puzzles.length * 0.9 ? 3 : total >= puzzles.length * 0.6 ? 2 : 1;
      playClick();
      onComplete(stars);
    }
  };

  const renderSequence = (puzzle: SequencePuzzle) => (
    <>
      <div className="flex justify-center items-center gap-2 mb-6 flex-wrap">
        {puzzle.sequence.map((item, i) => (
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
        {puzzle.options.map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            disabled={showResult}
            onClick={() => handleAnswer(idx)}
            className={`p-4 rounded-2xl text-2xl font-bold border-4 transition-all ${
              showResult
                ? option === puzzle.answer
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
    </>
  );

  const renderOddOneOut = (puzzle: OddOneOutPuzzle) => (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {puzzle.items.map((item, idx) => {
          const isOdd = idx === puzzle.oddIndex;
          const isSelected = idx === selectedIdx;
          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              disabled={showResult}
              onClick={() => handleAnswer(idx)}
              className={`p-6 rounded-2xl text-5xl border-4 transition-all ${
                showResult
                  ? isOdd
                    ? "bg-kid-green/20 border-kid-green"
                    : isSelected
                    ? "bg-red-100 border-red-400"
                    : "bg-white border-gray-200 opacity-50"
                  : "bg-white border-gray-200 hover:border-kid-orange"
              }`}
            >
              <motion.div
                animate={showResult && isOdd ? { rotate: [0, -10, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {item}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
      {showResult && !isCorrect && (
        <div className="bg-kid-yellow/10 rounded-xl p-3 border-2 border-kid-yellow/30 mb-2">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-kid-yellow" />
            {puzzle.reason}
          </p>
        </div>
      )}
    </>
  );

  const renderCategory = (puzzle: CategoryPuzzle) => (
    <>
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 bg-kid-purple/10 rounded-2xl flex items-center justify-center text-6xl border-4 border-kid-purple/30"
        >
          {puzzle.item}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {puzzle.categories.map((cat, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            disabled={showResult}
            onClick={() => handleAnswer(idx)}
            className={`p-5 rounded-2xl border-4 transition-all ${
              showResult
                ? idx === puzzle.correctCategory
                  ? "bg-kid-green/20 border-kid-green"
                  : idx === selectedIdx
                  ? "bg-red-100 border-red-400"
                  : "bg-white border-gray-200 opacity-50"
                : "bg-white border-gray-200 hover:border-kid-purple"
            }`}
          >
            <div className="text-4xl mb-2">{cat.emoji}</div>
            <p className="font-bold text-gray-700">{cat.name}</p>
          </motion.button>
        ))}
      </div>
    </>
  );

  const renderSizeOrder = (puzzle: SizeOrderPuzzle) => {
    const sorted = [...puzzle.items].sort((a, b) => a.size - b.size);
    return (
      <>
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {puzzle.items.map((item, idx) => {
            const orderPos = sizeOrderArr.indexOf(idx);
            const isSelected = orderPos !== -1;
            const isCorrectPos = showResult && item.size === sorted[orderPos]?.size;
            const isWrongPos = showResult && isSelected && !isCorrectPos;
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                disabled={showResult}
                onClick={() => handleSizeOrderClick(idx)}
                className={`relative p-5 rounded-2xl border-4 transition-all ${
                  isWrongPos
                    ? "bg-red-100 border-red-400"
                    : isCorrectPos
                    ? "bg-kid-green/20 border-kid-green"
                    : isSelected
                    ? "bg-kid-yellow/20 border-kid-yellow"
                    : "bg-white border-gray-200 hover:border-kid-orange"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-kid-orange text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {orderPos + 1}
                  </div>
                )}
                <div className="text-5xl mb-1">{item.emoji}</div>
                <p className="text-xs font-bold text-gray-500">{item.name}</p>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-sm font-bold text-gray-500">Tap order: </span>
          {sizeOrderArr.length === 0 ? (
            <span className="text-sm text-gray-400">Tap items from smallest to biggest!</span>
          ) : (
            <div className="flex gap-1">
              {sizeOrderArr.map((origIdx: number, pos: number) => (
                <div key={pos} className="flex items-center gap-1">
                  <span className="text-2xl">{puzzle.items[origIdx].emoji}</span>
                  {pos < sizeOrderArr.length - 1 && <span className="text-gray-400">→</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {!showResult && sizeOrderArr.length > 0 && (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setSizeOrderArr([])}
              className="px-4 py-2 rounded-xl font-bold text-sm bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all"
            >
              Clear
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSizeOrderSubmit}
              className="px-6 py-2 rounded-xl font-bold text-sm bg-kid-green text-white hover:bg-green-600 transition-all"
            >
              Check Order!
            </motion.button>
          </div>
        )}

        {showResult && !isCorrect && (
          <div className="bg-kid-yellow/10 rounded-xl p-3 border-2 border-kid-yellow/30 mb-2">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-kid-yellow" />
              Correct order: {sorted.map((s) => s.emoji).join(" → ")}
            </p>
          </div>
        )}
      </>
    );
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
            {puzzles.map((_p: LogicPuzzle, i: number) => (
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
          📁 Filing Task - {label.emoji} {label.title}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-sm text-gray-500 text-center mb-4">
              {label.instruction}
            </p>

            {currentPuzzle.type === "sequence" && renderSequence(currentPuzzle)}
            {currentPuzzle.type === "oddOneOut" && renderOddOneOut(currentPuzzle)}
            {currentPuzzle.type === "category" && renderCategory(currentPuzzle)}
            {currentPuzzle.type === "sizeOrder" && renderSizeOrder(currentPuzzle)}

            {showResult && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`text-center p-3 rounded-xl mt-4 ${isCorrect ? "bg-kid-green/20" : "bg-red-100"}`}
              >
                <p className={`font-bold flex items-center justify-center gap-2 ${isCorrect ? "text-kid-green" : "text-red-500"}`}>
                  {isCorrect ? <><Check className="w-5 h-5" /> Correct!</> : <><X className="w-5 h-5" /> Not quite!</>}
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
            {currentIdx + 1 < puzzles.length ? "Next Puzzle" : "Finish Task"}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
