import { ref, watch } from "vue";

const enabled = ref(localStorage.getItem("sound") === "on");
let ctx: AudioContext | null = null;

watch(enabled, (v) => localStorage.setItem("sound", v ? "on" : "off"));

function tone(
  freq: number,
  dur = 0.06,
  vol = 0.03,
  delay = 0,
  type: OscillatorType = "sine",
) {
  if (!enabled.value) return;
  ctx ??= new AudioContext();
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur);
}

export function useSound() {
  return {
    enabled,
    toggle() {
      enabled.value = !enabled.value;
      if (enabled.value) {
        ctx ??= new AudioContext();
        tone(880, 0.08);
        tone(1320, 0.1, 0.03, 0.08);
      }
    },
    click: () => tone(660, 0.04, 0.025, 0, "square"),
    beep: () => tone(1040, 0.05, 0.02),
    done: () => {
      tone(660, 0.08);
      tone(990, 0.12, 0.03, 0.09);
    },
  };
}
