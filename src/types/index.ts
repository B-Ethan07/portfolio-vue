export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: "mobile" | "web fullstack" | "desktop/mobile" | "game" | "bot/script";
  badgeStage: string;
  description: string;
  longDescription: string;
  features: string[];
  tags: string[];
  images: string[];
  video?: string;
  links: ProjectLink[];
  year: string;
  color: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  icon: string;
  variant: "primary" | "ghost";
}

/** Clé du libellé dans `projectLinks` (fichiers de langue). */
export type ProjectLinkKey = "landing" | "repoPrivate" | "code";

export interface ProjectLinkBase {
  key: ProjectLinkKey;
  url: string;
  icon: string;
  variant: "primary" | "ghost";
}

/**
 * Partie NON traduisible d'un projet (stockée dans projects.ts).
 * Les textes (subtitle, description, features…) sont dans src/i18n/locales.
 * `useProjects()` recolle les deux pour donner un `Project` complet.
 */
export type ProjectBase = Omit<
  Project,
  | "subtitle"
  | "badgeStage"
  | "description"
  | "longDescription"
  | "features"
  | "year"
  | "links"
> & { links: ProjectLinkBase[] };

export interface TimelineItem {
  date: string;
  title: string;
  icon: string;
  stack?: string;
  description?: string;
  bullets?: string[];
}

export interface StackCard {
  title: string;
  desc: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  icon: string;
}
