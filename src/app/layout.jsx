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
    description: 'A free WordPress plugin that turns a WooCommerce store into an MCP server, so AI assistants such as Claude can read products, variations, categories, reviews, shipping, taxes and payment methods. All 33 tools are read-only.',
    url: 'https://mcpforwoocommerce.com',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'WordPress',
    softwareVersion: '1.2.4',
    license: 'https://www.gnu.org/licenses/gpl-2.0.html',
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
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'WooCommerce AI integration',
      'Model Context Protocol support',
      'Read-only store data access',
      'Works with Claude, Cursor, VS Code and other MCP clients',
      'Product search, variations and filtering',
      'WordPress posts and pages'
    ]
  }
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://mcpforwoocommerce.com/',
    name: 'MCP for WooCommerce Documentation'
  }



  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://umami.agentmods.dev" />
        {/* Umami analytics (self-hosted on umami.agentmods.dev) */}
        <script
          defer
          src="https://umami.agentmods.dev/script.js"
          data-website-id="2f73d523-57e5-4fb3-a802-5f88329b58ae"
        ></script>
        {/* Umami replays & heatmaps */}
        <script
          defer
          src="https://umami.agentmods.dev/recorder.js"
          data-website-id="2f73d523-57e5-4fb3-a802-5f88329b58ae"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
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
