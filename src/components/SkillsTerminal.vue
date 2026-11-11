<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useSound } from '@/composables/useSound'

const props = defineProps<{ skills: { title: string; detail?: string }[] }>()
const router = useRouter()
const { click, beep } = useSound()

interface Line { kind: 'cmd' | 'out'; text: string }
const lines = ref<Line[]>([])
const input = ref('')
const body = ref<HTMLElement | null>(null)
const busy = ref(false)
let timers: number[] = []

const COMMANDS = ['skills', 'about', 'projets', 'help', 'clear']

function output(cmd: string): string[] {
    switch (cmd) {
        case 'skills':
            return props.skills.flatMap(s => [`✔ ${s.title}`, ...(s.detail ? [`   ${s.detail}`] : [])])
        case 'about':
            return ['Ethan Boulard', 'Développeur Web & Mobile · Lyon', 'Statut : disponible']
        case 'help':
            return ['Commandes : ' + COMMANDS.join(' · ')]
        default:
            return [`commande inconnue : ${cmd} (essaie « help »)`]
    }
}

function scrollDown() {
    nextTick(() => { if (body.value) body.value.scrollTop = body.value.scrollHeight })
}

function run(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd || busy.value) return
    click()
    if (cmd === 'clear') { lines.value = []; return }
    if (cmd === 'projets') { router.push('/projects'); return }

    lines.value.push({ kind: 'cmd', text: cmd })
    busy.value = true
    const out = output(cmd)
    out.forEach((text, i) => {
        timers.push(window.setTimeout(() => {
            lines.value.push({ kind: 'out', text }); beep(); scrollDown()
            if (i === out.length - 1) busy.value = false
        }, 140 * (i + 1)))
    })
    scrollDown()
}

function submit() { run(input.value); input.value = '' }

onMounted(() => run('skills'))
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
    <div class="term" aria-label="Terminal des compétences">
        <div class="term-head">
            <span></span><span></span><span></span>
            <em>eb@vaisseau ~ </em>
        </div>

        <div ref="body" class="term-body" aria-live="polite">
            <p v-for="(l, i) in lines" :key="i" :class="l.kind">
                <template v-if="l.kind === 'cmd'">&gt; </template>{{ l.text }}
            </p>
        </div>

        <div class="term-actions">
            <button v-for="c in COMMANDS" :key="c" type="button" @click="run(c)">{{ c }}</button>
        </div>

        <form class="term-input" @submit.prevent="submit">
            <label for="term-cmd">&gt;</label>
            <input id="term-cmd" v-model="input" placeholder="tape une commande…" autocomplete="off"
                spellcheck="false" />
        </form>
    </div>
</template>

<style scoped>
.term {
    background: var(--surface);
    border: 1px solid var(--border-md);
    border-radius: 14px;
    overflow: hidden;
    font-family: var(--ff-mono);
    font-size: 0.82rem;
}

.term-head {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    background: var(--surface2);
}

.term-head span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border-md);
}

.term-head em {
    margin-left: 8px;
    font-style: normal;
    font-size: 0.72rem;
    color: var(--muted);
}

.term-body {
    height: 168px;
    overflow-y: auto;
    padding: 14px 16px;
    line-height: 1.7;
    white-space: pre-wrap;
}

.cmd {
    color: var(--accent);
}

.out {
    color: var(--text);
}

.term-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 16px 12px;
}

.term-actions button {
    font: inherit;
    font-size: 0.72rem;
    color: var(--muted);
    background: transparent;
    border: 1px solid var(--border-md);
    border-radius: 100px;
    padding: 4px 12px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
}

.term-actions button:hover {
    color: var(--accent);
    border-color: var(--accent);
}

.term-input {
    display: flex;
    gap: 8px;
    padding: 10px 16px;
    border-top: 1px solid var(--border);
}

.term-input label {
    color: var(--accent);
}

.term-input input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    font: inherit;
    color: var(--text);
}
</style>