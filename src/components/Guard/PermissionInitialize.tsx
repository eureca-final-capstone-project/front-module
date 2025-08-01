import { useQuery } from '@tanstack/react-query'
import { useAuthStore, usePermissionStore } from '../../store/authStore'
import { getTokenParsed } from '../../apis/tokenParsed'
import { useEffect } from 'react'

const PermissionInitialize = () => {
  const isLogin = useAuthStore(state => state.isLogin)
  const setPermissionInitailized = usePermissionStore(state => state.setPermissionInitialized)
  const setPermissions = usePermissionStore(state => state.setPermissions)

  const { data, isError } = useQuery({
    queryKey: ['permission'],
    queryFn: getTokenParsed,
    enabled: isLogin,
  })

  useEffect(() => {
    if (data) {
      setPermissionInitailized(true)
      setPermissions(data.authorities)
    }
  }, [data, setPermissionInitailized, setPermissions])

  useEffect(() => {
    if (isError) {
      console.error('권한 정보를 가져오는 중 문제가 발생했습니다.')
    }
  }, [isError])

  return null
}

export default PermissionInitialize
