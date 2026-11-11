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
