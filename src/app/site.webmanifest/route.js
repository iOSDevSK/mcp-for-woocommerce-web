export const dynamic = 'force-static'

export async function GET() {
  return Response.json({
    name: 'MCP for WooCommerce - WooCommerce AI Assistant Plugin',
    short_name: 'MCP for WooCommerce',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png', 
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: '#8B5CF6',
    background_color: '#ffffff',
    display: 'standalone'
  })
}
