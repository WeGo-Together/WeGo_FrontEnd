export type Meeting = {
  id: number;
  title: string;
  images: string[];
  location: string;
  dateTime: string;
  nickName: string;
  participantCount: number;
  maxParticipants: number;
  tags: string[];
};

export type TabType = 'current' | 'myPost' | 'past';
