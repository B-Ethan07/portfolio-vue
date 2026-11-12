import type { ProjectBase } from "@/types";

const COLOR = "linear-gradient(135deg, #0d0914 0%, #1a1030 100%)";

export const PROJECT_BASES: ProjectBase[] = [
  {
    id: "bot-twitch",
    slug: "bot-twitch",
    title: "Bot Twitch",
    type: "bot/script",
    tags: ["Node.js", "Twitch/Youtube API", "SQLite"],
    images: [
      "/assets/img/twitchbot7.png",
      "/assets/img/twitchbot8.png",
      "/assets/img/twitchbot6.png",
    ],
    links: [],
    color: COLOR,
  },
  {
    id: "arcasolis-app",
    slug: "arcasolis-app",
    title: "ArcaSolis",
    type: "desktop/mobile",
    tags: ["Flutter", "Node.js", "Express", "MySQL"],
    images: [
      "/assets/img/arcasolis.png",
      "/assets/img/arcasolis-1.png",
      "/assets/img/arcasolis-5.png",
      "/assets/img/arcasolis-7.png",
    ],
    links: [],
    color: COLOR,
  },
  {
    id: "inside-runway-app",
    slug: "inside-runway-app",
    title: "INSIDE RUNWAY",
    type: "mobile",
    tags: ["Flutter", "FastAPI", "AWS S3", "Firebase"],
    images: [
      "/assets/img/inside-app.webp",
      "/assets/img/inside-app2.webp",
      "/assets/img/inside-app3.webp",
    ],
    video: "/assets/img/irapp.mp4",
    links: [],
    color: COLOR,
  },
  {
    id: "inside-runway-landing",
    slug: "inside-runway-landing",
    title: "INSIDE RUNWAY · Landing",
    type: "web fullstack",
    tags: ["Next.js", "TypeScript", "Tailwind", "FastAPI"],
    images: [
      "/assets/img/landing-runway1.webp",
      "/assets/img/landing-runway2.jpg",
      "/assets/img/landing-runway3.jpg",
    ],
    links: [
      {
        key: "landing",
        url: "https://new-landing-ir.vercel.app/",
        icon: "fa-solid fa-arrow-up-right-from-square",
        variant: "primary",
      },
    ],
    color: COLOR,
  },
  {
    id: "inside-runway-crm",
    slug: "inside-runway-crm",
    title: "INSIDE RUNWAY",
    type: "web fullstack",
    tags: ["React", "TypeScript", "FastAPI", "AWS S3", "Docker"],
    images: [
      "/assets/img/IR.webp",
      "/assets/img/IR2.webp",
      "/assets/img/IR3.webp",
      "/assets/img/IR4.webp",
    ],
    video: "/assets/img/irapp.mp4",
    links: [],
    color: COLOR,
  },
  {
    id: "zenquest",
    slug: "zenquest",
    title: "ZenQuest",
    type: "web fullstack",
    tags: ["React", "TypeScript", "Express.js", "API REST"],
    images: [
      "/assets/img/zenquest1.webp",
      "/assets/img/zenquest2.jpg",
      "/assets/img/zenquest3.jpg",
      "/assets/img/zenquest4.jpg",
    ],
    links: [
      {
        key: "repoPrivate",
        url: "https://github.com/B-Ethan07/zenquest",
        icon: "fa-brands fa-github",
        variant: "ghost",
      },
    ],
    color: "linear-gradient(135deg, #071014 0%, #0b2018 100%)",
  },
  {
    id: "itsmetime",
    slug: "itsmetime",
    title: "IT'S ME TIME",
    type: "mobile",
    tags: ["Flutter", "FastAPI", "Docker", "React"],
    images: [
      "/assets/img/itsmetime1.png",
      "/assets/img/itsmetime2.png",
      "/assets/img/itsmetime3.png",
    ],
    links: [],
    color: "linear-gradient(135deg, #0e0a14 0%, #1a1040 100%)",
  },
  {
    id: "cinezone",
    slug: "cinezone",
    title: "CineZone",
    type: "web fullstack",
    tags: ["Angular", "Express.js", "MySQL", "Bootstrap"],
    images: [
      "/assets/img/cinezone_1.jpg",
      "/assets/img/cinezone_2.png",
      "/assets/img/cinezone_3.png",
      "/assets/img/cinezone_4.png",
    ],
    links: [],
    color: "linear-gradient(135deg, #140a0a 0%, #1c0c20 100%)",
  },
  {
    id: "factuzen",
    slug: "factuzen",
    title: "FactuZen",
    type: "web fullstack",
    tags: ["Symfony", "PHP", "Twig", "MySQL"],
    images: [
      "/assets/img/factuzen1.png",
      "/assets/img/factuzen2.png",
      "/assets/img/factuzen3.png",
    ],
    links: [
      {
        key: "code",
        url: "https://github.com/B-Ethan07/factu_zen",
        icon: "fa-brands fa-github",
        variant: "primary",
      },
    ],
    color: "linear-gradient(135deg, #0a0e18 0%, #0d1a30 100%)",
  },
  {
    id: "educeasy",
    slug: "educeasy",
    title: "Educ'Easy",
    type: "web fullstack",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    images: [
      "/assets/img/projet2_1.png",
      "/assets/img/projet2_2.png",
      "/assets/img/projet2_3.png",
    ],
    links: [
      {
        key: "code",
        url: "https://github.com/B-Ethan07/educeasy",
        icon: "fa-brands fa-github",
        variant: "primary",
      },
    ],
    color: "linear-gradient(135deg, #0e0e12 0%, #1a1a20 100%)",
  },
];

export const HERO_PROJECT_IDS = [
  "bot-twitch",
  "inside-runway-landing",
  "arcasolis-app",
];
