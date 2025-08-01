import { create } from 'zustand'
import { NotificationItem } from '../types/notification'

interface NotificationStore {
  notifications: NotificationItem[]
  addNotification: (item: NotificationItem) => void
  markAsRead: (id: number) => void
  clearNotifications: () => void

  disconnectFn: (() => void) | null
  setDisconnectFn: (fn: () => void) => void
  clearDisconnectFn: () => void

  hasUnread: boolean
  setHasUnread: (val: boolean) => void
}

export const useNotificationStore = create<NotificationStore>(set => ({
  notifications: [],
  hasUnread: false,
  setHasUnread: val => set({ hasUnread: val }),

  addNotification: item =>
    set(state => ({
      notifications: [item, ...state.notifications],
      hasUnread: true,
    })),
  markAsRead: id =>
    set(state => ({
      notifications: state.notifications.map(n => (n.id === id ? { ...n, read: true } : n)),
    })),
  clearNotifications: () => set({ notifications: [] }),

  disconnectFn: null,
  setDisconnectFn: fn => set({ disconnectFn: fn }),
  clearDisconnectFn: () => set({ disconnectFn: null }),
}))
