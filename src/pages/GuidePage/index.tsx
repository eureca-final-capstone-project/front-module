import { ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  FLOW_TITLE,
  GUIDE_HEADER,
  GUIDE_SUB_TITLE,
  GUIDE_INTRO,
  guideFlow,
  guideSteps,
  PLAN_TITLE,
  PROBLEM_EXAMPLE_TITLE,
  PROBLEM_QUOTE,
  PROBLEM_TITLE,
  problemCards,
  SYSTEM_UNIT_TITLE,
  systemUnits,
  valueHighlights,
  PROBLEM_EXAMPLE_CONTENT_1,
  PROBLEM_EXAMPLE_CONTENT_2,
} from '../../constants/guide'
import useScrollToTop from '../../hooks/useScrollToTop'
import Header from '../../components/Header/Header'
import Container from '../../components/Container/Container'
import LightingImg from '@/assets/images/lighting.png'
import GuideHeaderTitleImg from '@/assets/images/guide-header-title.png'
import LogoImg from '@/assets/images/logo.svg'
import IdeaIcon from '@/assets/icons/idea.svg?react'
import StarIcon from '@/assets/icons/star.svg?react'
import PinIcon from '@/assets/icons/pin.svg?react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'
import CallToActionSection from './components/CallToActionSection'
import Footer from '../../components/Footer/Footer'
import ArrowDownWideIcon from '@/assets/icons/arrow-down-wide.svg?react'
import SupportIcon from '@/assets/icons/support.svg?react'
import UserFlowIcon from '@/assets/icons/user-flow.svg?react'
import ThumbsUpIcon from '@/assets/icons/thumbs-up.svg?react'

const SectionTitle = ({ icon, title }: { icon: ReactNode; title: string }) => (
  <motion.h2
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className="mb-12 flex items-center gap-2 font-bold"
  >
    {icon}
    <span className="text-2xl sm:text-4xl">{title}</span>
  </motion.h2>
)

// 카드 애니메이션
const fadeUpCard: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const boxStyle =
  'relative rounded-xl bg-white shadow-lg space-y-1 border border-pri-100 px-6 py-8 transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]'

