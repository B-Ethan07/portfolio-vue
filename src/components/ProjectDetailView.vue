<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { PROJECTS } from '../types/projects'

const route = useRoute()
const router = useRouter()

const project = computed(() => PROJECTS.find((p) => p.id === route.params.id))

const activeSlide = ref(0)

function isVideo(source) {
  return /\.(mp4|webm|ogg)$/i.test(source)
}

function prevSlide() {
  if (!project.value) return
  activeSlide.value = (activeSlide.value - 1 + project.value.images.length) % project.value.images.length
}
function nextSlide() {
  if (!project.value) return
  activeSlide.value = (activeSlide.value + 1) % project.value.images.length
}

onMounted(() => {
  if (!project.value) router.push('/projects')
})
</script>

<template>
  <main v-if="project" class="detail-page">
    <!-- Back -->
    <RouterLink to="/projects" class="back-link">
      <i class="fa-solid fa-arrow-left"></i> Tous les projets
    </RouterLink>

    <article class="detail-wrap">
      <!-- Media carousel -->
      <div class="detail-carousel" :class="project.type === 'mobile' ? 'portrait' : 'landscape'">
        <div class="detail-slides">
          <template v-for="(media, i) in project.images" :key="i">
            <div v-show="i === activeSlide" class="detail-slide">
              <video
                v-if="isVideo(media)"
                :src="media"
                class="detail-media"
                controls
                playsinline
              ></video>
              <img
                v-else
                :src="media"
                :alt="project.title"
                class="detail-media"
              />
            </div>
          </template>
        </div>
        <button v-if="project.images.length > 1" class="det-ctrl prev" @click="prevSlide" aria-label="Précédent">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button v-if="project.images.length > 1" class="det-ctrl next" @click="nextSlide" aria-label="Suivant">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <!-- Dots -->
        <div class="det-dots">
          <button
            v-for="(_, i) in project.images"
            :key="i"
            class="det-dot"
            :class="{ active: i === activeSlide }"
            @click="activeSlide = i"
          ></button>
        </div>
      </div>

      <!-- Info -->
      <div class="detail-info">
        <div :class="project.type === 'mobile' ? 'mobile-card-meta' : 'web-card-meta'" style="margin-bottom:16px">
          <span :class="project.type === 'mobile' ? 'mobile-badge' : 'web-badge'">{{ project.badge }}</span>
          <span :class="project.type === 'mobile' ? 'mobile-badge-stage' : 'web-badge-stage'">{{ project.badgeStage }}</span>
        </div>

        <h1 class="detail-title">
          <i :class="project.icon" aria-hidden="true"></i>
          {{ project.title }}
        </h1>
        <p class="detail-subtitle">{{ project.subtitle }}</p>
        <p class="detail-desc">{{ project.longDescription }}</p>

        <div class="detail-grid">
          <div>
            <p class="detail-section-label">Fonctionnalités</p>
            <ul class="detail-features">
              <li v-for="f in project.features" :key="f">{{ f }}</li>
            </ul>
          </div>
          <div>
            <p class="detail-section-label">Stack technique</p>
            <div class="detail-tags">
              <span v-for="tag in project.tags" :key="tag" class="detail-tag">{{ tag }}</span>
            </div>
          </div>
        </div>

        <div class="detail-actions">
          <template v-for="link in project.links" :key="link.url">
            <a
              :href="link.url"
              :class="`btn-card-${link.variant === 'primary' ? 'violet' : 'ghost'}`"
              target="_blank"
              rel="noopener"
            >
              <i :class="link.icon"></i> {{ link.label }}
            </a>
          </template>
          <RouterLink to="/projects" class="btn-card-ghost">
            <i class="fa-solid fa-arrow-left"></i> Retour
          </RouterLink>
        </div>
      </div>
    </article>

    <!-- Other projects -->
    <section class="other-projects">
      <p class="section-label" style="text-align:center;margin-bottom:32px">Autres projets</p>
      <div class="other-grid">
        <RouterLink
          v-for="p in PROJECTS.filter(p => p.id !== project.id).slice(0, 3)"
          :key="p.id"
          :to="`/projects/${p.id}`"
          class="other-card"
        >
          <div class="other-card-icon"><i :class="p.icon"></i></div>
          <div>
            <p class="other-card-title">{{ p.title }}</p>
            <p class="other-card-sub">{{ p.subtitle }}</p>
          </div>
          <i class="fa-solid fa-arrow-right other-arrow"></i>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  padding: 100px 48px 80px;
}

.back-link {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--ff-mono); font-size: 0.78rem;
  color: var(--muted); text-decoration: none;
  letter-spacing: 0.08em; text-transform: uppercase;
  margin-bottom: 48px;
  transition: color 0.2s;
}
.back-link:hover { color: var(--accent); }

/* Layout */
.detail-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
  margin-bottom: 80px;
}

