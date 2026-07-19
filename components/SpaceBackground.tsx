"use client";

import { useState, useEffect, useRef, useCallback, type MouseEvent, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  twinkleDelay: number;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
}

interface Ship {
  id: number;
  emoji: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  direction: number;
}

interface Planet {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  floatDelay: number;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Props {
  onCollectStar?: (bonus: number) => void;
}

export default function SpaceBackground({ onCollectStar }: Props) {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [ships, setShips] = useState<Ship[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [collectedIds, setCollectedIds] = useState<Set<number>>(new Set());
  const [clickEffects, setClickEffects] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const nextId = useRef(0);
  const nextShootId = useRef(0);
  const nextEffectId = useRef(0);

  useEffect(() => {
    const newStars: Star[] = [];
    for (let i = 0; i < 80; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        twinkleDelay: Math.random() * 3,
      });
    }
    setStars(newStars);

    const planetEmojis = ["🪐", "🌍", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🌕", "🌖"];
    const newPlanets: Planet[] = [];
    for (let i = 0; i < 5; i++) {
      newPlanets.push({
        id: i,
        emoji: planetEmojis[Math.floor(Math.random() * planetEmojis.length)],
        x: Math.random() * 85 + 5,
        y: Math.random() * 70 + 5,
        size: Math.random() * 40 + 30,
        floatDelay: Math.random() * 4,
      });
    }
    setPlanets(newPlanets);

    const shipEmojis = ["🚀", "🛸", "🛰️", "飞船"];
    const newShips: Ship[] = [];
    for (let i = 0; i < 3; i++) {
      const dir = Math.random() > 0.5 ? 1 : -1;
      newShips.push({
        id: i,
        emoji: shipEmojis[Math.floor(Math.random() * shipEmojis.length)],
        x: dir === 1 ? -10 : 110,
        y: Math.random() * 60 + 10,
        duration: Math.random() * 15 + 20,
        delay: i * 7,
        direction: dir,
      });
    }
    setShips(newShips);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = nextShootId.current++;
      setShootingStars((prev) => [
        ...prev.slice(-3),
        { id, x: Math.random() * 80, y: Math.random() * 40, angle: 30 + Math.random() * 30 },
      ]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
      }, 2000);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const bonusEmojis = ["⭐", "🌟", "✨", "💫", "🎁", "🪙"];
      const id = nextId.current++;
      setFloatingEmojis((prev) => [
        ...prev.slice(-4),
        {
          id,
          emoji: bonusEmojis[Math.floor(Math.random() * bonusEmojis.length)],
          x: Math.random() * 85 + 5,
          y: Math.random() * 70 + 10,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        },
      ]);
      setTimeout(() => {
        setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
        setCollectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 8000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCollect = useCallback((id: number, emoji: string, x: number, y: number) => {
    if (collectedIds.has(id)) return;
    setCollectedIds((prev) => new Set(prev).add(id));
    setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));

    const bonus = emoji === "🎁" ? 3 : emoji === "🪙" ? 2 : 1;
    if (onCollectStar) onCollectStar(bonus);

    const effectId = nextEffectId.current++;
    setClickEffects((prev) => [...prev, { id: effectId, x, y, emoji: `+${bonus}⭐` }]);
    setTimeout(() => {
      setClickEffects((prev) => prev.filter((e) => e.id !== effectId));
    }, 1500);
  }, [collectedIds, onCollectStar]);

  const handleBgClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-collectible]") || target.closest("[data-interactive]")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const effectId = nextEffectId.current++;
    const sparkles = ["✨", "💫", "⭐", "🌟"];
    const emoji = sparkles[Math.floor(Math.random() * sparkles.length)];
    setClickEffects((prev) => [...prev, { id: effectId, x, y, emoji }]);
    setTimeout(() => {
      setClickEffects((prev) => prev.filter((e) => e.id !== effectId));
    }, 1200);
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
      onClick={handleBgClick}
    >
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a2e] via-[#1a1a4e] to-[#0d0d3b]" />

      {/* Nebula clouds */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-purple-600 blur-3xl" />
        <div className="absolute top-[40%] right-[10%] w-80 h-80 rounded-full bg-blue-600 blur-3xl" />
        <div className="absolute bottom-[10%] left-[40%] w-72 h-72 rounded-full bg-pink-600 blur-3xl" />
      </div>

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + star.twinkleDelay, repeat: Infinity, delay: star.twinkleDelay }}
        />
      ))}

      {/* Planets */}
      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          data-interactive
          className="absolute select-none cursor-pointer"
          style={{ left: `${planet.x}%`, top: `${planet.y}%`, fontSize: `${planet.size}px` }}
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6 + planet.floatDelay, repeat: Infinity, delay: planet.floatDelay }}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.8 }}
        >
          {planet.emoji}
        </motion.div>
      ))}

      {/* Flying ships */}
      {ships.map((ship) => (
        <motion.div
          key={ship.id}
          data-interactive
          className="absolute text-3xl select-none"
          style={{ top: `${ship.y}%` }}
          initial={{ x: `${ship.x}%` }}
          animate={{ x: ship.direction === 1 ? "110%" : "-10%" }}
          transition={{ duration: ship.duration, repeat: Infinity, delay: ship.delay, ease: "linear" }}
        >
          <motion.div
            animate={{ rotate: ship.direction === 1 ? 0 : 180 }}
            style={{ display: "inline-block" }}
          >
            {ship.emoji}
          </motion.div>
          {/* Trail */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 text-lg opacity-50"
            style={{ [ship.direction === 1 ? "right" : "left"]: "100%" } as CSSProperties}
            animate={{ opacity: [0.5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {ship.direction === 1 ? "💨" : "💨"}
          </motion.div>
        </motion.div>
      ))}

      {/* Shooting stars */}
      <AnimatePresence>
        {shootingStars.map((shoot) => (
          <motion.div
            key={shoot.id}
            className="absolute"
            style={{ left: `${shoot.x}%`, top: `${shoot.y}%` }}
            initial={{ opacity: 0, rotate: shoot.angle }}
            animate={{ opacity: [0, 1, 0], x: 300, y: 200 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="text-2xl">☄️</div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating collectible emojis */}
      <AnimatePresence>
        {floatingEmojis.map((item) => (
          <motion.div
            key={item.id}
            data-collectible
            className={`absolute text-2xl cursor-pointer select-none ${collectedIds.has(item.id) ? "opacity-0" : ""}`}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ scale: { duration: 0.3 }, opacity: { duration: 0.3 }, y: { duration: 2, repeat: Infinity }, rotate: { duration: 3, repeat: Infinity } }}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
              handleCollect(item.id, item.emoji, item.x, item.y);
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click effects */}
      <AnimatePresence>
        {clickEffects.map((effect) => (
          <motion.div
            key={effect.id}
            className="absolute pointer-events-none text-lg font-bold text-yellow-300"
            style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ scale: 1, opacity: [0, 1, 0], y: -40 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {effect.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Astronaut floating */}
      <motion.div
        data-interactive
        className="absolute text-4xl select-none cursor-pointer"
        style={{ left: "70%", top: "15%" }}
        animate={{ y: [0, -25, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.8 }}
      >
        🧑‍🚀
      </motion.div>

      {/* Alien peeking */}
      <motion.div
        data-interactive
        className="absolute text-3xl select-none cursor-pointer"
        style={{ left: "10%", bottom: "5%" }}
        animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.7 }}
      >
        👽
      </motion.div>

      {/* Satellite */}
      <motion.div
        data-interactive
        className="absolute text-2xl select-none cursor-pointer"
        style={{ left: "25%", top: "25%" }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.8 }}
      >
        🛰️
      </motion.div>
    </div>
  );
}
