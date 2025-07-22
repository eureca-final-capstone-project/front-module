import { agreements } from '../../../constants/agreements'
import CheckBox from '../../../components/CheckBox/CheckBox'
import Button from '../../../components/Button/Button'

interface AgreementProps {
  checked: Record<string, boolean>
  onChange: (id: string, checked: boolean) => void
}

const Agreement = ({ checked, onChange }: AgreementProps) => {
  const allChecked = agreements.every(({ id }) => checked[id])

  const handleAllChange = () => {
    agreements.forEach(({ id }) => onChange(id, !allChecked))
  }

  return (
    <div className="mt-5 flex flex-col">
      <div className="flex items-center gap-2 font-semibold">
        <CheckBox checked={allChecked} onChange={handleAllChange} />
        <span>모두 동의합니다</span>
      </div>
      <div className="flex flex-col">
        {agreements.map(({ id, label, required }) => (
          <div className="flex justify-between">
            <div key={id} className="flex items-center gap-2 px-1 py-2 text-gray-800">
              <CheckBox
                checked={checked[id] || false}
                onChange={() => onChange(id, !checked[id])}
                type="check"
              />
              <span>
                {required && <span>{'[필수] '}</span>}
                {label}
              </span>
            </div>
            <Button
              text="내용 보기"
              shape="underline"
              className="text-fs12 text-gray-400"
              onClick={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Agreement
