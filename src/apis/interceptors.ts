import { AxiosInstance, AxiosRequestConfig } from 'axios'

/**
 * 클라이언트 인스턴스에 요청 인터셉터를 등록하여 accessToken 자동 주입
 *
 * - 매 요청 시 최신 accessToken을 sessionStorage 에서 가져와 Authorization 헤더에 설정
 * - accessToken이 존재하지 않으면 Authorization 헤더를 추가하지 않음
 * - 로그인 이후 토큰 갱신 시에도 자동 반영되어 최신 토큰으로 API 요청 가능
 * @param client axios 인스턴스
 */
export const attachRequestInterceptor = (axiosInstance: AxiosInstance, tokenKey: string) => {
  axiosInstance.interceptors.request.use(
    config => {
      const accessToken = sessionStorage.getItem(tokenKey)
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
      return config
    },
    error => Promise.reject(error)
  )
}

/**
 * 클라이언트 인스턴스에 statusCode 10001 토큰 만료 감지 및 자동 토큰 갱신 인터셉터 등록
 *
 * - statusCode 10001 상태와 errorCode 'TOKEN_EXPIRED'를 반환할 때만 accessToken 갱신 시도
 * - refreshToken으로 갱신 성공 시 원래 요청을 재시도하여 반환
 * - refreshToken도 만료되거나 갱신 실패 시 로그인 페이지로 이동하여 재로그인 유도
 * - 무한 루프 방지를 위해 '_retry' 플래그를 사용
 *
 * - accessToken이 만료된 상태에서 여러 API 동시 요청 대비: 토큰 갱신 요청은 1번만 발생
 * - 이후 요청은 해당 Promise를 공유해 결과 대기
 * - race condition 방지
 *
 * @param axiosInstance axios 인스턴스
 */

let isRefreshing = false
let refreshPromise: Promise<string> | null = null

export const attachResponseInterceptor = (
  axiosInstance: AxiosInstance,
  tokenKey: string,
  isAdmin = false
) => {
  axiosInstance.interceptors.response.use(
    async response => {
      // 서버 응답 데이터에서 실제 데이터 부분 추출
      const data = response.data?.data

      // 토큰 만료 에러 감지: 상태 코드 10001, 상태 이름 TOKEN_EXPIRED 인 경우
      if (data?.statusCode === 10001 && data.statusCodeName === 'TOKEN_EXPIRED') {
        // 원래 요청 객체를 가져옴, _retry 플래그 추가 가능하도록 확장 타입 지정
        const originalRequest = response.config as AxiosRequestConfig & { _retry?: boolean }

        // 이미 재시도 했으면 무한 루프 방지 위해 로그인 페이지로 이동
        if (originalRequest._retry) {
          console.log('이미 갱신 시도 했음!')
          sessionStorage.removeItem(tokenKey)
          window.location.href = isAdmin ? '/admin/login' : '/login'
          return Promise.reject(new Error('토큰 갱신에 실패했습니다.'))
        }

        // 재시도 플래그 설정
        originalRequest._retry = true

        // 토큰 갱신 중인지 체크
        if (!isRefreshing) {
          isRefreshing = true

          // 토큰 재발급 요청 Promise 생성 및 저장
          refreshPromise = axiosInstance
            .get('/auth/re-generate-token')
            .then(res => {
              // 갱신 성공 시 새 토큰 저장 및 반환
              if (res.data.statusCode === 200) {
                console.log('토큰 발급 성공!')
                const newAccessToken = res.data.data.accessToken
                sessionStorage.setItem(tokenKey, newAccessToken)

                return newAccessToken
              } else {
                throw new Error('토큰 갱신에 실패했습니다.')
              }
            })
            .finally(() => {
              // 갱신 완료 후 플래그 초기화
              isRefreshing = false
            })
        }

        try {
          // 토큰 갱신 Promise 대기
          const newAccessToken = await refreshPromise
          console.log('이전 요청 토큰 갱신 발급까지 대기 중...')

          // 원래 요청에 새로운 토큰 헤더 설정
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          }

          // 원래 요청 재시도
          return axiosInstance(originalRequest)
        } catch (error) {
          // 토큰 갱신 실패 시 로그인 페이지로 이동 유도
          sessionStorage.removeItem(tokenKey)
          window.location.href = isAdmin ? '/admin/login' : '/login'
          return Promise.reject(error)
        }
      }

      // 토큰 만료 아닐 경우 정상 응답 반환
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )
}
