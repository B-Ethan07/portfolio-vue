<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
</script>

<template>
    <main>
        <section class="page-section nf">
            <p class="nf-code">404</p>
            <h1 class="nf-title">{{ t('notFound.title') }}</h1>
            <p class="nf-text">{{ t('notFound.text') }}</p>
            <RouterLink to="/" class="btn-ghost">
                <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> {{ t('notFound.back') }}
            </RouterLink>
        </section>
    </main>
</template>

<style scoped>
.nf {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    text-align: center;
    padding: 0 24px;
}

.nf-code {
    font-family: var(--ff-mono);
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    color: var(--accent);
}

.nf-title {
    font-family: var(--ff-head);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--hero-name-color);
}

.nf-text {
    max-width: 44ch;
    margin-bottom: 12px;
    color: var(--muted);
}
</style>