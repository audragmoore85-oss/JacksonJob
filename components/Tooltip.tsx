"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  text: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export default function Tooltip({ text, children, side = "top", delay = 0 }: Props) {
  const [show, setShow] = useState(false);
  let timer: ReturnType<typeof setTimeout>;

  const handleEnter = () => {
    timer = setTimeout(() => setShow(true), delay);
  };

  const handleLeave = () => {
    clearTimeout(timer);
    setShow(false);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-purple-900 border-t-4 border-x-transparent border-x-4 border-b-0",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-purple-900 border-b-4 border-x-transparent border-x-4 border-t-0",
    left: "left-full top-1/2 -translate-y-1/2 border-l-purple-900 border-l-4 border-y-transparent border-y-4 border-r-0",
    right: "right-full top-1/2 -translate-y-1/2 border-r-purple-900 border-r-4 border-y-transparent border-y-4 border-l-0",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${positionClasses[side]} pointer-events-none whitespace-nowrap`}
          >
            <div className="bg-purple-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
              {text}
              <div className={`absolute ${arrowClasses[side]}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
