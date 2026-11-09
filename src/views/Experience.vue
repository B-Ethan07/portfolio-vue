<script setup>
import { useReveal } from '../composables/useReveal'

useReveal()

// Contenu volontairement court : 1 titre, 1 lieu, des tags, 3 points max.
const experience = [
  {
    date: 'Fév – Avr 2026',
    title: 'Développeur full-stack',
    org: 'INSIDE RUNWAY',
    tags: ['Flutter', 'React', 'FastAPI', 'Next.js'],
    items: [
      "App mobile Flutter développée de A à Z, en autonomie : architecture, navigation, état, AWS S3.",
      'Landing page Next.js : design et UI/UX.',
      'CRM React : contribution et traduction FR/EN.',
    ],
  },
  {
    date: 'Nov 2025 – Jan 2026',
    title: 'Développeur mobile, front-end',
    org: "IT'S ME TIME",
    tags: ['Flutter', 'React'],
    items: [
      'Nouvelles fonctionnalités Flutter, dont un module de dessin libre.',
      'Refonte UI/UX : écrans, ergonomie, fluidité de navigation.',
      "Intégration d'API REST avec le développeur backend.",
    ],
  },
  // TODO : ajoute ici ton parcours d'éducateur (poste, structure, dates)
  // { date: '…', title: 'Éducateur', org: '…', tags: [], items: ['…'] },
]

const formation = [
  {
    date: 'Oct 2026',
    title: 'Diplôme Développeur Web et Web Mobile',
    tags: ['Front-End', 'Back-End', 'API REST', 'Bases de données', 'CI/CD', 'Tests'],
    text: "Projets concrets et collaboratifs, modélisation de bases de données, création d'API REST.",
  },
  {
    date: 'Août 2026',
    title: 'Certification Cisco · Cybersecurity',
    tags: ['Sécurité réseau', 'Tests d\'intrusion'],
    text: "Sécurité réseau, tests d'intrusion, analyse de vulnérabilités.",
  },
  {
    date: 'Avr – Nov 2025',
    title: "Développeur d'application mobile",
    org: 'M2i Formation, Lyon',
    tags: ['Flutter', 'Kotlin', 'Firebase'],
    text: 'Formation professionnalisante orientée mobile.',
  },
  {
    date: 'Depuis 2024',
    title: 'Autodidacte',
    tags: ['Flutter', 'Angular', 'React'],
    text: null,
  },
]

const competences = [
  { domain: 'Mobile', tags: ['Flutter', 'Dart'] },
  { domain: 'Front-end', tags: ['React', 'Angular', 'Vue.js', 'Tailwind'] },
  { domain: 'Back-end', tags: ['Node.js', 'Express.js', 'FastAPI', 'Python', 'Symfony'] },
  { domain: 'Données', tags: ['MongoDB', 'SQL'] },
  { domain: 'Outils', tags: ['GitHub Actions', 'Docker', 'Git', 'Linux', 'Vitest', 'Jest', 'Figma'] },
]
</script>

<template>
  <main>
    <section class="page-section exp-page">
      <div class="exp-wrap">
        <h1 class="exp-title reveal">Parcours</h1>

        <div class="group reveal">
          <h2 class="group-title">Expérience</h2>
          <ul class="entries">
            <li v-for="e in experience" :key="e.org + e.date" class="entry">
              <p class="entry-date">{{ e.date }}</p>
              <div class="entry-body">
                <h3 class="entry-title">{{ e.title }} <span class="entry-org">· {{ e.org }}</span></h3>
                <ul class="entry-list">
                  <li v-for="li in e.items" :key="li">{{ li }}</li>
                </ul>
                <div class="entry-tags">
                  <span v-for="t in e.tags" :key="t" class="entry-tag">{{ t }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="group reveal">
          <h2 class="group-title">Formation</h2>
          <ul class="entries">
            <li v-for="f in formation" :key="f.title" class="entry">
              <p class="entry-date">{{ f.date }}</p>
              <div class="entry-body">
                <h3 class="entry-title">
                  {{ f.title }}
                  <span v-if="f.org" class="entry-org">· {{ f.org }}</span>
                </h3>
                <p v-if="f.text" class="entry-text">{{ f.text }}</p>
                <div class="entry-tags">
                  <span v-for="t in f.tags" :key="t" class="entry-tag">{{ t }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="group reveal">
          <h2 class="group-title">Compétences</h2>
          <ul class="entries">
            <li v-for="c in competences" :key="c.domain" class="entry entry--skills">
              <p class="entry-date">{{ c.domain }}</p>
              <div class="entry-tags entry-tags--flat">
                <span v-for="t in c.tags" :key="t" class="entry-tag">{{ t }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.exp-page {
  min-height: 100vh;
  background: var(--bg);
}

.exp-wrap {
  max-width: 1000px;
  margin: 0 auto;
  padding: 110px 48px 100px;
}

.exp-title {
  margin-bottom: 56px;
  font-family: var(--ff-head);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--hero-name-color);
}

.group+.group {
  margin-top: 72px;
}

.group-title {
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent);
}

.entries {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Date à gauche, contenu à droite, un simple filet entre les lignes */
.entry {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 32px;
  padding: 26px 0;
  border-top: 1px solid var(--border-md);
}

.entries .entry:last-child {
  border-bottom: 1px solid var(--border-md);
}

.entry-date {
  padding-top: 3px;
  font-family: var(--ff-mono);
  font-size: 0.78rem;
  color: var(--muted);
}

.entry-title {
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text);
}

.entry-org {
  font-weight: 400;
  color: var(--muted);
}

.entry-text {
  margin-top: 8px;
  max-width: 60ch;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--muted);
}

.entry-list {
  list-style: none;
  margin: 10px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
  max-width: 64ch;
}

.entry-list li {
  position: relative;
  padding-left: 18px;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--muted);
}

.entry-list li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--accent);
}

.entry-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.entry-tag {
  padding: 3px 10px;
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 100px;
}

.entry--skills {
  padding: 16px 0;
}

.entry--skills .entry-date {
  padding-top: 0;
  align-self: center;
}

.entry-tags--flat {
  margin-top: 0;
}

@media (max-width: 760px) {
  .exp-wrap {
    padding: 96px 24px 80px;
  }

  .entry {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .entry-date {
    padding-top: 0;
  }
}
</style>