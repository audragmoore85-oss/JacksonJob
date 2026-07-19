"use client";

import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, ChevronUp, ChevronDown, Loader2 } from "lucide-react";

interface Track {
  name: string;
  emoji: string;
  url: string;
  artist: string;
}

const TRACKS: Track[] = [
  {
    name: "Call to Adventure",
    emoji: "🚀",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/2013/Kevin_MacLeod_-_Call_to_Adventure.mp3",
    artist: "Kevin MacLeod (CC-BY 3.0)",
  },
  {
    name: "Monkeys Spinning Monkeys",
    emoji: "🌈",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Best_of_2014/Kevin_MacLeod_-_Monkeys_Spinning_Monkeys.mp3",
    artist: "Kevin MacLeod (CC-BY 3.0)",
  },
  {
    name: "Carefree",
    emoji: "🎧",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Calming/Kevin_MacLeod_-_Carefree.mp3",
    artist: "Kevin MacLeod (CC-BY 3.0)",
  },
  {
    name: "Beach Party",
    emoji: "�️",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Global_Sampler/Kevin_MacLeod_-_Beach_Party.mp3",
    artist: "Kevin MacLeod (CC-BY 3.0)",
  },
  {
    name: "Time",
    emoji: "🎷",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Its_time_for_adventure__vol_2/Komiku_-_04_-_Time.mp3",
    artist: "Komiku (CC0)",
  },
  {
    name: "Tale on the Late",
    emoji: "🌿",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Komiku/Tale_on_the_Late/Komiku_-_01_-_Tale_on_the_Late_Main_Theme.mp3",
    artist: "Komiku (CC0)",
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsLoading(false);
      setLoadError(false);
      if (isPlaying) {
        audio.play().catch(() => {
          setIsPlaying(false);
          setLoadError(true);
        });
      }
    };

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      setLoadError(true);
      setIsPlaying(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (audio.src !== TRACKS[currentTrack].url) {
      setIsLoading(true);
      setLoadError(false);
      audio.src = TRACKS[currentTrack].url;
      audio.load();
      if (isPlaying) {
        audio.play().catch(() => {
          setLoadError(true);
          setIsLoading(false);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src) {
        setIsLoading(true);
        setLoadError(false);
        audioRef.current.src = TRACKS[currentTrack].url;
        audioRef.current.load();
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setLoadError(false);
      }).catch(() => {
        setLoadError(true);
        setIsLoading(false);
        setIsPlaying(false);
      });
    }
  };

  const handleTrackChange = (idx: number) => {
    setCurrentTrack(idx);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

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
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isPlaying ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          <div className="text-white text-sm font-bold flex items-center gap-1 min-w-0">
            <span className="text-lg">{TRACKS[currentTrack].emoji}</span>
            <span className="hidden sm:inline truncate">
              {loadError ? "Failed to load" : isLoading ? "Loading..." : isPlaying ? TRACKS[currentTrack].name : "Music Off"}
            </span>
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
                    <div className="flex flex-col items-start min-w-0">
                      <span className="truncate">{track.name}</span>
                      <span className="text-[10px] text-white/40 truncate">{track.artist}</span>
                    </div>
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
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-purple-400"
                  />
                </div>

                {loadError && (
                  <div className="text-red-300 text-xs text-center pt-1">
                    Could not load audio. Check your connection.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
