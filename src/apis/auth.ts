import { LoginSchemaType, SignUpRequestType } from '../types/auth'
import client from './client'

export const signUp = async (data: SignUpRequestType) => {
  console.log(data)
  const response = await client.post('/user', data)
  return response.data
}

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
