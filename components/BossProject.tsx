"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Star, CheckCircle, Circle } from "lucide-react";
import { BossProject as BossProjectData } from "@/lib/gameData";

interface Props {
  project: BossProjectData;
  progress: string[];
  onBack: () => void;
  onStartTask: (task: "math" | "reading" | "typing") => void;
}

export default function BossProject({ project, progress, onBack, onStartTask }: Props) {
  const tasks = [
    { id: "math" as const, label: "Math", emoji: "🔢", desc: "Budget calculation" },
    { id: "reading" as const, label: "Reading", emoji: "📚", desc: "Review the documents" },
    { id: "typing" as const, label: "Email", emoji: "⌨️", desc: "Send the invitation" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="min-h-screen p-4 md:p-8 flex flex-col items-center"
    >
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold">
          <ArrowLeft className="w-5 h-5" />
          Back to Desk
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.8, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        className="kid-card border-kid-pink w-full max-w-2xl"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl text-center mb-2"
        >
          {project.emoji}
        </motion.div>

        <h2 className="text-3xl font-bold text-kid-pink text-center mb-2">
          {project.name}
        </h2>
        <p className="text-gray-500 text-center mb-6">{project.description}</p>

        <div className="bg-kid-pink/10 rounded-2xl p-4 mb-4 text-center">
          <p className="text-sm font-bold text-kid-pink">
            Reward: +{project.bonusStars} stars + special sticker {project.bonusSticker}
          </p>
        </div>

        <div className="space-y-3">
          {tasks.map((task, idx) => {
            const done = progress.includes(task.id);
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                className={`rounded-2xl p-4 border-4 transition-all ${
                  done ? "bg-kid-green/10 border-kid-green" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{task.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-800">{task.label}</p>
                      <p className="text-xs text-gray-500">{task.desc}</p>
                    </div>
                  </div>
                  {done ? (
                    <CheckCircle className="w-6 h-6 text-kid-green" />
                  ) : (
                    <button
                      onClick={() => onStartTask(task.id)}
                      className="kid-button bg-kid-pink hover:bg-pink-600 text-sm"
                    >
                      Start
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          {tasks.map((t) => (
            <div key={t.id} className={`w-3 h-3 rounded-full ${progress.includes(t.id) ? "bg-kid-green" : "bg-gray-200"}`} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
