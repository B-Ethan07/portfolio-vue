<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  project: { type: Object, required: true },
})

const activeSlide = ref(0)

function prevSlide() {
  activeSlide.value = (activeSlide.value - 1 + props.project.images.length) % props.project.images.length
}
function nextSlide() {
  activeSlide.value = (activeSlide.value + 1) % props.project.images.length
}
</script>

<template>
  <RouterLink :to="`/projects/${project.id}`" class="project-card-wrapper" :class="project.type === 'mobile' ? 'mobile-card' : 'web-card'">
    <!-- Carousel media -->
    <div :class="project.type === 'mobile' ? 'mobile-carousel' : 'web-carousel'">
      <div class="slide-inner">
        <template v-for="(media, i) in project.images" :key="i">
          <div v-show="i === activeSlide" class="slide-item">
            <video
              v-if="media.type === 'video'"
              :src="media.src"
              class="slide-media"
              controls
              playsinline
            ></video>
            <img
              v-else
              :src="media.src"
              :alt="media.alt"
              class="slide-media"
            />
          </div>
        </template>
      </div>
      <button v-if="project.images.length > 1" class="ctrl prev" @click.prevent="prevSlide" aria-label="Précédent">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button v-if="project.images.length > 1" class="ctrl next" @click.prevent="nextSlide" aria-label="Suivant">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>

    <!-- Body -->
    <div class="card-body-custom">
      <div :class="project.type === 'mobile' ? 'mobile-card-meta' : 'web-card-meta'">
        <span :class="project.type === 'mobile' ? 'mobile-badge' : 'web-badge'">{{ project.badge }}</span>
        <span :class="project.type === 'mobile' ? 'mobile-badge-stage' : 'web-badge-stage'">{{ project.stage }}</span>
      </div>

      <h4 class="card-project-title">
        <i :class="project.icon" aria-hidden="true"></i> {{ project.title }}
      </h4>
      <p class="card-project-desc">{{ project.desc }}</p>

      <ul class="card-features">
        <li v-for="f in project.features" :key="f">{{ f }}</li>
      </ul>

      <div class="card-tags">
        <span v-for="tag in project.tags" :key="tag" class="card-tag">{{ tag }}</span>
      </div>

      <div class="card-actions">
        <template v-for="link in project.links" :key="link.href">
          <a
            :href="link.href"
            :class="`btn-card-${link.style}`"
            target="_blank"
            rel="noopener"
            @click.stop
          >
            <i :class="link.icon"></i> {{ link.label }}
          </a>
        </template>
        <span class="btn-card-expand">
          <i class="fa-solid fa-arrow-right"></i> Voir le projet
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.project-card-wrapper {
  text-decoration: none;
  color: inherit;
  display: flex;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface2);
}

/* Web card (vertical) */
.web-card {
  flex-direction: column;
}
.web-card:hover {
  border-color: rgba(139, 92, 246, 0.3);
  transform: translateY(-6px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
}

/* Mobile card (horizontal) */
.mobile-card {
  flex-direction: row;
  align-items: stretch;
}
.mobile-card:hover {
  border-color: rgba(212, 200, 74, 0.3);
  transform: translateY(-6px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
}

/* Carousels */
.web-carousel {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #0a0a0d;
  flex-shrink: 0;
}

.mobile-carousel {
  position: relative;
  width: 55%;
  min-height: 360px;
  overflow: hidden;
  background: #07070d;
  flex-shrink: 0;
}

.slide-inner { width: 100%; height: 100%; position: relative; }
.slide-item { width: 100%; height: 100%; }

.slide-media {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
}

/* Controls */
.ctrl {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 36px; height: 36px;
  background: rgba(0,0,0,.65); border: 1px solid rgba(255,255,255,.12);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer; opacity: 0; transition: opacity 0.3s; z-index: 2;
}
.project-card-wrapper:hover .ctrl { opacity: 1; }
.ctrl.prev { left: 8px; }
.ctrl.next { right: 8px; }

.carousel-control-prev-icon,
.carousel-control-next-icon {
  display: inline-block;
  width: 16px; height: 16px;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100% 100%;
}
.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z' fill='white'/%3e%3c/svg%3e");
}
.carousel-control-next-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z' fill='white'/%3e%3c/svg%3e");
}

/* Body */
.card-body-custom {
  padding: 24px;
  display: flex; flex-direction: column; flex: 1;
}

.mobile-card .card-body-custom { padding: 20px; }

.card-project-title {
  font-family: var(--ff-mono); font-size: 1.05rem; font-weight: 700;
  color: #fff; margin-bottom: 8px;
  display: flex; align-items: center; gap: 8px;
}

.card-project-desc { font-size: 0.85rem; color: var(--muted); margin-bottom: 16px; line-height: 1.6; }

.card-features { list-style: none; margin-bottom: 20px; display: flex; flex-direction: column; gap: 6px; }
.card-features li { display: flex; align-items: flex-start; gap: 8px; font-size: 0.82rem; color: rgba(220,220,230,.6); }
.card-features li::before {
  font-family: 'Font Awesome 6 Free'; font-weight: 900;
  content: '\f061'; color: var(--accent); font-size: 0.68rem;
  flex-shrink: 0; margin-top: 3px;
}
.web-card .card-features li::before { color: var(--lavender); }

.card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; margin-top: auto; padding-top: 16px; }
.card-tag { font-family: var(--ff-mono); font-size: 0.7rem; padding: 3px 9px; background: rgba(255,255,255,.04); border: 1px solid var(--border); border-radius: 4px; color: var(--muted); }

.card-actions { display: flex; gap: 10px; flex-wrap: wrap; }

/* Badges */
.web-card-meta, .mobile-card-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }

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
.btn-card-ghost:hover { border-color: rgba(255,255,255,.28); transform: translateY(-1px); color: #fff; }

.btn-card-expand {
  display: inline-flex; align-items: center; gap: 6px;
  background: transparent; color: var(--muted);
  font-family: var(--ff-mono); font-size: 0.72rem;
  padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border);
  cursor: pointer; transition: border-color 0.2s, color 0.2s, transform 0.2s;
  letter-spacing: 0.04em;
}
.btn-card-expand:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 1024px) {
  .mobile-card { flex-direction: column; }
  .mobile-carousel { width: 100%; height: 260px; }
}
</style>