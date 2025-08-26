import { ImageResponse } from 'next/og'

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontFamily: 'monospace',
        color: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        transformOrigin: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        fontSize: 220,
      }}
    >
      🎉
    </div>,
    {
      width: 260,
      height: 260,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, immutable', // cache for 7 days
      },
    },
  )
}
