import admin from '.'
import { LoginSchemaType } from '../../types/auth'

export const adminLogin = async (data: LoginSchemaType) => {
  const response = await admin.post('/auth/login', data)
  return response.data
}

export const adminLogout = async () => {
  const response = await admin.post('/auth/logout')
  return response.data
}
