import { agreementDetails, agreements } from '../../../constants/agreements'
import CheckBox from '../../../components/CheckBox/CheckBox'
import Button from '../../../components/Button/Button'
import { useDeviceType } from '../../../hooks/useDeviceType'
import { useState } from 'react'
import Modal from '../../../components/Modal/Modal'
import CloseIcon from '@/assets/icons/x.svg?react'

interface AgreementProps {
  checked: Record<string, boolean>
  onChange: (id: string, checked: boolean) => void
}

const Agreement = ({ checked, onChange }: AgreementProps) => {
  const deviceType = useDeviceType()

  const [openedAgreementId, setOpenedAgreementId] = useState<string | null>(null)

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
              onClick={() => setOpenedAgreementId(id)}
            />
          </div>
        ))}
      </div>

      {openedAgreementId && (
        <Modal
          isOpen={!!openedAgreementId}
          onClose={() => setOpenedAgreementId(null)}
          className="relative max-w-139"
        >
          <h2 className="text-fs20 text-center font-semibold">
            {agreements.find(a => a.id === openedAgreementId)?.label || '약관 상세'}
          </h2>
          <CloseIcon
            className="absolute top-6 right-6 h-3.5 w-3.5 cursor-pointer text-gray-400 hover:text-gray-900"
            onClick={() => setOpenedAgreementId(null)}
          />

          {agreementDetails[openedAgreementId].map(({ title, content }, index) => (
            <section key={index} className="mt-8 space-y-3">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-fs14 whitespace-pre-wrap">{content}</p>
            </section>
          ))}
        </Modal>
      )}
    </div>
  )
}

export default Agreement
