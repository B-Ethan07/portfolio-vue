import type { TimelineItem, StackCard } from "@/types";

export const TIMELINE: TimelineItem[] = [
  {
    date: "Octobre 2026",
    title: "Diplome de Développeur Web et Web Mobile",
    icon: "fa-solid fa-graduation-cap",
    stack:
      "Développement Web, Développement Mobile, Front-End, Back-End, Bases de Données, API REST, UI/UX, Responsive Design, Accessibilité, Performance Web, CI/CD, Git, Agile, Scrum, Déploiement, Cloud, Sécurité, Tests, Optimisation, SEO",
    description:
      "Diplome obtenu après une formation intensive de 6 mois en développement web et web mobile.",
    bullets: [
      "Maîtrise des technologies front-end et back-end.",
      "Réalisation de projets concrets et collaboratifs.",
      "Acquisition de compétences en gestion de projet et travail en équipe.",
      "Développement de compétences en communication et en résolution de problèmes.",
      "Modélisation de Base de Données et création d'API REST.",
    ],
  },
  {
    date: "Aout 2026",
    title: "Certification Cisco - Cybersecurity",
    icon: "fa-solid fa-certificate",
    stack: "Cybersecurity, Network Security, Penetration Testing",
    bullets: [
      "Formation complète sur les aspects de la cybersécurité.",
      "Apprentissage des techniques de sécurité réseau.",
      "Pratique des tests d'intrusion et d'analyse des vulnérabilités.",
    ],
  },
  {
    date: "Fev 2026 – Avr 2026",
    title: "Developpeur Full-Stack · INSIDE RUNWAY",
    icon: "fa-solid fa-briefcase",
    stack: "Flutter, React, FastApi, NextJs",
    bullets: [
      "App mobile Flutter : développement de A à Z d'une application mobile multiplateforme (architecture, navigation, gestion d'état, fonctionnalités, AWS S3).",
      "Travail en autonomie sur l'ensemble du front-end mobile.",
      "Landing page NextJs : réalisation du design et UI/UX.",
      "CRM React : contribution au développement du CRM React et traduction FR/EN.",
    ],
  },
  {
    date: "Nov 2025 – Jan 2026",
    title: "Developpeur Mobile, Front-end · IT'S ME TIME",
    icon: "fa-solid fa-mobile-screen",
    stack: "Flutter, React",
    bullets: [
      "Développement et intégration de nouvelles fonctionnalités en Flutter.",
      "Conception et implémentation d'un module de dessin libre.",
      "Amélioration de l'UI/UX : optimisation des écrans, ergonomie et fluidité.",
      "Intégration d'API REST et gestion des appels asynchrones.",
      "Collaboration étroite avec le développeur backend.",
    ],
  },
  {
    date: "Avril 2025 — Novembre 2025",
    title: "Développeur d'Application Mobile · M2i Formation Lyon",
    icon: "fa-solid fa-graduation-cap",
    stack:
      "HTML, CSS, JavaScript, React, Node.js, Express, PHP, Angular, MySQL, Git, MongoDB, SGDB, RGPD, RGAA, SEO, UI/UX, Responsive Design, Accessibilité, Performance Web",
    description:
      "Formation professionnalisante orientée mobile et application.",
  },
  {
    date: "Début 2024 — Aujourd'hui",
    title: "Autodidacte",
    icon: "fa-solid fa-book-open",
    stack: "Flutter, Angular, React",
    description: "Apprentissage continu en autodidacte depuis début 2024.",
  },
];

export const STACK_CARDS: StackCard[] = [
  {
    title: "Mobile",
    desc: "Apps multiplateformes et natives.",
    skills: [
      { name: "Flutter", icon: "devicon-flutter-plain colored" },
      { name: "Kotlin", icon: "devicon-kotlin-plain colored" },
    ],
  },
  {
    title: "Front-End",
    desc: "Interfaces modernes et performantes.",
    skills: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Angular", icon: "devicon-angularjs-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "Tailwind", icon: "devicon-tailwindcss-plain colored" },
    ],
  },
  {
    title: "Back-End",
    desc: "APIs robustes et scalables.",
    skills: [
      { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
      { name: "Express.js", icon: "devicon-express-original colored" },
      { name: "PHP", icon: "devicon-php-plain colored" },
      { name: "Symfony", icon: "devicon-symfony-original colored" },
    ],
  },
  {
    title: "Data & Outils",
    desc: "Du stockage au delivery.",
    skills: [
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "SQL", icon: "devicon-mysql-plain colored" },
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "Git", icon: "devicon-git-plain colored" },
    ],
  },
];
