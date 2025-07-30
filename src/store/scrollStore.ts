import { create } from 'zustand'

interface ScrollStore {
  scrollToBottom: boolean
  triggerScrollToBottom: () => void
  reset: () => void
}

export const useScrollStore = create<ScrollStore>(set => ({
  scrollToBottom: false,
  triggerScrollToBottom: () => set({ scrollToBottom: true }),
  reset: () => set({ scrollToBottom: false }),
}))
