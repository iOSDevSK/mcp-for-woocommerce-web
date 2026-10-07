# MCP for WooCommerce Web Documentation

This is the documentation website for the MCP for WooCommerce plugin, built with Next.js and optimized for static deployment.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
# Option 1: Use the build script
./build.sh

# Option 2: Manual build
npm ci
npm run build
```

## 📁 Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable React components
- `src/app/pages/` - MDX documentation pages
- `out/` - Static build output (after build)

## 🌐 Deployment

Production is `https://mcpforwoocommerce.com`: the static `out/` directory is served by an
nginx container on the `agency` server, behind Traefik and Cloudflare.

The server copy is not a git clone; sync the source from a local checkout first:

```bash
rsync -ac --delete --exclude='.git' --exclude='node_modules' --exclude='out' \
  --exclude='.next' --exclude='.claude' --exclude='._*' ./ agency:sites/mcpforwoocommerce/
ssh agency
cd ~/sites/mcpforwoocommerce
# node is not installed on the host — build in a container
sudo docker run --rm -v "$PWD":/app -w /app node:20 sh -c "npm ci && npm run build"
# required: `next build` recreates out/, which detaches the bind mount
sudo docker compose up -d --force-recreate
sudo docker exec mcpforwoocommerce-com ls /usr/share/nginx/html
```

`nginx.conf` is mounted into the container, so redirects added there need the same
recreate. See `CLAUDE.md` for caching and PageSpeed notes.

The Changelog page is generated at build time from the plugin's `changelog.txt` on
GitHub, so rebuild the site after each plugin release.

## 🔌 Plugin version covered

The content describes **MCP for WooCommerce 1.3.0**: a public, read-only MCP endpoint
that serves storefront data only, with 31 tools and no authentication (JWT and OAuth
were removed in 1.3.0). Update the pages, `public/llms.txt` and the tool counts in
`src/app/layout.jsx` whenever a plugin release changes tools or behaviour.

## 📝 Content Management

### Adding New Pages
1. Create a new `.mdx` file in `src/app/pages/`
2. Add the page to the navigation in `src/app/[slug]/page.jsx`
3. Update the sections array with your new page

### Editing Content
- Edit existing `.mdx` files in `src/app/pages/`
- Content is automatically processed with MDX

## 🛠 Technical Details

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Content**: MDX with custom components
- **Search**: FlexSearch integration
- **Build**: Static export optimized for CDN delivery

## 📋 Requirements

- Node.js 18+ 
- npm 9+

## 🔧 Configuration

The project is configured for static export in `next.config.mjs`:
- Output: Static files
- Images: Unoptimized for static hosting
- Trailing slashes: Enabled for better compatibility

## 📄 License

This documentation website follows the same license as the MCP for WooCommerce plugin.
