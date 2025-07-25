import { Link } from 'react-router-dom'
import Card from '../../../components/Card/Card'

const CallToActionSection = () => {
  return (
    <Card className="shadow-card text-gray-10 bg-pri-gradation mt-10 rounded-none px-4 py-6 text-center sm:rounded-md sm:py-12">
      <h2 className="text-fs18 sm:text-fs24 mb-3 font-bold lg:text-4xl">
        데이터를 거래하고 새로운 가치를 창출하세요!
      </h2>
      <p className="sm:text-fs18 mx-auto mb-3 max-w-xl opacity-95 sm:mb-6">
        복잡한 과정 없이 쉽고 안전하게 <br className="block sm:hidden" />
        데이터를 판매하고 수익을 창출할 수 있습니다.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          to="/" // 판매글 등록 페이지 경로
          className="text-pri-500 shadow-button text-fs18 bg-gray-10 inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold transition-colors duration-300 hover:bg-gray-100"
        >
          내 데이터 판매하기
        </Link>
        <Link
          to="/" // 서비스 소개 페이지 경로
          className="hover:text-pri-500 border-gray-10 text-fs18 shadow-button hover:bg-gray-10 text-gray-10 rounded-full border-2 px-8 py-3 font-semibold transition-colors duration-300"
        >
          Datcha 알아보기
        </Link>
      </div>
    </Card>
  )
}

export default CallToActionSection
