let ctx = null;

function getContext() {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!ctx) ctx = new Ctx();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(audio, freq, start, duration, gainValue) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(gainValue, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

/** Klasik "coin" sesi: iki kısa, tiz vuruş. */
export function playCoinSound() {
  const audio = getContext();
  if (!audio) return;
  const now = audio.currentTime;
  tone(audio, 987.77, now, 0.09, 0.18);
  tone(audio, 1318.51, now + 0.085, 0.32, 0.16);
}