import {
  authServiceRemote,
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

  return {
    userService,
    authService,
    followerService,
    notificationService,
    groupService,
  };
};

export const API = provideAPIService();
