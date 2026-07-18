"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Star, Lightbulb, ThumbsUp, ThumbsDown } from "lucide-react";
import confetti from "canvas-confetti";
import { DifficultyConfig, ReadingPassage, ReadingQuestion, MultipleChoiceQuestion, TrueFalseQuestion, ClickPassageQuestion, getRandomEncouragement } from "@/lib/gameData";
import { playCorrect, playWrong } from "@/lib/sounds";

interface Props {
  config: DifficultyConfig;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const QUESTION_LABELS: Record<ReadingQuestion["type"], string> = {
  multipleChoice: "Multiple Choice",
  trueFalse: "True or False?",
  clickPassage: "Click the Sentence!",
};

export default function ReadingTask({ config, onComplete, onBack }: Props) {
  const [passage] = useState<ReadingPassage>(() =>
    config.readingPassages[Math.floor(Math.random() * config.readingPassages.length)]
  );
  const sentences = useMemo(() => passage.text.split(". ").map((s: string, i: number, arr: string[]) => i < arr.length - 1 ? s + "." : s), [passage]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handleCorrect = () => {
    setCorrectCount((prev: number) => prev + 1);
    setEncouragement(getRandomEncouragement());
    playCorrect();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#FFD93D", "#6BCB77", "#4A90D9", "#FF6B9D"],
    });
  };

  const handleWrong = () => {
    setWrongShake(true);
    playWrong();
    setTimeout(() => setWrongShake(false), 500);
  };

  const advance = (wasCorrect: boolean) => {
    setTimeout(() => {
      if (currentQuestion + 1 >= passage.questions.length) {
        const total = correctCount + (wasCorrect ? 1 : 0);
        const stars = total >= passage.questions.length ? 3 : total >= Math.ceil(passage.questions.length / 2) ? 2 : 1;
        onComplete(stars);
      } else {
        setCurrentQuestion((prev: number) => prev + 1);
        setSelected(null);
        setShowResult(false);
        setShowHint(false);
      }
    }, 1800);
  };

  const handleMultipleChoice = (optionIdx: number, q: MultipleChoiceQuestion) => {
    if (showResult) return;
    setSelected(optionIdx);
    setShowResult(true);
    const isCorrect = optionIdx === q.answer;
    if (isCorrect) handleCorrect(); else handleWrong();
    advance(isCorrect);
  };

  const handleTrueFalse = (answer: boolean, q: TrueFalseQuestion) => {
    if (showResult) return;
    setSelected(answer ? 1 : 0);
    setShowResult(true);
    const isCorrect = answer === q.answer;
    if (isCorrect) handleCorrect(); else handleWrong();
    advance(isCorrect);
  };

  const handleClickPassage = (sentenceIdx: number, q: ClickPassageQuestion) => {
    if (showResult) return;
    setSelected(sentenceIdx);
    setShowResult(true);
    const isCorrect = sentenceIdx === q.sentenceIndex;
    if (isCorrect) handleCorrect(); else handleWrong();
    advance(isCorrect);
  };

