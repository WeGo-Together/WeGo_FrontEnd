import {
  authServiceRemote,
  followerServiceRemote,
  groupServiceRemote,
  userServiceRemote,
} from './service';

const provideAPIService = () => {
  const userService = userServiceRemote();
  const authService = authServiceRemote();
  const followerService = followerServiceRemote();
  const groupService = groupServiceRemote();

  return {
    userService,
    authService,
    followerService,
    groupService,
  };
};

export const API = provideAPIService();
