import { create } from 'zustand';

import { NotificationItem } from '@/types/service/notification';

interface AuthState {
  receivedData: NotificationItem | null;
  setReceivedData: (value: NotificationItem | null) => void;
  hasNewNotification: boolean;
  setHasNewNotification: (value: boolean) => void;
}

export const useNotificationStore = create<AuthState>((set) => ({
  receivedData: null,
  setReceivedData: (value) => set({ receivedData: value }),
  hasNewNotification: false,
  setHasNewNotification: (value) => set({ hasNewNotification: value }),
}));
