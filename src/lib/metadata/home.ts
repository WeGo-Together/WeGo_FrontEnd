import { Metadata } from 'next';
import { headers } from 'next/headers';

import { API } from '@/api';
import { GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';

export const generateHomeMetadata = async (keyword?: string): Promise<Metadata> => {
  const headersList = await headers();
  const host = headersList.get('host') || process.env.DOMAIN || 'wego.monster';
  const protocol =
    headersList.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  const currentUrl = keyword
    ? `${protocol}://${host}/?keyword=${encodeURIComponent(keyword)}`
    : `${protocol}://${host}/`;
  const logoImageUrl = `${protocol}://${host}/images/logo.png`;

  try {
    if (keyword) {
      const metaTitle = `${keyword} 검색결과 | WeGo`;
      const metaDescription = `"${keyword}"에 대한 모임 검색 결과를 확인해보세요.`;

      let searchImageUrl = logoImageUrl;
      try {
        const searchResponse = await API.groupService.getGroups({
          size: GROUP_LIST_PAGE_SIZE,
          keyword,
        });
        const firstGroupImage = searchResponse.items[0]?.images?.[0];
        if (firstGroupImage) {
          searchImageUrl = firstGroupImage;
        }
      } catch (error) {
        // 실패 시 기본 로고 이미지 사용
        console.error('이미지를 가져오는데 실패했습니다:', error);
      }

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
          images: [
            {
              url: searchImageUrl,
              width: 400,
              height: 400,
              alt: `${keyword} 검색 결과 모임 이미지`,
            },
          ],
        },
        twitter: {
          card: 'summary',
          title: metaTitle,
          description: metaDescription,
          images: [searchImageUrl],
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
        images: [
          {
            url: logoImageUrl,
            width: 100,
            height: 100,
            alt: 'WeGo 로고',
          },
        ],
      },
      twitter: {
        card: 'summary',
        title: metaTitle,
        description: metaDescription,
        images: [logoImageUrl],
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
        images: [
          {
            url: logoImageUrl,
            width: 92,
            height: 40,
            alt: 'WeGo 로고',
          },
        ],
      },
      twitter: {
        card: 'summary',
        images: [logoImageUrl],
      },
    };
  }
};
