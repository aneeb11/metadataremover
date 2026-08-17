// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Required for sitemap generation — must match production domain
  site: 'https://metadataremover.tech',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      // Exclude error pages from sitemap
      filter: (page) => !page.includes('/404') && !page.includes('/500'),

      // Custom change frequency and priority per URL group
      customPages: [],
      serialize(item) {
        // Homepage — highest priority, crawled daily
        if (item.url === 'https://metadataremover.tech/') {
          return { ...item, changefreq: 'daily', priority: 1.0, lastmod: new Date() };
        }
        // FAQ & Features — high SEO value, weekly updates
        if (item.url.includes('/faq') || item.url.includes('/features')) {
          return { ...item, changefreq: 'weekly', priority: 0.9, lastmod: new Date() };
        }
        // How It Works & Comparison — informational, weekly
        if (item.url.includes('/how-it-works') || item.url.includes('/comparison')) {
          return { ...item, changefreq: 'weekly', priority: 0.8, lastmod: new Date() };
        }
        // Contact — monthly
        if (item.url.includes('/contact')) {
          return { ...item, changefreq: 'monthly', priority: 0.6, lastmod: new Date() };
        }
        // Legal pages — rarely change
        if (item.url.includes('/privacy') || item.url.includes('/terms')) {
          return { ...item, changefreq: 'yearly', priority: 0.3, lastmod: new Date() };
        }
        return { ...item, changefreq: 'monthly', priority: 0.5 };
      },
    })
  ]
});