/* Carousel */
.detail-carousel {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #0a0a0d;
}
.detail-carousel.landscape { aspect-ratio: 16/9; }
.detail-carousel.portrait  { aspect-ratio: 9/16; max-width: 340px; margin: 0 auto; }

.detail-slides { width: 100%; height: 100%; }
.detail-slide  { width: 100%; height: 100%; }
.detail-media  { width: 100%; height: 100%; object-fit: contain; object-position: center; display: block; }

.det-ctrl {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 44px; height: 44px;
  background: var(--bg); border: 1px solid rgba(255,255,255,.15);
  border-radius: 50%; color: var(--text); font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 2;
  transition: background 0.2s;
}
.det-ctrl:hover { background: var(--surface2); }
.det-ctrl.prev { left: 14px; }
.det-ctrl.next { right: 14px; }

.det-dots {
  position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 6px;
}
.det-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.3); border: none; cursor: pointer; transition: background 0.2s, width 0.2s, border-radius 0.2s; }
.det-dot.active { background: var(--accent); width: 20px; border-radius: 3px; }

/* Info */
.detail-title {
  font-family: var(--ff-head);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.03em;
  margin-bottom: 8px;
  display: flex; align-items: center; gap: 12px;
}

.detail-subtitle {
  font-family: var(--ff-mono);
  font-size: 0.78rem;
  color: var(--lavender);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.detail-desc {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 32px;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.detail-section-label {
  font-family: var(--ff-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}

.detail-features { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.detail-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; color: var(--muted); }
.detail-features li::before {
  font-family: 'Font Awesome 6 Free'; font-weight: 900;
  content: '\f061'; color: var(--accent); font-size: 0.7rem;
  flex-shrink: 0; margin-top: 3px;
}

.detail-tags { display: flex; flex-wrap: wrap; gap: 7px; }
.detail-tag {
  font-family: var(--ff-mono); font-size: 0.72rem;
  padding: 5px 12px;
  background: rgba(255,255,255,.05);
  border: 1px solid var(--border-md);
  border-radius: 6px; color: var(--lavender);
}

.detail-actions { display: flex; gap: 12px; flex-wrap: wrap; }

/* Other projects */
.other-projects {
  border-top: 1px solid var(--border);
  padding-top: 56px;
}

.other-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }

.other-card {
  display: flex; align-items: center; gap: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 20px;
  text-decoration: none; color: inherit;
  transition: border-color 0.2s, transform 0.2s;
}
.other-card:hover { border-color: var(--accent); transform: translateX(4px); }
.other-card-icon { font-size: 1.4rem; color: var(--accent); flex-shrink: 0; }
.other-card-title { font-family: var(--ff-mono); font-size: 0.9rem; font-weight: 700; color: var(--text); }
.other-card-sub { font-family: var(--ff-mono); font-size: 0.68rem; color: var(--muted); margin-top: 2px; }
.other-arrow { margin-left: auto; color: var(--muted); font-size: 0.8rem; transition: color 0.2s; }
.other-card:hover .other-arrow { color: var(--accent); }

/* Buttons */
.btn-card-violet {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--accent2-subtle); color: var(--lavender);
  font-family: var(--ff-body); font-weight: 700; font-size: 0.78rem;
  padding: 9px 18px; border-radius: 8px; border: 1px solid rgba(139,92,246,.25);
  text-decoration: none; transition: background 0.2s, transform 0.2s;
}
.btn-card-violet:hover { background: rgba(139,92,246,.16); transform: translateY(-1px); color: var(--lavender); }

.btn-card-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  background: transparent; color: var(--text);
  font-family: var(--ff-body); font-weight: 600; font-size: 0.78rem;
  padding: 8px 18px; border-radius: 8px; border: 1px solid var(--border-md);
  text-decoration: none; transition: border-color 0.2s, transform 0.2s, color 0.2s;
}
.btn-card-ghost:hover { border-color: rgba(255,255,255,.28); transform: translateY(-1px); color: var(--text); }

/* Badges */
.web-card-meta, .mobile-card-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.web-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--ff-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--lavender); background: var(--accent2-subtle); border: 1px solid rgba(139,92,246,.25);
  padding: 3px 9px; border-radius: 100px;
}
.web-badge::before { font-family: 'Font Awesome 6 Free'; font-weight: 900; content: '\f0ac'; font-size: 0.55rem; }
.web-badge-stage { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--lavender); }
.mobile-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--ff-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--accent); background: var(--accent-subtle); border: 1px solid rgba(212,200,74,.22);
  padding: 3px 9px; border-radius: 100px;
}
.mobile-badge::before { font-family: 'Font Awesome 6 Free'; font-weight: 900; content: '\f3cd'; font-size: 0.55rem; }
.mobile-badge-stage { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }

@media (max-width: 1024px) {
  .detail-page { padding: 100px 24px 60px; }
  .detail-wrap { grid-template-columns: 1fr; gap: 32px; }
  .detail-grid { grid-template-columns: 1fr; }
  .other-grid { grid-template-columns: 1fr; }
}
</style>