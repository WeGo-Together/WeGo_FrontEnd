import { Metadata } from 'next';
import { headers } from 'next/headers';

export const generateHomeMetadata = async (keyword?: string): Promise<Metadata> => {
  const headersList = headers();
  const host = (await headersList).get('host') || process.env.DOMAIN;
  const currentUrl = keyword
    ? `https://${host}/?keyword=${encodeURIComponent(keyword)}`
    : `https://${host}/`;

  try {
    if (keyword) {
      const metaTitle = `${keyword} 검색결과 | WeGo`;
      const metaDescription = `"${keyword}"에 대한 모임 검색 결과를 확인해보세요.`;

      return {
        title: metaTitle,
        description: metaDescription,
        keywords: [keyword, '모임 검색', 'WeGo'],
        openGraph: {
          title: metaTitle,
          description: metaDescription,
          siteName: 'WeGo',
          locale: 'ko_KR',
          type: 'website',
          url: currentUrl,
        },
        twitter: {
          card: 'summary',
          title: metaTitle,
          description: metaDescription,
        },
        robots: {
          index: true,
          follow: true,
        },
        alternates: {
          canonical: currentUrl,
        },
      };
    }

    const metaTitle = 'WeGo - 함께하는 모임 플랫폼';
    const metaDescription = 'WeGo에서 함께할 다양한 모임을 탐색하고 참여하세요.';

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: ['모임', 'WeGo', '모임 플랫폼', '소모임'],
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        siteName: 'WeGo',
        locale: 'ko_KR',
        type: 'website',
        url: currentUrl,
      },
      twitter: {
        card: 'summary',
        title: metaTitle,
        description: metaDescription,
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: currentUrl,
      },
    };
  } catch (error) {
    console.error('Failed to generate home metadata:', error);
    return {
      title: 'WeGo - 함께하는 모임 플랫폼',
      description: 'WeGo에서 함께할 다양한 모임을 탐색하고 참여하세요.',
      openGraph: {
        title: 'WeGo - 함께하는 모임 플랫폼',
        description: 'WeGo에서 함께할 다양한 모임을 탐색하고 참여하세요.',
        url: currentUrl,
        type: 'website',
      },
      twitter: {
        card: 'summary',
      },
    };
  }
};
