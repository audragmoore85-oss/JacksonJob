"use client";

import { motion } from "framer-motion";
import { AgeGroup, DIFFICULTY_CONFIGS, AVATARS } from "@/lib/gameData";
import { playClick } from "@/lib/sounds";

interface Props {
  playerName: string;
  onSelect: (group: AgeGroup) => void;
  selectedAvatar: string;
  onSelectAvatar: (avatarId: string) => void;
}

export default function DifficultySelector({ playerName, onSelect, selectedAvatar, onSelectAvatar }: Props) {
  const groups: AgeGroup[] = ["4-6", "7-9", "10-12"];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #FFF8E7 0%, #E8F4FD 100%)" }}
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-kid-purple text-shadow-kid text-center mb-2"
      >
        Hi {playerName}! 👋
      </motion.h2>
      <p className="text-lg text-gray-600 text-center mb-6">
        Pick your job level to get started!
      </p>

      {/* Avatar Builder */}
      <div className="w-full max-w-3xl mb-6">
        <p className="text-sm font-bold text-gray-500 text-center mb-3">
          Choose your office character:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {AVATARS.map((av) => (
            <motion.button
              key={av.id}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { playClick(); onSelectAvatar(av.id); }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-4 transition-all ${
                selectedAvatar === av.id
                  ? "bg-kid-purple/20 border-kid-purple shadow-lg scale-110"
                  : "bg-white border-gray-200 hover:border-kid-purple"
              }`}
              title={av.name}
            >
              {av.emoji}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 w-full max-w-3xl">
        {groups.map((group, idx) => {
          const config = DIFFICULTY_CONFIGS[group];
          return (
            <motion.button
              key={group}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { playClick(); onSelect(group); }}
              className={`kid-card border-${config.color} hover:shadow-2xl cursor-pointer text-center group`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                className="text-6xl mb-3"
              >
                {config.emoji}
              </motion.div>
              <h3 className={`text-2xl font-bold text-${config.color} mb-1`}>
                {config.label}
              </h3>
              <p className="text-gray-500 font-semibold mb-3">Ages {group}</p>
              <div className="text-sm text-gray-400 space-y-1">
                <p>🔢 {group === "4-6" ? "Counting & Adding" : group === "7-9" ? "Add, Subtract, Multiply" : "All Operations"}</p>
                <p>📚 {group === "4-6" ? "Simple Stories" : group === "7-9" ? "Short Passages" : "Complex Texts"}</p>
                <p>⌨️ {group === "4-6" ? "Simple Words" : group === "7-9" ? "Sentences" : "Full Sentences"}</p>
              </div>
              <div className={`mt-4 kid-button bg-${config.color} w-full group-hover:brightness-110`}>
                Choose This Level!
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
