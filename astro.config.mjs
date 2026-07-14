import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jesusposada.website',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (page) => !['/', '/about/', '/contact/', '/experience/', '/skills/', '/404.html'].some((path) => page === new URL(path, 'https://jesusposada.website').href),
  })],
});
