import { authServiceRemote, followerServiceRemote, userServiceRemote } from './service';

const provideAPIService = () => {
  const userService = userServiceRemote();
  const authService = authServiceRemote();
  const followerService = followerServiceRemote();

  return {
    userService,
    authService,
    followerService,
  };
};

export const API = provideAPIService();
