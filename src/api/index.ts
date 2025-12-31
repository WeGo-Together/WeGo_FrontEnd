import {
  authServiceRemote,
  chatServiceRemote,
  followerServiceRemote,
  groupServiceRemote,
  notificationServiceRemote,
  userServiceRemote,
} from './service';

const provideAPIService = () => {
  const userService = userServiceRemote();
  const authService = authServiceRemote();
  const followerService = followerServiceRemote();
  const notificationService = notificationServiceRemote();
  const groupService = groupServiceRemote();
  const chatService = chatServiceRemote();

  return {
    userService,
    authService,
    followerService,
    notificationService,
    groupService,
    chatService,
  };
};

export const API = provideAPIService();
