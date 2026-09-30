// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.ohstone.me',
	integrations: [mdx()],
	vite: {
		server: { cors: { origin: [/^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/, 'https://giscus.app'] } },
		preview: { cors: { origin: [/^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/, 'https://giscus.app'] } },
	},
});
