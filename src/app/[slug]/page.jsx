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
        seoTitle: "WooCommerce MCP Server: Features and the Data It Reads",
        description: "What the plugin does: 33 read-only tools that let Claude and other MCP clients read your products, reviews, shipping, taxes and payment methods."
      },
      {
        slug: "installation",
        title: "Installation",
        seoTitle: "Install the WooCommerce MCP Plugin",
        description: "Install MCP for WooCommerce from the GitHub release ZIP, switch MCP on in its settings and check that the tools you need are enabled."
      },
      {
        slug: "setup",
        title: "Setup",
        seoTitle: "Connect WooCommerce to Claude Code, Claude Desktop & Cursor",
        description: "Connect your WooCommerce store to Claude Code, Claude Desktop, Cursor or VS Code: plugin settings, a JWT token and a ready configuration for each client."
      },
      {
        slug: "woocommerce-ai-assistant",
        title: "AI Assistant",
        seoTitle: "WooCommerce AI Chatbot with Live Product Data",
        description: "Build a WooCommerce AI chatbot with Webtalkbot and MCP for WooCommerce. It answers product, price and stock questions from live store data."
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
        seoTitle: "What Is MCP (Model Context Protocol)? WooCommerce Guide",
        description: "What the Model Context Protocol is, how an MCP client talks to a server, and how MCP for WooCommerce uses it to give AI assistants store data."
      },
      {
        slug: "tools",
        title: "Tools",
        seoTitle: "WooCommerce MCP Tools: All 33 Read-Only Tools",
        description: "All 33 MCP for WooCommerce tools: product search, variations, categories, reviews, shipping, taxes and payment data. Every tool is read-only."
      },
      {
        slug: "resources",
        title: "Resources",
        seoTitle: "WooCommerce MCP Resources",
        description: "The read-only MCP resource the plugin exposes: a search guide an AI assistant can read directly before it searches your store."
      },
      {
        slug: "prompts",
        title: "Prompts",
        seoTitle: "WooCommerce MCP Prompts: What to Ask Instead",
        description: "MCP for WooCommerce ships no ready-made prompts yet. What to ask the assistant instead, using the plugin's 33 read-only tools."
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
    title: { absolute: page?.seoTitle ?? page?.title },
    description: page?.description,
    alternates: {
      canonical: `/${page?.slug ?? (await params).slug}/`,
    },
    openGraph: {
      title: page?.seoTitle,
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
      title: page?.seoTitle,
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
