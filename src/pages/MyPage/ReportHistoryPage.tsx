import ReceiptModal from '../../components/ReceiptModal/ReceiptModal'

const ReportHistoryPage = () => {
  return (
    <div className="flex flex-col gap-3 bg-gray-400 p-10">
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
      ></ReceiptModal>
      <ReceiptModal
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
      ></ReceiptModal>
    </div>
  )
}

export default ReportHistoryPage
