import { authHandlers } from './service/auth/auth-handlers';
import { userHandlers } from './service/user/users-handler';

export const handlers = [...userHandlers, ...authHandlers];
