import { useState } from 'react'
import Button from '../../components/Button/Button'
import ReceiptModal from '../../components/ReceiptModal/ReceiptModal'

const ReportHistoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="flex flex-col gap-3 bg-gray-400 p-10">
      <Button text="버튼" className="bg-pri-700 text-gray-10 w-full flex-2" onClick={openModal} />
      {isModalOpen && (
        <ReceiptModal
          type="buy"
          pay={1500}
          info={{
            post: {
              type: '입찰',
              data: '500MB',
              price: 4500,
            },
            id: 'CHG20250719',
            time: '2025-07-20 03:00',
            carrier: 'KT',
            totalPay: 1500,
          }}
          onClose={closeModal}
        />
      )}
      {/* <ReceiptModal
        type="charge"
        pay={50000}
        info={{
          id: 'CHG20250719',
          time: '2025-07-19 10:30',
          method: '카드 결제',
          totalPay: 50000,
        }}
      ></ReceiptModal>
      <ReceiptModal
        type="refund"
        pay={50000}
        info={{
          id: 'CHG20250719',
          time: '2025-07-19 10:30',
          method: '카드 결제',
          totalPay: 50000,
        }}
      ></ReceiptModal>
      <ReceiptModal
        type="sell"
        pay={1500}
        info={{
          post: {
            type: '입찰',
            data: '500MB',
            price: 4500,
          },
          id: 'CHG20250719',
          time: '2025-07-20 03:00',
          carrier: 'KT',
          totalPay: 1500,
        }}
      ></ReceiptModal> */}
    </div>
  )
}

export default ReportHistoryPage
