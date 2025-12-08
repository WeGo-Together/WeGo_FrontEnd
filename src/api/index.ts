import { authServiceRemote, userServiceRemote } from './service';

const provideAPIService = () => {
  const userService = userServiceRemote();
  const authService = authServiceRemote();

  return {
    usersService: userService,
    authService,
  };
};

export const API = provideAPIService();
