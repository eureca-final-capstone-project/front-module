import axios from 'axios'
import { attachRequestInterceptor, attachResponseInterceptor } from './interceptors'

const client = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 요청 시 accessToken 자동 주입 인터셉터 등록
attachRequestInterceptor(client)

// 응답 시 401 감지 및 자동 토큰 갱신 인터셉터 등록
attachResponseInterceptor(client)

export default client
