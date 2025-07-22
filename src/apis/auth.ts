import { LoginSchemaType } from '../utils/validation'
import client from './client'

export const login = async (data: LoginSchemaType) => {
  const response = await client.post('/auth/login', data)
  return response.data
}

export const kakaoLogin = async () => {
  window.location.href = `${import.meta.env.VITE_CLIENT_BASE_URL}/oauth2/authorization/kakao`
}

export const googleLogin = async () => {
  window.location.href = `${import.meta.env.VITE_CLIENT_BASE_URL}/oauth2/authorization/google`
}

export const naverLogin = async () => {
  window.location.href = `${import.meta.env.VITE_CLIENT_BASE_URL}/oauth2/authorization/naver`
}
