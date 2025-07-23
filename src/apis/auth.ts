import { LoginSchemaType } from '../utils/validation'
import client from './client'

export const login = async (data: LoginSchemaType) => {
  const response = await client.post('/auth/login', data)
  return response.data
}

export const kakaoLogin = () => {
  window.location.href = `${import.meta.env.VITE_CLIENT_BASE_URL}/oauth2/authorization/kakao`
}

export const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_CLIENT_BASE_URL}/oauth2/authorization/google`
}

export const naverLogin = () => {
  window.location.href = `${import.meta.env.VITE_CLIENT_BASE_URL}/oauth2/authorization/naver`
}

export const requestTokenForOAuth = async (data: { authCode: string }) => {
  const response = await client.post('/oauth/token', data)
  return response.data
}
