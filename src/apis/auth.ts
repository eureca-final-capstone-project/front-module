import { LoginSchemaType } from '../utils/validation'
import client from './client'

export const login = async (data: LoginSchemaType) => {
  const response = await client.post('/auth/login', data)
  return response.data
}
