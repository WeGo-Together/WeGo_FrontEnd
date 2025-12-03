import { usersServiceRemote } from './service';

const provideAPIService = () => {
  const usersService = usersServiceRemote();

  return {
    usersService,
  };
};

export const API = provideAPIService();
