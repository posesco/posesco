import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://jesusposada.website';
const localizedHomepages = [`${site}/en/`, `${site}/es/`];

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (page) => !['/', '/about/', '/contact/', '/experience/', '/skills/', '/404.html'].some((path) => page === new URL(path, site).href),
    serialize(item) {
      if (localizedHomepages.includes(item.url)) {
        item.links = [
          { lang: 'en', url: localizedHomepages[0] },
          { lang: 'es', url: localizedHomepages[1] },
          { lang: 'x-default', url: localizedHomepages[0] },
        ];
      }
      return item;
    },
  })],
});
