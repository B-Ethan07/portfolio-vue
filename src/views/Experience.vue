<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '@/composables/useReveal'
import { useMessages } from '@/composables/useMessages'

useReveal()

const { t } = useI18n()
const { raw, str, strs } = useMessages()

// ── Parties non traduisibles ; les textes sont dans experience.* ──
const JOB_BASES = [
  { id: 'insideRunway', org: 'INSIDE RUNWAY', tags: ['Flutter', 'React', 'FastAPI', 'Next.js'] },
  { id: 'itsMeTime', org: "IT'S ME TIME", tags: ['Flutter', 'React'] },
]

const EDU_IDS = ['diploma', 'cisco', 'm2i', 'self']
const EDU_ORGS = { m2i: 'M2i Formation, Lyon' }

const SKILL_BASES = [
  { id: 'mobile', tags: ['Flutter', 'Dart'] },
  { id: 'frontend', tags: ['React', 'Angular', 'Vue.js', 'Tailwind'] },
  { id: 'backend', tags: ['Node.js', 'Express.js', 'FastAPI', 'Python', 'Symfony'] },
  { id: 'data', tags: ['MongoDB', 'SQL'] },
  { id: 'tools', tags: ['GitHub Actions', 'Docker', 'Git', 'Linux', 'Vitest', 'Jest', 'Figma'] },
]

const experience = computed(() =>
  JOB_BASES.map(b => {
    const m = raw(`experience.jobs.${b.id}`)
    return { ...b, date: str(m.date), title: str(m.title), items: strs(m.items) }
  }),
)

const formation = computed(() =>
  EDU_IDS.map(id => {
    const m = raw(`experience.education.${id}`)
    return {
      id,
      org: EDU_ORGS[id] ?? null,
      date: str(m.date),
      title: str(m.title),
      tags: m.tags ? strs(m.tags) : [],
      text: m.text ? str(m.text) : null,
    }
  }),
)

const competences = computed(() =>
  SKILL_BASES.map(s => ({ ...s, domain: t(`experience.domains.${s.id}`) })),
)
</script>

<template>
  <main>
    <section class="page-section exp-page">
      <div class="exp-wrap">
        <h1 class="exp-title reveal">{{ t('experience.title') }}</h1>

        <div class="group reveal">
          <h2 class="group-title">{{ t('experience.jobsTitle') }}</h2>
          <ul class="entries">
            <li v-for="e in experience" :key="e.id" class="entry">
              <p class="entry-date">{{ e.date }}</p>
              <div class="entry-body">
                <h3 class="entry-title">{{ e.title }} <span class="entry-org">· {{ e.org }}</span></h3>
                <ul class="entry-list">
                  <li v-for="item in e.items" :key="item">{{ item }}</li>
                </ul>
                <div class="entry-tags">
                  <span v-for="tag in e.tags" :key="tag" class="entry-tag">{{ tag }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="group reveal">
          <h2 class="group-title">{{ t('experience.educationTitle') }}</h2>
          <ul class="entries">
            <li v-for="f in formation" :key="f.id" class="entry">
              <p class="entry-date">{{ f.date }}</p>
              <div class="entry-body">
                <h3 class="entry-title">
                  {{ f.title }}
                  <span v-if="f.org" class="entry-org">· {{ f.org }}</span>
                </h3>
                <p v-if="f.text" class="entry-text">{{ f.text }}</p>
                <div class="entry-tags">
                  <span v-for="tag in f.tags" :key="tag" class="entry-tag">{{ tag }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="group reveal">
          <h2 class="group-title">{{ t('experience.skillsTitle') }}</h2>
          <ul class="entries">
            <li v-for="c in competences" :key="c.id" class="entry entry--skills">
              <p class="entry-date">{{ c.domain }}</p>
              <div class="entry-tags entry-tags--flat">
                <span v-for="tag in c.tags" :key="tag" class="entry-tag">{{ tag }}</span>
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