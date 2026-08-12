import glob from 'fast-glob'
import path from 'path'

const baseUrl = 'https://mcpforwoocommerce.com'

export default async function sitemap() {
  // MDX pages served via /[slug]
  const mdxPages = await glob('src/app/pages/*.mdx')
  const mdxRoutes = mdxPages.map((p) => {
    const slug = path.basename(p, path.extname(p))
    return `/${slug}/`
  })

  // Top-level route segments that have page files (excluding dynamic and internal dirs)
  const topLevelPages = await glob('src/app/*/page.*')
  const topRoutes = topLevelPages
    .map((p) => `/${p.split('/')[2]}/`)
    .filter((r) => !['/pages/', '/[slug]/'].includes(r))

  const routes = ['/', ...mdxRoutes, ...topRoutes]
    // Deduplicate
    .filter((v, i, a) => a.indexOf(v) === i)
    // Sort for stability
    .sort()

  const lastmod = new Date().toISOString()

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastmod,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1.0 : 0.7,
  }))
}
export const dynamic = 'force-static'
