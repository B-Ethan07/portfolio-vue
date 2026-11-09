<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { HERO_PROJECTS } from '../types/projects'

// ── Ce que je fais : un titre + des tags, rien d'autre ──
const skills = [
  { title: 'Apps multiplateformes', icon: 'fa-solid fa-mobile-screen-button' },
  { title: 'Full-stack', icon: 'fa-solid fa-layer-group' },
  { title: 'CI/CD et tests', icon: 'fa-solid fa-code-branch' },
  { title: 'Bots et automatisation', icon: 'fa-solid fa-robot' },
]

// ── Aperçu des projets (à droite) ──
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

onMounted(start)
onUnmounted(stop)
</script>

<template>
  <div id="hero-section-outer">
    <section id="hero" class="page-section">
      <!-- Gauche : qui je suis, ce que je fais -->
      <div class="hero-left">
        <p class="hero-tag">Disponible · Lyon</p>

        <h1 class="hero-name">Ethan Boulard</h1>
        <p class="hero-pitch">Développeur Web &amp; Mobile.</p>

        <ul class="skills" aria-label="Ce que je fais">
          <li v-for="s in skills" :key="s.title" class="skill">
            <span class="skill-icon"><i :class="s.icon" aria-hidden="true"></i></span>
            <h2 class="skill-title">{{ s.title }}</h2>
          </li>
        </ul>

        <div class="hero-cta">
          <RouterLink to="/projects" class="btn-primary-custom">
            Voir mes projets <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </RouterLink>
          <RouterLink to="/contact" class="btn-ghost">
            <i class="fa-regular fa-envelope" aria-hidden="true"></i> Me contacter
          </RouterLink>
        </div>
      </div>

      <!-- Droite : aperçu des projets -->
      <div class="preview" @mouseenter="stop" @mouseleave="start" @focusin="stop" @focusout="start">
        <Transition name="fade" mode="out-in">
          <RouterLink :key="projects[current].id" :to="`/projects/${projects[current].id}`" class="preview-card"
            :aria-label="projects[current].title">
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
    </section>
  </div>
</template>

<style scoped>
#hero-section-outer {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

#hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 80px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px 48px 100px;
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

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 28px;
}

.skills {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.skill {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: var(--surface);
  border: 1px solid var(--border-md);
  border-radius: 12px;
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  font-size: 0.85rem;
  color: var(--accent);
  background: var(--accent-subtle);
  border-radius: 8px;
}

.skill-title {
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text);
}

/* ─── Droite : aperçu ────────────────────── */
.preview {
  position: relative;
  width: 100%;
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

/* ─── Responsive ─────────────────────────── */
@media (max-width: 1024px) {
  #hero {
    grid-template-columns: 1fr;
    gap: 56px;
    min-height: auto;
    padding: 100px 32px 72px;
  }

  .preview {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  #hero {
    padding: 90px 18px 64px;
  }

  .hero-cta {
    flex-direction: column;
  }

  .skills {
    grid-template-columns: 1fr;
  }

  .btn-primary-custom,
  .btn-ghost {
    width: 100%;
    justify-content: center;
  }
}
</style>
