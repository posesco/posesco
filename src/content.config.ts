import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    date: z.string(),
    draft: z.boolean().default(false),
    tags: z.string(),
    read_time: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog };
