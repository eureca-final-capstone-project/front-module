import axios from 'axios'
import { attachResponseInterceptor } from './interceptors'

const client = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 토큰이 쿠키에 저장되어 있다고 가정
})

attachResponseInterceptor(client)

export default client
