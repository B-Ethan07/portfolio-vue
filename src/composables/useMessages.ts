import { useI18n } from "vue-i18n";

/**
 * Aide pour lire des listes / objets dans les fichiers de langue.
 * `t()` ne sait lire que des chaînes : pour un tableau ou un objet il faut
 * `tm()` (récupère la structure) puis `rt()` (résout chaque texte).
 *
 *   const { raw, str, strs } = useMessages()
 *   const m = raw('hero.skills')          // structure brute
 *   str(m.title)                          // un texte
 *   strs(m.items)                         // une liste de textes
 *
 * À appeler dans un `computed` : `raw()` lit la langue active, donc le
 * résultat se met à jour tout seul quand on change de langue.
 */
export function useMessages() {
  const { tm, rt, locale } = useI18n();

  const raw = (key: string): any => {
    void locale.value; // dépendance réactive
    return tm(key);
  };
  const str = (message: unknown): string => rt(message as never);
  const strs = (messages: unknown): string[] =>
    (messages as unknown[]).map((m) => rt(m as never));

  return { raw, str, strs };
}
