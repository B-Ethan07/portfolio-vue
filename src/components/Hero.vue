<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { HERO_PROJECTS } from '@/types/projects'
import SkillsTerminal from '@/components/SkillsTerminal.vue'

// ── Skills (affichés par le terminal avec la commande « skills ») ──
const skills = [
    { title: 'Apps multiplateformes', detail: 'iOS & Android avec une seule base de code' },
    { title: 'Full-stack', detail: 'Front, back et base de données' },
    { title: 'CI/CD et tests', detail: 'Livraisons automatisées et fiables' },
    { title: 'Bots et automatisation', detail: 'Des scripts qui font le travail répétitif' },
]

// ── Aperçu des projets ──
const projects = HERO_PROJECTS
const current = ref(0)
const DELAY = 4500
let timer = null

const LABELS = {
    mobile: 'Mobile',
    web: 'Web',
    fullstack: 'Full-stack',
    'bot/script': 'Bot',
    'desktop/mobile': 'Desktop & mobile',
}
const label = p => LABELS[p.type] ?? p.type

// Captures d'apps mobiles : image entière sur fond noir
const isMobile = p => p.type === 'mobile'

function cover(p) {
    if (!p.images?.[0]) return { background: p.color }
    return {
        backgroundImage: `url(${p.images[0]})`,
        backgroundSize: isMobile(p) ? 'contain' : 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: isMobile(p) ? '#000' : undefined,
    }
}

function goTo(i) {
    current.value = (i + projects.length) % projects.length
}

function stop() {
    clearInterval(timer)
}

function start() {
    stop()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer = setInterval(() => goTo(current.value + 1), DELAY)
}

function pick(i) {
    goTo(i)
    start()
}

// ── Avis ──
// excerpt    : extrait affiché dans la card (optionnel, […] = passage coupé)
// text       : avis complet, affiché dans la fenêtre
// highlights : mots-clés tirés de l'avis (optionnel)
// rating     : note sur 5, UNIQUEMENT si la personne l'a donnée (optionnel)
const reviews = [
    {
        name: 'Adonis Pesic',
        status: 'Maître de stage',
        source: 'LinkedIn',
        url: 'https://www.linkedin.com/in/adonis-pesic-15694b236/',
        highlights: ['Autonomie', 'Vision full-stack', 'Esprit d’équipe'],
        excerpt:
            'Ethan se distingue par une autonomie remarquable et une capacité rare à analyser des pans très larges de code, du mobile au backend jusqu’au front-end. […] Je le recommande sans la moindre hésitation.',
        text: "J’ai eu la chance de travailler avec Ethan Boulard au sein de mon équipe, et je peux dire sans hésiter qu’il s’agit d’un élément exceptionnel. Ethan se distingue par une autonomie remarquable et une capacité rare à analyser des pans très larges de code, du mobile au backend jusqu’au front-end. Il apporte toujours une expertise précise et pertinente, aussi bien sur des problématiques techniques complexes que sur des détails visuels, ce qui est assez rare. Au-delà de ses compétences techniques, Ethan possède un excellent sens du travail en équipe. Il sait s’adapter à différents profils, collaborer efficacement et contribuer à une dynamique saine et productive. Durant toute notre collaboration, nous n’avons jamais entendu une seule plainte de sa part mais il saura vous faire des retour si vous lui en demander. Nous devons aujourd’hui nous séparer de lui uniquement pour des raisons financières, faute de fonds au sein de la structure — une décision difficile au vu de la qualité de son travail. C’est avec regret que je le laisse partir, et j’espère sincèrement avoir l’opportunité de retravailler avec Ethan très prochainement. Je le recommande sans la moindre hésitation.",
    },
    {
        name: 'Prescillia Grah',
        status: 'Supérieure directe',
        source: 'LinkedIn',
        url: 'https://www.linkedin.com/in/prescillia-grah/',
        highlights: ['Créatif', 'À l’écoute', 'Flexible'],
        excerpt:
            "Créatif, flexible et à l'écoute, il a su intégrer chaque retour pour livrer un travail de qualité, un véritable atout pour l'équipe. […] Il sera une vraie valeur ajoutée pour toute équipe qui aura la chance de l'avoir.",
        text: "J'ai eu le plaisir de travailler avec Ethan lors de son stage chez Inside Runway, où il a assisté notre CTO et contribué au développement de notre plateforme, notamment sur l'application mobile. Créatif, flexible et à l'écoute, il a su intégrer chaque retour pour livrer un travail de qualité, un véritable atout pour l'équipe. Je recommande vivement Ethan à quiconque recherche un développeur alliant compétences solides et excellent état d'esprit. Il sera une vraie valeur ajoutée pour toute équipe qui aura la chance de l'avoir.",
    },
]

