"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, RotateCcw, Star } from "lucide-react";
import { AgeGroup, DIFFICULTY_CONFIGS, getRandomSticker, getRandomEncouragement, getTodayString, isDailyChallengeAvailable, calculateStreak, AchievementStats, ACHIEVEMENTS } from "@/lib/gameData";
import { playCelebrate, playClick } from "@/lib/sounds";
import DeskScene from "@/components/DeskScene";
import DifficultySelector from "@/components/DifficultySelector";
import MathTask from "@/components/MathTask";
import ReadingTask from "@/components/ReadingTask";
import TypingTask from "@/components/TypingTask";
import StickerBoard from "@/components/StickerBoard";
import DeskShop from "@/components/DeskShop";
import ProgressReport from "@/components/ProgressReport";

type Screen = "welcome" | "difficulty" | "desk" | "math" | "reading" | "typing" | "celebration" | "shop" | "report";
type TaskType = "math" | "reading" | "typing";

interface PlayerProfile {
  playerName: string;
  ageGroup: AgeGroup;
  stickers: string[];
  stars: number;
  tasksCompleted: number;
  decorations: string[];
  mathCompleted: number;
  readingCompleted: number;
  typingCompleted: number;
  perfectScores: number;
  lastChallengeDate: string | null;
  streak: number;
  dailyChallengeProgress: string[];
  unlockedAchievements: string[];
}

const PROFILES_KEY = "kidsDeskJobProfiles";

function loadProfiles(): Record<string, PlayerProfile> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // Migrate old single-profile format if present
    const oldRaw = localStorage.getItem("kidsDeskJob");
    if (oldRaw && (!parsed || Object.keys(parsed).length === 0)) {
      const oldData = JSON.parse(oldRaw);
      if (oldData.playerName && oldData.ageGroup) {
        const migrated: Record<string, PlayerProfile> = {
          [oldData.playerName.toLowerCase()]: {
            playerName: oldData.playerName,
            ageGroup: oldData.ageGroup,
            stickers: oldData.stickers || [],
            stars: oldData.stars || 0,
            tasksCompleted: oldData.tasksCompleted || 0,
            decorations: [],
            mathCompleted: 0,
            readingCompleted: 0,
            typingCompleted: 0,
            perfectScores: 0,
            lastChallengeDate: null,
            streak: 0,
            dailyChallengeProgress: [],
            unlockedAchievements: [],
          },
        };
        localStorage.setItem(PROFILES_KEY, JSON.stringify(migrated));
        localStorage.removeItem("kidsDeskJob");
        return migrated;
      }
    }
    return parsed || {};
  } catch {
    return {};
  }
}

