<script setup>
import { useReveal } from '../composables/useReveal'
useReveal()

const timeline = [
  {
    date: 'Fev 2026 - Avr 2026',
    icon: 'fa-solid fa-briefcase',
    title: 'Developpeur Full-Stack — INSIDE RUNWAY',
    stack: 'Flutter, React, FastApi, NextJs',
    items: [
      "App mobile Flutter: developpement de A a Z d'une application mobile multiplateforme sur la base du CRM de la marque (architecture, navigation, gestion d'etat, implementation des fonctionnalites, AWS S3).",
      'Travail en autonomie sur l\'ensemble du front-end mobile.',
      'Landing page NextJs: realisation du design et UI/UX.',
      'CRM React: contribution au developpement du CRM React et traduction FR/EN.',
    ],
  },
  {
    date: 'Nov 2025 - Jan 2026',
    icon: 'fa-solid fa-mobile-screen',
    title: "Developpeur Mobile, Front-end — IT'S ME TIME",
    stack: 'Flutter, React',
    items: [
      'Developpement et integration de nouvelles fonctionnalites en Flutter.',
      "Conception et implementation d'un module de dessin libre.",
      "Amelioration de l'UI/UX: optimisation des ecrans, ergonomie et fluidite de navigation.",
      'Integration d\'API REST et gestion des appels asynchrones (HTTP, JSON).',
      'Collaboration etroite avec le developpeur backend.',
    ],
  },
  {
    date: 'Avril 2025 — Novembre 2025',
    icon: 'fa-solid fa-graduation-cap',
    title: 'Développeur d\'Application Mobile · M2i Formation Lyon',
    stack: 'Flutter, Kotlin, Firebase',
    items: null,
    text: 'Formation professionnalisante orientée mobile et application.',
  },
  {
    date: 'Début 2024 — Aujourd\'hui',
    icon: 'fa-solid fa-book-open',
    title: 'Autodidacte',
    stack: 'Flutter, Angular, React',
    items: null,
    text: 'Je me forme aussi en autodidacte depuis début 2024.',
  },
]
</script>

<template>
  <main>
    <section class="page-section exp-hero">
      <div class="section-wrap">
        <div class="section-header reveal">
          <span class="section-num">01</span>
          <div class="section-title-block">
            <p class="section-label">Formation & Experience</p>
            <h2 class="section-title">
              Parcours <em>complet</em><br />et maîtrisé
            </h2>
          </div>
        </div>

        <div class="skills-timeline reveal">
          <div
            v-for="item in timeline"
            :key="item.title"
            class="skills-timeline-item"
          >
            <span class="skills-timeline-date">{{ item.date }}</span>
            <h3 class="skills-timeline-title">
              <i :class="item.icon" aria-hidden="true"></i>
              {{ item.title }}
            </h3>
            <p class="skills-timeline-text">
              <i class="fa-solid fa-code" aria-hidden="true"></i> Stack: {{ item.stack }}
            </p>
            <p v-if="item.text" class="skills-timeline-text">{{ item.text }}</p>
            <ul v-if="item.items" class="skills-timeline-list">
              <li v-for="li in item.items" :key="li">{{ li }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.exp-hero { background: var(--bg); min-height: 100vh; }

.skills-timeline {
  position: relative;
  padding-left: 28px;
  display: grid;
  gap: 16px;
}

.skills-timeline::before {
  content: '';
  position: absolute;
  left: 11px; top: 6px; bottom: 6px;
  width: 1px;
  background: var(--border-md);
}

.skills-timeline-item {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 20px 18px 24px;
}

.skills-timeline-item::before {
  content: '';
  position: absolute;
  left: -21px; top: 20px;
  width: 9px; height: 9px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-subtle);
}

.skills-timeline-date {
  display: block;
  font-family: var(--ff-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}

.skills-timeline-title {
  font-family: var(--ff-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.skills-timeline-text {
  margin: 0 0 4px;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

.skills-timeline-list {
  list-style: none;
  margin: 10px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
}

.skills-timeline-list li {
  display: flex;
  gap: 8px;
  font-size: 0.84rem;
  color: rgba(220, 220, 230, 0.7);
  line-height: 1.5;
}

.skills-timeline-list li::before {
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  content: '\f061';
  color: var(--accent);
  font-size: 0.65rem;
  margin-top: 4px;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .section-wrap { padding: 80px 24px; }
  .skills-timeline { padding-left: 22px; }
}
</style>