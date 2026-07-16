"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, RotateCcw, Star, Trophy } from "lucide-react";
import { AgeGroup, DIFFICULTY_CONFIGS, getRandomSticker } from "@/lib/gameData";
import DeskScene from "@/components/DeskScene";
import DifficultySelector from "@/components/DifficultySelector";
import MathTask from "@/components/MathTask";
import ReadingTask from "@/components/ReadingTask";
import TypingTask from "@/components/TypingTask";
import StickerBoard from "@/components/StickerBoard";

type Screen = "welcome" | "difficulty" | "desk" | "math" | "reading" | "typing" | "celebration";
type TaskType = "math" | "reading" | "typing";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [playerName, setPlayerName] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [stickers, setStickers] = useState<string[]>([]);
  const [stars, setStars] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [completedTaskType, setCompletedTaskType] = useState<TaskType | null>(null);
  const [pendingSticker, setPendingSticker] = useState<string | null>(null);

  const config = ageGroup ? DIFFICULTY_CONFIGS[ageGroup] : null;

  useEffect(() => {
    if (screen === "celebration" && pendingSticker) {
      const timer = setTimeout(() => {
        setStickers((prev) => [...prev, pendingSticker]);
        setPendingSticker(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [screen, pendingSticker]);

  const handleStart = () => {
    if (playerName.trim()) {
      setScreen("difficulty");
    }
  };

  const handleDifficultySelect = (group: AgeGroup) => {
    setAgeGroup(group);
    setScreen("desk");
  };

  const handleTaskComplete = (taskType: TaskType, earnedStars: number) => {
    setStars((prev) => prev + earnedStars);
    setTasksCompleted((prev) => prev + 1);
    setCompletedTaskType(taskType);
    setPendingSticker(getRandomSticker());
    setScreen("celebration");
  };

  const handleBackToDesk = () => {
    setScreen("desk");
    setCompletedTaskType(null);
  };

  const handleReset = () => {
    setScreen("welcome");
    setPlayerName("");
    setAgeGroup(null);
    setStickers([]);
    setStars(0);
    setTasksCompleted(0);
    setCompletedTaskType(null);
    setPendingSticker(null);
  };

  return (
    <main className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        {/* WELCOME SCREEN */}
        {screen === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="min-h-screen flex flex-col items-center justify-center p-6"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl mb-4"
            >
              🏢
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-kid-blue text-shadow-kid text-center mb-2">
              Kids Desk Job
            </h1>
            <p className="text-xl text-gray-600 text-center mb-8">
              Learn math, reading, and typing while working at your very own desk!
            </p>
            <div className="kid-card border-kid-yellow w-full max-w-md">
              <label className="text-lg font-bold text-gray-700 mb-2 block">
                What&apos;s your name? 🖊️
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                placeholder="Type your name here..."
                className="w-full px-4 py-3 rounded-xl border-2 border-kid-blue focus:outline-none focus:border-kid-purple text-lg"
                maxLength={20}
              />
              <button
                onClick={handleStart}
                disabled={!playerName.trim()}
                className="kid-button bg-kid-green hover:bg-green-600 w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Let&apos;s Go!
                </span>
              </button>
            </div>
            <div className="flex gap-3 mt-6 text-4xl">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🔢</motion.span>
              <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>📚</motion.span>
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>⌨️</motion.span>
            </div>
          </motion.div>
        )}

        {/* DIFFICULTY SCREEN */}
        {screen === "difficulty" && (
          <DifficultySelector
            key="difficulty"
            playerName={playerName}
            onSelect={handleDifficultySelect}
          />
        )}

        {/* DESK SCREEN */}
        {screen === "desk" && config && ageGroup && (
          <DeskScene
            key="desk"
            playerName={playerName}
            ageGroup={ageGroup}
            stars={stars}
            stickers={stickers}
            tasksCompleted={tasksCompleted}
            onTaskSelect={(task) => setScreen(task)}
            onReset={handleReset}
          />
        )}

        {/* MATH TASK */}
        {screen === "math" && config && ageGroup && (
          <MathTask
            key="math"
            config={config}
            onComplete={(earned) => handleTaskComplete("math", earned)}
            onBack={() => setScreen("desk")}
          />
        )}

        {/* READING TASK */}
        {screen === "reading" && config && ageGroup && (
          <ReadingTask
            key="reading"
            config={config}
            onComplete={(earned) => handleTaskComplete("reading", earned)}
            onBack={() => setScreen("desk")}
          />
        )}

        {/* TYPING TASK */}
        {screen === "typing" && config && ageGroup && (
          <TypingTask
            key="typing"
            config={config}
            onComplete={(earned) => handleTaskComplete("typing", earned)}
            onBack={() => setScreen("desk")}
          />
        )}

        {/* CELEBRATION SCREEN */}
        {screen === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="kid-card border-kid-yellow text-center max-w-md"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-kid-orange mb-2">
                Great Job, {playerName}!
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                You finished your {completedTaskType} task!
              </p>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.2, type: "spring" }}
                  >
                    <Star className="w-10 h-10 fill-kid-yellow text-kid-yellow" />
                  </motion.div>
                ))}
              </div>
              {pendingSticker && (
                <motion.div
                  initial={{ scale: 0, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="text-6xl mb-4"
                >
                  {pendingSticker}
                </motion.div>
              )}
              <p className="text-sm text-gray-500 mb-4">
                A new sticker for your collection!
              </p>
              <button
                onClick={handleBackToDesk}
                className="kid-button bg-kid-green hover:bg-green-600 w-full"
              >
                Back to Desk 🖥️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticker Board - always visible on desk and task screens */}
      {(screen === "desk" || screen === "math" || screen === "reading" || screen === "typing") && (
        <StickerBoard stickers={stickers} />
      )}
    </main>
  );
}
