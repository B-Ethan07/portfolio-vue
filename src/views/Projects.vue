<script setup>
import { ref, computed } from 'vue'
import { useReveal } from '../composables/useReveal.ts'
import { PROJECTS } from '../types/projects.ts'

useReveal()

// `type` dans projects.ts : mobile, web, fullstack, bot/script, desktop/mobile
const LABELS = {
  mobile: 'Mobile',
  web: 'Web',
  fullstack: 'Full-stack',
  'bot/script': 'Bot',
  'desktop/mobile': 'Desktop & mobile',
}
const label = p => LABELS[p.type] ?? p.type

// Filtre par catégorie, construit à partir des données
const ALL = 'Tous'
const categories = [ALL, ...new Set(PROJECTS.map(label))]
const active = ref(ALL)

const visible = computed(() =>
  active.value === ALL ? PROJECTS : PROJECTS.filter(p => label(p) === active.value)
)

// Les captures d'apps mobiles sont verticales : on les affiche en entier
// (contain) sur fond noir, avec des bandes noires à gauche et à droite.
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
</script>

<template>
  <main>
    <section id="projects" class="page-section">
      <div class="projects-wrap">
        <div class="projects-top reveal">
          <h1 class="projects-title">Projets</h1>

          <div v-if="categories.length > 2" class="filters" role="group" aria-label="Filtrer les projets">
            <button v-for="c in categories" :key="c" class="filter" :class="{ active: c === active }"
              :aria-pressed="c === active" @click="active = c">
              {{ c }}
            </button>
          </div>
        </div>

        <ul class="list">
          <li v-for="p in visible" :key="p.id">
            <RouterLink :to="`/projects/${p.id}`" class="row">
              <div class="row-img" :style="cover(p)"></div>

              <div class="row-body">
                <p class="row-meta">{{ label(p) }} · {{ p.year }}</p>
                <h2 class="row-name">{{ p.title }}</h2>
                <p class="row-desc">{{ p.description }}</p>

                <div class="row-foot">
                  <div class="row-tags">
                    <span v-for="tag in p.tags" :key="tag" class="row-tag">{{ tag }}</span>
                  </div>
                  <span class="row-link">
                    Voir le projet <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped>
#projects {
  min-height: 100vh;
}

.projects-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 110px 48px 100px;
}

.projects-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;
}

.projects-title {
  font-family: var(--ff-head);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--hero-name-color);
}

/* Filtres */
.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter {
  padding: 6px 14px;
  font-size: 0.85rem;
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--border-md);
  border-radius: 100px;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.filter:hover {
  color: var(--text);
  border-color: var(--accent);
}

.filter.active {
  color: var(--accent);
  background: var(--accent-subtle);
  border-color: var(--accent);
}

/* Liste : une ligne par projet, image à gauche, infos à droite */
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.row {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: 32px;
  padding: 28px 0;
  text-decoration: none;
  border-top: 1px solid var(--border-md);
}

.list li:last-child .row {
  border-bottom: 1px solid var(--border-md);
}

.row-img {
  aspect-ratio: 16 / 10;
  background-color: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.2s;
}

.row:hover .row-img,
.row:focus-visible .row-img {
  border-color: var(--accent);
}

.row-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  min-width: 0;
}

.row-meta {
  font-family: var(--ff-mono);
  font-size: 0.75rem;
  color: var(--muted);
}

.row-name {
  font-family: var(--ff-head);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
}

.row-desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 56ch;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--muted);
}

.row-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}

.row-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.row-tag {
  padding: 3px 10px;
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 100px;
}

.row-link {
  font-size: 0.9rem;
  color: var(--accent);
  white-space: nowrap;
}

.row:hover .row-link {
  text-decoration: underline;
  text-underline-offset: 4px;
}

@media (max-width: 860px) {
  .projects-wrap {
    padding: 96px 24px 80px;
  }

  .row {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
</style>
