"use client";

import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react";

interface Track {
  name: string;
  emoji: string;
  notes: number[];
  tempo: number;
  loop: number;
}

const TRACKS: Track[] = [
  {
    name: "Space Adventure",
    emoji: "🚀",
    tempo: 400,
    loop: 8,
    notes: [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63, 196.00],
  },
  {
    name: "Happy Vibes",
    emoji: "🌈",
    tempo: 350,
    loop: 8,
    notes: [293.66, 349.23, 440.00, 523.25, 440.00, 349.23, 293.66, 261.63],
  },
  {
    name: "Chill Beats",
    emoji: "🎧",
    tempo: 500,
    loop: 6,
    notes: [220.00, 261.63, 329.63, 261.63, 220.00, 196.00],
  },
  {
    name: "Cosmic Jazz",
    emoji: "🎷",
    tempo: 300,
    loop: 10,
    notes: [349.23, 440.00, 523.25, 466.16, 392.00, 349.23, 311.13, 349.23, 440.00, 523.25],
  },
  {
    name: "Magic Forest",
    emoji: "🌿",
    tempo: 450,
    loop: 7,
    notes: [392.00, 440.00, 523.25, 587.33, 523.25, 440.00, 392.00],
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.15);
  const [expanded, setExpanded] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const noteIdxRef = useRef(0);

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    oscillatorsRef.current.forEach((osc) => {
      try { osc.stop(); } catch {}
    });
    oscillatorsRef.current = [];
    if (gainRef.current) {
      gainRef.current.disconnect();
      gainRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  const playTrack = (trackIdx: number) => {
    stopMusic();
    const track = TRACKS[trackIdx];

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(ctx.destination);
    gainRef.current = gainNode;

    noteIdxRef.current = 0;

    const playNote = () => {
      if (!audioCtxRef.current || !gainRef.current) return;

      const freq = track.notes[noteIdxRef.current % track.notes.length];
      const osc = audioCtxRef.current.createOscillator();
      const noteGain = audioCtxRef.current.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      const now = audioCtxRef.current.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.8, now + 0.05);
      noteGain.gain.linearRampToValueAtTime(0, now + track.tempo / 1000 * 0.9);

      osc.connect(noteGain);
      noteGain.connect(gainRef.current);

      osc.start(now);
      osc.stop(now + track.tempo / 1000);

      noteIdxRef.current++;
    };

    playNote();
    intervalRef.current = setInterval(playNote, track.tempo);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopMusic();
      setIsPlaying(false);
    } else {
      playTrack(currentTrack);
      setIsPlaying(true);
    }
  };

  const handleTrackChange = (idx: number) => {
    setCurrentTrack(idx);
    if (isPlaying) {
      playTrack(idx);
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (gainRef.current) {
      gainRef.current.gain.value = newVol;
    }
  };

  useEffect(() => {
    return () => stopMusic();
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      className="fixed bottom-4 right-4 md:right-8 z-40"
    >
      <div className="bg-gradient-to-b from-indigo-800 to-purple-900 rounded-2xl shadow-2xl border-2 border-white/20 overflow-hidden">
        {/* Collapsed bar */}
        <div className="flex items-center gap-2 p-2">
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            title={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <div className="text-white text-sm font-bold flex items-center gap-1 min-w-0">
            <span className="text-lg">{TRACKS[currentTrack].emoji}</span>
            <span className="hidden sm:inline truncate">{isPlaying ? TRACKS[currentTrack].name : "Music Off"}</span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            title="Show tracks"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 pt-0 space-y-2">
                <div className="text-white/60 text-xs font-bold flex items-center gap-1 pt-2">
                  <Music className="w-3 h-3" /> Choose a Track
                </div>
                {TRACKS.map((track, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTrackChange(idx)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                      currentTrack === idx
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-lg">{track.emoji}</span>
                    <span>{track.name}</span>
                    {currentTrack === idx && isPlaying && (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="ml-auto"
                      >
                        🎵
                      </motion.div>
                    )}
                  </button>
                ))}

                {/* Volume slider */}
                <div className="pt-2">
                  <div className="text-white/60 text-xs font-bold mb-1 flex items-center gap-1">
                    <Volume2 className="w-3 h-3" /> Volume
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-purple-400"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
