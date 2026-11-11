<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

interface Star { x: number; y: number; z: number; r: number; phase: number }

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let w = 0, h = 0, stars: Star[] = [], raf = 0
let isDark = true, reduceMotion = false
let observer: MutationObserver | null = null

const wrap = (v: number, max: number) => ((v % max) + max) % max

function build() {
    const n = Math.min(220, Math.floor((w * h) / 7000))
    stars = Array.from({ length: n }, () => ({
        x: Math.random(), y: Math.random(),
        z: 0.15 + Math.random() * 0.85,       // profondeur : 1 = proche
        r: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
    }))
}

function resize() {
    const c = canvas.value
    if (!c) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = window.innerWidth; h = window.innerHeight
    c.width = w * dpr; c.height = h * dpr
    ctx = c.getContext('2d')
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    build()
    if (reduceMotion) draw(0)
}

function draw(t: number) {
    if (!ctx) return
    ctx.clearRect(0, 0, w, h)
    if (!isDark) return
    const scroll = window.scrollY
    for (const s of stars) {
        // dérive lente + parallaxe au scroll (les étoiles proches bougent plus)
        const x = wrap(s.x * w + t * 6 * s.z, w)
        const y = wrap(s.y * h - scroll * 0.3 * s.z, h)
        const twinkle = 0.6 + 0.4 * Math.sin(t * 1.5 + s.phase)
        ctx.fillStyle = `rgba(200, 215, 255, ${twinkle * s.z})`
        ctx.beginPath()
        ctx.arc(x, y, s.r * s.z + 0.2, 0, Math.PI * 2)
        ctx.fill()
    }
}

function frame(now: number) { draw(now / 1000); raf = requestAnimationFrame(frame) }
function start() { cancelAnimationFrame(raf); if (!reduceMotion) raf = requestAnimationFrame(frame) }
function onVisibility() { document.hidden ? cancelAnimationFrame(raf) : start() }
const readTheme = () => { isDark = document.documentElement.getAttribute('data-theme') !== 'light' }

onMounted(() => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    readTheme(); resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    if (reduceMotion) window.addEventListener('scroll', () => draw(0), { passive: true })
    observer = new MutationObserver(() => { readTheme(); if (reduceMotion) draw(0) })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    start()
})

onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    observer?.disconnect()
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
    <canvas ref="canvas" class="starfield" aria-hidden="true"></canvas>
</template>

<style scoped>
.starfield {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
}
</style>