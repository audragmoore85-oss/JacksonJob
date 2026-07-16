"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { COWORKER_GALLERY, getUnlockedCoworkers, getLockedCoworkers } from "@/lib/gameData";

interface Props {
  typingCompleted: number;
  onBack: () => void;
}

export default function CoworkerGallery({ typingCompleted, onBack }: Props) {
  const unlocked = getUnlockedCoworkers(typingCompleted);
  const locked = getLockedCoworkers(typingCompleted);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen p-4 md:p-8 flex flex-col items-center"
    >
      <div className="w-full max-w-3xl flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold">
          <ArrowLeft className="w-5 h-5" />
          Back to Desk
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="kid-card border-kid-blue w-full max-w-3xl"
      >
        <h2 className="text-3xl font-bold text-kid-blue text-center mb-2">
          👥 Coworker Gallery
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Complete more email tasks to unlock new coworkers!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {unlocked.map((coworker, idx) => (
            <motion.div
              key={coworker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-kid-green/10 rounded-2xl p-4 text-center border-2 border-kid-green/30"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                className="text-4xl mb-2"
              >
                {coworker.avatar}
              </motion.div>
              <p className="font-bold text-gray-800 text-sm">{coworker.name}</p>
              <p className="text-xs text-gray-500">{coworker.role}</p>
              <p className="text-xs text-kid-green mt-1">{coworker.personality}</p>
            </motion.div>
          ))}
        </div>

        {locked.length > 0 && (
          <div>
            <p className="text-sm font-bold text-gray-400 mb-3 text-center">Locked Coworkers</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {locked.map((coworker, idx) => (
                <motion.div
                  key={coworker.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-4 text-center border-2 border-gray-200"
                >
                  <div className="text-4xl mb-2 grayscale">
                    <Lock className="w-8 h-8 text-gray-400 mx-auto" />
                  </div>
                  <p className="font-bold text-gray-400 text-sm">???</p>
                  <p className="text-xs text-gray-400">Unlock at {coworker.unlockAt} emails</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            You've completed <span className="font-bold text-kid-blue">{typingCompleted}</span> email tasks
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
