import client from './client'

export interface TokenParsedResponse {
  userId: number
  email: string
  roles: string[]
  authorities: string[]
}

export const getTokenParsed = async (): Promise<TokenParsedResponse> => {
  const res = await client.get('/auth/token-parsing')
  return res.data.data
}
