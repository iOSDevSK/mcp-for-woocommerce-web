import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: 'white',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            textAlign: 'center',
          }}
        >
          MCP for WooCommerce Documentation
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: 'rgba(255,255,255,0.9)',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial',
          }}
        >
          WooCommerce × Model Context Protocol
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
export const dynamic = 'force-static'
