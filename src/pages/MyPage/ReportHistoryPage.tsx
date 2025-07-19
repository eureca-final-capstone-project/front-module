import ReceiptCard from '../../components/ReceiptCard/ReceiptCard'

const ReportHistoryPage = () => {
  return (
    <div className="flex flex-col gap-3 bg-gray-400 p-10">
      <ReceiptCard
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
      ></ReceiptCard>
      <ReceiptCard
        type="charge"
        pay={50000}
        info={{
          id: 'CHG20250719',
          time: '2025-07-19 10:30',
          method: '카드 결제',
          totalPay: 50000,
        }}
      ></ReceiptCard>
      <ReceiptCard
        type="refund"
        pay={50000}
        info={{
          id: 'CHG20250719',
          time: '2025-07-19 10:30',
          method: '카드 결제',
          totalPay: 50000,
        }}
      ></ReceiptCard>
      <ReceiptCard
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
      ></ReceiptCard>
    </div>
  )
}

export default ReportHistoryPage
