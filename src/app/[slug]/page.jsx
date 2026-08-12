import { Prose } from '@/components/Prose'
import { notFound } from 'next/navigation'

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    pages: [
      {
        slug: "overview",
        title: "Overview",
        description: "Discover MCP for WooCommerce features: WooCommerce AI integration, Model Context Protocol support, and secure read-only data access for intelligent e-commerce automation."
      },
      {
        slug: "installation",
        title: "Installation",
        description: "Step-by-step guide to install MCP for WooCommerce plugin in WordPress. Download, configure, and activate WooCommerce AI integration in minutes."
      },
      {
        slug: "setup",
        title: "Setup",
        description: "Configure MCP for WooCommerce authentication tokens and connect your WooCommerce store to Claude AI. Complete setup guide with security best practices."
      },
      {
        slug: "woocommerce-ai-assistant",
        title: "AI Assistant",
        description: "Build intelligent WooCommerce shopping assistants with Claude AI. Access product data, handle customer queries, and automate e-commerce support."
      }
    ]
  },
  {
    id: "reference",
    title: "Reference",
    pages: [
      {
        slug: "mcp-protocol",
        title: "MCP Protocol",
        description: "Learn Model Context Protocol fundamentals: secure AI-to-application communication standard enabling Claude AI to access WooCommerce data safely."
      },
      {
        slug: "tools",
        title: "Tools",
        description: "Complete MCP for WooCommerce tools reference: product search, category browsing, order management, and WooCommerce data access methods for AI assistants."
      },
      {
        slug: "resources",
        title: "Resources",
        description: "Available WooCommerce data resources: products, categories, shipping methods, payment gateways, and WordPress content accessible via MCP."
      },
      {
        slug: "prompts",
        title: "Prompts",
        description: "Pre-built AI prompts for WooCommerce: customer support templates, product recommendations, and e-commerce automation workflows."
      }
    ]
  }
];

async function getPage(slug) {
  for (const section of sections) {
    const page = section.pages.find(p => p.slug === slug);
    if (page) {
      return {
        ...page,
        section: {
          id: section.id,
          title: section.title
        }
      };
    }
  }
  return null;
}

async function getPageContent(slug) {
  try {
    const { default: Content } = await import(`@/app/pages/${slug}.mdx`);
    return Content;
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  const allPages = sections.flatMap(section => 
    section.pages.map(page => ({ slug: page.slug }))
  );
  return allPages;
}

export async function generateMetadata({ params }) {
  let page = await getPage((await params).slug);

  return {
    title: page?.title,
    description: page?.description,
    alternates: {
      canonical: `/${page?.slug ?? (await params).slug}/`,
    },
    openGraph: {
      title: page?.title,
      description: page?.description,
      url: `/${page?.slug ?? (await params).slug}/`,
      type: 'article',
      siteName: 'MCP for WooCommerce Documentation',
      images: [
        { url: '/opengraph-image', width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page?.title,
      description: page?.description,
      images: ['/opengraph-image'],
    },
  };
}

export default async function Page({ params }) {
  let slug = (await params).slug;
  let page = await getPage(slug);

  if (!page) {
    notFound();
  }

  let Content = await getPageContent(slug);

  if (!Content) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl lg:max-w-5xl">
      {/* Breadcrumbs JSON-LD for this page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://mcpforwoocommerce.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: page.section.title,
                item: 'https://mcpforwoocommerce.com/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: page.title,
                item: `https://mcpforwoocommerce.com/${slug}/`,
              },
            ],
          }),
        }}
      />
      <header className="mb-9 space-y-1">
        <p className="font-display text-xl font-bold text-purple-500 mt-6 mb-4">
          {page.section.title}
        </p>
        <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
          {page.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {page.description}
        </p>
      </header>
      <Prose className="mb-32">
        <Content />
      </Prose>
    </div>
  )
}
