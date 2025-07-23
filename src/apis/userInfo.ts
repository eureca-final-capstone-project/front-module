import client from './client'

export interface TelecomCompany {
  telecomCompanyId: number
  name: string
}

export interface UserProfile {
  nickname: string
  email: string
  phoneNumber: string
  telecomCompany: TelecomCompany
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await client.get('/user/profile')
  return res.data.data
}
