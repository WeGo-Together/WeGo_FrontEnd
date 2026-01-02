import { Metadata } from 'next';
import { headers } from 'next/headers';

import { API } from '@/api';

export const generateGroupMetadata = async (groupId: string): Promise<Metadata> => {
  const headersList = headers();
  const host = (await headersList).get('host') || process.env.DOMAIN;
  const currentUrl = `https://${host}/group/${groupId}`;

  try {
    const {
      createdBy: { nickName },
      title,
      images,
    } = await API.groupService.getGroupDetails({ groupId });

    const metaTitle = `${nickName}님의 모임 | WeGo`;
    const metaDescription = title;

    const thumbnails = images[0]?.variants ? images[0].variants[0].imageUrl : '';

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: [nickName, '모임', 'WeGo'],
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        siteName: 'WeGo',
        locale: 'ko_KR',
        type: 'website',
        url: currentUrl,
        images: thumbnails
          ? [
              {
                url: thumbnails,
                width: 400,
                height: 400,
                alt: `${nickName}님의 모임 사진`,
              },
            ]
          : [],
      },
      twitter: {
        card: 'summary',
        title: metaTitle,
        description: metaDescription,
        images: thumbnails ? [thumbnails] : undefined,
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
    console.error('Failed to fetch group data for metadata:', error);
    return {
      title: `모임 상세 정보 | WeGo`,
      description: '사용자의 모임을 확인해보세요.',
      openGraph: {
        title: '사용자 모임 | WeGo',
        description: '사용자의 모임을 확인해보세요.',
        url: currentUrl,
        type: 'website',
      },
      twitter: {
        card: 'summary',
      },
    };
  }
};
