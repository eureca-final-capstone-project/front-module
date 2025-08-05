// 헤더 & 인트로
export const GUIDE_HEADER = '서비스 가이드'
export const GUIDE_SUB_TITLE = '데이터 거래를 쉽고, 안전하게,\n 신뢰할 수 있는 거래 플랫폼'

export const GUIDE_INTRO =
  'Datcha는 사용자의 모바일 데이터를 안전하고 효율적으로 거래할 수 있도록 돕는 플랫폼입니다.\n개인정보 노출 없이 거래가 가능하며, 실시간 시세를 기반으로 합리적인 가격 판단을 지원합니다.'

// Section 제목
export const PROBLEM_TITLE = `왜 Datcha가 필요한가요?`
export const SYSTEM_UNIT_TITLE = 'Datcha 시스템 재화 단위 알아보아요!'
export const FLOW_TITLE = '사용자 이용 흐름을 익혀보세요!'
export const PLAN_TITLE = '이 모든 시스템, 당신의 편리함을 위해!'

// 문제 해결
export const PROBLEM_EXAMPLE_TITLE = '실제 사용자 사례:'
export const PROBLEM_EXAMPLE_CONTENT_1 =
  '대학생 A씨는 친구에게 데이터를 보내려다 전화번호를 잘못 입력해 다른 사람에게 데이터를 보내버린 경험이 있습니다. \n이처럼 통신사 선물 시스템의 오류는 누구에게나 일어날 수 있고, 데이터 회수가 불가능해 피해를 봤습니다. '
export const PROBLEM_EXAMPLE_CONTENT_2 =
  'Datcha는 이러한 불편을 플랫폼 자체 거래 시스템으로 해결합니다.'
export const PROBLEM_QUOTE = '"비공식 거래의 불편함을 끝내고, 데이터 거래의 새로운 기준을 만들다."'

import ProblemIcon from '@/assets/icons/problem.svg?react'
import SolutionIcon from '@/assets/icons/solution.svg?react'
// 카드 내용
export const problemCards = [
  {
    icon: ProblemIcon,
    title: '기존 문제',
    color: 'text-error',
    contents: [
      '전화번호 공개 등 개인정보 교환 필수',
      '데이터 선물 기능 사용 시 오류 및 사기 위험',
      '시세 정보 부재로 적정 가격 판단 어려움',
      '중고 거래 플랫폼을 우회하는 복잡한 절차',
    ],
  },
  {
    icon: SolutionIcon,
    title: 'Datcha의 해법',
    color: 'text-success',
    contents: [
      '전화번호 없이 안전한 자체 거래 시스템',
      '실시간 시세 기반으로 가격 판단 가능',
      '데이터 충전권 형태로 거래 자동화',
      '입찰 & 고정가 등 다양한 판매 방식',
    ],
  },
]

import GuideUnitImg from '@/assets/images/guide-unit.svg'
import GuideMoneyImg from '@/assets/images/guide-money.svg'
import GuideDataChargeImg from '@/assets/images/guide-data-charge.svg'
import GuideCouponImg from '@/assets/images/guide-coupon.svg'

// 시스템 재화 단위 설명
export const systemUnits = [
  {
    imgSrc: GuideUnitImg,
    title: '보유 데이터',
    unit: 'MB / GB',
    desc: '사용자가 실제로 보유한 데이터. 1000MB 초과 시 GB로 표시됩니다.',
  },
  {
    imgSrc: GuideUnitImg,
    title: '판매 가능 데이터',
    unit: 'MB / GB',
    desc: '보유 데이터 중 거래를 위해 따로 전환된 데이터. 거래 전용으로 분리 관리됩니다.',
  },
  {
    imgSrc: GuideUnitImg,
    title: '구매 데이터',
    unit: 'MB / GB',
    desc: '데이터 충전권을 통해 충전된 데이터. 판매 데이터로 전환은 불가능합니다.',
  },
  {
    imgSrc: GuideMoneyImg,
    title: '다챠 페이 (₩)',
    unit: '원',
    desc: '1:1 현금 교환 가능한 플랫폼 결제 수단. 충전/환전 모두 가능합니다.',
  },
  {
    imgSrc: GuideDataChargeImg,
    title: '데이터 충전권',
    unit: 'MB / GB',
    desc: '거래 완료 시 자동으로 발급되는 데이터 충전권. 본인의 통신사에서만 사용 가능합니다.',
  },
  {
    imgSrc: GuideCouponImg,
    title: '이벤트 쿠폰',
    unit: '-',
    desc: '특정 이벤트 시 지급되는 할인 코드. 페이 충전 시 사용할 수 있습니다.',
  },
]

