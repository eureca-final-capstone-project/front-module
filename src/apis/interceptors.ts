import { AxiosInstance } from 'axios'

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
          await client.post('/auth/refresh')
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