const rev = ref(0)
const review = computed(() => reviews[rev.value])
const initials = n => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
const goRev = i => { rev.value = (i + reviews.length) % reviews.length }

// Extrait dans la card, texte complet dans la fenêtre
const shownText = computed(() => review.value.excerpt ?? review.value.text)
const hasMore = computed(() => !!review.value.excerpt || review.value.text.length > 220)

const open = ref(false)
function onKey(e) {
    if (e.key === 'Escape') open.value = false
}

watch(open, v => {
    document.body.style.overflow = v ? 'hidden' : ''
    if (v) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
})

onMounted(start)
onUnmounted(() => {
    stop()
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKey)
})
</script>

<template>
    <div id="hero-section-outer">
        <section id="hero" class="page-section">
            <!-- Gauche : qui je suis, ce que je fais -->
            <div class="hero-left">
                <p class="hero-tag">Disponible · Lyon</p>

                <h1 class="hero-name">Ethan Boulard</h1>
                <p class="hero-pitch">Développeur Web &amp; Mobile.</p>

                <SkillsTerminal :skills="skills" />

                <div class="hero-cta">
                    <RouterLink to="/projects" class="btn-primary-custom">
                        Voir mes projets <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </RouterLink>
                    <RouterLink to="/contact" class="btn-ghost">
                        <i class="fa-regular fa-envelope" aria-hidden="true"></i> Me contacter
                    </RouterLink>
                </div>
            </div>

            <!-- Droite : aperçu des projets + avis -->
            <div class="preview">
                <div class="preview-media" @mouseenter="stop" @mouseleave="start" @focusin="stop" @focusout="start">
                    <Transition name="fade" mode="out-in">
                        <RouterLink :key="projects[current].id" :to="`/projects/${projects[current].id}`"
                            class="preview-card" :aria-label="projects[current].title">
                            <div class="preview-img" :style="cover(projects[current])">
                                <div class="badges">
                                    <span class="badge">{{ label(projects[current]) }}</span>
                                    <span class="badge">{{ projects[current].year }}</span>
                                </div>
                            </div>
                        </RouterLink>
                    </Transition>

                    <div class="dots" role="group" aria-label="Choisir un projet">
                        <button v-for="(p, i) in projects" :key="p.id" class="dot" :class="{ active: i === current }"
                            :aria-label="p.title" :aria-pressed="i === current" @click="pick(i)"></button>
                    </div>
                </div>

                <!-- Avis -->
                <section v-if="review" class="reviews" aria-label="Avis">
                    <div class="reviews-head">
                        <p class="reviews-label">Ils en parlent</p>

                        <span v-if="review.rating" class="review-rating" :aria-label="`Note : ${review.rating} sur 5`">
                            <i v-for="n in 5" :key="n"
                                :class="n <= review.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                                aria-hidden="true"></i>
                        </span>

                        <button v-if="hasMore" type="button" class="review-more" @click="open = true">
                            Lire l'avis complet
                        </button>
                    </div>

                    <Transition name="fade" mode="out-in">
                        <figure :key="rev" class="review">
                            <blockquote class="review-text">{{ shownText }}</blockquote>

                            <figcaption class="review-who">
                                <span class="review-avatar" aria-hidden="true">{{ initials(review.name) }}</span>
                                <span class="review-id">
                                    <strong>{{ review.name }}</strong>
                                    <span class="review-status">{{ review.status }}</span>
                                </span>

                                <component :is="review.url ? 'a' : 'span'" class="review-source"
                                    :href="review.url || undefined" :target="review.url ? '_blank' : undefined"
                                    :rel="review.url ? 'noopener noreferrer' : undefined">
                                    <i v-if="review.source === 'LinkedIn'" class="fa-brands fa-linkedin"
                                        aria-hidden="true"></i>
                                    {{ review.source }}
                                </component>
                            </figcaption>
                        </figure>
                    </Transition>

                    <div class="review-foot">
                        <ul class="review-tags">
                            <li v-for="t in review.highlights" :key="t">{{ t }}</li>
                        </ul>

                        <div v-if="reviews.length > 1" class="review-nav">
                            <button type="button" aria-label="Avis précédent" @click="goRev(rev - 1)">
                                <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
                            </button>
                            <span>{{ rev + 1 }} / {{ reviews.length }}</span>
                            <button type="button" aria-label="Avis suivant" @click="goRev(rev + 1)">
                                <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>

    <!-- Fenêtre : avis complet -->
    <Teleport to="body">
        <div v-if="open" class="modal" @click.self="open = false">
            <div class="modal-box" role="dialog" aria-modal="true" :aria-label="`Avis de ${review.name}`">
                <button type="button" class="modal-close" aria-label="Fermer" @click="open = false">
                    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>

                <p class="modal-text">{{ review.text }}</p>

                <p class="modal-who">
                    <strong>{{ review.name }}</strong> · {{ review.status }}
                    <a v-if="review.url" :href="review.url" target="_blank" rel="noopener noreferrer">
                        Voir sur {{ review.source }}
                    </a>
                </p>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
