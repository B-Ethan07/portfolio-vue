<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useSound } from '@/composables/useSound'
import { PROJECTS } from '@/types/projects'

const props = defineProps<{ skills: { title: string; detail?: string }[] }>()
const { click, beep } = useSound()

/**
 * Un seul format d'affichage pour tout le terminal :
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

// ─────────────────────────────────────────────
// CONTENU (modifie ici ce qui s’affiche dans le terminal)
// ─────────────────────────────────────────────
const ABOUT: Line[] = [
    row('Nom', 'Ethan Boulard'),
    row('Métier', 'Développeur Web & Mobile'),
    row('Lieu', 'Lyon'),
    row('Statut', 'Disponible'),
    row('Recherche', 'CDI / CDD'),
]

const STACK: Line[] = [
    row('Mobile', 'Flutter, Kotlin'),
    row('Front-end', 'React, Angular, Vue.js, JavaScript, Tailwind'),
    row('Back-end', 'Python, FastAPI, Node.js, Express.js, PHP, Symfony'),
    row('Base de Données', 'MongoDB, Bases de Données SQL'),
    row('Outils', 'GitHub Actions, Docker, Git, Linux, Vitest, Jest, Figma'),
]

// Du plus récent au plus ancien
const PARCOURS: Line[] = [
    row('Oct 2026', 'Diplôme Développeur·se Web et Web Mobile Bac+2'),
    row('Août 2026', 'Certification Cisco · Cybersecurity'),
    row('Fév - Avr 2026', 'Développeur Full-Stack · INSIDE RUNWAY'),
    row('Nov 2025 - Jan 2026', "Développeur Mobile, Front-end · IT'S ME TIME"),
    row('Avr - Nov 2025', "Formation de Développeur d'Application Mobile · M2i Formation Lyon"),
    row('Depuis 2024', 'Autodidacte · Flutter, Angular, React'),
]

// Généré depuis ta liste de projets : rien à maintenir ici
const PROJETS: Line[] = PROJECTS.map(p => row(p.title, p.subtitle))

const HELP_ROWS: [string, string][] = [
    ['skills', 'ce que je fais'],
    ['about', 'qui suis-je ?'],
    ['stack', 'mes technologies'],
    ['parcours', 'formations et expériences'],
    ['projets', 'ce que j’ai réalisé'],
    ['clear', 'effacer le terminal'],
]

// Commandes proposées en boutons
const COMMANDS = ['skills', 'about', 'stack', 'parcours', 'projets', 'clear']

const HELP: Line[] = [
    { kind: 'text', a: 'Commandes disponibles :' },
    ...HELP_ROWS.map(([a, b]) => row(a, b)),
]

function output(cmd: string): Line[] {
    switch (cmd) {
        case 'skills':
            return props.skills.map(s => row(s.title, s.detail ?? ''))
        case 'about':
            return ABOUT
        case 'stack':
            return STACK
        case 'parcours':
            return PARCOURS
        case 'projets':
            return PROJETS
        case 'help':
            return HELP
        // Easter egg : jamais listé dans l'aide
        case 'sudo hire-me':
            return [
                { kind: 'text', a: 'Permission accordée.' },
                { kind: 'text', a: 'Tu sais où me trouver : bouton « Me contacter ».' },
            ]
        default:
            return [{ kind: 'text', a: `commande inconnue : ${cmd} (essaie « help »)` }]
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

function run(raw: string) {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ')
    if (!cmd || busy.value) return
    click()
    if (cmd === 'clear') {
        lines.value = []
        return
    }
    lines.value.push({ kind: 'cmd', a: cmd })
    print([{ kind: 'gap' }, ...output(cmd)])
    scrollDown()
}

function submit() {
    run(input.value)
    input.value = ''
}

// Au départ : accueil + liste des commandes, sans rien exécuter
onMounted(() =>
    print([{ kind: 'text', a: 'Bienvenue à bord.' }, { kind: 'gap' }, ...HELP]),
)
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
    <div class="term" aria-label="Terminal des compétences">
        <div class="term-head">
            <span></span><span></span><span></span>
            <em>eb@vaisseau ~</em>
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
            <button v-for="c in COMMANDS" :key="c" type="button" @click="run(c)">{{ c }}</button>
        </div>

        <form class="term-input" @submit.prevent="submit">
            <label for="term-cmd">&gt;</label>
            <input id="term-cmd" v-model="input" placeholder="tape une commande…" maxlength="60" autocomplete="off"
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