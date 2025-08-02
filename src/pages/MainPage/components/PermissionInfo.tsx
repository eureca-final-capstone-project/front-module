import Button from '../../../components/Button/Button'
import { PERMISSION_MESSAGES } from '../../../constants/permission'
import { usePermissionStore } from '../../../store/authStore'

interface PermissionInfoProps {
  onClose: () => void
}
const PermissionInfo = ({ onClose }: PermissionInfoProps) => {
  const permissions = usePermissionStore(state => state.permissions)
  const restrictions = Object.entries(PERMISSION_MESSAGES)
    .filter(([key]) => !permissions.includes(key))
    .map(([, msg]) => msg)

  return (
    <div className="space-y-8">
      <h2 className="text-fs20 text-center font-semibold text-gray-800">{'[접근 제한 안내]'}</h2>
      <div className="space-y-5">
        <p className="px-1 text-gray-700">
          회원님의 계정이 신고가 누적되어 다음 기능들이 제한되었습니다:
        </p>
        {restrictions.length > 0 ? (
          <ul className="text-error list-inside list-disc px-3">
            {restrictions.map((item, idx) => (
              <li key={idx} className="py-0.5">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">제한된 기능이 없습니다.</p>
        )}
        <p className="px-1 whitespace-pre-line text-gray-700">서비스 이용에 참고 부탁드립니다.</p>
      </div>
      <Button onClick={onClose} text="확인" className="bg-pri-500 text-gray-10 w-full" />
    </div>
  )
}

export default PermissionInfo
