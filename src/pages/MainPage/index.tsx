import Header from '../../components/Header/Header'
import Container from '../../components/Container/Container'
import Card from '../../components/Card/Card'
import SectionHeader from './components/SectionHeader'
import RecommendSection from './components/RecommendSection'
import BidSection from './components/BidSection'
import EventBanner from './components/EventBanner'
import Graph from '../../components/Graph/Graph'
import LatestSection from './components/LatestSection'
import SectionDescription from './components/SectionDescription'
import FadeInUpMotion from '../../components/Animation/FadeInUpMotion'
import { useQuery } from '@tanstack/react-query'
import { transformToGraphData } from '../../utils/graph'
import { getHourlyStatistics } from '../../apis/graph'

const MainPage = () => {
  const { data: statistics, isLoading } = useQuery({
    queryKey: ['hourly-statistics'],
    queryFn: getHourlyStatistics,
  })

  const graphData = statistics
    ? transformToGraphData(statistics).map(entry => {
        const newEntry: Record<string, number> = {}
        Object.entries(entry).forEach(([key, value]) => {
          if (value !== null) newEntry[key] = value
        })
        return newEntry
      })
    : []

  return (
    <div className="bg-background flex min-h-screen flex-col items-center">
      <Header />

      <main className="mt-16 w-full flex-1 sm:mt-21.5">
        {/* 이벤트 배너 */}
        <EventBanner />
        <Container className="my-6 max-w-[1312px] overflow-x-hidden overflow-y-hidden sm:my-10 sm:px-4">
          <div className="grid grid-cols-1 gap-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-7">
            {/* 시세 그래프 섹션 */}
            <FadeInUpMotion custom={1}>
              <div className="flex flex-col">
                <SectionDescription text="통신사 별 <span class='text-pri-500 font-bold'>데이터 거래 시세 변동</span>을 한눈에 확인하세요." />
                <Card className="flex min-h-60 justify-start overflow-hidden rounded-none p-5 sm:h-110 sm:rounded-b-md">
                  <SectionHeader title="시세 그래프" iconType="priceGraph" />
                  {isLoading ? (
                    <p className="flex min-h-75 items-center justify-center">
                      시세 정보를 불러오는 중입니다...
                    </p>
                  ) : (
                    <Graph
                      type="line"
                      data={graphData}
                      yKeys={['LG U+', 'KT', 'SKT']}
                      height={300}
                    />
                  )}
                </Card>
              </div>
            </FadeInUpMotion>
            {/* 추천 상품 섹션 */}
            <FadeInUpMotion custom={2}>
              <div className="flex flex-col">
                <SectionDescription text="당신을 위한 <span class='text-pri-500 font-bold'>맞춤형 데이터 상품</span>을 확인하세요." />
                <Card className="flex min-h-75 justify-start overflow-hidden rounded-none p-5 sm:h-110 sm:rounded-b-md">
                  <SectionHeader title="추천 상품" iconType="recommend" />
                  <RecommendSection />
                </Card>
              </div>
            </FadeInUpMotion>
            {/* 진행중인 경매 섹션 */}
            <FadeInUpMotion custom={3}>
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
            <FadeInUpMotion custom={4}>
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
        </Container>
      </main>
    </div>
  )
}

export default MainPage
