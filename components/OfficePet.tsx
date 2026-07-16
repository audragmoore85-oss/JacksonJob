"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import { getPetStage, getNextPetStage, PET_STAGES } from "@/lib/gameData";

interface Props {
  totalStars: number;
  onClose: () => void;
}

export default function OfficePet({ totalStars, onClose }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const currentStage = getPetStage(totalStars);
  const nextStage = getNextPetStage(totalStars);
  const progressToNext = nextStage
    ? ((totalStars - currentStage.starsNeeded) / (nextStage.starsNeeded - currentStage.starsNeeded)) * 100
    : 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-4 left-4 z-40"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl shadow-xl border-4 border-kid-purple/30 p-3 w-48"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-500">Office Pet</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-5xl text-center mb-1"
        >
          {currentStage.emoji}
        </motion.div>

        <p className="text-center text-sm font-bold text-gray-700">{currentStage.name}</p>
        <p className="text-center text-xs text-gray-400 mb-2">{currentStage.description}</p>

        {nextStage ? (
          <div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                className="h-full bg-kid-purple rounded-full"
              />
            </div>
            <p className="text-xs text-center text-gray-400">
              {nextStage.starsNeeded - totalStars} stars to {nextStage.name} {nextStage.emoji}
            </p>
          </div>
        ) : (
          <p className="text-xs text-center text-kid-purple font-bold">Max level reached!</p>
        )}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-kid-purple font-bold w-full text-center mt-1 hover:underline"
        >
          {showDetails ? "Hide" : "See"} all stages
        </button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-1 justify-center pt-2 border-t border-gray-100 mt-1">
                {PET_STAGES.map((stage) => {
                  const unlocked = totalStars >= stage.starsNeeded;
                  return (
                    <div
                      key={stage.stage}
                      className={`text-xl ${unlocked ? "" : "grayscale opacity-30"}`}
                      title={`${stage.name} - ${stage.starsNeeded} stars`}
                    >
                      {stage.emoji}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
