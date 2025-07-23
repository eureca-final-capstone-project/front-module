import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChargeReceipt from './ChargeReceipt'
import TradeReceipt from './TradeReceipt'
import { config } from './config'
import CloseIcon from '../../assets/icons/x.svg?react'
import FadeInUpMotion from '../Animation/FadeInUpMotion'
import CircleCheckIcon from '@/assets/icons/circle-check.svg?react'
export interface ReceiptProps {
  type: 'charge' | 'refund' | 'buy' | 'sell'
  pay: number
  info: {
    id: string
    time: string
    account?: string
    method?: string
    totalPay: number
    carrier?: string
    post?: {
      type: string
      data: string
      price: number
    }
  }
}
interface ReceiptModalProps extends ReceiptProps {
  onClose: () => void
}

const ReceiptModal = ({ type, pay, info, onClose }: ReceiptModalProps) => {
  // const [scrollLocked, setScrollLocked] = useState(false)

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollBarWidth}px`
    // setScrollLocked(true)

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      window.removeEventListener('keydown', handleEsc)
      // setScrollLocked(false)
    }
  }, [onClose])

  const configItem = config[type]
  if (!configItem) return <div>타입에러발생 {type}</div>
  const { title, description } = configItem

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="bg-modal-background fixed inset-0 z-100 flex cursor-pointer items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ backdropFilter: 'blur(1.5px)' }}
      >
        <FadeInUpMotion custom={0} duration={0.3}>
          <div className="relative flex flex-col items-center">
            <div className="shadow-receipt-top bg-pri-100 absolute -top-7 z-10 flex h-14 w-14 items-center justify-center rounded-full">
              <CircleCheckIcon className="h-6.5 w-6.5" />
            </div>
            <div
              className="flex w-82 cursor-default flex-col overflow-hidden rounded-t-md md:w-88"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gray-10 flex flex-col gap-5 px-4 py-9">
                <div className="flex flex-col gap-[0.5rem]">
                  <div className="-mb-2 flex justify-end">
                    <CloseIcon
                      className="transition-smooth cursor-pointer text-gray-400 hover:text-gray-800 focus:text-gray-800"
                      onClick={onClose}
                    />
                  </div>
                  <h2 className="text-fs18 md:text-fs20 text-center font-medium text-gray-900">
                    {title}
                  </h2>
                  <p className="text-fs12 md:text-fs14 text-center text-gray-500">
                    {description}
                  </p>{' '}
                </div>
                <hr className="border-gray-100" />
                <div>
                  {type === 'charge' || type === 'refund' ? (
                    <ChargeReceipt type={type} pay={pay} info={info} />
                  ) : (
                    <TradeReceipt type={type} pay={pay} info={info} />
                  )}
                </div>
              </div>

              <div className="-mt-0.5">
                <svg
                  className="h-4 w-full"
                  viewBox="0 0 352 16"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="receipt-mask">
                    <rect x="0" y="0" width="352" height="16" fill="white" />
                    {Array.from({ length: 11 }).map((_, i) => (
                      <circle key={i} cx={25 + i * 30} cy="16" r="10" fill="black" />
                    ))}
                  </mask>
                  <rect width="352" height="16" fill="#fdfdfd" mask="url(#receipt-mask)" />
                </svg>
              </div>
            </div>
          </div>
        </FadeInUpMotion>
      </motion.div>
    </AnimatePresence>
  )
}

export default ReceiptModal
