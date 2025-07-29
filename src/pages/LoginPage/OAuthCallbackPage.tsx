import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { requestTokenForOAuth } from '../../apis/auth'
import { useAuthStore } from '../../store/authStore'

const OAuthCallbackPage = () => {
  const navigate = useNavigate()
  const calledRef = useRef(false)

  const [searchParams] = useSearchParams()
  const setIsLogin = useAuthStore(state => state.setIsLogin)

  const mutation = useMutation({
    mutationFn: requestTokenForOAuth,
    onSuccess: data => {
      if (data.statusCode === 200) {
        const accessToken = data.data.accessToken
        sessionStorage.setItem('userAccessToken', accessToken)
        setIsLogin(true)

        if (data.data.newUser) {
          navigate('/additional-info')
          return
        }
        navigate('/')
      } else {
        alert('로그인 중 오류가 발생했습니다.')
      }
    },
    onError: () => {
      alert('로그인 중 오류가 발생했습니다.')
    },
  })

  useEffect(() => {
    if (calledRef.current) return
    calledRef.current = true

    const authCode = searchParams.get('authCode')

    if (!authCode) {
      alert('로그인 중 오류가 발생했습니다.')
      navigate('/login')
      return
    }

    mutation.mutate({ authCode })
  }, [searchParams, navigate, mutation])

  return (
    <main>
      <h3>로그인 처리 중입니다...</h3>
    </main>
  )
}

export default OAuthCallbackPage
