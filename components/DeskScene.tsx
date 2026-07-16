"use client";

import { motion } from "framer-motion";
import { Star, RotateCcw, Phone, BookOpen, Calculator, Keyboard } from "lucide-react";
import { AgeGroup, DIFFICULTY_CONFIGS } from "@/lib/gameData";

interface Props {
  playerName: string;
  ageGroup: AgeGroup;
  stars: number;
  stickers: string[];
  tasksCompleted: number;
  onTaskSelect: (task: "math" | "reading" | "typing") => void;
  onReset: () => void;
}

export default function DeskScene({
  playerName,
  ageGroup,
  stars,
  stickers,
  tasksCompleted,
  onTaskSelect,
  onReset,
}: Props) {
  const config = DIFFICULTY_CONFIGS[ageGroup];

  const tasks = [
    {
      id: "math" as const,
      label: "Math Mission",
      icon: Calculator,
      emoji: "🔢",
      color: "kid-orange",
      bgColor: "bg-kid-orange",
      desc: "Solve number problems!",
    },
    {
      id: "reading" as const,
      label: "Reading Report",
      icon: BookOpen,
      emoji: "📚",
      color: "kid-green",
      bgColor: "bg-kid-green",
      desc: "Read stories and answer!",
    },
    {
      id: "typing" as const,
      label: "Typing Task",
      icon: Keyboard,
      emoji: "⌨️",
      color: "kid-blue",
      bgColor: "bg-kid-blue",
      desc: "Email coworkers and chat!",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen p-4 md:p-8"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            {config.emoji}
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-700">{playerName}&apos;s Desk</h2>
            <p className="text-sm text-gray-500">{config.label} • Age {ageGroup}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white rounded-full px-4 py-2 shadow-md">
            <Star className="w-5 h-5 fill-kid-yellow text-kid-yellow" />
            <span className="font-bold text-gray-700">{stars}</span>
          </div>
          <button
            onClick={onReset}
            className="bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
            title="Start over"
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Desk Scene */}
      <div className="max-w-5xl mx-auto">
        {/* Office Wall with Window */}
        <div className="relative bg-gradient-to-b from-kid-blue to-kid-cream rounded-t-3xl p-6 overflow-hidden">
          {/* Window */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-4 right-8 w-32 h-24 bg-white/30 rounded-lg border-4 border-white/50"
          >
            <div className="flex justify-center items-center h-full text-3xl">☁️</div>
          </motion.div>

          {/* Clock */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 left-8 w-16 h-16 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center"
          >
            <div className="absolute top-1 text-xs font-bold">12</div>
            <div className="absolute bottom-1 text-xs font-bold">6</div>
            <div className="w-1 h-6 bg-kid-orange origin-bottom rotate-0 absolute top-2" />
          </motion.div>

          {/* Name Plate on Desk */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 mx-auto mt-12 bg-kid-yellow rounded-lg px-6 py-2 shadow-lg text-center w-fit"
          >
            <span className="font-bold text-gray-800 text-lg">{playerName}</span>
            <p className="text-xs text-gray-600">{config.label}</p>
          </motion.div>
        </div>

        {/* Desk Surface */}
        <div className="bg-desk-wood border-4 border-desk-wood-dark rounded-b-3xl p-6 md:p-8 relative">
          {/* Desk texture lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-full w-full" style={{
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px)"
            }} />
          </div>

          {/* Tasks Grid */}
          <div className="relative z-10 grid gap-4 md:grid-cols-3">
            {tasks.map((task, idx) => {
              const Icon = task.icon;
              return (
                <motion.button
                  key={task.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onTaskSelect(task.id)}
                  className="bg-white rounded-2xl p-6 shadow-lg border-4 border-gray-200 hover:border-kid-yellow text-center group"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    className="text-5xl mb-3"
                  >
                    {task.emoji}
                  </motion.div>
                  <h3 className={`text-xl font-bold text-${task.color} mb-1`}>
                    {task.label}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{task.desc}</p>
                  <div className={`${task.bgColor} kid-button w-full text-sm`}>
                    <span className="flex items-center justify-center gap-2">
                      <Icon className="w-4 h-4" />
                      Start Task
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Desk Items */}
          <div className="relative z-10 mt-6 flex justify-between items-end">
            {/* Coffee Mug */}
            <motion.div
              animate={{ rotate: [0, -3, 0, 3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl"
            >
              ☕
            </motion.div>

            {/* Sticky Notes */}
            <div className="flex gap-2">
              <motion.div
                animate={{ rotate: [-5, -3, -5] }}
                className="bg-kid-yellow p-2 rounded shadow-md text-xs font-bold text-gray-700 w-20 text-center"
              >
                Tasks: {tasksCompleted}
              </motion.div>
              <motion.div
                animate={{ rotate: [3, 5, 3] }}
                className="bg-kid-pink p-2 rounded shadow-md text-xs font-bold text-white w-20 text-center"
              >
                Stars: {stars}
              </motion.div>
            </div>

            {/* Plant */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-4xl"
            >
              🪴
            </motion.div>
          </div>
        </div>

        {/* Phone at bottom of desk */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mt-4"
        >
          <div className="bg-gray-700 rounded-full px-6 py-2 flex items-center gap-2 shadow-lg">
            <Phone className="w-4 h-4 text-kid-green animate-pulse" />
            <span className="text-white text-sm font-bold">
              {tasksCompleted === 0
                ? "New tasks waiting! Pick one above ☝️"
                : `Great work! ${tasksCompleted} task${tasksCompleted > 1 ? "s" : ""} done! Pick another!`}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
