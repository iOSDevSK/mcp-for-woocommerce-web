import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  metadataBase: new URL('https://mcpforwoocommerce.com'),
  title: {
    template: '%s - MCP for WooCommerce Documentation',
    default: 'MCP for WooCommerce Documentation',
  },
  description: 'Complete documentation for MCP for WooCommerce plugin - Connect your WooCommerce store to Claude AI via Model Context Protocol in 5 minutes. Build intelligent shopping assistants, automate customer support, enhance e-commerce with AI. Free WordPress plugin with read-only security.',
  keywords: 'WooCommerce, AI, Claude AI, Model Context Protocol, MCP, WordPress plugin, e-commerce automation, AI shopping assistant, customer support automation, WooCommerce AI integration',
  authors: [{ name: 'MCP for WooCommerce Team' }],
  creator: 'MCP for WooCommerce',
  publisher: 'MCP for WooCommerce',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'MCP for WooCommerce - WooCommerce AI Assistant Plugin',
    description: 'Connect your WooCommerce store to Claude AI via Model Context Protocol. Build intelligent shopping assistants and automate e-commerce tasks.',
    siteName: 'MCP for WooCommerce Documentation',
    url: 'https://mcpforwoocommerce.com/',
    images: [
      { url: 'https://mcpforwoocommerce.com/opengraph-image', width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCP for WooCommerce - WooCommerce AI Assistant Plugin',
    description: 'Connect your WooCommerce store to Claude AI via Model Context Protocol.',
    images: ['https://mcpforwoocommerce.com/opengraph-image'],
  },
}

export default async function RootLayout({ children }) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )
  let allSections = Object.fromEntries(allSectionsEntries)

  // Structured data for the website
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MCP for WooCommerce',
    description: 'A specialized WordPress plugin that connects WooCommerce stores to Claude AI via Model Context Protocol (MCP). Provides read-only access to public store data for AI assistants.',
    url: 'https://mcpforwoocommerce.com',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'WordPress',
    softwareVersion: '1.0.0',
    author: {
      '@type': 'Organization',
      name: 'MCP for WooCommerce Team',
      url: 'https://github.com/iOSDevSK/mcp-for-woocommerce'
    },
    publisher: {
      '@type': 'Organization',
      name: 'MCP for WooCommerce Team'
    },
    downloadUrl: 'https://github.com/iOSDevSK/mcp-for-woocommerce',
    screenshot: 'https://mcpforwoocommerce.com/images/screenshot.png',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'WooCommerce AI integration',
      'Model Context Protocol support',
      'Read-only store data access',
      'Claude AI compatibility',
      'Product search and management',
      'WordPress content access'
    ]
  }
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://mcpforwoocommerce.com/',
    name: 'MCP for WooCommerce Documentation',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://mcpforwoocommerce.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is MCP for WooCommerce and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MCP for WooCommerce is a WordPress plugin that connects your WooCommerce store to AI assistants like Claude via the Model Context Protocol (MCP). It provides secure, read-only access to your store\'s public data, allowing AI to answer questions about products, shipping, and store information without accessing private customer data.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is MCP for WooCommerce secure? What data can AI access?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, MCP for WooCommerce is designed with security as a priority. It operates in read-only mode and only provides access to public store data such as product information, categories, shipping methods, and payment gateways. No customer information, sales data, or private details are accessible through the plugin.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I install and configure MCP for WooCommerce?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Installation is straightforward: download the plugin from GitHub, upload it to your WordPress site, and activate it. Configure JWT authentication if needed, then connect it to your AI assistant using the Model Context Protocol.'
        }
      },
      {
        '@type': 'Question',
        name: 'What\'s the difference between MCP for WooCommerce and the original WordPress MCP plugin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MCP for WooCommerce is a specialized fork of Automattic\'s wordpress-mcp plugin, specifically optimized for WooCommerce stores. It includes enhanced product search tools, WooCommerce-specific data access, and features tailored for e-commerce AI assistants while maintaining compatibility with core WordPress functionality.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use MCP for WooCommerce with other AI assistants besides Claude?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! MCP for WooCommerce uses the standard Model Context Protocol, making it compatible with any AI assistant that supports MCP. While optimized for Claude AI, it works with other MCP-compatible AI systems and can be integrated into various AI-powered applications.'
        }
      }
    ]
  }

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3KW4L97NSJ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3KW4L97NSJ');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900" suppressHydrationWarning>
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
