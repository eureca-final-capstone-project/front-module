import { agreements } from '../../../constants/agreements'
import CheckBox from '../../../components/CheckBox/CheckBox'
import Button from '../../../components/Button/Button'
import { useDeviceType } from '../../../hooks/useDeviceType'

interface AgreementProps {
  checked: Record<string, boolean>
  onChange: (id: string, checked: boolean) => void
}

const Agreement = ({ checked, onChange }: AgreementProps) => {
  const deviceType = useDeviceType()

  const allChecked = agreements.every(({ id }) => checked[id])

  const handleAllChange = () => {
    agreements.forEach(({ id }) => onChange(id, !allChecked))
  }

  return (
    <div className="mt-5 flex flex-col">
      <div className="flex items-center gap-2">
        <CheckBox
          checked={allChecked}
          onChange={handleAllChange}
          type={deviceType === 'mobile' ? 'whiteCheckBox' : 'default'}
        />
        <span className="font-semibold text-gray-100 sm:text-gray-800">모두 동의합니다</span>
      </div>
      <div className="flex flex-col">
        {agreements.map(({ id, label, required }) => (
          <div key={id} className="flex justify-between">
            <div className="flex items-center gap-2 px-1 py-2">
              <CheckBox
                checked={checked[id] || false}
                onChange={() => onChange(id, !checked[id])}
                type={deviceType === 'mobile' ? 'whiteCheck' : 'check'}
              />
              <span className="text-gray-100 sm:text-gray-800">
                {required && <span>{'[필수] '}</span>}
                {label}
              </span>
            </div>
            <Button
              text="내용 보기"
              shape="underline"
              className="text-fs12 text-gray-200 sm:text-gray-400"
              onClick={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Agreement
