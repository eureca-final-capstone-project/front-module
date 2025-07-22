import { AxiosInstance } from 'axios'

/**
 * 클라이언트 인스턴스에 요청 인터셉터를 등록하여 accessToken 자동 주입
 * - 매 요청 시 최신 accessToken을 sessionStorage 에서 가져와 Authorization 헤더에 설정
 * - accessToken이 존재하지 않으면 Authorization 헤더를 추가하지 않음
 * - 로그인 이후 토큰 갱신 시에도 자동 반영되어 최신 토큰으로 API 요청 가능
 * @param client axios 인스턴스
 */
export const attachRequestInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(
    config => {
      const accessToken = sessionStorage.getItem('accessToken')
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
      return config
    },
    error => Promise.reject(error)
  )
}

/**
 * 클라이언트 인스턴스에 401 인증 만료 감지 및 자동 토큰 갱신 인터셉터 등록
 * - accessToken 만료 시 refreshToken으로 갱신 시도 후 재요청
 * - refreshToken 만료 시 로그인 페이지로 이동
 * @param client axios 인스턴스
 */
export const attachResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/auth/refresh'
      ) {
        originalRequest._retry = true // 재시도 플래그 설정

        try {
          const res = await client.post('/auth/refresh')
          const newAccessToken = res.data.accessToken
          sessionStorage.setItem('accessToken', newAccessToken)
          // 원래 실패했던 요청을 다시 시도하여 반환
          return client(originalRequest)
        } catch (refreshError) {
          // refreshToken도 만료되거나 실패한 경우, 로그인 페이지로 리다이렉트하여 재로그인 유도
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }
      return Promise.reject(error)
    }
  )
}
