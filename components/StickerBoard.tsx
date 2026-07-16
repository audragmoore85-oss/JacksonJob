"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award } from "lucide-react";

interface Props {
  stickers: string[];
}

export default function StickerBoard({ stickers }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-40 bg-kid-pink text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform"
        title="My Sticker Collection"
      >
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6" />
          <span className="font-bold">{stickers.length}</span>
        </div>
      </motion.button>

      {/* Sticker Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 right-4 z-40 bg-white rounded-3xl shadow-2xl p-6 border-4 border-kid-pink w-72 max-h-96 overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-kid-pink mb-3 text-center">
              My Sticker Collection 🎨
            </h3>
            {stickers.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">
                No stickers yet! Complete tasks to earn stickers! 🌟
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {stickers.map((sticker, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.05, type: "spring" }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="bg-kid-cream rounded-xl p-2 text-center text-3xl"
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
