<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useReveal } from '../composables/useReveal'
import { HERO_PROJECTS } from '../types/projects'

useReveal()
const router = useRouter()

// ── Hero carousel ──
const current = ref(0)
const DELAY = 4500
let autoTimer = null

function goTo(idx) {
  current.value = ((idx % HERO_PROJECTS.length) + HERO_PROJECTS.length) % HERO_PROJECTS.length
  resetAuto()
}

function resetAuto() {
  clearInterval(autoTimer)
  autoTimer = setInterval(() => goTo(current.value + 1), DELAY)
}

// Touch swipe
let touchStartX = 0
function onTouchStart(e) { touchStartX = e.changedTouches[0].clientX }
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) goTo(dx < 0 ? current.value + 1 : current.value - 1)
}

onMounted(() => {
  resetAuto()
  // Hero left stagger
  document.querySelectorAll('.hero-left > *').forEach((el, i) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = `opacity 0.7s ${i * 0.1 + 0.2}s cubic-bezier(0.16,1,0.3,1), transform 0.7s ${i * 0.1 + 0.2}s cubic-bezier(0.16,1,0.3,1)`
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none' }, 50)
  })
})

onUnmounted(() => clearInterval(autoTimer))

const stackCards = [
  {
    title: 'Mobile',
    desc: 'Apps multiplateformes et natives.',
    tags: [
      { label: 'Flutter', icon: 'devicon-flutter-plain colored' },
      { label: 'Kotlin', icon: 'devicon-kotlin-plain colored' },
    ],
  },
  {
    title: 'Front-End',
    desc: 'Interfaces modernes et performantes.',
    tags: [
      { label: 'React', icon: 'devicon-react-original colored' },
      { label: 'Angular', icon: 'devicon-angularjs-plain colored' },
      { label: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { label: 'Tailwind', icon: 'devicon-tailwindcss-plain colored' },
    ],
  },
  {
    title: 'Back-End',
    desc: 'APIs robustes et scalables.',
    tags: [
      { label: 'FastAPI', icon: 'devicon-fastapi-plain colored' },
      { label: 'Express.js', icon: 'devicon-express-original colored' },
      { label: 'PHP', icon: 'devicon-php-plain colored' },
      { label: 'Symfony', icon: 'devicon-symfony-original colored' },
    ],
  },
  {
    title: 'Data & Outils',
    desc: 'Du stockage au delivery.',
    tags: [
      { label: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
      { label: 'SQL', icon: 'devicon-mysql-plain colored' },
      { label: 'Docker', icon: 'devicon-docker-plain colored' },
      { label: 'Git', icon: 'devicon-git-plain colored' },
    ],
  },
]
</script>

<template>
  <!-- ─── HERO ─────────────────────────────────────────────────── -->
  <div id="hero-section-outer">
    <section id="hero" class="page-section">
      <div class="hero-left">
        <div class="hero-tag">Disponible</div>

        <h1 class="hero-name">Ethan<br /><span>Boulard</span></h1>
        <p class="hero-title">Développeur Web &amp; Mobile</p>

        <div class="hero-stats">
          <div class="stat-chip">
            <div class="stat-icon"><i class="fa-solid fa-code" aria-hidden="true"></i></div>
            <div class="stat-text">
              <span class="stat-val">7+ projets</span>
              <span class="stat-label">réalisés</span>
            </div>
          </div>
          <div class="stat-chip">
            <div class="stat-icon"><i class="fa-solid fa-location-dot" aria-hidden="true"></i></div>
            <div class="stat-text">
              <span class="stat-val">Lyon</span>
              <span class="stat-label">disponible</span>
            </div>
          </div>
          <div class="stat-chip stat-chip--purple">
            <div class="stat-icon stat-icon--purple"><i class="fa-solid fa-rotate" aria-hidden="true"></i></div>
            <div class="stat-text">
              <span class="stat-val">Reconversion</span>
              <span class="stat-label">6 ans éduc.</span>
            </div>
          </div>
        </div>

        <div class="hero-about">
          <div class="about-eyebrow">À propos</div>
          <p class="about-text">
            Après <strong>6 ans comme éducateur</strong>, j'ai transformé ma passion du code en métier.
            Full-stack spécialisé <strong>Flutter, React &amp; Angular</strong>, je construis des interfaces
            qui ont du sens et qui tiennent la route.
          </p>
        </div>

        <div class="hero-cta">
          <RouterLink to="/projects" class="btn-primary-custom">
            Voir mes projets <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </RouterLink>
          <RouterLink to="/contact" class="btn-ghost">
            <i class="fa-regular fa-envelope" aria-hidden="true"></i> Me contacter
          </RouterLink>
        </div>
      </div>

      <!-- Carousel -->
      <div class="hero-carousel-col">
        <div class="carousel-header">
          <div class="preview-badge">
            <span class="preview-dot"></span>
            Projets récents
          </div>
          <div class="carousel-counter">
            <span>{{ current + 1 }}</span> / <span>{{ HERO_PROJECTS.length }}</span>
          </div>
        </div>

        <div
          class="project-card"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
          @mouseenter="clearInterval(autoTimer)"
          @mouseleave="resetAuto"
        >
          <div
            class="project-card-img"
            :class="`project-card-img--${HERO_PROJECTS[current].type}`"
            :style="HERO_PROJECTS[current].images?.[0] ? { backgroundImage: `url(${HERO_PROJECTS[current].images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: HERO_PROJECTS[current].color }"
          >
            <div class="project-card-overlay"></div>
            <span class="project-card-year">{{ HERO_PROJECTS[current].year }}</span>
          </div>

          <div class="project-card-body">
            <div class="project-card-meta">
              <span class="web-badge">{{ HERO_PROJECTS[current].badge }}</span>
              <span class="project-card-type">{{ HERO_PROJECTS[current].type }}</span>
            </div>
            <h2 class="project-card-title">{{ HERO_PROJECTS[current].title }}</h2>
            <p class="project-card-desc">{{ HERO_PROJECTS[current].description }}</p>
            <div class="card-tags">
              <span v-for="tag in HERO_PROJECTS[current].tags" :key="tag" class="card-tag">{{ tag }}</span>
            </div>
            <div class="project-card-footer">
              <RouterLink :to="`/projects/${HERO_PROJECTS[current].id}`" class="project-card-link">
                Voir le projet <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </RouterLink>
              <div class="carousel-dots" role="tablist">
                <button
                  v-for="(_, i) in HERO_PROJECTS"
                  :key="i"
                  class="carousel-dot"
                  :class="{ active: i === current }"
                  role="tab"
                  :aria-label="`Projet ${i + 1}`"
                  :aria-selected="i === current"
                  @click="goTo(i)"
                ></button>
              </div>
            </div>
          </div>
        </div>

        <div class="carousel-arrows">
          <button class="carousel-arrow" aria-label="Projet précédent" @click="goTo(current - 1)">
            <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button class="carousel-arrow" aria-label="Projet suivant" @click="goTo(current + 1)">
            <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>
  </div>

  <!-- ─── STACK ─────────────────────────────────────────────────── -->
  <section id="stack" class="page-section">
    <div class="section-wrap">
      <div class="section-header reveal">
        <span class="section-num">01</span>
        <div class="section-title-block">
          <p class="section-label">Ma stack</p>
          <h2 class="section-title">Stack <em>clefs</em></h2>
        </div>
      </div>

      <div class="stack-grid">
        <article
          v-for="(card, i) in stackCards"
          :key="card.title"
          class="stack-card reveal"
          :class="`reveal-delay-${i + 1}`"
        >
          <h3 class="stack-card-title">{{ card.title }}</h3>
          <p class="stack-card-desc">{{ card.desc }}</p>
          <div class="stack-tags">
            <span v-for="tag in card.tags" :key="tag.label" class="skill-tag">
              <i :class="tag.icon"></i> {{ tag.label }}
            </span>
          </div>
        </article>
      </div>

      <div class="home-cta-row reveal">
        <RouterLink to="/experience" class="btn-ghost">
          Voir mon expérience <i class="fa-solid fa-arrow-right"></i>
        </RouterLink>
        <RouterLink to="/projects" class="btn-primary-custom">
          Tous mes projets <i class="fa-solid fa-arrow-right"></i>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── HERO outer ─────────────────────────────── */
#hero-section-outer {
  position: relative;
  overflow: hidden;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

#hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 120px 48px 100px;
  gap: 64px;
  width: 100%;
  background: var(--bg);
  max-width: 1600px;
  margin: 0 auto;
}

.hero-left {
  position: relative;
  z-index: 2;
  padding-left: 20px;
}

.hero-left::before {
  content: '';
  position: absolute;
  left: 0; top: 6px; bottom: 6px;
  width: 2px;
  background: var(--accent);
  box-shadow: 0 0 16px var(--accent-glow);
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-family: var(--ff-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: var(--accent);
  background: var(--accent-subtle);

  border: 1px solid var(--border-md);
  padding: 6px 14px;
  border-radius: 100px;

  margin-bottom: 28px;
}

.hero-tag::before {
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  content: '\f111';
  font-size: 0.42rem;
  animation: pulse 2s infinite;
}

@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }

.hero-name {
  font-family: var(--ff-head);
  font-size: clamp(3.2rem, 5vw, 5rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.04em;

  color: var(--hero-name-color);
  margin-bottom: 12px;

  text-shadow:
    0 10px 30px rgba(0,0,0,0.25),
    0 0 18px var(--accent-glow);
}
.hero-name span { color: var(--accent); }

.hero-title {
  font-family: var(--ff-mono);
  font-size: 0.95rem;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

/* Stat chips */
.hero-stats { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 22px; }

.stat-chip {
  display: flex; align-items: center; gap: 10px;
  background: var(--surface);
  border: 1px solid var(--border-md);
  border-radius: 12px;
  padding: 10px 14px;
  transition: border-color 0.2s, transform 0.2s;
}
.stat-chip:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.stat-chip--purple:hover {
  border-color: var(--accent2);
}

.stat-icon {
  width: 30px; height: 30px; border-radius: 8px;
  background: var(--accent-subtle);
  border: 1px solid rgba(212,200,74,.18);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); font-size: 0.78rem; flex-shrink: 0;
}
.stat-icon--purple { background: var(--accent2-subtle); border-color: rgba(139,92,246,.18); color: var(--lavender); }

.stat-text { display: flex; flex-direction: column; gap: 2px; }
.stat-val { font-family: var(--ff-mono); font-size: 0.8rem; font-weight: 600; color: var(--text); line-height: 1.1; white-space: nowrap; }
.stat-label { font-family: var(--ff-mono); font-size: 0.58rem; color: var(--muted); letter-spacing: 0.07em; text-transform: uppercase; }

/* Hero about */
.hero-about {
  background: var(--surface);
  border: 1px solid var(--border-md);
  border-radius: 14px;
  padding: 16px 18px 16px 22px;
  margin-bottom: 28px;
}
.about-eyebrow {
  font-family: var(--ff-mono);
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--lavender);
  margin-bottom: 8px;
}
.about-text {
  font-size: 0.9rem;
  color: var(--text);
  opacity: 0.85;
  line-height: 1.65;
}
.about-text strong { color: var(--accent); font-weight: 600; }

/* CTA */
.hero-cta { display: flex; gap: 16px; flex-wrap: wrap; }

/* Hero carousel col */
.hero-carousel-col {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center; gap: 14px;
}

.carousel-header {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; max-width: 400px;
}

.preview-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-family: var(--ff-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: var(--text);
  background: var(--surface);

  border: 1px solid var(--border-md);
  padding: 6px 12px;
  border-radius: 999px;
}

.preview-dot {
  width: 6px; height: 6px; border-radius: 999px;
  background: var(--accent); box-shadow: 0 0 10px var(--accent-glow);
}

.carousel-counter { font-family: var(--ff-mono); font-size: 0.65rem; color: var(--muted); }
.carousel-counter span { color: var(--accent); }

/* Project card */
.project-card {
  width: 100%; max-width: 400px;
  background: var(--surface);
  border: 1px solid var(--border-md);
  border-radius: 20px; overflow: hidden;
  transition: border-color 0.3s, transform 0.3s;
  display: flex; flex-direction: column;
  position: relative; cursor: pointer;
}
.project-card:hover { border-color: rgba(212,200,74,.28); transform: translateY(-3px); }

.project-card-img {
  position: relative; height: auto; aspect-ratio: 16/9;
  overflow: hidden; display: flex; align-items: center; justify-content: center;
}
.project-card-img--runway   { background: linear-gradient(135deg,#0d0914 0%,#1a1030 100%); }
.project-card-img--zen      { background: linear-gradient(135deg,#071014 0%,#0b2018 100%); }
.project-card-img--cinezone { background: linear-gradient(135deg,#140a0a 0%,#1c0c20 100%); }

.project-card-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom,transparent 45%,rgba(7,7,13,.75) 100%);
  pointer-events: none;
}

.project-card-year {
  position: absolute; top: 10px; right: 10px;
  font-family: var(--ff-mono); font-size: 0.58rem;
  letter-spacing: 0.12em; color: #f4f4fb;
  background: rgba(8,8,12,.72); border: 1px solid rgba(255,255,255,.2);
  padding: 3px 9px; border-radius: 100px;
}

.project-card-body {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 16px 18px 18px;
  opacity: 0; transform: translateY(10px);
  background: linear-gradient(180deg,rgba(14,14,18,.2) 0%,rgba(14,14,18,.92) 45%,rgba(14,14,18,.98) 100%);
  backdrop-filter: blur(6px);
  transition: opacity 0.2s, transform 0.2s;
}
.project-card:hover .project-card-body { opacity: 1; transform: translateY(0); }

.project-card-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 9px; }

.project-card-type {
  font-family: var(--ff-mono); font-size: 0.6rem;
  color: rgba(245,245,252,.92); background: rgba(8,8,12,.72);
  border: 1px solid rgba(255,255,255,.12);
  padding: 3px 8px; border-radius: 999px; letter-spacing: 0.05em;
}

.project-card-title {
  font-family: var(--ff-head);
  font-size: 1.1rem;
  font-weight: 800;

  color: var(--text);

  text-shadow: 0 2px 8px rgba(0,0,0,.15);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 7px;
}

.project-card-desc {
  font-size: 0.82rem; color: rgba(240,240,248,.9);
  line-height: 1.55; margin-bottom: 12px;
}

.project-card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }

.project-card-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--ff-mono); font-size: 0.65rem;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--accent); text-decoration: none;
  transition: opacity 0.2s;
}
.project-card-link:hover { opacity: 0.7; color: var(--accent); }