function saveProfile(profile: PlayerProfile) {
  if (typeof window === "undefined") return;
  const profiles = loadProfiles();
  profiles[profile.playerName.toLowerCase()] = profile;
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

function deleteProfile(name: string) {
  if (typeof window === "undefined") return;
  const profiles = loadProfiles();
  delete profiles[name.toLowerCase()];
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [playerName, setPlayerName] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [stickers, setStickers] = useState<string[]>([]);
  const [stars, setStars] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [completedTaskType, setCompletedTaskType] = useState<TaskType | null>(null);
  const [pendingSticker, setPendingSticker] = useState<string | null>(null);
  const [earnedStars, setEarnedStars] = useState(0);
  const [encouragement, setEncouragement] = useState("");
  const [savedProfiles, setSavedProfiles] = useState<Record<string, PlayerProfile>>({});
  const [decorations, setDecorations] = useState<string[]>([]);
  const [mathCompleted, setMathCompleted] = useState(0);
  const [readingCompleted, setReadingCompleted] = useState(0);
  const [typingCompleted, setTypingCompleted] = useState(0);
  const [perfectScores, setPerfectScores] = useState(0);
  const [lastChallengeDate, setLastChallengeDate] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [dailyChallengeProgress, setDailyChallengeProgress] = useState<string[]>([]);
  const [isDailyChallenge, setIsDailyChallenge] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  const config = ageGroup ? DIFFICULTY_CONFIGS[ageGroup] : null;

  useEffect(() => {
    const profiles = loadProfiles();
    setSavedProfiles(profiles);
  }, []);

  useEffect(() => {
    if (playerName && ageGroup) {
      saveProfile({
        playerName,
        ageGroup,
        stickers,
        stars,
        tasksCompleted,
        decorations,
        mathCompleted,
        readingCompleted,
        typingCompleted,
        perfectScores,
        lastChallengeDate,
        streak,
        dailyChallengeProgress,
        unlockedAchievements,
      });
      setSavedProfiles(loadProfiles());
    }
  }, [playerName, ageGroup, stickers, stars, tasksCompleted, decorations, mathCompleted, readingCompleted, typingCompleted, perfectScores, lastChallengeDate, streak, dailyChallengeProgress, unlockedAchievements]);

  useEffect(() => {
    if (screen === "celebration" && pendingSticker) {
      const timer = setTimeout(() => {
        setStickers((prev) => [...prev, pendingSticker]);
        setPendingSticker(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [screen, pendingSticker]);

  useEffect(() => {
    if (screen === "celebration") {
      checkAchievements();
    }
  }, [screen]);

  const loadProfileData = (profile: PlayerProfile) => {
    setPlayerName(profile.playerName);
    setAgeGroup(profile.ageGroup);
    setStickers(profile.stickers || []);
    setStars(profile.stars || 0);
    setTasksCompleted(profile.tasksCompleted || 0);
    setDecorations(profile.decorations || []);
    setMathCompleted(profile.mathCompleted || 0);
    setReadingCompleted(profile.readingCompleted || 0);
    setTypingCompleted(profile.typingCompleted || 0);
    setPerfectScores(profile.perfectScores || 0);
    setLastChallengeDate(profile.lastChallengeDate || null);
    setStreak(calculateStreak(profile.lastChallengeDate || null, profile.streak || 0));
    setDailyChallengeProgress(profile.dailyChallengeProgress || []);
    setUnlockedAchievements(profile.unlockedAchievements || []);
    setIsDailyChallenge(false);
  };

  const handleStart = () => {
    if (playerName.trim()) {
      playClick();
      const key = playerName.trim().toLowerCase();
      const existing = savedProfiles[key];
      if (existing) {
        loadProfileData(existing);
        setScreen("desk");
      } else {
        setScreen("difficulty");
      }
    }
  };

  const handleDifficultySelect = (group: AgeGroup) => {
    playClick();
    setAgeGroup(group);
    setScreen("desk");
  };

  const handleTaskComplete = (taskType: TaskType, earnedStarsCount: number) => {
    setStars((prev) => prev + earnedStarsCount);
    setTasksCompleted((prev) => prev + 1);
    if (taskType === "math") setMathCompleted((prev) => prev + 1);
    if (taskType === "reading") setReadingCompleted((prev) => prev + 1);
    if (taskType === "typing") setTypingCompleted((prev) => prev + 1);
    if (earnedStarsCount === 3) setPerfectScores((prev) => prev + 1);

    if (isDailyChallenge) {
      setDailyChallengeProgress((prev) => [...prev, taskType]);
    }

    setCompletedTaskType(taskType);
    setEarnedStars(earnedStarsCount);
    setPendingSticker(getRandomSticker());
    setEncouragement(getRandomEncouragement());
    setScreen("celebration");
    playCelebrate();
  };

  const checkAchievements = () => {
    const stats: AchievementStats = {
      totalStars: stars,
      tasksCompleted,
      mathCompleted,
      readingCompleted,
      typingCompleted,
      perfectScores,
      streak,
      stickersCollected: stickers.length,
    };
    const newlyUnlocked: string[] = [];
    ACHIEVEMENTS.forEach((badge) => {
      if (badge.check(stats) && !unlockedAchievements.includes(badge.id)) {
        newlyUnlocked.push(badge.id);
      }
    });
    if (newlyUnlocked.length > 0) {
      setUnlockedAchievements((prev) => [...prev, ...newlyUnlocked]);
      setNewAchievements(newlyUnlocked);
    }
  };

  const handleBuyDecoration = (decorationId: string, cost: number) => {
    if (stars >= cost && !decorations.includes(decorationId)) {
      setStars((prev) => prev - cost);
      setDecorations((prev) => [...prev, decorationId]);
      playClick();
    }
  };

  const handleDailyChallengeComplete = () => {
    const today = getTodayString();
    setLastChallengeDate(today);
    setStreak((prev) => prev + 1);
    setStars((prev) => prev + 5);
    setPendingSticker(getRandomSticker());
    setEncouragement("Daily Challenge Complete!");
    setEarnedStars(5);
    setDailyChallengeProgress([]);
    setIsDailyChallenge(false);
    setCompletedTaskType(null);
    setScreen("celebration");
    playCelebrate();
  };

  useEffect(() => {
    if (isDailyChallenge && dailyChallengeProgress.length >= 3) {
      handleDailyChallengeComplete();
    }
  }, [dailyChallengeProgress, isDailyChallenge]);

  const handleBackToDesk = () => {
    playClick();
    setScreen("desk");
    setCompletedTaskType(null);
  };

  const handleReset = () => {
    if (playerName) {
      deleteProfile(playerName);
    }
    setSavedProfiles(loadProfiles());
    setScreen("welcome");
    setPlayerName("");
    setAgeGroup(null);
    setStickers([]);
    setStars(0);
    setTasksCompleted(0);
    setDecorations([]);
    setMathCompleted(0);
    setReadingCompleted(0);
    setTypingCompleted(0);
    setPerfectScores(0);
    setLastChallengeDate(null);
    setStreak(0);
    setDailyChallengeProgress([]);
    setUnlockedAchievements([]);
    setCompletedTaskType(null);
    setPendingSticker(null);
    setEarnedStars(0);
    setIsDailyChallenge(false);
  };

  return (
    <main className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        {/* WELCOME SCREEN */}
        {screen === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="min-h-screen flex flex-col items-center justify-center p-6"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl mb-4"
            >
              🏢
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-kid-blue text-shadow-kid text-center mb-2">
              Kids Desk Job
            </h1>
            <p className="text-xl text-gray-600 text-center mb-8">
              Learn math, reading, and typing while working at your very own desk!
            </p>
            {/* Existing Profiles */}
            {Object.keys(savedProfiles).length > 0 && (
              <div className="w-full max-w-md mb-4">
                <p className="text-sm font-bold text-gray-500 mb-3 text-center">
                  👋 Welcome back! Pick your name:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(savedProfiles).map((profile) => {
                    const pc = DIFFICULTY_CONFIGS[profile.ageGroup];
                    return (
                      <motion.button
                        key={profile.playerName.toLowerCase()}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          playClick();
                          loadProfileData(profile);
                          setScreen("desk");
                        }}
                        className={`kid-card border-${pc.color} text-center cursor-pointer`}
                      >
                        <div className="text-3xl mb-1">{pc.emoji}</div>
                        <p className="font-bold text-gray-800 text-sm">{profile.playerName}</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-kid-yellow text-kid-yellow" />
                          <span className="text-xs font-bold text-gray-500">{profile.stars}</span>
                          <span className="text-xs text-gray-400 ml-1">{profile.stickers?.length || 0} stickers</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="kid-card border-kid-yellow w-full max-w-md">
              <label className="text-lg font-bold text-gray-700 mb-2 block">
                {Object.keys(savedProfiles).length > 0 ? "Or create a new profile:" : "What&apos;s your name? 🖊️"}
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                placeholder="Type your name here..."
                className="w-full px-4 py-3 rounded-xl border-2 border-kid-blue focus:outline-none focus:border-kid-purple text-lg"
                maxLength={20}
              />
              <button
                onClick={handleStart}
                disabled={!playerName.trim()}
                className="kid-button bg-kid-green hover:bg-green-600 w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {savedProfiles[playerName.trim().toLowerCase()] ? "Continue" : "Let&apos;s Go!"}
                </span>
              </button>
            </div>
            <div className="flex gap-3 mt-6 text-4xl">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🔢</motion.span>
              <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>📚</motion.span>
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>⌨️</motion.span>
            </div>
          </motion.div>
        )}

        {/* DIFFICULTY SCREEN */}
        {screen === "difficulty" && (
          <DifficultySelector
            key="difficulty"
            playerName={playerName}
            onSelect={handleDifficultySelect}
          />
        )}

        {/* DESK SCREEN */}
        {screen === "desk" && config && ageGroup && (
          <DeskScene
            key="desk"
            playerName={playerName}
            ageGroup={ageGroup}
            stars={stars}
            stickers={stickers}
            tasksCompleted={tasksCompleted}
            decorations={decorations}
            streak={streak}
            dailyAvailable={isDailyChallengeAvailable(lastChallengeDate)}
            dailyChallengeProgress={dailyChallengeProgress}
            unlockedAchievements={unlockedAchievements}
            onTaskSelect={(task) => setScreen(task)}
            onOpenShop={() => setScreen("shop")}
            onOpenReport={() => setScreen("report")}
            onStartDailyChallenge={() => { setIsDailyChallenge(true); setDailyChallengeProgress([]); }}
            onReset={handleReset}
          />
        )}

        {/* MATH TASK */}
        {screen === "math" && config && ageGroup && (
          <MathTask
            key="math"
            config={config}
            onComplete={(earned) => handleTaskComplete("math", earned)}
            onBack={() => setScreen("desk")}
          />
        )}

        {/* READING TASK */}
        {screen === "reading" && config && ageGroup && (
          <ReadingTask
            key="reading"
            config={config}
            onComplete={(earned) => handleTaskComplete("reading", earned)}
            onBack={() => setScreen("desk")}
          />
        )}

        {/* TYPING TASK */}
        {screen === "typing" && config && ageGroup && (
          <TypingTask
            key="typing"
            config={config}
            onComplete={(earned) => handleTaskComplete("typing", earned)}
            onBack={() => setScreen("desk")}
          />
        )}

        {/* CELEBRATION SCREEN */}
        {screen === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="kid-card border-kid-yellow text-center max-w-md"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-kid-orange mb-2">
                {encouragement}, {playerName}!
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {completedTaskType ? `You finished your ${completedTaskType} task!` : "Amazing work!"}
              </p>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.2, type: "spring" }}
                  >
                    <Star
                      className={`w-10 h-10 ${
                        i <= earnedStars ? "fill-kid-yellow text-kid-yellow" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              {earnedStars === 3 && (
                <p className="text-kid-orange font-bold mb-2">⭐ Perfect Score! ⭐</p>
              )}
              {pendingSticker && (
                <motion.div
                  initial={{ scale: 0, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="text-6xl mb-4"
                >
                  {pendingSticker}
                </motion.div>
              )}
              <p className="text-sm text-gray-500 mb-4">
                A new sticker for your collection!
              </p>
              {newAchievements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="bg-kid-purple/10 rounded-xl p-3 mb-4 border-2 border-kid-purple/30"
                >
                  <p className="text-sm font-bold text-kid-purple mb-2">🏆 New Achievement Unlocked!</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {newAchievements.map((aid) => {
                      const badge = ACHIEVEMENTS.find((b) => b.id === aid);
                      return badge ? (
                        <div key={aid} className="flex items-center gap-1 bg-white rounded-lg px-2 py-1">
                          <span className="text-xl">{badge.emoji}</span>
                          <span className="text-xs font-bold text-gray-700">{badge.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </motion.div>
              )}
              <button
                onClick={() => {
                  setNewAchievements([]);
                  handleBackToDesk();
                }}
                className="kid-button bg-kid-green hover:bg-green-600 w-full"
              >
                Back to Desk 🖥️
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* SHOP SCREEN */}
        {screen === "shop" && (
          <DeskShop
            key="shop"
            stars={stars}
            ownedDecorations={decorations}
            onBuy={handleBuyDecoration}
            onBack={() => setScreen("desk")}
          />
        )}

        {/* REPORT SCREEN */}
        {screen === "report" && config && ageGroup && (
          <ProgressReport
            key="report"
            playerName={playerName}
            ageGroup={ageGroup}
            stars={stars}
            tasksCompleted={tasksCompleted}
            mathCompleted={mathCompleted}
            readingCompleted={readingCompleted}
            typingCompleted={typingCompleted}
            perfectScores={perfectScores}
            streak={streak}
            stickersCount={stickers.length}
            unlockedAchievements={unlockedAchievements}
            onBack={() => setScreen("desk")}
          />
        )}
      </AnimatePresence>

      {/* Sticker Board - always visible on desk and task screens */}
      {(screen === "desk" || screen === "math" || screen === "reading" || screen === "typing" || screen === "shop" || screen === "report") && (
        <StickerBoard stickers={stickers} />
      )}
    </main>
  );
}
