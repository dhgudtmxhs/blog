import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({
		base: './src/content/posts',
		pattern: '**/*.{md,mdx}',
	}),
	schema: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		publishedAt: z.coerce.date(),
		tags: z.array(z.string().min(1)).default([]),
		draft: z.boolean().default(false),
	}),
});

export const collections = { posts };
