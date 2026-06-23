import { ref, watch, onMounted } from "vue";

type Theme = "dark" | "light";

const theme = ref<Theme>("dark");

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  };

  const setTheme = (t: Theme) => {
    theme.value = t;
  };

  watch(theme, (val) => {
    document.documentElement.setAttribute("data-theme", val);
    localStorage.setItem("theme", val);
  });

  onMounted(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    theme.value = saved ?? (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme.value);
  });

  return { theme, toggleTheme, setTheme };
}