// 이용 흐름
import CartIcon from '@/assets/icons/cart.svg?react'
import BasketIcon from '@/assets/icons/basket.svg?react'
import SellerStepImg1 from '@/assets/images/seller-step-1.png'
import SellerStepImg2 from '@/assets/images/seller-step-2.png'
import SellerStepImg3 from '@/assets/images/seller-step-3.png'
import SellerStepImg4 from '@/assets/images/seller-step-4.png'
import SellerStepImg5 from '@/assets/images/seller-step-5.png'
import BuyerStepImg1 from '@/assets/images/buyer-step-1.png'
import BuyerStepImg2 from '@/assets/images/buyer-step-2.png'
import BuyerStepImg3 from '@/assets/images/buyer-step-3.png'
import BuyerStepImg4 from '@/assets/images/buyer-step-4.png'
import BuyerStepImg5 from '@/assets/images/buyer-step-5.png'

export const guideFlow = [
  {
    imgSrc: [SellerStepImg1, SellerStepImg2, SellerStepImg3, SellerStepImg4, SellerStepImg5],
    role: '판매자',
    icon: CartIcon,
    steps: [
      '보유 데이터 중 일부를 판매 가능 데이터로 전환해주세요!',
      '거래 방식(일반/입찰)을 선택하고 판매글 등록해주세요!',
      '다른 사용자가 데이터를 구매해 거래가 완료되면 페이가 지급돼요!',
      '쌓인 페이는 돈처럼 쓸 수 있어요. 환전하거나 데이터를 구매할 때 사용해보세요!',
    ],
    note: '거래 완료 시 데이터 충전권은 구매자에게 자동 발급됩니다.',
  },
  {
    imgSrc: [BuyerStepImg1, BuyerStepImg2, BuyerStepImg3, BuyerStepImg4, BuyerStepImg5],
    role: '구매자',
    icon: BasketIcon,
    steps: [
      '데이터 거래에서 원하는 데이터 상품을 찾아보세요!',
      '구매 예정 정보를 확인하시고 거래를 진행해보세요!',
      '거래가 완료되면 데이터 충전권이 지급돼요!',
      '데이터 충전권을 클릭해 데이터를 충전하세요!',
    ],
    note: '데이터 충전권으로 충전된 데이터는 구매 데이터에 표시됩니다.',
  },
]

// 설계 단계
export const guideSteps = [
  {
    step: '1',
    title: '판매 가능 데이터 분리',
    desc: '보유 데이터 중 판매 가능 데이터를 분리하여 거래 안정성을 확보합니다.',
  },
  {
    step: '2',
    title: '페이 시스템 도입',
    desc: '실물 결제 대신 내부 화폐인 다챠페이로 안전하게 거래할 수 있습니다.',
  },
  {
    step: '3',
    title: '충전권 방식',
    desc: '데이터 거래 시 구매자에게 충전권이 자동으로 발급되며, 마이페이지 > 데이터 충전권에서 사용 가능합니다.',
  },
  {
    step: '4',
    title: '입찰 시스템',
    desc: '판매자가 입찰가를 정하고, 자정에 최종 낙찰자의 페이가 지불되는 구조로 투명한 가격 형성을 유도합니다.',
  },
  {
    step: '5',
    title: '시세 통계 시스템',
    desc: '1시간마다 갱신되는 통신사별 실시간 거래 시세를 제공해 사용자 의사결정을 지원합니다.',
  },
  {
    step: '6',
    title: '알림 시스템',
    desc: '거래, 충전권 상태 변화 및 입찰 정보에 대한 실시간 알림을 제공해 서비스 이용의 편의성을 높입니다.',
  },
]

import LockIcon from '@/assets/icons/lock.svg?react'
import ChartIcon from '@/assets/icons/chart.svg?react'
import DataIcon from '@/assets/icons/data.svg?react'

// 서비스 가치
export const valueHighlights = [
  {
    icon: LockIcon,
    label: '개인정보 보호',
    desc: '전화번호 교환 없이 안전하게 거래',
  },
  {
    icon: ChartIcon,
    label: '실시간 시세',
    desc: '합리적인 거래를 위한 가격 기준 제공',
  },
  {
    icon: DataIcon,
    label: '즉시 충전',
    desc: '구매 후 데이터 즉시 사용 가능',
  },
]
