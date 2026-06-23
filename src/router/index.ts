import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import ExperienceView from "../views/Experience.vue";
import ProjectsView from "../views/Projects.vue";
import ProjectDetailView from "@/components/ProjectDetailView.vue";
import ContactView from "../views/Contact.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/experience",
      name: "experience",
      component: ExperienceView,
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsView,
    },
    {
      path: "/projects/:id",
      name: "project-detail",
      component: ProjectDetailView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
