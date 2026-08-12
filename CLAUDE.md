# Claude Instructions

## Site

Documentation site for the **MCP for WooCommerce** WordPress plugin.

- Production domain: `https://mcpforwoocommerce.com` (apex + `www`, behind Cloudflare)
- Old domain `woo-mcp.com` 301-redirects here — never reintroduce it into source.
- Plugin repository: https://github.com/iOSDevSK/mcp-for-woocommerce

## Canonical domain

The domain appears in these places — keep them in sync:

- `src/app/layout.jsx` — `metadataBase`, OpenGraph, Twitter, JSON-LD (`SoftwareApplication`, `WebSite`)
- `src/app/[slug]/page.jsx` — `BreadcrumbList` JSON-LD
- `src/app/sitemap.js` — `baseUrl` (this generates the live `/sitemap.xml`)
- `public/robots.txt` — header comment + `Sitemap:` line

`public/sitemap.xml` is dead: the App Router `sitemap.js` route wins at build time.

## Deploy

Static Next.js export (`output: 'export'`, `trailingSlash: true`) served by an nginx
container; the built `out/` directory is bind-mounted read-only.

```bash
ssh agency
cd ~/sites/mcpforwoocommerce
# node is not installed on the host — build in a container:
sudo docker run --rm -v "$PWD":/app -w /app node:20-alpine sh -c "npm ci && npm run build"
```

No container restart is needed — `out/` is bind-mounted. Purge the Cloudflare cache
after a deploy if changes do not show up.
