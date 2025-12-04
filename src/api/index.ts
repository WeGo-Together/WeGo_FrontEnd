import { userServiceRemote } from './service';

const provideAPIService = () => {
  const userService = userServiceRemote();

  return {
    usersService: userService,
  };
};

export const API = provideAPIService();
