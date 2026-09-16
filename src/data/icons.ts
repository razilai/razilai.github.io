import { BookOpenText, ChartLine, Database, House, MapPinned, ScrollText } from '@lucide/astro';

// Icon names usable in project frontmatter (`icon:`). Add more from https://lucide.dev/icons
export const projectIcons = {
  'book-open-text': BookOpenText,
  house: House,
  'map-pinned': MapPinned,
  'scroll-text': ScrollText,
};

export type ProjectIconName = keyof typeof projectIcons;
export const projectIconNames = Object.keys(projectIcons) as [ProjectIconName, ...ProjectIconName[]];

// Tech-stack entries with no Simple Icons logo
export const fallbackTechIcons: Record<string, typeof ChartLine> = {
  chart: ChartLine,
  sql: Database,
};
