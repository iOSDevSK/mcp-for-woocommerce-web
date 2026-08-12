#!/bin/bash

# MCP for WooCommerce Web - Production Build Script
echo "🚀 Starting production build for MCP for WooCommerce Web..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building production version..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Static files are ready in the 'out' directory"
    echo "🌐 You can serve the 'out' directory with any static file server"
    echo ""
    echo "To test locally, you can use:"
    echo "  npx serve out"
    echo "  or"
    echo "  python3 -m http.server 3000 --directory out"
else
    echo "❌ Build failed!"
    exit 1
fi