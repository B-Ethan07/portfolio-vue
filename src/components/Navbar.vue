<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav :class="{ scrolled }">
    <RouterLink to="/" class="nav-logo">EB.</RouterLink>

    <ul class="nav-links" :class="{ 'is-open': menuOpen }">
      <li><RouterLink to="/" @click="menuOpen = false">Accueil</RouterLink></li>
      <li><RouterLink to="/experience" @click="menuOpen = false">Expérience</RouterLink></li>
      <li><RouterLink to="/projects" @click="menuOpen = false">Projets</RouterLink></li>
    </ul>

    <div class="nav-actions">
      <button class="theme-toggle" @click="toggleTheme" :aria-label="theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'">
        <i v-if="theme === 'dark'" class="fa-solid fa-sun"></i>
        <i v-else class="fa-solid fa-moon"></i>
      </button>
      <button class="burger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 20px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.4s, backdrop-filter 0.4s, padding 0.4s;
}

nav.scrolled {
  background: var(--nav-scrolled-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 14px 48px;
  border-bottom: 1px solid var(--border);
}

.nav-logo {
  font-family: var(--ff-mono);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 36px;
  list-style: none;
}

.nav-links a {
  font-family: var(--ff-mono);
  font-size: 0.78rem;
  color: var(--muted);
  text-decoration: none;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.2s;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 1px;
  background: var(--accent);
  transition: width 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active { color: var(--text); }
.nav-links a:hover::after,
.nav-links a.router-link-active::after { width: 100%; }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-toggle {
  background: var(--surface);
  border: 1px solid var(--border-md);
  color: var(--muted);
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.2s, border-color 0.2s;
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: rgba(212, 200, 74, 0.3);
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.burger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--text);
  transition: transform 0.3s, opacity 0.3s;
}

@media (max-width: 768px) {
  nav { padding: 16px 24px; }
  nav.scrolled { padding: 12px 24px; }

  .burger { display: flex; }

  .nav-links {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 260px;
    background: var(--surface);
    border-left: 1px solid var(--border-md);
    flex-direction: column;
    gap: 0;
    padding: 80px 32px 40px;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 200;
  }

  .nav-links.is-open { transform: translateX(0); }

  .nav-links li { padding: 14px 0; border-bottom: 1px solid var(--border); }
  .nav-links a { font-size: 0.9rem; }
}
</style>