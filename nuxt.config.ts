// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2026-07-15',

  pages: true,

  // 1. Site Authority (brandsta.cc Custom Code Flagship)
  site: {
    url: 'https://brandsta.cc',
    name: 'Brandsta — Custom Code',
    indexable: true,
    env: 'production',
  },

  // 2. Tailwind CSS v4 via Vite + Lenis Pre-Bundling
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: ['lenis'],
    },
  },

  // 3. Core, SEO & Vercel Telemetry Modules
  modules: [
    '@nuxt/fonts',
    'nuxt-site-config',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@vercel/speed-insights/nuxt',
    '@vercel/analytics/nuxt',
  ],

  // 4. Static Zero-Runtime Sitemap (Single Flagship Route)
  sitemap: {
    zeroRuntime: true,
    urls: [
      {
        loc: '/',
        changefreq: 'weekly',
        priority: 1.0,
      },
    ],
  },

  // 5. Open Crawler & AI Discovery Rules
  robots: {
    blockNonSeoBots: false,
    blockAiBots: false,
    allow: ['/'],
    disallow: [],
    sitemap: ['https://brandsta.cc/sitemap.xml'],
  },

  // 6. Self-Hosted WOFF2 Typography (Strictly Active Weights Only: 400, 500, 600, 700)
  fonts: {
    defaults: {
      subsets: ['latin'],
      formats: ['woff2'],
    },
    families: [
      {
        name: 'Inter',
        provider: 'google',
        styles: ['normal'],
        weights: [400, 500, 600, 700],
        formats: ['woff2'],
        global: true,
        preload: true,
      },
    ],
  },

  // 7. Static Prerender & Edge Header Rules
  routeRules: {
    '/robots.txt': { prerender: true },
    '/sitemap.xml': { prerender: true },
    '/llms.txt': {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=3600, s-maxage=3600',
      },
    },
    '/': { prerender: true },
  },

  // 8. Nitro Compression & Prerender Pipeline
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: [
        '/robots.txt',
        '/sitemap.xml',
        '/',
      ],
    },
  },

  // 9. Payload Extraction
  experimental: {
    payloadExtraction: true,
  },

  // 10. Master Stylesheet
  css: ['~/assets/css/main.css'],

  // 11. Inline Critical CSS for Zero Render-Blocking
  features: {
    inlineStyles: true,
  },

  // 12. Runtime Config
  runtimeConfig: {
    resendApiKey: '',
    public: {
      siteUrl: 'https://brandsta.cc',
    },
  },

  // 13. Global Head & Bifurcated Adaptive Icon Matrix (#040a1a Unified)
  app: {
    baseURL: '/',
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Brandsta | Custom Code — Built around you.',

      htmlAttrs: {
        lang: 'en',
      },

      meta: [
        {
          name: 'description',
          content:
            'Purpose-built custom web applications, e-commerce engines, media studios, and cloud workflow systems by Brandsta—engineered around how your business actually works.',
        },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        { name: 'author', content: 'Brandsta — https://brandsta.in' },
        { name: 'application-name', content: 'Brandsta CC' },

        // Official Brandsta Home Base Coordinates (Koduvayur, Palakkad, Kerala)
        { name: 'geo.region', content: 'IN-KL' },
        { name: 'geo.placename', content: 'Koduvayur, Palakkad, Kerala' },
        { name: 'geo.position', content: '10.684769;76.650758' },
        { name: 'ICBM', content: '10.684769, 76.650758' },

        // Unified Deep Midnight Sapphire Theme (#040a1a)
        { name: 'msapplication-TileColor', content: '#040a1a' },
        { name: 'msapplication-TileImage', content: '/images/favicons/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#040a1a' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },

        // Mobile & PWA Capabilities
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Brandsta CC' },

        // Open Graph (1200x630 JPG)
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_IN' },
        { property: 'og:site_name', content: 'Brandsta' },
        { property: 'og:title', content: 'Brandsta | Custom Code — Built around you.' },
        {
          property: 'og:description',
          content:
            'Purpose-built custom web applications, e-commerce engines, media studios, and cloud workflow systems by Brandsta—engineered around how your business actually works.',
        },
        { property: 'og:image', content: 'https://brandsta.cc/images/og/custom-code.jpg' },
        { property: 'og:image:secure_url', content: 'https://brandsta.cc/images/og/custom-code.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:alt', content: 'Brandsta — Custom Code. Built around you.' },

        // Twitter / X Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Brandsta | Custom Code — Built around you.' },
        {
          name: 'twitter:description',
          content:
            'Purpose-built custom web applications, e-commerce engines, media studios, and cloud workflow systems by Brandsta—engineered around how your business actually works.',
        },
        { name: 'twitter:image', content: 'https://brandsta.cc/images/og/custom-code.jpg' },
        { name: 'twitter:image:alt', content: 'Brandsta — Custom Code. Built around you.' },
      ],

      link: [
        // 1. Live Adaptive Light/Dark Vector Tab Icon (Scoped to 16/32 so Googlebot >=48px picks Opaque PNGs)
        { rel: 'icon', type: 'image/svg+xml', sizes: '16x16 32x32', href: '/favicon.svg' },

        // 2. Transparent Adaptive Tab PNG Fallbacks (Light Mode vs Dark Mode)
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/images/favicons/favicon-light-32x32.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/images/favicons/favicon-light-16x16.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/images/favicons/favicon-32x32.png',
          media: '(prefers-color-scheme: dark)',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/images/favicons/favicon-16x16.png',
          media: '(prefers-color-scheme: dark)',
        },

        // 3. Legacy Transparent Tab .ico (Strictly 16x16 & 32x32)
        { rel: 'icon', type: 'image/x-icon', sizes: '16x16 32x32', href: '/favicon.ico' },

        // 4. Google Search Opaque Padded Icons (#040a1a Multiples of 48px)
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/images/favicons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/images/favicons/favicon-48x48.png' },

        // 5. Apple iOS / iPadOS Opaque Padded Icons (#040a1a)
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/images/favicons/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/images/favicons/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/images/favicons/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/images/favicons/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/images/favicons/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/favicons/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/images/favicons/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/images/favicons/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicons/apple-icon-180x180.png' },
        { rel: 'apple-touch-icon', sizes: '167x167', href: '/images/favicons/apple-icon.png' },
        { rel: 'apple-touch-icon', sizes: '190x190', href: '/images/favicons/apple-icon-precomposed.png' },

        // 6. Web Manifest
        { rel: 'manifest', crossorigin: 'use-credentials', href: '/manifest.json' },
      ],
    },
  },

  ssr: true,
  devtools: { enabled: false },
  devServer: {
    host: '0.0.0.0',
    port: 3007,
  },
})