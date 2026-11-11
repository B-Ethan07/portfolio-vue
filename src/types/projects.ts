import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "bot-twitch",
    slug: "bot-twitch",
    title: "Bot Twitch",
    subtitle: "Bot pour streamer Twitch",
    type: "bot/script",
    badgeStage: "Novembre 2026",
    description:
      "BotTwitch qui permet aux viewers de proposer des musiques dans le chat.",
    longDescription:
      "Bot Twitch développé en Node.js qui permet aux viewers de proposer des musiques dans le chat, avec gestion des commandes et interactions.",
    features: [
      "Gestion des commandes et des interactions",
      "Gestion des utilisateurs et des permissions",
      "Automatisation des musiques grâce à l'API Twitch et YouTube",
      "Overlay OBS pour afficher les musiques en cours",
      "Gestion des playlists et des musiques",
      "Database locale avec SQLite pour stocker les données",
    ],
    tags: ["Node.js", "Twitch/Youtube API", "SQLite"],
    images: [
      "/assets/img/twitchbot7.png",
      "/assets/img/twitchbot8.png",
      "/assets/img/twitchbot6.png",
    ],
    links: [],
    year: "Nov 2026",
    color: "linear-gradient(135deg, #0d0914 0%, #1a1030 100%)",
  },
  {
    id: "arcasolis-app",
    slug: "arcasolis-app",
    title: "ArcaSolis",
    subtitle: "App mobile & Desktop Flutter",
    type: "desktop/mobile",
    badgeStage: "Oct 2026",
    description: "Application Flutter pour tracker ses films et ses séries",
    longDescription:
      "Application Flutter B2B pour tracker ses films et ses séries, avec interface mobile et desktop, notifications push et synchronisation cloud.",
    features: [
      "Intégration de l'API TMDB pour importer les films et séries",
      "Ajout et suivi de films et séries",
      "Notifications push pour les sorties et rappels",
      "Synchronisation cloud et multi-plateforme",
      "Interface mobile et desktop responsive",
      "Exportation des données et statistiques d'utilisation",
    ],
    tags: ["Flutter", "Node.js", "Express", "MySQL"],
    images: [
      "/assets/img/arcasolis.png",
      "/assets/img/arcasolis-1.png",
      "/assets/img/arcasolis-5.png",
      "/assets/img/arcasolis-7.png",
    ],
    links: [],
    year: "Oct 2026",
    color: "linear-gradient(135deg, #0d0914 0%, #1a1030 100%)",
  },
  {
    id: "inside-runway-app",
    slug: "inside-runway-app",
    title: "INSIDE RUNWAY",
    subtitle: "App mobile Flutter B2B",
    type: "mobile",
    badgeStage: "B2B · 2026",
    description:
      "Application Flutter B2B pour styliste, gestion de projets, livraisons et communication entre stylistes et marques.",
    longDescription:
      "Application Flutter B2B reliant stylistes et marques pour faciliter la gestion de projets, livraisons et communications au quotidien.",
    features: [
      "Posts, collections et flux média",
      "Logique métier avancée : projet, livraison, agenda",
      "Notifications push, messagerie et authentification",
      "Stockage média cloud (AWS S3)",
      "Architecture scalable et navigation fluide",
    ],
    tags: ["Flutter", "FastAPI", "AWS S3", "Firebase"],
    images: [
      "/assets/img/inside-app.webp",
      "/assets/img/inside-app2.webp",
      "/assets/img/inside-app3.webp",
    ],
    video: "/assets/img/irapp.mp4",
    links: [],
    year: "Oct 2025 – Jan 2026",
    color: "linear-gradient(135deg, #0d0914 0%, #1a1030 100%)",
  },
  {
    id: "inside-runway-landing",
    slug: "inside-runway-landing",
    title: "INSIDE RUNWAY · Landing",
    subtitle: "Refonte landing page B2B",
    type: "web fullstack",
    badgeStage: "B2B · 2026",
    description:
      "Refonte complète de la landing page B2B. CRM reliant stylistes et marques fashion.",
    longDescription:
      "Refonte complète de la landing page du CRM INSIDE RUNWAY. Conception UI/UX, intégration et déploiement sur Vercel.",
    features: [
      "Design UI/UX from scratch",
      "Animations et micro-interactions",
      "Intégration avec le backend FastAPI",
      "Déploiement Vercel + optimisation SEO",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind", "FastAPI"],
    images: [
      "/assets/img/landing-runway1.webp",
      "/assets/img/landing-runway2.jpg",
      "/assets/img/landing-runway3.jpg",
    ],
    links: [
      {
        label: "Voir la landing",
        url: "https://new-landing-ir.vercel.app/",
        icon: "fa-solid fa-arrow-up-right-from-square",
        variant: "primary",
      },
    ],
    year: "Fev 2026 – Avr 2026",
    color: "linear-gradient(135deg, #0d0914 0%, #1a1030 100%)",
  },
  {
    id: "inside-runway-crm",
    slug: "inside-runway-crm",
    title: "INSIDE RUNWAY",
    subtitle: "CRM React B2B",
    type: "web fullstack",
    badgeStage: "B2B · 2026",
    description:
      "CRM React/FastAPI B2B pour styliste, gestion de projets, livraisons et communication entre stylistes et marques.",
    longDescription:
      "CRM React/FastAPI B2B reliant stylistes et marques pour faciliter la gestion de projets, livraisons et communications au quotidien.",
    features: [
      "Posts, collections et flux média",
      "Logique métier avancée : projet, livraison, agenda",
      "Notifications push, messagerie et authentification",
      "Stockage média cloud (AWS S3)",
      "Architecture scalable et navigation fluide",
    ],
    tags: ["React", "TypeScript", "FastAPI", "AWS S3", "Docker"],
    images: [
      "/assets/img/IR.webp",
      "/assets/img/IR2.webp",
      "/assets/img/IR3.webp",
      "/assets/img/IR4.webp",
    ],
    video: "/assets/img/irapp.mp4",
    links: [],
    year: "Fev 2026 – Avr 2026",
    color: "linear-gradient(135deg, #0d0914 0%, #1a1030 100%)",
  },
  {
    id: "zenquest",
    slug: "zenquest",
    title: "ZenQuest",
    subtitle: "Site web de suivi quotidien",
    type: "web fullstack",
    badgeStage: "React/TS · Express.js",
    description:
      "SPA de suivi quotidien sport, alimentation, sommeil et humeur, avec espace utilisateur et interface d'administration dédiés.",
    longDescription:
      "Application React TypeScript de suivi bien-être avec dashboard utilisateur, historique, et interface admin complète.",
    features: [
      "Front user et admin en React + TypeScript",
      "API REST Express.js pour la gestion des données",
      "Tableaux de bord et historique des entrées quotidiennes",
      "Authentification et gestion des rôles",
    ],
    tags: ["React", "TypeScript", "Express.js", "API REST"],
    images: [
      "/assets/img/zenquest1.webp",
      "/assets/img/zenquest2.jpg",
      "/assets/img/zenquest3.jpg",
      "/assets/img/zenquest4.jpg",
    ],
    links: [
      {
        label: "Repo (privé)",
        url: "https://github.com/B-Ethan07/zenquest",
        icon: "fa-brands fa-github",
        variant: "ghost",
      },
    ],
    year: "Oct 2025",
    color: "linear-gradient(135deg, #071014 0%, #0b2018 100%)",
  },
  {
    id: "itsmetime",
    slug: "itsmetime",
    title: "IT'S ME TIME",
    subtitle: "App de coloriage Flutter",
    type: "mobile",
    badgeStage: "Stage · 2026",
    description:
      "Application de coloriage Flutter, refonte visuelle complète et nouvelles fonctionnalités de dessin.",
    longDescription:
      "Stage de développement mobile Flutter sur une application de coloriage existante. Refonte UI complète, nouvelles fonctionnalités et back-office analytics.",
    features: [
      "Refonte visuelle complète de l'UI",
      "Dessin libre (pinceau) et gomme",
      "Analytics et back-office de suivi",
      "Intégration API REST asynchrone",
    ],
    tags: ["Flutter", "FastAPI", "Docker", "React"],
    images: [
      "/assets/img/itsmetime1.png",
      "/assets/img/itsmetime2.png",
      "/assets/img/itsmetime3.png",
    ],
    links: [],
    year: "Nov 2025 – Jan 2026",
    color: "linear-gradient(135deg, #0e0a14 0%, #1a1040 100%)",
  },
  {
    id: "cinezone",
    slug: "cinezone",
    title: "CineZone",
    subtitle: "Plateforme fullstack de films",
    type: "web fullstack",
    badgeStage: "Projet fullstack",
    description:
      "Plateforme fullstack de gestion et notation de films avec authentification et interface responsive.",
    longDescription:
      "Projet fullstack Angular + Express.js avec système d'authentification, catalogue dynamique de films et interface d'administration.",
    features: [
      "Catalogue avec filtres dynamiques",
      "Système de notation et avis",
      "CRUD complet côté admin",
      "Authentification JWT",
    ],
    tags: ["Angular", "Express.js", "MySQL", "Bootstrap"],
    images: [
      "/assets/img/cinezone_1.jpg",
      "/assets/img/cinezone_2.png",
      "/assets/img/cinezone_3.png",
      "/assets/img/cinezone_4.png",
    ],
    links: [],
    year: "Aout 2025",
    color: "linear-gradient(135deg, #140a0a 0%, #1c0c20 100%)",
  },
  {
    id: "factuzen",
    slug: "factuzen",
    title: "FactuZen",
    subtitle: "App de gestion de facturation",
    type: "web fullstack",
    badgeStage: "Projet Symfony",
    description:
      "Application Symfony de gestion de facturation avec architecture MVC robuste et interface claire.",
    longDescription:
      "Projet Symfony MVC complet avec gestion des clients, création de factures, et affichage des lignes de facturation.",
    features: [
      "Gestion complète des clients (CRUD)",
      "Création et édition de factures",
      "Affichage des lignes de facturation",
      "Architecture MVC Symfony",
    ],
    tags: ["Symfony", "PHP", "Twig", "MySQL"],
    images: [
      "/assets/img/factuzen1.png",
      "/assets/img/factuzen2.png",
      "/assets/img/factuzen3.png",
    ],
    links: [
      {
        label: "Voir le code",
        url: "https://github.com/B-Ethan07/factu_zen",
        icon: "fa-brands fa-github",
        variant: "primary",
      },
    ],
    year: "Juil 2025",
    color: "linear-gradient(135deg, #0a0e18 0%, #0d1a30 100%)",
  },
  {
    id: "educeasy",
    slug: "educeasy",
    title: "Educ'Easy",
    subtitle: "Blog pour parents",
    type: "web fullstack",
    badgeStage: "Blog web",
    description:
      "Blog pour parents avec articles, conseils et activités pour enfants et système de publication.",
    longDescription:
      "Blog PHP full-stack avec système d'articles, inscription, profil utilisateur, et newsletter intégrée.",
    features: [
      "Articles avec recherche et filtres",
      "Inscription, connexion et profil",
      "Newsletter avec popup intégré",
      "Système de publication d'articles",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    images: [
      "/assets/img/projet2_1.png",
      "/assets/img/projet2_2.png",
      "/assets/img/projet2_3.png",
    ],
    links: [
      {
        label: "Voir le code",
        url: "https://github.com/B-Ethan07/educeasy",
        icon: "fa-brands fa-github",
        variant: "primary",
      },
    ],
    year: "Juin 2025",
    color: "linear-gradient(135deg, #0e0e12 0%, #1a1a20 100%)",
  },
];

export const HERO_PROJECTS = PROJECTS.filter((p) =>
  ["bot-twitch", "inside-runway-landing", "arcasolis-app"].includes(p.id),
);
