"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import { ArrowLeft, Star, Printer, Award, Flame, Target, CheckCircle, TrendingUp } from "lucide-react";
import { AgeGroup, DIFFICULTY_CONFIGS, ACHIEVEMENTS, AchievementBadge } from "@/lib/gameData";

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
  writingCompleted: number;
  perfectScores: number;
  streak: number;
  stickersCount: number;
  unlockedAchievements: string[];
  onBack: () => void;
}

function CircularProgress({ value, max, label, icon: Icon, color }: { value: number; max: number; label: string; icon: ElementType; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`text-${color}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className={`w-5 h-5 text-${color} mb-0.5`} />
          <span className="text-xl font-bold text-gray-800">{value}</span>
        </div>
      </div>
      <p className="text-xs font-bold text-gray-500 mt-1">{label}</p>
    </div>
  );
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
  writingCompleted,
  perfectScores,
  streak,
  stickersCount,
  unlockedAchievements,
  onBack,
}: Props) {
  const config = DIFFICULTY_CONFIGS[ageGroup];

  const taskBreakdown = [
    { label: "Math", value: mathCompleted, emoji: "🔢", color: "kid-orange" },
    { label: "Reading", value: readingCompleted, emoji: "📚", color: "kid-green" },
    { label: "Typing", value: typingCompleted, emoji: "⌨️", color: "kid-blue" },
    { label: "Spelling", value: spellingCompleted, emoji: "📝", color: "kid-orange" },
    { label: "Logic", value: logicCompleted, emoji: "📁", color: "kid-purple" },
    { label: "Writing", value: writingCompleted, emoji: "✍️", color: "kid-pink" },
  ];

  const maxTask = Math.max(mathCompleted, readingCompleted, typingCompleted, spellingCompleted, logicCompleted, writingCompleted, 1);
  const achievementPct = Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100);

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

      {/* Certificate-style Header */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="kid-card border-kid-purple w-full max-w-3xl relative overflow-hidden"
      >
        {/* Decorative border */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-kid-pink via-kid-purple to-kid-blue" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-kid-blue via-kid-green to-kid-yellow" />

        {/* Certificate Header */}
        <div className="text-center pt-6 pb-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-5xl mb-2"
          >
            {config.emoji}
          </motion.div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Official Performance Review</p>
          <h2 className="text-3xl font-bold text-kid-purple">{playerName}&apos;s Report Card</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-kid-purple/10 text-kid-purple">{config.label}</span>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-kid-blue/10 text-kid-blue">Age {ageGroup}</span>
          </div>
        </div>

        {/* Circular Progress Stats */}
        <div className="flex justify-around items-center py-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl mx-4 mb-6">
          <CircularProgress value={stars} max={Math.max(stars, 50)} label="Stars" icon={Star} color="kid-yellow" />
          <CircularProgress value={tasksCompleted} max={Math.max(tasksCompleted, 20)} label="Tasks" icon={CheckCircle} color="kid-green" />
          <CircularProgress value={perfectScores} max={Math.max(perfectScores, 10)} label="Perfect" icon={Target} color="kid-orange" />
          <CircularProgress value={streak} max={Math.max(streak, 7)} label="Streak" icon={Flame} color="kid-pink" />
        </div>

        {/* Task Breakdown - Visual Bars */}
        <div className="mx-4 mb-6">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-kid-blue" />
            Task Breakdown
          </h3>
          <div className="space-y-3">
            {taskBreakdown.map((task, idx) => {
              const pct = (task.value / maxTask) * 100;
              return (
                <div key={task.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-gray-600 flex items-center gap-1">
                      <span className="text-lg">{task.emoji}</span>
                      {task.label}
                    </span>
                    <span className="text-sm font-bold text-gray-700">{task.value}</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                      className={`h-full bg-${task.color} rounded-full flex items-center justify-end pr-2`}
                    >
                      {pct > 15 && (
                        <span className="text-xs font-bold text-white">{Math.round(pct)}%</span>
                      )}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticker & Achievement Summary */}
        <div className="mx-4 mb-6 grid grid-cols-2 gap-4">
          {/* Stickers Card */}
          <div className="bg-gradient-to-br from-kid-yellow/10 to-kid-orange/10 rounded-2xl p-4 text-center border-2 border-kid-yellow/30">
            <div className="text-4xl mb-2">🎨</div>
            <p className="text-3xl font-bold text-kid-orange">{stickersCount}</p>
            <p className="text-xs font-bold text-gray-500">Stickers Collected!</p>
          </div>

          {/* Achievement Progress Card */}
          <div className="bg-gradient-to-br from-kid-purple/10 to-kid-pink/10 rounded-2xl p-4 text-center border-2 border-kid-purple/30">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-3xl font-bold text-kid-purple">{unlockedAchievements.length}/{ACHIEVEMENTS.length}</p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${achievementPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-kid-purple rounded-full"
              />
            </div>
            <p className="text-xs font-bold text-gray-500 mt-1">{achievementPct}% Unlocked!</p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="mx-4 mb-6">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-kid-purple" />
            Achievement Badges
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {ACHIEVEMENTS.map((badge: AchievementBadge, idx: number) => {
              const unlocked = unlockedAchievements.includes(badge.id);
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`rounded-xl p-3 text-center border-2 transition-all ${
                    unlocked
                      ? "bg-gradient-to-b from-kid-purple/10 to-kid-pink/10 border-kid-purple/40 shadow-md"
                      : "bg-gray-50 border-gray-200 opacity-50"
                  }`}
                >
                  <motion.div
                    animate={unlocked ? { y: [0, -3, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                    className={`text-3xl mb-1 ${unlocked ? "" : "grayscale"}`}
                  >
                    {unlocked ? badge.emoji : "🔒"}
                  </motion.div>
                  <p className={`text-xs font-bold ${unlocked ? "text-gray-700" : "text-gray-400"}`}>
                    {badge.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{badge.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-6 mx-4">
          <div className="border-t-2 border-dashed border-gray-200 pt-4">
            <p className="text-xs text-gray-400">Keep up the great work, {playerName}! 🌟</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
