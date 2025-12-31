import { Metadata } from 'next';
import { headers } from 'next/headers';

import { API } from '@/api';

export const generateProfileMetadata = async (userId: number): Promise<Metadata> => {
  const headersList = headers();
  const host = (await headersList).get('host') || process.env.DOMAIN;
  const currentUrl = `https://${host}/user/${userId}`;

  try {
    const userProfile = await API.userService.getUser({ userId });

    const { nickName, followersCnt, profileImage, profileMessage } = userProfile;

    const metaTitle = `${nickName}님의 프로필 | WeGo`;
    const metaDescription = `${nickName}님의 프로필 | 팔로워 ${followersCnt}명\n\n${profileMessage}`;

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: [nickName, '프로필', 'WeGo'],
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        siteName: 'WeGo',
        locale: 'ko_KR',
        type: 'profile',
        url: currentUrl,
        images: profileImage
          ? [
              {
                url: profileImage,
                width: 200,
                height: 200,
                alt: `${nickName}님의 프로필 사진`,
              },
            ]
          : [],
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
    console.error('Failed to fetch user profile for metadata:', error);
    return {
      title: `사용자 프로필 | WeGo`,
      description: '사용자의 프로필과 리뷰를 확인해보세요.',
      openGraph: {
        title: '사용자 프로필 | WeGo',
        description: '사용자의 프로필과 리뷰를 확인해보세요.',
        url: currentUrl,
        type: 'profile',
      },
    };
  }
};
