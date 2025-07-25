import Header from '../../components/Header/Header'
import Container from '../../components/Container/Container'
import Card from '../../components/Card/Card'
import SectionHeader from './components/SectionHeader'
import RecommendSection from './components/RecommendSection'
import BidSection from './components/BidSection'
import EventBanner from './components/EventBanner'
import Graph from '../../components/Graph/Graph'
import { lineData } from '../../mocks/graphData'
import LatestSection from './components/LatestSection'
import SectionDescription from './components/SectionDescription'
import CallToActionSection from './components/CallToActionSection'
import FadeInUpMotion from '../../components/Animation/FadeInUpMotion'

const MainPage = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center">
      <Header />

      <main className="mt-16 w-full flex-1 sm:mt-21.5">
        {/* 이벤트 배너 */}
        <EventBanner />
        <Container className="my-6 max-w-[1312px] overflow-x-hidden overflow-y-hidden sm:my-10 sm:px-4">
          {/* 상단 멘트 */}
          <FadeInUpMotion custom={1}>
            <Card className="border-pri-500 mb-6 flex min-h-50 justify-center rounded-none border-8 p-5 text-center sm:mb-10 sm:rounded-md sm:py-12 lg:h-60">
              <h1 className="leading-tight font-extrabold text-gray-900">
                <span className="mb-2 block text-2xl sm:text-3xl lg:text-4xl">당신의 데이터,</span>
                <span className="text-pri-600 block text-3xl drop-shadow-md sm:text-4xl lg:text-5xl">
                  새로운 가치를 만나다.
                </span>
              </h1>
              <p className="text-fs14 text-gray-800 sm:text-lg">
                투명하고 안전한 플랫폼에서 <br className="block sm:hidden" />
                <strong>데이터의 잠재력</strong>을 최대한 활용하세요.
              </p>
            </Card>
          </FadeInUpMotion>
          <div className="grid grid-cols-1 gap-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-7">
            {/* 시세 그래프 섹션 */}
            <FadeInUpMotion custom={2}>
              <div className="flex flex-col">
                <SectionDescription text="통신사 별 <span class='text-pri-500 font-bold'>데이터 거래 시세 변동</span>을 한눈에 확인하세요." />
                <Card className="flex min-h-60 justify-start overflow-hidden rounded-none p-5 sm:h-110 sm:rounded-b-md">
                  <SectionHeader title="시세 그래프" iconType="priceGraph" />
                  <Graph type="line" data={lineData} yKeys={['u+', 'kt', 'skt']} height={300} />
                </Card>
              </div>
            </FadeInUpMotion>
            {/* 추천 상품 섹션 */}
            <FadeInUpMotion custom={3}>
              <div className="flex flex-col">
                <SectionDescription text="당신을 위한 <span class='text-pri-500 font-bold'>맞춤형 데이터 상품</span>을 확인하세요." />
                <Card className="flex min-h-75 justify-start overflow-hidden rounded-none p-5 sm:h-110 sm:rounded-b-md">
                  <SectionHeader title="추천 상품" iconType="recommend" />
                  <RecommendSection />
                </Card>
              </div>
            </FadeInUpMotion>
            {/* 진행중인 경매 섹션 */}
            <FadeInUpMotion custom={4}>
              <div className="flex flex-col">
                <SectionDescription text="현재 <span class='text-pri-500 font-bold'>활발히 거래되고 있는 경매</span> 상품을 확인하세요." />
                <Card className="flex min-h-75 justify-start overflow-hidden rounded-none p-5 sm:h-110 sm:rounded-b-md">
                  <SectionHeader
                    title="진행중인 경매"
                    iconType="bid"
                    linkHref={{
                      pathname: '/posts',
                      search: '?statuses=ON_SALE&salesTypeIds=2',
                    }}
                    linkText="전체보기"
                  />
                  <BidSection />
                </Card>
              </div>
            </FadeInUpMotion>
            {/* 최신 상품 섹션 */}
            <FadeInUpMotion custom={5}>
              <div className="flex flex-col">
                <SectionDescription text="방금 등록된 <span class='text-pri-500 font-bold'>따끈따끈한 최신 데이터 상품</span>입니다." />
                <Card className="flex min-h-75 justify-start overflow-hidden rounded-none p-5 sm:h-110 sm:rounded-b-md">
                  <SectionHeader
                    title="최신 상품"
                    iconType="latest"
                    linkHref="/posts"
                    linkText="전체보기"
                  />
                  <LatestSection />
                </Card>
              </div>
            </FadeInUpMotion>
          </div>
          {/* CTA 섹션 */}
          <FadeInUpMotion custom={6}>
            <CallToActionSection />
          </FadeInUpMotion>
        </Container>
      </main>
    </div>
  )
}

export default MainPage
