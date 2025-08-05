import Card from '../../../components/Card/Card'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const scaleDownVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 0.98, transition: { duration: 0.2, ease: 'easeInOut' } },
  tap: { scale: 0.96, transition: { duration: 0.1, ease: 'easeInOut' } },
}

const CallToActionSection = () => {
  const navigate = useNavigate()

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
        <motion.button
          variants={scaleDownVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => {
            navigate('/')
          }}
          className={`transition-smooth cursor-pointer disabled:cursor-not-allowed`}
        >
          <button className="text-pri-500 shadow-button text-fs18 bg-gray-10 inline-flex items-center justify-center rounded-full px-8 py-3.5 font-semibold">
            홈으로 가기
          </button>
        </motion.button>
        <motion.button
          variants={scaleDownVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => {
            navigate('/posts')
          }}
          className={`transition-smooth cursor-pointer disabled:cursor-not-allowed`}
        >
          <button className="border-gray-10 text-fs18 shadow-button text-gray-10 rounded-full border-2 px-8 py-3 font-semibold">
            판매글 둘러보기
          </button>
        </motion.button>
      </div>
    </Card>
  )
}

export default CallToActionSection
