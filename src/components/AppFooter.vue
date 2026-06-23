<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer>
    <p class="footer-copy">© 2026 Ethan Boulard · Tous droits réservés</p>
    <RouterLink to="/" class="footer-back">
      <i class="fa-solid fa-arrow-up"></i> Retour en haut
    </RouterLink>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--border);
  padding: 28px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-copy {
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  color: var(--muted);
  letter-spacing: 0.05em;
}

.footer-back {
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  color: var(--muted);
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.footer-back:hover { color: var(--accent); }

@media (max-width: 1024px) {
  footer { padding: 24px; flex-direction: column; gap: 12px; text-align: center; }
}
</style>