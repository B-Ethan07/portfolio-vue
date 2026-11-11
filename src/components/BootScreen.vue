<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useSound } from '@/composables/useSound'

const emit = defineEmits<{ done: [] }>()
const { beep, done } = useSound()

const LINES = [
    'EB-OS v1.0 — initialisation',
    'Vérification des systèmes ........ OK',
    'Chargement des modules ........... OK',
    'Calibrage des étoiles ............ OK',
    'Liaison établie · Lyon',
]

const shown = ref<string[]>([])
const leaving = ref(false)
let timer = 0
let finished = false

function finish() {
    if (finished) return
    finished = true
    clearInterval(timer)
    sessionStorage.setItem('booted', '1')
    done()
    leaving.value = true
    setTimeout(() => emit('done'), 450)
}

onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return finish()
    let i = 0
    timer = window.setInterval(() => {
        shown.value.push(LINES[i]); beep(); i++
        if (i >= LINES.length) { clearInterval(timer); setTimeout(finish, 450) }
    }, 340)
    window.addEventListener('keydown', finish)
})
onBeforeUnmount(() => { clearInterval(timer); window.removeEventListener('keydown', finish) })
</script>

<template>
    <div class="boot" :class="{ leaving }" @click="finish" role="status" aria-label="Chargement">
        <div class="boot-inner">
            <p v-for="(l, i) in shown" :key="i">{{ l }}</p>
            <span class="cursor">▍</span>
        </div>
        <div class="bar"><i :style="{ width: (shown.length / LINES.length) * 100 + '%' }"></i></div>
        <p class="skip">cliquer pour passer</p>
    </div>
</template>

<style scoped>
.boot {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
    background: #05071a;
    color: #9db8ff;
    font-family: var(--ff-mono);
    font-size: 0.85rem;
    cursor: pointer;
    transition: opacity 0.45s;
}

.boot.leaving {
    opacity: 0;
    pointer-events: none;
}

.boot-inner {
    width: min(440px, 86vw);
    min-height: 130px;
    line-height: 1.9;
}

.cursor {
    animation: blink 1s steps(1) infinite;
}

.bar {
    width: min(440px, 86vw);
    height: 2px;
    background: rgba(157, 184, 255, 0.15);
}

.bar i {
    display: block;
    height: 100%;
    background: #9db8ff;
    transition: width 0.3s;
}

.skip {
    position: absolute;
    bottom: 28px;
    font-size: 0.7rem;
    opacity: 0.4;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>