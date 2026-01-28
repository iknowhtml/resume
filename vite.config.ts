import { defineConfig, type Plugin } from 'vite';

const htmlMetaPlugin = (data: Record<string, string>): Plugin => ({
  name: 'html-meta',
  transformIndexHtml: {
    order: 'pre',
    handler(html: string) {
      return html.replace(/<%=\s*(\w+)\s*%>/gi, (_, key) => data[key] ?? '');
    },
  },
});

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 8080,
    open: true,
  },
  plugins: [
    htmlMetaPlugin({
      NAME: 'Aki Gao',
      TITLE: 'Aki Gao - Resume',
      DESCRIPTION:
        'Staff Software Engineer with 10+ years of experience building user-facing products, developer tooling, and institutional-grade digital asset custody platforms.',
      KEYWORDS:
        'Aki Gao, Staff Software Engineer, Software Engineer, Full Stack Developer, Blockchain, Web3, React, TypeScript, Ava Labs, Digital Asset Custody',
      URL: 'https://21ciaga.com/',
    }),
  ],
});
