import { useQuery } from '@tanstack/react-query'
import { useAuthStore, usePermissionStroe } from '../../store/authStore'
import { getTokenParsed } from '../../apis/tokenParsed'
import { useEffect } from 'react'

const PermissionInitialize = () => {
  const isLogin = useAuthStore(state => state.isLogin)
  const setPermissions = usePermissionStroe(state => state.setPermissions)

  const { data, isError } = useQuery({
    queryKey: ['permission'],
    queryFn: getTokenParsed,
    enabled: isLogin,
  })

  useEffect(() => {
    if (data) {
      setPermissions(data.authorities)
    }
  }, [data, setPermissions])

  useEffect(() => {
    if (isError) {
      console.error('권한 정보를 가져오는 중 문제가 발생했습니다.')
    }
  }, [isError])

  return null
}

export default PermissionInitialize
