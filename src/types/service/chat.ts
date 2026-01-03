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
  participants: ChatUser[];
  unreadCount: number;
  thumbnail: string;
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

export interface ChatUser {
  joinedAt: string;
  nickName: string;
  participantId: 77;
  profileImage: string;
  status: 'ACTIVE' | 'INACTIVE'; // 확인 필요💥💥
  userId: number;
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

export interface GetChatRoomParams {
  roomId: number;
}

export interface getChatRoomResponse {
  chatRoomId: number;
  chatRoomName: string;
  chatType: string;
  createdAt: string;
  groupId: number | null;
  participantCount: number;
  participants: ChatUser[];
}

export interface GetParticipantsParams {
  roomId: number;
}

export interface GetParticipantsResponse {
  chatRoomId: number;
  totalCount: number;
  participants: ChatUser[];
}

export interface KickUserParams {
  roomId: number;
}

export interface KickUserPayloads {
  targetUserId: number;
}
