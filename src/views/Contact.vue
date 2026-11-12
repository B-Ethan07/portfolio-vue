<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReveal } from '../composables/useReveal'

useReveal()

const { t } = useI18n()

const EMAIL = 'ethan.boulard.dev+portfolio@gmail.com'

// Recalculé à chaque changement de langue
const mailtoHref = computed(
  () =>
    `mailto:${EMAIL}?subject=${encodeURIComponent(t('contact.emailSubject'))}&body=${encodeURIComponent(t('contact.emailBody'))}`,
)

const links = computed(() => [
  {
    name: 'LinkedIn',
    handle: 'Ethan Boulard',
    href: 'https://www.linkedin.com/in/ethan-boulard-4b1112364/',
    icon: 'fa-brands fa-linkedin-in',
    external: true,
  },
  {
    name: 'GitHub',
    handle: 'B-Ethan07',
    href: 'https://github.com/B-Ethan07',
    icon: 'fa-brands fa-github',
    external: true,
  },
  {
    name: 'Email',
    handle: EMAIL,
    href: mailtoHref.value,
    icon: 'fa-regular fa-envelope',
    external: false,
  },
])
</script>

<template>
  <main>
    <section id="contact" class="page-section contact-page">
      <div class="contact-wrap">
        <div class="reveal">
          <h1 class="contact-title">{{ t('contact.title') }}</h1>
          <p class="contact-sub">{{ t('contact.sub') }}</p>

          <ul class="links">
            <li v-for="l in links" :key="l.name">
              <a :href="l.href" class="link" :target="l.external ? '_blank' : undefined"
                :rel="l.external ? 'noopener noreferrer' : undefined">
                <span class="link-icon"><i :class="l.icon" aria-hidden="true"></i></span>
                <span class="link-name">{{ l.name }}</span>
                <span class="link-handle">{{ l.handle }}</span>
                <i :class="l.external ? 'fa-solid fa-arrow-up-right-from-square' : 'fa-solid fa-arrow-right'"
                  class="link-arrow" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: var(--bg);
}

.contact-wrap {
  max-width: 1000px;
  margin: 0 auto;
  padding: 110px 48px 100px;
}

.contact-title {
  margin-bottom: 12px;
  font-family: var(--ff-head);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--hero-name-color);
}

.contact-sub {
  margin-bottom: 48px;
  font-size: 1rem;
  color: var(--muted);
}

.links {
  max-width: 560px;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Une ligne par lien, séparée par un simple filet */
.link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 0;
  text-decoration: none;
  color: var(--text);
  border-top: 1px solid var(--border-md);
}

.links li:last-child .link {
  border-bottom: 1px solid var(--border-md);
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  font-size: 0.95rem;
  color: var(--accent);
  background: var(--accent-subtle);
  border-radius: 8px;
}

.link-name {
  font-size: 1rem;
  font-weight: 600;
}

.link-handle {
  font-family: var(--ff-mono);
  font-size: 0.8rem;
  color: var(--muted);
}

.link-arrow {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--muted);
  transition: color 0.2s;
}

.link:hover .link-arrow,
.link:focus-visible .link-arrow {
  color: var(--accent);
}

.link:hover .link-name,
.link:focus-visible .link-name {
  color: var(--accent);
}

@media (max-width: 760px) {
  .contact-wrap {
    padding: 96px 24px 80px;
  }
}
</style>