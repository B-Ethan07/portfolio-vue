<template>
  <footer>
    <p class="footer-copy">© 2026 Ethan Boulard · Tous droits réservés</p>

    <p class="footer-built">
      Fait avec
      <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue 3</a>
      · hébergé sur
      <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--border);
  padding: 28px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.footer-copy,
.footer-built {
  margin: 0;
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  color: var(--muted);
  letter-spacing: 0.05em;
}

.footer-built a {
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid var(--border-md);
  transition: color 0.2s, border-color 0.2s;
}

.footer-built a:hover,
.footer-built a:focus-visible {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

@media (max-width: 1024px) {
  footer {
    padding: 24px;
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
