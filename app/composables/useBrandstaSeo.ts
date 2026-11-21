// app/composables/useBrandstaSeo.ts
import { computed } from 'vue'
import { useHead, useSeoMeta, useRoute } from 'nuxt/app'

export interface BrandstaSeoOptions {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
}

const PARENT_HQ_URL = 'https://brandsta.in'
const SITE_URL = 'https://brandsta.cc'

export const BRANDSTA_CC_DEFAULT_TITLE = 'Brandsta | Custom Code — Built around you.'
export const BRANDSTA_CC_DEFAULT_DESCRIPTION =
  'Purpose-built custom web applications, e-commerce engines, media studios, and cloud workflow systems by Brandsta—engineered around how your business actually works.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og/custom-code.jpg`
const DEFAULT_OG_ALT = 'Brandsta — Custom Code. Built around you.'
const BRAND_LOGO_512 = `${SITE_URL}/images/favicons/maskable-icon-512x512.png`

export function useBrandstaSeo(options: BrandstaSeoOptions = {}) {
  const route = useRoute()

  const canonicalUrl = computed(() => {
    const cleanPath = (route.path || '/').split('?')[0]?.split('#')[0] || '/'
    if (cleanPath === '/') {
      return `${SITE_URL}/`
    }
    return `${SITE_URL}${cleanPath.replace(/\/+$/, '')}`
  })

  const pageTitle = options.title || BRANDSTA_CC_DEFAULT_TITLE
  const pageDescription = options.description || BRANDSTA_CC_DEFAULT_DESCRIPTION
  const ogImage = options.image || DEFAULT_OG_IMAGE
  const ogAlt = options.imageAlt || DEFAULT_OG_ALT
  const ogType = options.type || 'website'

  useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogUrl: canonicalUrl,
    ogType,
    ogSiteName: 'Brandsta',
    ogLocale: 'en_IN',
    ogLocaleAlternate: ['en_US', 'en_GB'],
    ogImage,
    ogImageSecureUrl: ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogImageAlt: ogAlt,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: ogImage,
    twitterImageAlt: ogAlt,
  })

  const schemaGraph = computed(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Master Parent Brand Entity (Shared Universal ID Across brandsta.in & brandsta.cc)
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${PARENT_HQ_URL}/#organization`,
        name: 'Brandsta',
        legalName: 'Brandsta Interactive',
        alternateName: ['Brandsta Interactive', 'Brandsta Studio'],
        slogan: 'We make waves.',
        url: `${PARENT_HQ_URL}/`,
        foundingDate: '2021',
        email: 'hello@brandsta.in',
        telephone: '+91-81290-12205',
        description:
          'Signature branding, digital experiences, custom-coded systems, and growth architecture—amplifying digital identities across Kerala, India, and worldwide.',
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: BRAND_LOGO_512,
          contentUrl: BRAND_LOGO_512,
          width: 512,
          height: 512,
          caption: 'Brandsta',
        },
        image: DEFAULT_OG_IMAGE,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Koduvayur, Palakkad',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 10.684769,
          longitude: 76.650758,
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Kerala, India',
          },
          {
            '@type': 'Country',
            name: 'India',
          },
          {
            '@type': 'Place',
            name: 'Worldwide',
          },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'hello@brandsta.in',
            telephone: '+91-81290-12205',
            url: 'https://wa.me/918129012205',
            availableLanguage: ['English'],
            areaServed: ['IN', 'Worldwide'],
          },
          // Optional alternate number backup (uncomment only if needed):
          // {
          //   '@type': 'ContactPoint',
          //   contactType: 'sales',
          //   telephone: '+91-94006-53709',
          //   url: 'https://wa.me/919400653709',
          // },
        ],
        sameAs: [
          `${PARENT_HQ_URL}/`,
          `${SITE_URL}/`,
          'https://www.instagram.com/brandsta.in',
          'https://wa.me/918129012205',
          // 'https://www.facebook.com/brandsta.in', // Uncomment once Facebook handle unlocks
        ],
        knowsAbout: [
          'Signature Branding & Identity Evolution',
          'UI/UX Design, Design Systems & Motion Identity',
          'Custom Web Applications, Websites & Android Apps',
          'Bespoke E-Commerce, Storefront & Cart Systems',
          'Custom Operational Software & Cloud Workflow Automation',
          'Technical SEO, Local Visibility & AI Visibility',
          'Digital Growth, Launch Campaigns & Conversion Optimization',
        ],
        subOrganization: [
          {
            '@id': `${SITE_URL}/#suborganization`,
          },
        ],
      },

      // 2. Custom Code Flagship Division (brandsta.cc)
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#suborganization`,
        name: 'Brandsta — Custom Code',
        alternateName: 'Brandsta CC',
        slogan: 'Built around you.',
        url: `${SITE_URL}/`,
        email: 'hello@brandsta.in',
        telephone: '+91-81290-12205',
        description: BRANDSTA_CC_DEFAULT_DESCRIPTION,
        parentOrganization: {
          '@id': `${PARENT_HQ_URL}/#organization`,
        },
      },

      // 3. WebSite Entity
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Brandsta — Custom Code',
        alternateName: 'Brandsta CC',
        description: BRANDSTA_CC_DEFAULT_DESCRIPTION,
        inLanguage: 'en-IN',
        datePublished: '2026-11-24',
        publisher: {
          '@id': `${PARENT_HQ_URL}/#organization`,
        },
      },

      // 4. WebPage Entity
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl.value}#webpage`,
        url: canonicalUrl.value,
        name: pageTitle,
        description: pageDescription,
        inLanguage: 'en-IN',
        datePublished: '2026-11-24',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#service`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: ogImage,
          width: 1200,
          height: 630,
        },
      },

      // 5. Custom Code Service & Bespoke Systems Catalog
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service`,
        name: 'Brandsta Custom Code — Purpose-Built Digital Tools & Systems',
        serviceType: 'Custom Web Application, E-Commerce & Operational Software Development',
        url: `${SITE_URL}/`,
        description: pageDescription,
        provider: {
          '@id': `${PARENT_HQ_URL}/#organization`,
        },
        brand: {
          '@id': `${PARENT_HQ_URL}/#organization`,
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Kerala, India',
          },
          {
            '@type': 'Country',
            name: 'India',
          },
          {
            '@type': 'Place',
            name: 'Worldwide',
          },
        ],
        audience: {
          '@type': 'Audience',
          audienceType:
            'Businesses, Creators, Places, Artists, Professionals, Events, and Ambitious Ventures',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Brandsta Custom Code Capabilities',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Storefront, Cart & Order Engines',
                description:
                  'Tailored cart rules, custom product bundles, real-time inventory synchronization, automated order alerts, and encrypted cloud ledger backups.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Visual Gallery & Batch File Upload Studios',
                description:
                  'Purpose-built studios for batch file uploads, automatic visual compression, instant live gallery population, and cloud master archiving.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Configurable Proposal, Quote & Sign-Off Workflows',
                description:
                  'Custom deliverable and scope builders with versioned cloud snapshots and real-time client and team approval dispatch.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Live Operational Control & Escalation Boards',
                description:
                  'Real-time command surfaces for availability management, priority request intake, instant team escalations, and automated audit trails.',
              },
            },
          ],
        },
      },
    ],
  }))

  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl,
      },
    ],
    meta: [
      {
        name: 'twitter:url',
        content: canonicalUrl,
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        key: 'brandsta-jsonld',
        innerHTML: () => JSON.stringify(schemaGraph.value),
      },
    ],
  })
}