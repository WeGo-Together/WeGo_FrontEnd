export interface Group {
  id: number;
  title: string;
  location: string;
  locationDetail: string;
  startTime: string;
  endTime: string;
  images: string[];
  tags: string[];
  description: string;
  participantCount: number;
  maxParticipants: number;
  createdBy: {
    userId: number;
    nickName: string;
    profileImage: null | string;
  };
  createdAt: string;
  updatedAt: string;
  joinedCount: number;
}
