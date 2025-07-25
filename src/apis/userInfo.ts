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

interface EditPasswordParams {
  currentPassword: string
  newPassword: string
}

interface EditPasswordResponse {
  statusCode: number
  message: string
  data: {
    userId: number
  }
}
export interface UserDataStatus {
  totalDataMb: number
  sellableDataMb: number
  buyerDataMb: number
}

export interface UserPayStatus {
  balance: number
}
export interface TransactionHistoryItem {
  transactionFeedId: number
  title: string
  otherPartyNickname: string
  salesPrice: number
  transactionFinalPrice: number
  salesDataAmount: number
  defaultImageNumber: number
  transactionDate: string
  telecomCompany: string
  salesType: string
  transactionType: 'PURCHASE' | 'SALE'
}
export interface TransactionHistoryResponse {
  content: TransactionHistoryItem[]
  totalElements: number
  totalPages: number
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
export const putUserPassword = async (
  params: EditPasswordParams
): Promise<EditPasswordResponse> => {
  const response = await client.put('/user/password', params)
  console.log('----------------서버 응답:', response.data)

  return response.data
}
export const getUserDataStatus = async (): Promise<UserDataStatus> => {
  const res = await client.get('/user-data/status')
  return res.data.data
}
export const getUserPayStatus = async (): Promise<UserPayStatus> => {
  const res = await client.get('/user-pay')
  return res.data.data
}
export const getTransactionHistory = async ({
  type,
  page = 0,
  size = 20,
}: {
  type: 'ALL' | 'PURCHASE' | 'SALE'
  page?: number
  size?: number
}): Promise<TransactionHistoryResponse> => {
  const res = await client.get('/transaction-history', {
    params: {
      type,
      page,
      size,
      sort: 'transactionDate,DESC',
    },
  })
  return res.data.data
}
