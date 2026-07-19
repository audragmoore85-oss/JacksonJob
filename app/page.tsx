"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, RotateCcw, Star } from "lucide-react";
import { AgeGroup, DIFFICULTY_CONFIGS, getRandomSticker, getRandomEncouragement, getTodayString, isDailyChallengeAvailable, calculateStreak, AchievementStats, ACHIEVEMENTS, AchievementBadge, AVATARS, Avatar, getAvailableBossProject, getBossProjectThreshold, BOSS_PROJECTS, BossProject as BossProjectData, getCurrentSeasonalTheme } from "@/lib/gameData";
import { playCelebrate, playClick } from "@/lib/sounds";
import DeskScene from "@/components/DeskScene";
import DifficultySelector from "@/components/DifficultySelector";
import MathTask from "@/components/MathTask";
import ReadingTask from "@/components/ReadingTask";
import TypingTask from "@/components/TypingTask";
import SpellingTask from "@/components/SpellingTask";
import LogicTask from "@/components/LogicTask";
import WritingTask from "@/components/WritingTask";
import TimerMode from "@/components/TimerMode";
import StickerBoard from "@/components/StickerBoard";
import DeskShop from "@/components/DeskShop";
import ProgressReport from "@/components/ProgressReport";
import OfficePet from "@/components/OfficePet";
import BossProjectScreen from "@/components/BossProject";
import CoworkerGallery from "@/components/CoworkerGallery";
import CoffeeBreak from "@/components/CoffeeBreak";
import ParentDashboard from "@/components/ParentDashboard";
import SpaceBackground from "@/components/SpaceBackground";
import LuckySpin from "@/components/LuckySpin";
import RewardChest from "@/components/RewardChest";
import MusicPlayer from "@/components/MusicPlayer";

type Screen = "welcome" | "difficulty" | "desk" | "math" | "reading" | "typing" | "spelling" | "logic" | "writing" | "timer" | "celebration" | "shop" | "report" | "boss" | "gallery" | "parent";
type TaskType = "math" | "reading" | "typing" | "spelling" | "logic" | "writing" | "quick";

