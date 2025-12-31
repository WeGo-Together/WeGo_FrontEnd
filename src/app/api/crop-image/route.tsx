// app/api/crop-image/route.ts
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new Response('Missing image URL', { status: 400 });
  }

  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '600px',
            display: 'flex',
          }}
        >
          <img
            width='1200'
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt='cropped'
            height='600'
            src={imageUrl}
          />
        </div>
      ),
      {
        width: 1200,
        height: 600,
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
      },
    );
  } catch (error) {
    console.error('Failed to crop image:', error);
    return new Response('Failed to crop image', { status: 500 });
  }
};
