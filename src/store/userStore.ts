import { create } from 'zustand'

interface Telecom {
  id: number
  name: string
}
interface Data {
  totalDataMb: number
  sellableDataMb: number
  buyerDataMb: number
}

interface UserState {
  telecom: Telecom | null
  data: Data | null
  setTelecom: (telecom: Telecom) => void
  setData: (data: Data) => void
}

export const useUserStore = create<UserState>(set => ({
  telecom: null,
  data: null,
  setTelecom: telecom => set({ telecom }),
  setData: data => set({ data }),
}))