const GuidePage = () => {
  const systemRef = useRef(null)
  const systemInView = useInView(systemRef, { once: true, amount: 0.3 })

  const problemRef = useRef(null)
  const problemInView = useInView(problemRef, { once: true, amount: 0.3 })

  const planRef = useRef(null)
  const planInView = useInView(planRef, { once: true, amount: 0.3 })

  useScrollToTop()

  return (
    <div className="bg-background flex min-h-screen flex-col items-center">
      <Header />
      <main className="mt-16 w-full flex-1 sm:mt-21.5">
        <section className="bg-guide-gradation min-h-[calc(100vh-64px)] px-4 sm:min-h-[calc(100vh-86px)]">
          <Container className="flex max-w-[1280px] flex-col items-center pb-20">
            <div className="mb-5 max-h-50 max-w-40 sm:max-h-74 sm:max-w-63.5">
              <img src={LightingImg} alt="조명" />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-10 mb-20 flex flex-col gap-3 tracking-tight sm:mb-28"
              >
                <div className="sm:text-fs20 flex items-end gap-1 px-1 text-lg font-bold">
                  <img src={LogoImg} alt="Datcha" className="w-15 sm:w-23" />
                  <div className="translate-y-1/4">{GUIDE_HEADER}</div>
                </div>
                <div>
                  <img src={GuideHeaderTitleImg} alt="당신의 DATA를, 가치로" className="w-141" />
                </div>
                <div className="text-pri-300 self-center text-lg sm:text-2xl">
                  {GUIDE_SUB_TITLE}
                </div>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.3 }}
                className="text-gray-10 text-base leading-6 whitespace-pre-wrap"
              >
                {GUIDE_INTRO}
              </motion.p>
            </div>
          </Container>
        </section>

        <div className="px-4 py-15">
          <Container className="max-w-[1280px] space-y-20 sm:space-y-40">
            {/* 문제 해결 */}
            <section ref={problemRef}>
              {problemInView && (
                <>
                  <SectionTitle
                    icon={<IdeaIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
                    title={PROBLEM_TITLE}
                  />

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.15,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                    className="grid gap-6 sm:grid-cols-2"
                  >
                    <motion.div
                      variants={fadeUpCard}
                      className="bg-pri-100 space-y-2 rounded-xl px-6 py-8 leading-5 text-gray-800 shadow-inner sm:col-span-2"
                    >
                      <strong className="text-fs18 flex items-center gap-1 text-gray-900">
                        <PinIcon className="h-5 w-5" />
                        <span className="font-semibold">{PROBLEM_EXAMPLE_TITLE}</span>
                      </strong>
                      <p className="px-2 text-base whitespace-pre-wrap">
                        {PROBLEM_EXAMPLE_CONTENT_1}
                      </p>
                      <p className="px-2 text-base font-medium">{PROBLEM_EXAMPLE_CONTENT_2}</p>
                    </motion.div>
                    {problemCards.map((item, idx) => (
                      <motion.div key={idx} variants={fadeUpCard} className={boxStyle}>
                        <h3
                          className={`text-fs20 mb-4 font-semibold ${item.color} flex items-center gap-1`}
                        >
                          <item.icon />
                          {item.title}
                        </h3>
                        <ul className="list-disc space-y-1 pl-4 text-gray-700">
                          {item.contents.map((content, i) => (
                            <li key={i} className="text-base">
                              {content}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-pri-600 text-fs18 mt-10 text-center italic sm:mt-15"
                  >
                    {PROBLEM_QUOTE}
                  </motion.p>
                </>
              )}
            </section>

            {/* 시스템 재화 */}
            <section ref={systemRef}>
              {systemInView && (
                <>
                  <SectionTitle
                    icon={<StarIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
                    title={SYSTEM_UNIT_TITLE}
                  />

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    className="grid gap-6 sm:grid-cols-2"
                  >
                    {systemUnits.map(({ imgSrc, title, unit, desc }, idx) => (
                      <motion.div key={idx} variants={fadeUpCard} className={boxStyle}>
                        <img
                          className="absolute top-1/2 right-7.5 -translate-y-1/2"
                          src={imgSrc}
                          alt={title}
                        />
                        <p className="text-pri-500 font-semibold">{unit}</p>
                        <h3 className="text-pri-700 text-fs18 font-semibold">{title}</h3>
                        <p className="relative z-1 text-sm">{desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </section>

            {/* 판매자 & 구매자 입장에서 보기 */}
            <section>
              <SectionTitle
                icon={<UserFlowIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
                title={FLOW_TITLE}
              />

              <div className="space-y-14">
                {guideFlow.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-center gap-10 lg:gap-20 ${
                      idx === 1 ? 'flex-col-reverse sm:flex-row-reverse' : 'flex-col sm:flex-row'
                    }`}
                  >
                    <div className="shadow-header-modal max-w-75 overflow-hidden rounded-md">
                      <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        loop={true}
                        onSwiper={swiper => {
                          setTimeout(() => {
                            swiper.autoplay?.start()
                          }, 100)
                        }}
                      >
                        {item.imgSrc.map((src, idx) => (
                          <SwiperSlide key={idx}>
                            <img src={src} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    <div
                      className={`flex w-full max-w-[636px] flex-col items-center justify-center ${idx === 0 ? 'order-first sm:order-last' : ''}`}
                    >
                      <div className="w-full space-y-10 sm:space-y-14">
                        <div className="flex items-center justify-center gap-3">
                          <item.icon className="h-9 w-9 translate-y-1" />
                          <h3 className="text-fs18 sm:text-fs24 font-semibold">
                            당신이
                            <span className="text-pri-400 text-fs24 sm:text-fs32">
                              <span className="italic">" </span>
                              {item.role}
                              <span className="italic">" </span>
                            </span>
                            라면?
                          </h3>
                        </div>

                        <div className={`flex flex-col gap-4`}>
                          {item.steps.map((step, idx) => (
                            <motion.div
                              initial={{ opacity: 0, x: 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: idx * 0.1 }}
                              className="flex flex-col gap-4"
                            >
                              <div className="bg-gray-10 shadow-card flex items-center gap-2.5 rounded-lg p-3">
                                <div className="rounded-custom-m bg-pri-500 text-gray-10 flex h-9 w-9 items-center justify-center">
                                  {idx + 1}
                                </div>
                                <p className="text-base sm:text-lg">{step}</p>
                              </div>
                              {idx !== item.steps.length - 1 && (
                                <ArrowDownWideIcon className="hidden w-9 self-center sm:block" />
                              )}
                            </motion.div>
                          ))}
                        </div>

                        <div className="bg-pri-200 flex justify-center gap-1 rounded-xs p-1 text-sm sm:items-center sm:text-base">
                          <SupportIcon className="h-5 w-5" />
                          <p>{item.note}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 기획 의도 */}
            <section ref={planRef}>
              {planInView && (
                <>
                  <SectionTitle
                    icon={<ThumbsUpIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
                    title={PLAN_TITLE}
                  />

                  <div className="space-y-8 pl-4">
                    {guideSteps.map(({ step, title, desc }, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="border-pri-400 relative rounded-xl border-l-4 bg-white px-6 py-4 shadow-sm"
                      >
                        <span className="bg-pri-300 absolute top-5 -left-5 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white shadow-md">
                          {step}
                        </span>
                        <h4 className="text-pri-500 mb-1.5 text-lg font-bold">{title}</h4>
                        <p className="text-md text-gray-700">{desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {valueHighlights.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="border-pri-100 flex flex-col items-center rounded-xl border bg-white p-4 shadow"
                      >
                        <item.icon className="h-6 w-6" />
                        <h4 className="text-pri-700 mt-2 font-bold">{item.label}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </section>
            <CallToActionSection />
          </Container>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton className="right-6 bottom-8" />
    </div>
  )
}

export default GuidePage
