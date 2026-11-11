<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSound } from '@/composables/useSound'
import { useProjects } from '@/composables/useProject'
import { useMessages } from '@/composables/useMessages'

const props = defineProps<{ skills: { title: string; detail?: string }[] }>()

const { t, locale } = useI18n()
const { raw, str, strs } = useMessages()
const { projects } = useProjects()
const { click, beep } = useSound()

/**
 *  cmd  : commande tapée          (a = commande)
 *  row  : « clé : valeur »        (a = clé, b = valeur)
 *  text : texte simple            (a = texte)
 *  gap  : ligne vide
 */
interface Line {
    kind: 'cmd' | 'row' | 'text' | 'gap'
    a?: string
    b?: string
}

const lines = ref<Line[]>([])
const input = ref('')
const body = ref<HTMLElement | null>(null)
const busy = ref(false)
let timers: number[] = []

const row = (a: string, b: string): Line => ({ kind: 'row', a, b })

// Identifiants internes des commandes (boutons + aide)
const COMMANDS = ['skills', 'about', 'stack', 'journey', 'projects', 'clear'] as const
type CommandId = (typeof COMMANDS)[number]

// Ce que l'utilisateur peut taper (FR + EN) -> identifiant interne
const ALIASES: Record<string, CommandId | 'help' | 'hire'> = {
    skills: 'skills',
    about: 'about',
    stack: 'stack',
    journey: 'journey',
    parcours: 'journey',
    projects: 'projects',
    projets: 'projects',
    clear: 'clear',
    help: 'help',
    aide: 'help',
    'sudo hire-me': 'hire',
}

// Liste { k, v } des fichiers de langue -> lignes
const pairs = (key: string): Line[] =>
    raw(key).map((o: any) => row(str(o.k), str(o.v)))

const help = (): Line[] => [
    { kind: 'text', a: t('terminal.available') },
    ...COMMANDS.map(c => row(t(`terminal.commands.${c}`), t(`terminal.help.${c}`))),
]

function output(id: CommandId | 'help' | 'hire' | undefined, cmd: string): Line[] {
    switch (id) {
        case 'skills':
            return props.skills.map(s => row(s.title, s.detail ?? ''))
        case 'about':
            return pairs('terminal.about')
        case 'stack':
            return pairs('terminal.stack')
        case 'journey':
            return pairs('terminal.journey')
        case 'projects':
            // Lu à l'exécution : suit la langue active
            return projects.value.map(p => row(p.title, p.subtitle))
        case 'help':
            return help()
        case 'hire': // Easter egg : jamais listé dans l'aide
            return strs(raw('terminal.hireMe')).map(a => ({ kind: 'text', a }) as Line)
        default:
            return [{ kind: 'text', a: t('terminal.unknown', { cmd }) }]
    }
}

function scrollDown() {
    nextTick(() => {
        if (body.value) body.value.scrollTop = body.value.scrollHeight
    })
}

// Affiche les lignes une à une (un seul bip par commande)
function print(out: Line[]) {
    busy.value = true
    out.forEach((line, i) => {
        timers.push(
            window.setTimeout(() => {
                lines.value.push(line)
                if (i === 0) beep()
                scrollDown()
                if (i === out.length - 1) busy.value = false
            }, 90 * (i + 1)),
        )
    })
}

function run(rawCmd: string) {
    const cmd = rawCmd.trim().toLowerCase().replace(/\s+/g, ' ')
    if (!cmd || busy.value) return
    click()
    const id = ALIASES[cmd]
    if (id === 'clear') {
        lines.value = []
        return
    }
    lines.value.push({ kind: 'cmd', a: cmd })
    print([{ kind: 'gap' }, ...output(id, cmd)])
    scrollDown()
}

function submit() {
    run(input.value)
    input.value = ''
}

function welcome() {
    print([{ kind: 'text', a: t('terminal.welcome') }, { kind: 'gap' }, ...help()])
}

function reset() {
    timers.forEach(clearTimeout)
    timers = []
    busy.value = false
    lines.value = []
    welcome()
}

onMounted(welcome)
// Changement de langue : on repart d'un terminal propre dans la nouvelle langue
watch(locale, reset)
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
    <div class="term" :aria-label="t('terminal.aria')">
        <div class="term-head">
            <span></span><span></span><span></span>
            <em>eb@{{ t('terminal.host') }} ~</em>
        </div>

        <div ref="body" class="term-body" aria-live="polite">
            <template v-for="(l, i) in lines" :key="i">
                <p v-if="l.kind === 'cmd'" class="cmd">&gt; {{ l.a }}</p>
                <div v-else-if="l.kind === 'gap'" class="gap"></div>
                <p v-else-if="l.kind === 'row'" class="line">
                    <span class="k">{{ l.a }}</span> : <span class="v">{{ l.b }}</span>
                </p>
                <p v-else class="line">{{ l.a }}</p>
            </template>
        </div>

        <div class="term-actions">
            <button v-for="c in COMMANDS" :key="c" type="button" @click="run(t(`terminal.commands.${c}`))">
                {{ t(`terminal.commands.${c}`) }}
            </button>
        </div>

        <form class="term-input" @submit.prevent="submit">
            <label for="term-cmd">&gt;</label>
            <input id="term-cmd" v-model="input" :placeholder="t('terminal.placeholder')" maxlength="60"
                autocomplete="off" spellcheck="false" />
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
    height: 240px;
    overflow-y: auto;
    padding: 14px 16px;
    line-height: 1.6;
}

.term-body p {
    margin: 0;
}

.gap {
    height: 0.7em;
}

/* Deux styles seulement : la commande tapée (accent) et la réponse (texte) */
.cmd {
    color: var(--accent);
}

.line {
    color: var(--text);
}

.k {
    color: var(--accent);
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