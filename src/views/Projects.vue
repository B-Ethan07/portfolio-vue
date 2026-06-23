<script setup>
import { useReveal } from '../composables/useReveal.ts'
import { PROJECTS } from '../types/projects.ts'
import ProjectCard from '../components/ProjectCard.vue'

useReveal()
</script>

<template>
  <main>
    <section id="projects" class="page-section">
      <div class="section-wrap">
        <div class="section-header reveal">
          <span class="section-num">03</span>
          <div class="section-title-block">
            <p class="section-label">Mes projets</p>
            <h2 class="section-title">Ce que j'ai<br /><em>construit</em></h2>
          </div>
        </div>

        <div class="all-projects">
          <ProjectCard
            v-for="(project, i) in PROJECTS"
            :key="project.id"
            :project="project"
            class="reveal"
            :class="`reveal-delay-${(i % 3) + 1}`"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
#projects { background: var(--surface); min-height: 100vh; }

.all-projects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .all-projects { grid-template-columns: 1fr; }
  .section-wrap { padding: 80px 24px; }
}
</style>