interface PlayerProfile {
  playerName: string;
  ageGroup: AgeGroup;
  avatar: string;
  stickers: string[];
  stars: number;
  tasksCompleted: number;
  decorations: string[];
  ownedThemes: string[];
  currentTheme: string;
  mathCompleted: number;
  readingCompleted: number;
  typingCompleted: number;
  spellingCompleted: number;
  logicCompleted: number;
  writingCompleted: number;
  perfectScores: number;
  lastChallengeDate: string | null;
  streak: number;
  dailyChallengeProgress: string[];
  unlockedAchievements: string[];
  bossProjectsDone: string[];
  bossProjectProgress: string[];
  activeBossProject: string | null;
  showPet: boolean;
  lastSpinDate: string | null;
  quickCompleted: number;
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
            avatar: AVATARS[0].id,
            stickers: oldData.stickers || [],
            stars: oldData.stars || 0,
            tasksCompleted: oldData.tasksCompleted || 0,
            decorations: [],
            ownedThemes: [],
            currentTheme: "default",
            mathCompleted: 0,
            readingCompleted: 0,
            typingCompleted: 0,
            spellingCompleted: 0,
            logicCompleted: 0,
            writingCompleted: 0,
            perfectScores: 0,
            lastChallengeDate: null,
            streak: 0,
            dailyChallengeProgress: [],
            unlockedAchievements: [],
            bossProjectsDone: [],
            bossProjectProgress: [],
            activeBossProject: null,
            showPet: true,
            lastSpinDate: null,
            quickCompleted: 0,
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
  delete profiles[name.trim().toLowerCase()];
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
  const [avatar, setAvatar] = useState<string>(AVATARS[0].id);
  const [decorations, setDecorations] = useState<string[]>([]);
  const [ownedThemes, setOwnedThemes] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState("default");
  const [mathCompleted, setMathCompleted] = useState(0);
  const [readingCompleted, setReadingCompleted] = useState(0);
  const [typingCompleted, setTypingCompleted] = useState(0);
  const [spellingCompleted, setSpellingCompleted] = useState(0);
  const [logicCompleted, setLogicCompleted] = useState(0);
  const [writingCompleted, setWritingCompleted] = useState(0);
  const [perfectScores, setPerfectScores] = useState(0);
  const [lastChallengeDate, setLastChallengeDate] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [dailyChallengeProgress, setDailyChallengeProgress] = useState<string[]>([]);
  const [isDailyChallenge, setIsDailyChallenge] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [bossProjectsDone, setBossProjectsDone] = useState<string[]>([]);
  const [bossProjectProgress, setBossProjectProgress] = useState<string[]>([]);
  const [activeBossProject, setActiveBossProject] = useState<string | null>(null);
  const [showPet, setShowPet] = useState(true);
  const [showCoffeeBreak, setShowCoffeeBreak] = useState(false);
  const [showLuckySpin, setShowLuckySpin] = useState(false);
  const [showRewardChest, setShowRewardChest] = useState(false);
  const [lastSpinDate, setLastSpinDate] = useState<string | null>(null);
  const [quickCompleted, setQuickCompleted] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(AVATARS[0].id);

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
        avatar,
        stickers,
        stars,
        tasksCompleted,
        decorations,
        ownedThemes,
        currentTheme,
        mathCompleted,
        readingCompleted,
        typingCompleted,
        spellingCompleted,
        logicCompleted,
        writingCompleted,
        perfectScores,
        lastChallengeDate,
        streak,
        dailyChallengeProgress,
        unlockedAchievements,
        bossProjectsDone,
        bossProjectProgress,
        activeBossProject,
        showPet,
        lastSpinDate,
        quickCompleted,
      });
      setSavedProfiles(loadProfiles());
    }
  }, [playerName, ageGroup, avatar, stickers, stars, tasksCompleted, decorations, ownedThemes, currentTheme, mathCompleted, readingCompleted, typingCompleted, spellingCompleted, logicCompleted, writingCompleted, perfectScores, lastChallengeDate, streak, dailyChallengeProgress, unlockedAchievements, bossProjectsDone, bossProjectProgress, activeBossProject, showPet, lastSpinDate, quickCompleted]);

  useEffect(() => {
    if (screen === "celebration" && pendingSticker) {
      const timer = setTimeout(() => {
        setStickers((prev: string[]) => [...prev, pendingSticker]);
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
    setAvatar(profile.avatar || AVATARS[0].id);
    setStickers(profile.stickers || []);
    setStars(profile.stars || 0);
    setTasksCompleted(profile.tasksCompleted || 0);
    setDecorations(profile.decorations || []);
    setOwnedThemes(profile.ownedThemes || []);
    setCurrentTheme(profile.currentTheme || "default");
    setMathCompleted(profile.mathCompleted || 0);
    setReadingCompleted(profile.readingCompleted || 0);
    setTypingCompleted(profile.typingCompleted || 0);
    setSpellingCompleted(profile.spellingCompleted || 0);
    setLogicCompleted(profile.logicCompleted || 0);
    setWritingCompleted(profile.writingCompleted || 0);
    setPerfectScores(profile.perfectScores || 0);
    setLastChallengeDate(profile.lastChallengeDate || null);
    setStreak(calculateStreak(profile.lastChallengeDate || null, profile.streak || 0));
    setDailyChallengeProgress(profile.dailyChallengeProgress || []);
    setUnlockedAchievements(profile.unlockedAchievements || []);
    setBossProjectsDone(profile.bossProjectsDone || []);
    setBossProjectProgress(profile.bossProjectProgress || []);
    setActiveBossProject(profile.activeBossProject || null);
    setShowPet(profile.showPet !== false);
    setLastSpinDate(profile.lastSpinDate || null);
    setQuickCompleted(profile.quickCompleted || 0);
    setIsDailyChallenge(false);
  };

  const handleStart = () => {
    const trimmed = playerName.trim();
    if (trimmed) {
      setPlayerName(trimmed);
      playClick();
      const key = trimmed.toLowerCase();
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
    setAvatar(selectedAvatar);
    setScreen("desk");
  };

  const handleTaskComplete = (taskType: TaskType, earnedStarsCount: number) => {
    setStars((prev: number) => prev + earnedStarsCount);
    setTasksCompleted((prev: number) => prev + 1);
    if (taskType === "math") setMathCompleted((prev: number) => prev + 1);
    if (taskType === "reading") setReadingCompleted((prev: number) => prev + 1);
    if (taskType === "typing") setTypingCompleted((prev: number) => prev + 1);
    if (taskType === "spelling") setSpellingCompleted((prev: number) => prev + 1);
    if (taskType === "logic") setLogicCompleted((prev: number) => prev + 1);
    if (taskType === "writing") setWritingCompleted((prev: number) => prev + 1);
    if (taskType === "quick") setQuickCompleted((prev: number) => prev + 1);
    if (earnedStarsCount === 3) setPerfectScores((prev: number) => prev + 1);

    if (isDailyChallenge && (taskType === "math" || taskType === "reading" || taskType === "typing") && !dailyChallengeProgress.includes(taskType)) {
      setDailyChallengeProgress((prev: string[]) => [...prev, taskType]);
    }

    if (activeBossProject && (taskType === "math" || taskType === "reading" || taskType === "typing") && !bossProjectProgress.includes(taskType)) {
      const newProgress = [...bossProjectProgress, taskType];
      setBossProjectProgress(newProgress);
      if (newProgress.length >= 3) {
        const project = BOSS_PROJECTS.find((p: BossProjectData) => p.id === activeBossProject);
        if (project) {
          setStars((prev: number) => prev + project.bonusStars);
          setStickers((prev: string[]) => [...prev, project.bonusSticker]);
          setBossProjectsDone((prev: string[]) => [...prev, project.id]);
          setActiveBossProject(null);
          setBossProjectProgress([]);
        }
      }
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
      spellingCompleted,
      logicCompleted,
      writingCompleted,
      perfectScores,
      streak,
      stickersCollected: stickers.length + (pendingSticker ? 1 : 0),
      quickCompleted,
    };
    const newlyUnlocked: string[] = [];
    ACHIEVEMENTS.forEach((badge) => {
      if (badge.check(stats) && !unlockedAchievements.includes(badge.id)) {
        newlyUnlocked.push(badge.id);
      }
    });
    setNewAchievements(newlyUnlocked);
    if (newlyUnlocked.length > 0) {
      setUnlockedAchievements((prev: string[]) => [...prev, ...newlyUnlocked]);
    }
  };

  const handleBuyDecoration = (decorationId: string, cost: number) => {
    if (stars >= cost && !decorations.includes(decorationId)) {
      setStars((prev: number) => prev - cost);
      setDecorations((prev: string[]) => [...prev, decorationId]);
      playClick();
    }
  };

  const handleBuyTheme = (themeId: string, cost: number) => {
    if (stars >= cost && !ownedThemes.includes(themeId)) {
      setStars((prev: number) => prev - cost);
      setOwnedThemes((prev: string[]) => [...prev, themeId]);
      setCurrentTheme(themeId);
      playClick();
    }
  };

  const handleSelectTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    playClick();
  };

  const handleSpinReward = (rewardStars: number) => {
    setStars((prev: number) => prev + rewardStars);
    setLastSpinDate(getTodayString());
  };

  const handleSpaceCollect = (bonus: number) => {
    setStars((prev: number) => prev + bonus);
  };

  const handleChestReward = (rewardStars: number) => {
    setStars((prev: number) => prev + rewardStars);
  };

  const canSpinToday = lastSpinDate !== getTodayString();

  useEffect(() => {
    if (screen !== "desk") return;
    const timer = setTimeout(() => {
      setShowRewardChest(true);
      setTimeout(() => setShowRewardChest(false), 10000);
    }, 30000 + Math.random() * 30000);
    return () => clearTimeout(timer);
  }, [screen]);

  const handleDailyChallengeComplete = () => {
    const today = getTodayString();
    setLastChallengeDate(today);
    setStreak((prev: number) => prev + 1);
    setStars((prev: number) => prev + 5);
    if (pendingSticker) {
      setStickers((prev: string[]) => [...prev, pendingSticker]);
    }
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
    if (pendingSticker) {
      setStickers((prev: string[]) => [...prev, pendingSticker]);
      setPendingSticker(null);
    }
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
    setAvatar(AVATARS[0].id);
    setStickers([]);
    setStars(0);
    setTasksCompleted(0);
    setDecorations([]);
    setMathCompleted(0);
    setReadingCompleted(0);
    setTypingCompleted(0);
    setSpellingCompleted(0);
    setLogicCompleted(0);
    setPerfectScores(0);
    setLastChallengeDate(null);
    setStreak(0);
    setDailyChallengeProgress([]);
    setUnlockedAchievements([]);
    setBossProjectsDone([]);
    setBossProjectProgress([]);
    setActiveBossProject(null);
    setCompletedTaskType(null);
    setPendingSticker(null);
    setEarnedStars(0);
    setIsDailyChallenge(false);
    setShowPet(true);
    setShowCoffeeBreak(false);
    setSelectedAvatar(AVATARS[0].id);
    setNewAchievements([]);
    setQuickCompleted(0);
  };

  return (
    <main className="min-h-screen w-full relative">
      {/* Interactive Space Background */}
      {screen !== "welcome" && screen !== "difficulty" && (
        <SpaceBackground onCollectStar={handleSpaceCollect} />
      )}

      {/* Content wrapper above background */}
      <div className="relative z-10">
      <AnimatePresence mode="wait">
        {/* WELCOME SCREEN */}
        {screen === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="min-h-screen flex flex-col items-center justify-center p-6"
            style={{ background: "linear-gradient(135deg, #FFF8E7 0%, #E8F4FD 100%)" }}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl mb-4"
            >
              {getCurrentSeasonalTheme()?.emoji || "🏢"}
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
                  {(Object.values(savedProfiles) as PlayerProfile[]).map((profile) => {
                    const pc = DIFFICULTY_CONFIGS[profile.ageGroup];
                    const av = AVATARS.find((a: Avatar) => a.id === profile.avatar) || AVATARS[0];
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
                        <div className="text-3xl mb-1">{av.emoji}</div>
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

                {/* Leaderboard */}
                {Object.keys(savedProfiles).length > 1 && (
                  <div className="mt-4 bg-gradient-to-r from-kid-yellow/20 to-kid-orange/20 rounded-2xl p-3 border-2 border-kid-yellow/40">
                    <p className="text-sm font-bold text-kid-orange text-center mb-2">🏆 Leaderboard</p>
                    <div className="space-y-1">
                      {(Object.values(savedProfiles) as PlayerProfile[])
                        .sort((a, b) => b.stars - a.stars)
                        .slice(0, 5)
                        .map((profile, idx) => {
                          const av = AVATARS.find((a: Avatar) => a.id === profile.avatar) || AVATARS[0];
                          const medals = ["🥇", "🥈", "🥉"];
                          return (
                            <div key={profile.playerName.toLowerCase()} className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-1">
                              <span className="text-sm font-bold w-6">{medals[idx] || `${idx + 1}.`}</span>
                              <span className="text-lg">{av.emoji}</span>
                              <span className="text-sm font-bold text-gray-700 flex-1 text-left">{profile.playerName}</span>
                              <span className="text-sm font-bold text-kid-orange flex items-center gap-1">
                                <Star className="w-3 h-3 fill-kid-yellow text-kid-yellow" />
                                {profile.stars}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="kid-card border-kid-yellow w-full max-w-md">
              <label className="text-lg font-bold text-gray-700 mb-2 block">
                {Object.keys(savedProfiles).length > 0 ? "Or create a new profile:" : "What's your name? 🖊️"}
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
                  {savedProfiles[playerName.trim().toLowerCase()] ? "Continue" : "Let's Go!"}
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
            selectedAvatar={selectedAvatar}
            onSelectAvatar={setSelectedAvatar}
          />
        )}

        {/* DESK SCREEN */}
        {screen === "desk" && config && ageGroup && (
          <DeskScene
            key="desk"
            playerName={playerName}
            ageGroup={ageGroup}
            avatar={avatar}
            stars={stars}
            tasksCompleted={tasksCompleted}
            decorations={decorations}
            currentTheme={currentTheme}
            streak={streak}
            dailyAvailable={isDailyChallengeAvailable(lastChallengeDate)}
            dailyChallengeProgress={dailyChallengeProgress}
            unlockedAchievements={unlockedAchievements}
            bossProject={getAvailableBossProject(tasksCompleted, bossProjectsDone)}
            bossThreshold={getBossProjectThreshold(tasksCompleted, bossProjectsDone)}
            bossProjectsDone={bossProjectsDone}
            onTaskSelect={(task) => setScreen(task)}
            onOpenShop={() => setScreen("shop")}
            onOpenReport={() => setScreen("report")}
            onOpenGallery={() => setScreen("gallery")}
            onOpenParent={() => setScreen("parent")}
            onStartBoss={(projId) => { setActiveBossProject(projId); setBossProjectProgress([]); setScreen("boss"); }}
            onStartDailyChallenge={() => { setIsDailyChallenge(true); setDailyChallengeProgress([]); }}
            onCoffeeBreak={() => setShowCoffeeBreak(true)}
            onTogglePet={() => setShowPet(!showPet)}
            onStartTimer={() => setScreen("timer")}
            onReset={handleReset}
          />
        )}

        {/* MATH TASK */}
        {screen === "math" && config && ageGroup && (
          <MathTask
            key="math"
            config={config}
            ageGroup={ageGroup}
            onComplete={(earned) => handleTaskComplete("math", earned)}
            onBack={() => activeBossProject ? setScreen("boss") : setScreen("desk")}
          />
        )}

        {/* READING TASK */}
        {screen === "reading" && config && ageGroup && (
          <ReadingTask
            key="reading"
            config={config}
            onComplete={(earned) => handleTaskComplete("reading", earned)}
            onBack={() => activeBossProject ? setScreen("boss") : setScreen("desk")}
          />
        )}

        {/* TYPING TASK */}
        {screen === "typing" && config && ageGroup && (
          <TypingTask
            key="typing"
            config={config}
            ageGroup={ageGroup}
            onComplete={(earned) => handleTaskComplete("typing", earned)}
            onBack={() => activeBossProject ? setScreen("boss") : setScreen("desk")}
          />
        )}

        {/* SPELLING TASK */}
        {screen === "spelling" && config && ageGroup && (
          <SpellingTask
            key="spelling"
            config={config}
            ageGroup={ageGroup}
            onComplete={(earned) => handleTaskComplete("spelling", earned)}
            onBack={() => activeBossProject ? setScreen("boss") : setScreen("desk")}
          />
        )}

        {/* LOGIC TASK */}
        {screen === "logic" && config && ageGroup && (
          <LogicTask
            key="logic"
            config={config}
            ageGroup={ageGroup}
            onComplete={(earned) => handleTaskComplete("logic", earned)}
            onBack={() => activeBossProject ? setScreen("boss") : setScreen("desk")}
          />
        )}

        {/* WRITING TASK */}
        {screen === "writing" && config && ageGroup && (
          <WritingTask
            key="writing"
            config={config}
            ageGroup={ageGroup}
            onComplete={(earned) => handleTaskComplete("writing", earned)}
            onBack={() => activeBossProject ? setScreen("boss") : setScreen("desk")}
          />
        )}

        {/* TIMER MODE */}
        {screen === "timer" && ageGroup && (
          <TimerMode
            key="timer"
            ageGroup={ageGroup}
            onComplete={(earned) => handleTaskComplete("quick", earned)}
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
                  className="text-6xl mb-2"
                >
                  {pendingSticker}
                </motion.div>
              )}
              {pendingSticker && (
                <p className="text-sm text-gray-500 mb-4">
                  A new sticker for your collection!
                </p>
              )}
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
                      const badge = ACHIEVEMENTS.find((b: AchievementBadge) => b.id === aid);
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
            ownedThemes={ownedThemes}
            currentTheme={currentTheme}
            onBuy={handleBuyDecoration}
            onBuyTheme={handleBuyTheme}
            onSelectTheme={handleSelectTheme}
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
            spellingCompleted={spellingCompleted}
            logicCompleted={logicCompleted}
            writingCompleted={writingCompleted}
            quickCompleted={quickCompleted}
            perfectScores={perfectScores}
            streak={streak}
            stickersCount={stickers.length}
            unlockedAchievements={unlockedAchievements}
            onBack={() => setScreen("desk")}
          />
        )}

        {/* BOSS PROJECT SCREEN */}
        {screen === "boss" && activeBossProject && (
          <BossProjectScreen
            key="boss"
            project={BOSS_PROJECTS.find((p: BossProjectData) => p.id === activeBossProject)!}
            progress={bossProjectProgress}
            onBack={() => { setActiveBossProject(null); setBossProjectProgress([]); setScreen("desk"); }}
            onStartTask={(task) => setScreen(task)}
          />
        )}

        {/* COWORKER GALLERY SCREEN */}
        {screen === "gallery" && (
          <CoworkerGallery
            key="gallery"
            typingCompleted={typingCompleted}
            onBack={() => setScreen("desk")}
          />
        )}

        {/* PARENT DASHBOARD SCREEN */}
        {screen === "parent" && ageGroup && (
          <ParentDashboard
            key="parent"
            playerName={playerName}
            ageGroup={ageGroup}
            stars={stars}
            tasksCompleted={tasksCompleted}
            mathCompleted={mathCompleted}
            readingCompleted={readingCompleted}
            typingCompleted={typingCompleted}
            spellingCompleted={spellingCompleted}
            logicCompleted={logicCompleted}
            writingCompleted={writingCompleted}
            quickCompleted={quickCompleted}
            perfectScores={perfectScores}
            streak={streak}
            stickersCount={stickers.length}
            unlockedAchievements={unlockedAchievements}
            onBack={() => setScreen("desk")}
            onExport={() => {
              try {
                const data = localStorage.getItem(PROFILES_KEY) || "{}";
                const blob = new Blob([data], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "kids-desk-job-profiles.json";
                a.click();
                URL.revokeObjectURL(url);
              } catch {}
            }}
            onImport={(data) => {
              try {
                localStorage.setItem(PROFILES_KEY, data);
                setSavedProfiles(loadProfiles());
                setScreen("welcome");
              } catch { }
            }}
            onForceDifficulty={(group) => {
              setAgeGroup(group);
              setScreen("desk");
            }}
          />
        )}
      </AnimatePresence>

      {/* Office Pet - visible on desk screen */}
      {showPet && screen === "desk" && (
        <OfficePet totalStars={stars} onClose={() => setShowPet(false)} />
      )}

      {/* Coffee Break overlay */}
      {showCoffeeBreak && (
        <CoffeeBreak onComplete={() => setShowCoffeeBreak(false)} />
      )}

      {/* Sticker Board - always visible on desk and task screens */}
      {(screen === "desk" || screen === "math" || screen === "reading" || screen === "typing" || screen === "spelling" || screen === "logic" || screen === "writing" || screen === "timer" || screen === "shop" || screen === "report") && (
        <StickerBoard stickers={stickers} />
      )}
      </div>

      {/* Lucky Spin Button - on desk screen */}
      {screen === "desk" && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowLuckySpin(true)}
          className="fixed bottom-20 left-4 md:left-8 z-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg border-2 border-white/30"
        >
          🎡
        </motion.button>
      )}

      {/* Lucky Spin Modal */}
      <AnimatePresence>
        {showLuckySpin && (
          <LuckySpin
            onReward={handleSpinReward}
            onClose={() => setShowLuckySpin(false)}
            canSpin={canSpinToday}
          />
        )}
      </AnimatePresence>

      {/* Reward Chest - appears periodically */}
      <AnimatePresence>
        {showRewardChest && screen === "desk" && (
          <RewardChest
            onOpen={handleChestReward}
            onDismiss={() => setShowRewardChest(false)}
          />
        )}
      </AnimatePresence>

      {/* Background Music Player */}
      {screen !== "welcome" && screen !== "difficulty" && (
        <MusicPlayer />
      )}
    </main>
  );
}