  const q: ReadingQuestion = passage.questions[currentQuestion];

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
          {passage.questions.map((_q: ReadingQuestion, i: number) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < currentQuestion
                  ? "bg-kid-green text-white"
                  : i === currentQuestion
                  ? "bg-kid-orange text-white animate-pulse"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {i < currentQuestion ? "✓" : i + 1}
            </div>
          ))}
          {!showResult && (
            <button
              onClick={() => setShowHint(!showHint)}
              className={`ml-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                showHint ? "bg-kid-yellow text-gray-800" : "bg-white text-kid-yellow border-2 border-kid-yellow/30"
              }`}
            >
              <Lightbulb className="w-3 h-3 inline mr-1" />Hint
            </button>
          )}
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
          <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-kid-green/10 text-kid-green">
            {QUESTION_LABELS[q.type]}
          </span>
        </div>

        {/* Passage */}
        <div className="bg-kid-cream rounded-2xl p-4 mb-6 max-h-56 overflow-y-auto">
          <h3 className="font-bold text-gray-700 mb-2 text-lg">{passage.title}</h3>
          {q.type === "clickPassage" ? (
            <div className="space-y-1">
              {sentences.map((sentence: string, idx: number) => {
                const isTarget = idx === (q as ClickPassageQuestion).sentenceIndex;
                const isSelected = idx === selected;
                return (
                  <motion.p
                    key={idx}
                    whileHover={!showResult ? { scale: 1.01 } : {}}
                    onClick={() => !showResult && handleClickPassage(idx, q as ClickPassageQuestion)}
                    className={`text-sm leading-relaxed rounded-lg px-2 py-1 cursor-pointer transition-all ${
                      showResult
                        ? isTarget
                          ? "bg-kid-green/20 text-kid-green font-bold"
                          : isSelected
                          ? "bg-red-100 text-red-500"
                          : "text-gray-500"
                        : "text-gray-600 hover:bg-kid-yellow/20 hover:cursor-pointer"
                    }`}
                  >
                    {sentence}
                  </motion.p>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-sm leading-relaxed">{passage.text}</p>
          )}
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

            {/* Hint */}
            {showHint && !showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-kid-yellow/10 rounded-xl p-3 mb-4 border-2 border-kid-yellow/30"
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-kid-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    {q.type === "clickPassage"
                      ? "Read each sentence carefully. Click the one that answers the question!"
                      : q.type === "trueFalse"
                      ? "Think about what the story says. Is the statement true or false?"
                      : "Go back and read the story again. Look for keywords in the question and find them in the story. The answer is usually right there!"}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Multiple Choice */}
            {q.type === "multipleChoice" && (
              <div className="space-y-3">
                {(q as MultipleChoiceQuestion).options.map((option: string, idx: number) => {
                  const mcq = q as MultipleChoiceQuestion;
                  const isCorrect = idx === mcq.answer;
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
                      onClick={() => handleMultipleChoice(idx, mcq)}
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
            )}

            {/* True/False */}
            {q.type === "trueFalse" && (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "True!", value: true, icon: ThumbsUp, color: "kid-green", selectedVal: 1 },
                  { label: "False!", value: false, icon: ThumbsDown, color: "kid-pink", selectedVal: 0 },
                ].map((btn) => {
                  const tfq = q as TrueFalseQuestion;
                  const isCorrect = btn.value === tfq.answer;
                  const isSelected = selected === btn.selectedVal;
                  const Icon = btn.icon;
                  let buttonClass = `bg-white border-kid-${btn.color} text-gray-800 hover:bg-kid-${btn.color} hover:text-white`;

                  if (showResult) {
                    if (isCorrect) {
                      buttonClass = `bg-kid-${btn.color} border-kid-${btn.color} text-white`;
                    } else if (isSelected) {
                      buttonClass = "bg-red-400 border-red-400 text-white";
                    } else {
                      buttonClass = "bg-gray-100 border-gray-200 text-gray-400";
                    }
                  }

                  return (
                    <motion.button
                      key={btn.label}
                      whileHover={!showResult ? { scale: 1.05 } : {}}
                      whileTap={!showResult ? { scale: 0.95 } : {}}
                      onClick={() => handleTrueFalse(btn.value, tfq)}
                      disabled={showResult}
                      className={`py-8 rounded-2xl border-4 text-2xl font-bold transition-all flex flex-col items-center gap-3 ${buttonClass}`}
                    >
                      <Icon className="w-10 h-10" />
                      {btn.label}
                      {showResult && isCorrect && <Check className="w-5 h-5" />}
                      {showResult && isSelected && !isCorrect && <X className="w-5 h-5" />}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Click Passage - question is shown above, passage is interactive */}
            {q.type === "clickPassage" && (
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-4xl mb-2"
                >
                  👆
                </motion.div>
                <p className="text-sm text-gray-500">
                  {showResult ? (selected === (q as ClickPassageQuestion).sentenceIndex ? "You got it! 🎉" : "Not quite — the correct sentence is highlighted above!") : "Click the sentence in the story above that answers the question!"}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Score */}
        <div className="flex items-center justify-center gap-2 text-gray-600 mt-6">
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
