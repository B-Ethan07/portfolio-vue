<script setup>
import { useReveal } from '../composables/useReveal'
useReveal()

</script>

<template>
  <section id="contact">
    <div class="page-section contact-hero">
      <div class="section-wrap">
        <div class="contact-wrap reveal">
          <div>
            <div class="section-title-block">
              <p class="section-label">Contact</p>
            </div>
            <h3 class="contact-heading">
              Travaillons <em>ensemble</em>
            </h3>

            <p class="contact-sub">
              N'hésitez pas à me contacter, je suis ouvert aux opportunités et collaborations.
            </p>

            <div class="contact-links">
              <a href="https://github.com/B-Ethan07" class="contact-link" target="_blank">
                <span class="contact-link-left">
                  <span class="contact-link-icon">
                    <i class="fa-brands fa-github"></i>
                  </span>
                  GitHub · B-Ethan07
                </span>
                <span class="contact-link-arrow">
                  <i class="fa-solid fa-arrow-right"></i>
                </span>
              </a>

              <a href="https://www.linkedin.com/in/ethan-boulard-4b1112364/" class="contact-link" target="_blank">
                <span class="contact-link-left">
                  <span class="contact-link-icon">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </span>
                  LinkedIn · Ethan Boulard
                </span>
                <span class="contact-link-arrow">
                  <i class="fa-solid fa-arrow-right"></i>
                </span>
              </a>
            </div>
          </div>

          <div class="contact-right">
            <div class="contact-deco">
              <span>LET'S</span>
              <span class="accent-word">BUILD</span>
              <span>IT.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#contact {
  background: var(--bg);
}

/* ─────────────────────────── WRAP ─────────────────────────── */
.contact-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 72px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: var(--text);
}

.section-wrap {
  width: 100%;
  max-width: none;
  padding: 80px 48px;
}

/* ─────────────────────────── GLOW ─────────────────────────── */
.contact-wrap::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  top: -100px;
  right: -100px;
  pointer-events: none;
}

.contact-wrap::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent2-glow) 0%, transparent 70%);
  bottom: -80px;
  left: -60px;
  pointer-events: none;
}

/* ─────────────────────────── TEXT ─────────────────────────── */
.contact-heading {
  font-family: var(--ff-head);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
  /* ✅ FIX IMPORTANT */
  margin-bottom: 16px;
  line-height: 1.05;
}

.contact-heading em {
  color: var(--accent);
  font-style: normal;
}

.contact-sub {
  color: var(--muted);
  font-size: 0.95rem;
  margin-bottom: 36px;
}

/* ─────────────────────────── LINKS ─────────────────────────── */
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.contact-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  text-decoration: none;
  font-family: var(--ff-mono);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.25s ease;
}

.contact-link:hover {
  border-color: var(--accent);
  background: var(--accent-subtle);
  transform: translateX(6px);
}

/* ─────────────────────────── LEFT ICON ─────────────────────────── */
.contact-link-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.contact-link-icon {
  width: 36px;
  height: 36px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--text);
}

/* ─────────────────────────── ARROW ─────────────────────────── */
.contact-link-arrow {
  font-size: 0.8rem;
  color: var(--accent);
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.3s ease;
}

.contact-link:hover .contact-link-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ─────────────────────────── RIGHT SIDE ─────────────────────────── */
.contact-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.contact-deco {
  font-family: var(--ff-head);
  font-size: clamp(4rem, 8vw, 9rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px var(--border-md);
  user-select: none;
}

.contact-deco span {
  display: block;
}

.contact-deco .accent-word {
  -webkit-text-stroke-color: var(--accent-glow);
}

/* ─────────────────────────── RESPONSIVE ─────────────────────────── */
@media (max-width: 900px) {
  .section-wrap {
    padding: 60px 24px;
  }

  .contact-wrap {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 40px 28px;
    text-align: left;
  }

  .contact-right {
    align-items: flex-start;
    order: -1;
  }

  .contact-deco {
    font-size: clamp(2.5rem, 14vw, 4rem);
  }

  .contact-heading {
    font-size: clamp(1.6rem, 7vw, 2.2rem);
  }
}

@media (max-width: 480px) {
  .contact-wrap {
    padding: 28px 20px;
    border-radius: var(--radius-sm);
  }

  .contact-link {
    padding: 14px 16px;
    font-size: 0.85rem;
  }

  .contact-link-icon {
    width: 30px;
    height: 30px;
    font-size: 0.85rem;
  }

  .contact-sub {
    font-size: 0.88rem;
    margin-bottom: 28px;
  }
}
</style>