import Card from '../components/Card/Card'

const PayChargeResultPage = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* default card */}
      <Card>
        <p>기본 카드</p>
      </Card>
      {/* label card */}
      <Card type="label" labelTitle="환전페이">
        <p>카드카드</p>
        <p>카드카드</p>
        <div className="flex justify-between">
          <p>내부 요소 정상 작동 확인용</p>
          <p>잘 됨</p>
        </div>
      </Card>
      {/* notice card */}
      <Card
        type="notice"
        iconTitle="페이 변동 내역 보러가기"
        iconDescription="충전 및 환전, 거래로 변동된 페이 내역을 한 눈에 확인해보세요!"
      />
      {/* warning card */}
      <Card
        type="warning"
        iconTitle="데이터 전환 시, 보유 데이터로 재전환이 불가합니다."
        iconDescription="신중하게 결정해주세요!"
      />
    </div>
  )
}

export default PayChargeResultPage
