import { authHandlers } from './service/auth/auth-handlers';
import { followerHandlers } from './service/followers/followers-handler';
import { userHandlers } from './service/user/users-handler';

export const handlers = [...userHandlers, ...authHandlers, ...followerHandlers];