/* Dots */
.carousel-dots { display: flex; gap: 6px; align-items: center; }
.carousel-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); border: none; padding: 0; cursor: pointer; transition: background 0.25s, width 0.25s, border-radius 0.25s; flex-shrink: 0; }
.carousel-dot.active { background: var(--accent); width: 20px; border-radius: 3px; }

/* Arrows */
.carousel-arrows { display: flex; gap: 10px; }
.carousel-arrow {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid var(--border-md);
  background: var(--surface); color: var(--muted);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 0.78rem;
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
}
.carousel-arrow:hover { border-color: var(--accent); color: var(--accent); transform: scale(1.08); }

/* ─── STACK ────────────────────────────────── */

.stack-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }

.stack-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px 20px;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.stack-card:hover { border-color: rgba(212,200,74,.28); transform: translateY(-4px); box-shadow: 0 18px 40px rgba(0,0,0,.35); }
.stack-card-title { font-family: var(--ff-mono); font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 8px; }
.stack-card-desc { color: var(--muted); font-size: 0.85rem; margin-bottom: 14px; }
.stack-tags { display: flex; flex-wrap: wrap; gap: 8px; }

.home-cta-row {
  display: flex; gap: 16px; flex-wrap: wrap;
  margin-top: 56px; justify-content: center;
}

.skill-tag {
  font-family: var(--ff-mono);
  font-size: 0.82rem;
  padding: 7px 14px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--muted);
  transition: border-color 0.2s, color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 1024px) {
  #hero { grid-template-columns: 1fr; padding: 100px 32px 80px; gap: 48px; }
  .hero-left::before { display: none; }
  .hero-left { padding-left: 0; }
  .hero-carousel-col { width: 100%; }
  .carousel-header { max-width: 100%; width: 100%; }
  .project-card { max-width: 100%; }
  .stack-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 480px) {
  #hero { padding: 90px 18px 72px; gap: 40px; }
  .hero-stats { flex-direction: column; gap: 8px; }
  .stat-chip { width: 100%; }
  .hero-about { padding: 14px 14px 14px 18px; }
  .hero-cta { flex-direction: column; gap: 10px; }
  .btn-primary-custom, .btn-ghost { width: 100%; justify-content: center; }
  .stack-grid { grid-template-columns: 1fr; }
}
@media (min-width: 1440px) {
  #hero { padding: 140px 80px 120px; gap: 80px; }
  .project-card { max-width: 520px; }
  .carousel-header { max-width: 520px; }
}
</style>