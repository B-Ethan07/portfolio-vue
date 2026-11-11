import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { PROJECT_BASES, HERO_PROJECT_IDS } from "@/types/projects";
import type { Project } from "@/types";
import { useMessages } from "@/composables/useMessages";

// "bot-twitch" -> "botTwitch" (clé utilisée dans les fichiers de langue)
const camel = (s: string) =>
  s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

// type du projet -> clé de traduction dans `projectTypes`
const TYPE_KEYS: Record<Project["type"], string> = {
  mobile: "mobile",
  "web fullstack": "fullstack",
  "desktop/mobile": "desktop",
  game: "game",
  "bot/script": "bot",
};

/** Projets traduits dans la langue active (même forme que l'ancien `PROJECTS`). */
export function useProjects() {
  const { t } = useI18n();
  const { raw, str, strs } = useMessages();

  const projects = computed<Project[]>(() =>
    PROJECT_BASES.map(({ links, ...base }) => {
      const m = raw(`projects.${camel(base.id)}`);
      return {
        ...base,
        subtitle: str(m.subtitle),
        badgeStage: str(m.badgeStage),
        description: str(m.description),
        longDescription: str(m.longDescription),
        features: strs(m.features),
        year: str(m.year),
        links: links.map(({ key, ...link }) => ({
          ...link,
          label: t(`projectLinks.${key}`),
        })),
      };
    }),
  );

  const heroProjects = computed(() =>
    projects.value.filter((p) => HERO_PROJECT_IDS.includes(p.id)),
  );
  const getProject = (idOrSlug: string) =>
    projects.value.find((p) => p.id === idOrSlug || p.slug === idOrSlug);

  const typeKey = (p: Project) => TYPE_KEYS[p.type] ?? p.type;
  const typeLabel = (p: Project) => t(`projectTypes.${typeKey(p)}`);

  return { projects, heroProjects, getProject, typeKey, typeLabel };
}
