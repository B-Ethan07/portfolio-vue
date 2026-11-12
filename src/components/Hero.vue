<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProjects } from '@/composables/useProject'
import { useMessages } from '@/composables/useMessages'
import SkillsTerminal from '@/components/SkillsTerminal.vue'
import ShipScreen from '@/components/ShipScreen.vue'

const { t } = useI18n()
const { raw, str, strs } = useMessages()

const skills = computed(() =>
    raw('hero.skills').map(s => ({ title: str(s.title), detail: str(s.detail) })),
)

// ── Aperçu des projets ──
const { heroProjects: projects, typeLabel } = useProjects()
const current = ref(0)
const DELAY = 4500
let timer = null
const paused = ref(true)
const cycle = ref(0)

const label = p => typeLabel(p)
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
    const n = projects.value.length
    if (!n) return
    current.value = (i + n) % n
}

function stop() {
    clearInterval(timer)
    paused.value = true
}

function start() {
    clearInterval(timer)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        paused.value = true
        return
    }
    paused.value = false
    cycle.value++
    timer = setInterval(() => goTo(current.value + 1), DELAY)
}

function pick(i) {
    goTo(i)
    start()
}

const REVIEW_BASES = [
    {
        id: 'adonis',
        name: 'Adonis P',
        source: 'LinkedIn',
        url: 'https://www.linkedin.com/in/adonis-pesic-15694b236/',
    },
    {
        id: 'prescillia',
        name: 'Prescillia G',
        source: 'LinkedIn',
        url: 'https://www.linkedin.com/in/prescillia-grah/',
    },
]

const reviews = computed(() =>
    REVIEW_BASES.map(base => {
        const m = raw(`reviews.${base.id}`)
        return {
            ...base,
            status: str(m.status),
            highlights: strs(m.highlights),
            excerpt: str(m.excerpt),
            text: str(m.text),
        }
    }),
)

const rev = ref(0)
const review = computed(() => reviews.value[rev.value])
const initials = n => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
const goRev = i => {
    const n = reviews.value.length
    rev.value = (i + n) % n
}

const shownText = computed(() => review.value.excerpt || review.value.text)
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
                <p class="hero-tag">{{ t('hero.tag') }}</p>

                <h1 class="hero-name">Ethan Boulard</h1>
                <p class="hero-pitch">{{ t('hero.pitch') }}</p>

                <SkillsTerminal :skills="skills" />

                <div class="hero-cta force-dark">
                    <RouterLink to="/projects" class="btn-ghost">
                        {{ t('hero.ctaProjects') }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </RouterLink>
                    <RouterLink to="/contact" class="btn-ghost">
                        <i class="fa-regular fa-envelope" aria-hidden="true"></i> {{ t('hero.ctaContact') }}
                    </RouterLink>
                </div>
            </div>

            <!-- Droite : écran des projets + avis -->
            <div class="preview">
                <ShipScreen v-if="projects.length" :projects="projects" :current="current"
                    :label="label(projects[current])" :year="projects[current].year" :title="projects[current].title"
                    :paused="paused" :cycle="cycle" :delay="DELAY" :pick-label="t('hero.pickProject')" @pick="pick"
                    @mouseenter="stop" @mouseleave="start" @focusin="stop" @focusout="start">
                    <Transition name="fade" mode="out-in">
                        <RouterLink :key="projects[current].id" :to="`/projects/${projects[current].id}`"
                            class="preview-card" :aria-label="projects[current].title">
                            <div class="preview-img" :style="cover(projects[current])"></div>
                        </RouterLink>
                    </Transition>
                </ShipScreen>

                <!-- Avis -->
                <section v-if="review" class="reviews" :aria-label="t('hero.reviewsAria')">
                    <div class="reviews-head">
                        <p class="reviews-label">{{ t('hero.reviewsLabel') }}</p>

                        <span v-if="review.rating" class="review-rating"
                            :aria-label="t('hero.rating', { n: review.rating })">
                            <i v-for="n in 5" :key="n"
                                :class="n <= review.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                                aria-hidden="true"></i>
                        </span>

                        <button v-if="hasMore" type="button" class="review-more" @click="open = true">
                            {{ t('hero.readFull') }}
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
                            <li v-for="tag in review.highlights" :key="tag">{{ tag }}</li>
                        </ul>

                        <div v-if="reviews.length > 1" class="review-nav">
                            <button type="button" :aria-label="t('hero.prev')" @click="goRev(rev - 1)">
                                <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
                            </button>
                            <span>{{ rev + 1 }} / {{ reviews.length }}</span>
                            <button type="button" :aria-label="t('hero.next')" @click="goRev(rev + 1)">
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
        <div v-if="open && review" class="modal" @click.self="open = false">
            <div class="modal-box" role="dialog" aria-modal="true"
                :aria-label="t('hero.modalAria', { name: review.name })">
                <button type="button" class="modal-close" :aria-label="t('hero.close')" @click="open = false">
                    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>

                <div class="modal-scroll">
                    <p class="modal-text">{{ review.text }}</p>

                    <p class="modal-who">
                        <strong>{{ review.name }}</strong> · {{ review.status }}
                        <a v-if="review.url" :href="review.url" target="_blank" rel="noopener noreferrer">
                            {{ t('hero.seeOn', { source: review.source }) }}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
#hero-section-outer {
    background: var(--bg);
    border-bottom: 1px solid var(--border);
}

/* Les deux colonnes ont la même hauteur : haut et bas alignés */
#hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    align-content: start;
    gap: 80px;
    max-width: 1280px;
    min-height: 100vh;
    min-height: 100svh;
    margin: 0 auto;
    padding: 176px 48px 80px;
    background: var(--bg);
}

/* ─── Gauche ─────────────────────────────── */
.hero-left {
    display: flex;
    flex-direction: column;
}

/* Le terminal absorbe la différence de hauteur avec la colonne de droite */
.hero-left :deep(.term) {
    flex: 1 1 auto;
}

.hero-tag {
    align-self: flex-start;
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
    font-size: clamp(2.2rem, 4.5vw, 3.5rem);
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
    border-radius: 16px;
}

.hero-cta .btn-primary-custom {
    background: var(--surface);
    color: var(--accent);
    border: 1px solid var(--accent);
}

.hero-cta .btn-primary-custom:hover {
    background: var(--surface);
    color: var(--accent);
    box-shadow: none;
}

.hero-cta .btn-ghost {
    background: var(--surface);
    border-color: var(--border-md);
}

.hero-cta .btn-ghost:hover {
    border-color: var(--accent);
    color: var(--accent);
}

/* ─── Droite : écran + avis ──────────────── */
.preview {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
}

.preview-card {
    display: block;
    text-decoration: none;
}

.preview-card:hover .preview-img,
.preview-card:focus-visible .preview-img {
    filter: brightness(1.08);
}

/* Format 16:10 conservé : les captures sont prévues pour ce ratio */
.preview-img {
    position: relative;
    aspect-ratio: 16 / 10;
    background-color: var(--surface2);
    transition: filter 0.2s;
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
    overflow: hidden;
    background: var(--modal-bg);
    border: 1px solid var(--border-md);
    border-radius: 16px;
}

.modal-scroll {
    max-height: calc(85vh - 2px);
    overflow-y: auto;
    padding: 36px 32px 28px;
}

.modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;
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

    .modal-scroll {
        padding: 36px 20px 22px;
    }
}
</style>