#hero-section-outer {
    background: var(--bg);
    border-bottom: 1px solid var(--border);
}

#hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: end;
    /* bas des CTA aligné avec le bas de la card des avis */
    gap: 80px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 176px 48px 80px;
    background: var(--bg);
}

/* ─── Gauche ─────────────────────────────── */
.hero-tag {
    display: inline-block;
    margin-bottom: 18px;
    padding: 6px 14px;
    font-family: var(--ff-mono);
    font-size: 0.78rem;
    color: var(--accent);
    background: var(--accent-subtle);
    border: 1px solid var(--border-md);
    border-radius: 100px;
}

.hero-name {
    margin-bottom: 12px;
    font-family: var(--ff-head);
    font-size: clamp(2.6rem, 5vw, 4.4rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    color: var(--hero-name-color);
}

.hero-pitch {
    margin-bottom: 24px;
    font-size: clamp(1.05rem, 1.5vw, 1.3rem);
    color: var(--muted);
}

/* Même largeur que le terminal, deux boutons égaux */
.hero-cta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    width: 100%;
    margin-top: 16px;
}

.hero-cta .btn-primary-custom,
.hero-cta .btn-ghost {
    justify-content: center;
    padding: 14px 18px;
    font-family: var(--ff-mono);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-radius: 14px;
    /* même arrondi que le terminal */
}

.hero-cta .btn-primary-custom:hover {
    box-shadow: 0 0 0 1px var(--accent), 0 8px 28px var(--accent-glow);
}

.hero-cta .btn-ghost {
    background: var(--surface);
    border-color: var(--border-md);
}

.hero-cta .btn-ghost:hover {
    border-color: var(--accent);
    color: var(--accent);
}

