let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", volume: number = 0.15) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function playCorrect() {
  playTone(523.25, 0.1, "sine", 0.15);
  setTimeout(() => playTone(659.25, 0.1, "sine", 0.15), 80);
  setTimeout(() => playTone(783.99, 0.15, "sine", 0.15), 160);
}

export function playWrong() {
  playTone(196, 0.15, "sawtooth", 0.1);
  setTimeout(() => playTone(155, 0.2, "sawtooth", 0.1), 100);
}

export function playClick() {
  playTone(800, 0.05, "sine", 0.08);
}

export function playCelebrate() {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((note, i) => {
    setTimeout(() => playTone(note, 0.2, "triangle", 0.15), i * 100);
  });
}

export function playPop() {
  playTone(600, 0.08, "sine", 0.1);
  setTimeout(() => playTone(900, 0.08, "sine", 0.1), 50);
}
