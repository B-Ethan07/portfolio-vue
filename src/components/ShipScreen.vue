<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

/**
 * Écran de vaisseau autour de l'aperçu des projets.
 *  - hublot : cadre arrondi sobre (même bordure que les autres cartes), voyant
 *  - barres de données : haut (FEED, type, année) et bas (titre, segments, progression)
 *  - effets d'écran : lignes de balayage, bords sombres, trait lumineux, parasite au changement
 * L'image elle-même est passée dans le slot.
 */
const props = defineProps<{
    projects: { id: string | number; title: string }[]
    current: number
    label: string
    year: string
    title: string
    paused: boolean
    cycle: number
    delay: number
    pickLabel: string
}>()

const emit = defineEmits<{ pick: [index: number] }>()

const pad = (n: number) => String(n).padStart(2, '0')

// Court « parasite » à chaque changement de projet
const glitch = ref(false)
let glitchTimer = 0
watch(
    () => props.current,
    () => {
        glitch.value = true
        clearTimeout(glitchTimer)
        glitchTimer = window.setTimeout(() => (glitch.value = false), 320)
    },
)
onBeforeUnmount(() => clearTimeout(glitchTimer))
</script>

<template>
    <div class="ship force-dark">
        <div class="frame">
            <div class="frame-in">
                <!-- Barre du haut -->
                <div class="bar bar-top">
                    <span class="led" aria-hidden="true"></span>
                    <span class="feed">FEED {{ pad(current + 1) }}/{{ pad(projects.length) }}</span>
                    <span class="meta">{{ label }} · {{ year }}</span>
                </div>

                <!-- Écran -->
                <div class="view" :class="{ glitch }">
                    <slot />
                    <span class="fx" aria-hidden="true"></span>
                </div>

                <!-- Barre du bas -->
                <div class="bar bar-bottom">
                    <span class="track" aria-hidden="true">
                        <span :key="`${cycle}-${current}`" class="progress" :class="{ paused }"
                            :style="{ animationDuration: `${delay}ms` }"></span>
                    </span>

                    <span class="title">{{ title }}</span>

                    <div class="segs" role="group" :aria-label="pickLabel">
                        <button v-for="(p, i) in projects" :key="p.id" type="button" class="seg"
                            :class="{ active: i === current }" :aria-label="p.title" :aria-pressed="i === current"
                            @click="emit('pick', i)"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.frame-in {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--surface);
    border: 1px solid var(--border-md);
    border-radius: 16px;
}

/* ─── Barres de données ─────────────────── */
.bar {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    height: 34px;
    padding: 0 18px;
    font-family: var(--ff-mono);
    font-size: 0.66rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    background: var(--surface2);
}

.bar-top {
    border-bottom: 1px solid var(--border-md);
}

.bar-bottom {
    border-top: 1px solid var(--border-md);
}

.feed {
    color: var(--accent);
}

.meta {
    margin-left: auto;
    white-space: nowrap;
}

/* Voyant du feed : un seul, qui clignote doucement */
.led {
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 6px var(--accent-glow);
    animation: blink 1.8s ease-in-out infinite;
}

@keyframes blink {
    50% {
        opacity: 0.2;
    }
}

/* ─── Écran ─────────────────────────────── */
.view {
    position: relative;
    overflow: hidden;
    background: #000;
}

/* Calque d'effets : ne bloque jamais les clics */
.fx {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}

/* Lignes de balayage très légères + bords assombris */
.fx::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.07) 0, rgba(0, 0, 0, 0.07) 1px, transparent 1px, transparent 3px),
        radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.32) 100%);
}

/* Trait lumineux qui traverse l'écran */
.fx::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: -20%;
    height: 18%;
    background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.07), transparent);
    animation: sweep 7s linear infinite;
}

@keyframes sweep {
    to {
        top: 120%;
    }
}

/* Parasite au changement de projet */
.view.glitch {
    animation: glitch 0.32s steps(2, end);
}

@keyframes glitch {
    0% {
        transform: translateX(0);
        filter: none;
    }

    25% {
        transform: translateX(-4px);
        filter: brightness(1.5) hue-rotate(25deg);
    }

    50% {
        transform: translateX(3px);
        filter: brightness(0.8);
    }

    75% {
        transform: translateX(-2px);
        filter: brightness(1.3) hue-rotate(-20deg);
    }

    100% {
        transform: translateX(0);
        filter: none;
    }
}

/* ─── Barre du bas : titre, progression, segments ─── */
.title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text);
}

.track {
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 2px;
    overflow: hidden;
}

.progress {
    display: block;
    width: 100%;
    height: 100%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent-glow);
    transform-origin: left;
    transform: scaleX(0);
    animation: fill linear forwards;
}

.progress.paused {
    animation-play-state: paused;
}

@keyframes fill {
    to {
        transform: scaleX(1);
    }
}

.segs {
    display: flex;
    gap: 2px;
}

.seg {
    position: relative;
    width: 22px;
    height: 22px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
}

.seg::before {
    content: '';
    position: absolute;
    left: 2px;
    right: 2px;
    top: 50%;
    height: 3px;
    margin-top: -1.5px;
    background: var(--border-md);
    border-radius: 2px;
    transition: background 0.2s, box-shadow 0.2s;
}

.seg:hover::before,
.seg:focus-visible::before {
    background: var(--muted);
}

.seg.active::before {
    background: var(--accent);
    box-shadow: 0 0 6px var(--accent-glow);
}

/* ─── Petits écrans ─────────────────────── */
@media (max-width: 600px) {
    .bar {
        padding: 0 14px;
        font-size: 0.6rem;
        letter-spacing: 0.08em;
    }

}

/* ─── Animations réduites ───────────────── */
@media (prefers-reduced-motion: reduce) {

    .fx::after,
    .led,
    .view.glitch {
        animation: none;
    }

    .track {
        display: none;
    }
}
</style>