import axios from 'axios'
import { attachRequestInterceptor, attachResponseInterceptor } from '../interceptors'

const admin = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 요청 시 accessToken 자동 주입 인터셉터 등록
attachRequestInterceptor(admin, 'adminAccessToken')

// 응답 시 토큰 만료 감지 및 자동 토큰 갱신 인터셉터 등록
attachResponseInterceptor(admin, 'adminAccessToken', true)

export default admin
