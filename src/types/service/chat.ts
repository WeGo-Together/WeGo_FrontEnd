export interface ChattingRoom {
  chatRoomId: number;
  chatType: 'DM' | 'GROUP';
  chatRoomName: string;
  groupId: number;
  participantCount: number;
  lastMessage: {
    content: string;
    senderName: string;
    timestamp: string;
  };
  participants: [
    {
      participantId: number;
      userId: number;
      nickName: string;
      profileImage: string;
      status: 'ACTIVE' | 'INACTIVE'; // 확인 필요💥💥
      joinedAt: string;
    },
  ];
  unreadCount: number;
}

export interface ChatMessage {
  messageId: number;
  senderId: number | null;
  senderName: string | null;
  senderProfileImage: string | null;
  content: string;
  messageType: 'TEXT' | 'SYSTEM';
  timestamp?: string;
  createdAt?: string;
}

export interface GetChatRoomsResponse {
  chatRooms: ChattingRoom[];
}

export interface CreateDMPayloads {
  targetUserId: number;
}

export interface GetChatMessagesParams {
  roomId: number;
  cursor?: number;
  size?: number;
}

export interface GetChatMessagesResponse {
  messages: ChatMessage[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface ReadMessagesParams {
  roomId: number;
}

export interface ReadMessagesResponse {
  chatRoomId: number;
  lastReadMessageId: number;
  unreadCount: number;
}
