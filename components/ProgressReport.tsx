"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Star, Printer, Award, Flame, Target, CheckCircle } from "lucide-react";
import { AgeGroup, DIFFICULTY_CONFIGS, ACHIEVEMENTS } from "@/lib/gameData";

interface Props {
  playerName: string;
  ageGroup: AgeGroup;
  stars: number;
  tasksCompleted: number;
  mathCompleted: number;
  readingCompleted: number;
  typingCompleted: number;
  spellingCompleted: number;
  logicCompleted: number;
  perfectScores: number;
  streak: number;
  stickersCount: number;
  unlockedAchievements: string[];
  onBack: () => void;
}

export default function ProgressReport({
  playerName,
  ageGroup,
  stars,
  tasksCompleted,
  mathCompleted,
  readingCompleted,
  typingCompleted,
  spellingCompleted,
  logicCompleted,
  perfectScores,
  streak,
  stickersCount,
  unlockedAchievements,
  onBack,
}: Props) {
  const config = DIFFICULTY_CONFIGS[ageGroup];

  const statCards = [
    { label: "Total Stars", value: stars, icon: Star, color: "kid-yellow", bg: "bg-kid-yellow/10" },
    { label: "Tasks Done", value: tasksCompleted, icon: CheckCircle, color: "kid-green", bg: "bg-kid-green/10" },
    { label: "Perfect Scores", value: perfectScores, icon: Target, color: "kid-orange", bg: "bg-kid-orange/10" },
    { label: "Day Streak", value: streak, icon: Flame, color: "kid-pink", bg: "bg-kid-pink/10" },
  ];

  const taskBreakdown = [
    { label: "Math", value: mathCompleted, emoji: "🔢", color: "kid-orange" },
    { label: "Reading", value: readingCompleted, emoji: "📚", color: "kid-green" },
    { label: "Typing", value: typingCompleted, emoji: "⌨️", color: "kid-blue" },
    { label: "Spelling", value: spellingCompleted, emoji: "📝", color: "kid-orange" },
    { label: "Logic", value: logicCompleted, emoji: "📁", color: "kid-purple" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen p-4 md:p-8 flex flex-col items-center"
    >
      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Desk
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md hover:scale-105 transition-transform font-bold text-sm text-gray-600"
        >
          <Printer className="w-4 h-4" />
          Print Report
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="kid-card border-kid-purple w-full max-w-3xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{config.emoji}</div>
          <h2 className="text-3xl font-bold text-kid-purple">Performance Review</h2>
          <p className="text-gray-500 mt-1">
            {playerName} • {config.label} • Age {ageGroup}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${stat.bg} rounded-2xl p-4 text-center border-2 border-${stat.color}/30`}
              >
                <Icon className={`w-6 h-6 text-${stat.color} mx-auto mb-1`} />
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500 font-bold">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Task Breakdown */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <h3 className="font-bold text-gray-700 mb-3">Task Breakdown</h3>
          <div className="space-y-3">
            {taskBreakdown.map((task) => {
              const maxVal = Math.max(mathCompleted, readingCompleted, typingCompleted, spellingCompleted, logicCompleted, 1);
              const pct = (task.value / maxVal) * 100;
              return (
                <div key={task.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-gray-600">
                      {task.emoji} {task.label}
                    </span>
                    <span className="text-sm font-bold text-gray-700">{task.value}</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full bg-${task.color} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stickers */}
        <div className="bg-kid-yellow/10 rounded-2xl p-4 mb-6 text-center border-2 border-kid-yellow/30">
          <p className="text-sm font-bold text-gray-600">
            🎨 Stickers Collected: <span className="text-kid-orange font-bold">{stickersCount}</span>
          </p>
        </div>

        {/* Achievements */}
        <div className="mb-4">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-kid-purple" />
            Achievements ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {ACHIEVEMENTS.map((badge) => {
              const unlocked = unlockedAchievements.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl p-3 text-center border-2 transition-all ${
                    unlocked
                      ? "bg-kid-purple/10 border-kid-purple/40"
                      : "bg-gray-50 border-gray-200 opacity-50"
                  }`}
                >
                  <div className={`text-2xl mb-1 ${unlocked ? "" : "grayscale"}`}>
                    {unlocked ? badge.emoji : "🔒"}
                  </div>
                  <p className={`text-xs font-bold ${unlocked ? "text-gray-700" : "text-gray-400"}`}>
                    {badge.name}
                  </p>
                  <p className="text-xs text-gray-400">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
