import { watch } from "vue";
import { createI18n } from "vue-i18n";
import fr from "./locales/fr/common.json";
import en from "./locales/en/common.json";

export const SUPPORTED_LOCALES = ["fr", "en"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

const STORAGE_KEY = "locale";

function detectLocale(): AppLocale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export const i18n = createI18n({
  legacy: false, // Composition API
  locale: detectLocale(),
  fallbackLocale: "fr",
  messages: { fr, en },
});

function apply(locale: string) {
  document.documentElement.lang = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {}
}
apply(i18n.global.locale.value);
watch(i18n.global.locale, apply);
