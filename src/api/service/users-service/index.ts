import { baseAPI } from '@/api/core';
import { User } from '@/types/service/users';

export const usersServiceRemote = () => ({
  getUser: async (userId: number) => {
    try {
      const response = await baseAPI.get<User>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateMe: async () => {
    try {
      const response = await baseAPI.patch<User>('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteMe: async () => {
    try {
      const response = await baseAPI.delete<User>(`/users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});
