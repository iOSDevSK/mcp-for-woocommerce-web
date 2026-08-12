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

After running the build script, the `out/` directory contains all static files ready for deployment to:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Any static hosting service**

### Deploy to GitHub Pages
1. Build the project: `./build.sh`
2. Push the `out/` directory to your gh-pages branch
3. Enable GitHub Pages in repository settings

### Deploy to Netlify
1. Build the project: `./build.sh`
2. Drag and drop the `out/` folder to Netlify
3. Or connect your repository and set build command to `npm run build`

### Deploy to Vercel
1. Connect your repository to Vercel
2. Vercel will automatically detect Next.js and build

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
