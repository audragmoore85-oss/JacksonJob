"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Download, Upload, Volume2, VolumeX } from "lucide-react";
import { AgeGroup, DIFFICULTY_CONFIGS } from "@/lib/gameData";
import { isMuted, setMuted } from "@/lib/sounds";

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
  quickCompleted: number;
  wordMatchCompleted: number;
  memoryMatchCompleted: number;
  dailyQuizCompleted: number;
  easterEggsFound: number;
  perfectScores: number;
  streak: number;
  stickersCount: number;
  unlockedAchievements: string[];
  onBack: () => void;
  onExport: () => void;
  onImport: (data: string) => void;
  onForceDifficulty: (group: AgeGroup) => void;
}

export default function ParentDashboard({
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
  quickCompleted,
  wordMatchCompleted,
  memoryMatchCompleted,
  dailyQuizCompleted,
  easterEggsFound,
  perfectScores,
  streak,
  stickersCount,
  unlockedAchievements,
  onBack,
  onExport,
  onImport,
  onForceDifficulty,
}: Props) {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [muted, setMutedState] = useState(isMuted());
  const [showExportData, setShowExportData] = useState(false);
  const [exportData, setExportData] = useState("");
  const [importData, setImportData] = useState("");

  const handlePinSubmit = () => {
    if (pin === "1234") {
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleToggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    setMutedState(newMuted);
  };

  const handleExport = () => {
    onExport();
    const raw = typeof window !== "undefined" ? localStorage.getItem("kidsDeskJobProfiles") : null;
    if (raw) {
      setExportData(raw);
      setShowExportData(true);
    }
  };

  const handleImport = () => {
    if (importData.trim()) {
      onImport(importData.trim());
    }
  };

  if (!unlocked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="kid-card border-kid-purple w-full max-w-sm text-center"
        >
          <Lock className="w-12 h-12 text-kid-purple mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Parent Dashboard</h2>
          <p className="text-sm text-gray-500 mb-4">Enter PIN to access (default: 1234)</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
            placeholder="Enter PIN..."
            className="w-full px-4 py-3 rounded-xl border-2 border-kid-purple focus:outline-none text-center text-lg mb-3"
            maxLength={4}
          />
          {pinError && <p className="text-red-500 text-sm mb-2">Wrong PIN. Try again.</p>}
          <button
            onClick={handlePinSubmit}
            className="kid-button bg-kid-purple hover:bg-purple-600 w-full"
          >
            Unlock
          </button>
          <button
            onClick={onBack}
            className="text-sm text-gray-400 mt-3 hover:text-gray-600"
          >
            Back to Desk
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
        className="kid-card border-kid-purple w-full max-w-3xl"
      >
        <h2 className="text-3xl font-bold text-kid-purple text-center mb-6">
          🔒 Parent Dashboard
        </h2>

        {/* Sound Settings */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-gray-700 mb-3">Sound Settings</h3>
          <button
            onClick={handleToggleMute}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              muted ? "bg-gray-200 text-gray-500" : "bg-kid-green/20 text-kid-green"
            }`}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            {muted ? "Sounds Off" : "Sounds On"}
          </button>
        </div>

        {/* Difficulty Override */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-gray-700 mb-3">Difficulty Level (Current: {ageGroup})</h3>
          <div className="flex gap-2">
            {(Object.keys(DIFFICULTY_CONFIGS) as AgeGroup[]).map((group) => (
              <button
                key={group}
                onClick={() => onForceDifficulty(group)}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  ageGroup === group
                    ? "bg-kid-purple text-white"
                    : "bg-white border-2 border-gray-200 text-gray-600 hover:border-kid-purple"
                }`}
              >
                {DIFFICULTY_CONFIGS[group].emoji} {group}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-gray-700 mb-3">Quick Stats for {playerName}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            {[
              { label: "Stars", value: stars },
              { label: "Tasks", value: tasksCompleted },
              { label: "Perfect", value: perfectScores },
              { label: "Streak", value: streak },
              { label: "Math Done", value: mathCompleted },
              { label: "Reading Done", value: readingCompleted },
              { label: "Typing Done", value: typingCompleted },
              { label: "Spelling Done", value: spellingCompleted },
              { label: "Logic Done", value: logicCompleted },
              { label: "Writing Done", value: writingCompleted },
              { label: "Quick Tasks", value: quickCompleted },
              { label: "Word Match", value: wordMatchCompleted },
              { label: "Memory Match", value: memoryMatchCompleted },
              { label: "Daily Quiz", value: dailyQuizCompleted },
              { label: "Easter Eggs", value: easterEggsFound },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Export / Import */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-gray-700 mb-3">Export / Import Profiles</h3>
          <div className="flex gap-2 mb-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-kid-blue text-white rounded-xl px-4 py-2 font-bold text-sm hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
          {showExportData && (
            <textarea
              readOnly
              value={exportData}
              className="w-full h-24 text-xs p-2 rounded-xl border-2 border-gray-200 font-mono"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          )}
          <div className="mt-3">
            <p className="text-sm font-bold text-gray-600 mb-1">Import Data:</p>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste exported data here..."
              className="w-full h-24 text-xs p-2 rounded-xl border-2 border-gray-200 font-mono"
            />
            <button
              onClick={handleImport}
              disabled={!importData.trim()}
              className="flex items-center gap-2 bg-kid-green text-white rounded-xl px-4 py-2 font-bold text-sm mt-2 hover:scale-105 transition-transform disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
