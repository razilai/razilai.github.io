import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { projectIconNames } from './data/icons';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      kind: z.string(),
      icon: z.enum(projectIconNames),
      order: z.number(),
      repo: z.url(),
      stack: z.array(z.string()),
      highlights: z.array(z.string()),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Home-page card image; falls back to `cover`
      thumbnail: image().optional(),
      thumbnailAlt: z.string().optional(),
    }),
});

export const collections = { projects };
