"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award, X } from "lucide-react";

interface Props {
  stickers: string[];
}

export default function StickerBoard({ stickers }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button with badge */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-40 bg-gradient-to-br from-kid-pink to-purple-500 text-white rounded-full p-4 shadow-lg transition-transform"
        title="My Sticker Collection"
      >
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6" />
          <span className="font-bold">{stickers.length}</span>
        </div>
        {stickers.length > 0 && (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 bg-kid-yellow text-gray-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow"
          >
            {stickers.length}
          </motion.span>
        )}
      </motion.button>

      {/* Sticker Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-4 z-40 bg-white rounded-3xl shadow-2xl p-6 border-4 border-kid-pink w-80 max-h-96 overflow-y-auto"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-kid-pink">
                My Sticker Collection 🎨
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress bar */}
            {stickers.length > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{stickers.length} stickers collected!</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stickers.length / 80) * 100, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-kid-pink to-kid-purple rounded-full"
                  />
                </div>
              </div>
            )}

            {stickers.length === 0 ? (
              <div className="text-center py-10">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl mb-3"
                >
                  📭
                </motion.div>
                <p className="text-gray-400 text-sm">
                  No stickers yet! Complete tasks to earn stickers! 🌟
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {stickers.map((sticker, i) => (
                  <motion.div
                    key={`${sticker}-${i}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: Math.min(i * 0.03, 0.6), type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.25, rotate: 5, zIndex: 10 }}
                    className="bg-gradient-to-br from-kid-cream to-yellow-50 rounded-xl p-2 text-center text-3xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    {sticker}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
