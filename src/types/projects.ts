import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "inside-runway-app",
    slug: "inside-runway-app",
    title: "INSIDE RUNWAY",
    subtitle: "App mobile Flutter B2B",
    type: "mobile",
    badge: "App mobile",
    badgeStage: "B2B · 2026",
    icon: "fa-solid fa-shirt",
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
      "@/assets/img/irapp1.png",
      "@/assets/img/irapp2.png",
      "@/assets/img/irapp3.png",
      "@/assets/img/irapp4.png",
    ],
    video: "@/assets/img/irapp.mp4",
    links: [],
    year: "Fev 2026 – Avr 2026",
    color: "linear-gradient(135deg, #0d0914 0%, #1a1030 100%)",
  },
  {
    id: "inside-runway-landing",
    slug: "inside-runway-landing",
    title: "INSIDE RUNWAY · Landing",
    subtitle: "Refonte landing page B2B",
    type: "web",
    badge: "Site web",
    badgeStage: "B2B · 2026",
    icon: "fa-solid fa-globe",
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
    images: ["@/assets/img/landing-runway1.webp"],
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
    id: "zenquest",
    slug: "zenquest",
    title: "ZenQuest",
    subtitle: "SPA suivi quotidien",
    type: "web",
    badge: "Site web",
    badgeStage: "React/TS · Express.js",
    icon: "fa-solid fa-heart-pulse",
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
      "@/assets/img/zenquest1.webp",
      "@/assets/img/zenquest2.jpg",
      "@/assets/img/zenquest3.jpg",
      "@/assets/img/zenquest4.jpg",
    ],
    links: [
      {
        label: "Voir le site",
        url: "https://app-zenquest.vercel.app",
        icon: "fa-solid fa-arrow-up-right-from-square",
        variant: "primary",
      },
      {
        label: "Repo (privé)",
        url: "https://github.com/B-Ethan07/zenquest",
        icon: "fa-brands fa-github",
        variant: "ghost",
      },
    ],
    year: "2025",
    color: "linear-gradient(135deg, #071014 0%, #0b2018 100%)",
  },
  {
    id: "itsmetime",
    slug: "itsmetime",
    title: "IT'S ME TIME",
    subtitle: "App de coloriage Flutter",
    type: "mobile",
    badge: "App mobile",
    badgeStage: "Stage · 2026",
    icon: "fa-solid fa-palette",
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
      "@/assets/img/itsmetime4.jpg",
      "@/assets/img/itsmetime1.jpg",
      "@/assets/img/itsmetime2.jpg",
      "@/assets/img/itsmetime3.jpg",
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
    type: "fullstack",
    badge: "Site web",
    badgeStage: "Projet fullstack",
    icon: "fa-solid fa-film",
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
      "@/assets/img/cinezone_1.jpg",
      "@/assets/img/cinezone_2.png",
      "@/assets/img/cinezone_3.png",
      "@/assets/img/cinezone_4.png",
    ],
    links: [
      {
        label: "Frontend",
        url: "https://github.com/B-Ethan07/cinezone_front_angular",
        icon: "fa-brands fa-github",
        variant: "primary",
      },
      {
        label: "Backend",
        url: "https://github.com/B-Ethan07/cinezone_back_express",
        icon: "fa-brands fa-github",
        variant: "ghost",
      },
    ],
    year: "2024",
    color: "linear-gradient(135deg, #140a0a 0%, #1c0c20 100%)",
  },
  {
    id: "factuzen",
    slug: "factuzen",
    title: "FactuZen",
    subtitle: "App de gestion de facturation",
    type: "web",
    badge: "Site web",
    badgeStage: "Projet Symfony",
    icon: "fa-solid fa-file-invoice",
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
      "@/assets/img/factuzen1.png",
      "@/assets/img/factuzen2.png",
      "@/assets/img/factuzen3.png",
    ],
    links: [
      {
        label: "Voir le code",
        url: "https://github.com/B-Ethan07/factu_zen",
        icon: "fa-brands fa-github",
        variant: "primary",
      },
    ],
    year: "2024",
    color: "linear-gradient(135deg, #0a0e18 0%, #0d1a30 100%)",
  },
  {
    id: "educeasy",
    slug: "educeasy",
    title: "Educ'Easy",
    subtitle: "Blog pour parents",
    type: "web",
    badge: "Site web",
    badgeStage: "Blog web",
    icon: "fa-solid fa-newspaper",
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
      "@/assets/img/projet2_1.png",
      "@/assets/img/projet2_2.png",
      "@/assets/img/projet2_3.png",
    ],
    links: [
      {
        label: "Voir le code",
        url: "https://github.com/B-Ethan07/educeasy",
        icon: "fa-brands fa-github",
        variant: "primary",
      },
    ],
    year: "2024",
    color: "linear-gradient(135deg, #0e0e12 0%, #1a1a20 100%)",
  },
];

export const HERO_PROJECTS = PROJECTS.filter((p) =>
  ["inside-runway-landing", "zenquest", "cinezone"].includes(p.id),
);