/* ─── Droite : aperçu ────────────────────── */
.preview {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.preview-media {
    position: relative;
}

.preview-card {
    display: block;
    overflow: hidden;
    text-decoration: none;
    background: var(--surface);
    border: 1px solid var(--border-md);
    border-radius: 20px;
    transition: border-color 0.2s;
}

.preview-card:hover,
.preview-card:focus-visible {
    border-color: var(--accent);
}

/* Format 16:10 conservé : les captures sont prévues pour ce ratio */
.preview-img {
    position: relative;
    aspect-ratio: 16 / 10;
    background-color: var(--surface2);
}

.badges {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    gap: 6px;
}

.badge {
    padding: 4px 10px;
    font-family: var(--ff-mono);
    font-size: 0.7rem;
    line-height: 1.4;
    color: #fff;
    background: rgba(10, 10, 14, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 100px;
    backdrop-filter: blur(6px);
}

.dots {
    position: absolute;
    left: 50%;
    bottom: 14px;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    padding: 7px 10px;
    background: rgba(10, 10, 14, 0.6);
    border-radius: 100px;
    backdrop-filter: blur(6px);
}

.dot {
    width: 6px;
    height: 6px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: width 0.25s, background 0.25s, border-radius 0.25s;
}

.dot.active {
    width: 20px;
    border-radius: 3px;
    background: var(--accent);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* ─── Avis ───────────────────────────────── */
.reviews {
    padding: 18px 20px 14px;
    background: var(--surface);
    border: 1px solid var(--border-md);
    border-radius: 16px;
}

.reviews-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.reviews-label {
    margin: 0 auto 0 0;
    font-family: var(--ff-mono);
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--lavender);
}

.review-rating {
    display: flex;
    gap: 3px;
    font-size: 0.7rem;
    color: var(--accent);
}

.review-more {
    padding: 0;
    font-family: var(--ff-mono);
    font-size: 0.7rem;
    color: var(--accent);
    background: none;
    border: none;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    transition: border-color 0.2s;
}

.review-more:hover {
    border-bottom-color: var(--accent);
}

.review {
    margin: 0;
}

/* Hauteur fixe = 4 lignes : la card garde toujours la même taille */
.review-text {
    height: 6.2em;
    margin: 0 0 14px;
    font-size: 0.92rem;
    line-height: 1.55;
    color: var(--text);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.review-who {
    display: flex;
    align-items: center;
    gap: 12px;
}

.review-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    font-family: var(--ff-mono);
    font-size: 0.75rem;
    color: var(--accent);
    background: var(--accent-subtle);
    border: 1px solid var(--border-md);
    border-radius: 50%;
}

.review-id {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    font-size: 0.85rem;
    line-height: 1.3;
}

.review-id strong {
    font-weight: 600;
    color: var(--text);
}

.review-status {
    font-family: var(--ff-mono);
    font-size: 0.7rem;
    color: var(--accent);
}

.review-source {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    font-family: var(--ff-mono);
    font-size: 0.7rem;
    color: var(--muted);
    text-decoration: none;
    border: 1px solid var(--border-md);
    border-radius: 100px;
    transition: color 0.2s, border-color 0.2s;
}

a.review-source:hover,
a.review-source:focus-visible {
    color: var(--accent);
    border-color: var(--accent);
}

/* Mots-clés à gauche, navigation à droite, sur une seule ligne */
.review-foot {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
}

.review-tags {
    display: flex;
    flex: 1;
    gap: 6px;
    min-width: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
}

.review-tags li {
    flex-shrink: 0;
    padding: 3px 10px;
    font-family: var(--ff-mono);
    font-size: 0.66rem;
    white-space: nowrap;
    color: var(--lavender);
    background: var(--accent-subtle);
    border: 1px solid var(--border);
    border-radius: 100px;
}

.review-nav {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 10px;
    font-family: var(--ff-mono);
    font-size: 0.7rem;
    color: var(--muted);
}

.review-nav button {
    width: 28px;
    height: 28px;
    color: var(--muted);
    background: transparent;
    border: 1px solid var(--border-md);
    border-radius: 50%;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
}

.review-nav button:hover {
    color: var(--accent);
    border-color: var(--accent);
}

/* ─── Fenêtre avis complet ───────────────── */
.modal {
    position: fixed;
    inset: 0;
    z-index: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(7, 3, 16, 0.72);
    backdrop-filter: blur(4px);
}

.modal-box {
    position: relative;
    width: min(620px, 100%);
    max-height: 85vh;
    overflow-y: auto;
    padding: 36px 32px 28px;
    background: var(--modal-bg);
    border: 1px solid var(--border-md);
    border-radius: 18px;
}

.modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    color: var(--muted);
    background: transparent;
    border: 1px solid var(--border-md);
    border-radius: 50%;
    cursor: pointer;
}

.modal-close:hover {
    color: var(--accent);
    border-color: var(--accent);
}

.modal-text {
    margin-bottom: 20px;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text);
}

.modal-who {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: var(--muted);
}

.modal-who strong {
    color: var(--text);
}

.modal-who a {
    margin-left: auto;
    font-family: var(--ff-mono);
    font-size: 0.72rem;
    color: var(--accent);
}

/* ─── Responsive ─────────────────────────── */
@media (max-width: 1024px) {
    #hero {
        grid-template-columns: 1fr;
        gap: 56px;
        min-height: auto;
        padding: 150px 32px 72px;
    }

    .preview {
        max-width: 100%;
    }
}

@media (max-width: 600px) {
    #hero {
        padding: 128px 18px 64px;
    }

    .hero-cta {
        grid-template-columns: 1fr;
    }

    .review-who {
        flex-wrap: wrap;
    }

    .review-source {
        margin-left: 0;
    }

    /* Le 3e mot-clé est masqué pour que la ligne ne déborde pas */
    .review-tags li:nth-child(3) {
        display: none;
    }

    .modal-box {
        padding: 36px 20px 22px;
    }
}
</style>