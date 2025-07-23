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

interface EditNicknameParams {
  nickname: string
}

interface EditNicknameResponse {
  userId: number
  nickname: string
}
export interface UserDataStatus {
  totalDataMb: number
  sellableDataMb: number
  buyerDataMb: number
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await client.get('/user/profile')
  return res.data.data
}
export const putUserNickname = async (
  params: EditNicknameParams
): Promise<EditNicknameResponse> => {
  const response = await client.put('/user/nickname', params)
  return response.data.data
}
export const getUserDataStatus = async (): Promise<UserDataStatus> => {
  const res = await client.get('/user-data/status')
  return res.data.data
}
