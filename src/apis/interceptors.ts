import { AxiosInstance } from 'axios'

/**
 * 클라이언트 인스턴스에 요청 인터셉터를 등록하여 accessToken 자동 주입
 *
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
 * 클라이언트 인스턴스에 401 토큰 만료 감지 및 자동 토큰 갱신 인터셉터 등록
 *
 * - 서버가 401 상태와 errorCode 'TOKEN_EXPIRED'를 반환할 때만 accessToken 갱신 시도
 * - refreshToken으로 갱신 성공 시 원래 요청을 재시도하여 반환
 * - refreshToken도 만료되거나 갱신 실패 시 로그인 페이지로 이동하여 재로그인 유도
 * - 무한 루프 방지를 위해 `_retry` 플래그를 사용
 *
 * @param client axios 인스턴스
 */
export const attachResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config

      const isTokenExpired =
        error.response?.status === 401 && error.response?.data?.errorCode === 'TOKEN_EXPIRED' // 서버 기준에 맞게 수정 필요

      if (isTokenExpired && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
        originalRequest._retry = true
        try {
          const res = await client.post('/auth/refresh')
          const newAccessToken = res.data.accessToken
          sessionStorage.setItem('accessToken', newAccessToken)
          return client(originalRequest)
        } catch (refreshError) {
          // logout()
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )
}
