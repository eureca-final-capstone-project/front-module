import { create } from 'zustand'

interface Telecom {
  id: number
  name: string
}

interface UserState {
  telecom: Telecom | null
  setTelecom: (telecom: Telecom) => void
}

export const useUserStore = create<UserState>(set => ({
  telecom: null,
  setTelecom: telecom => set({ telecom }),
}))
