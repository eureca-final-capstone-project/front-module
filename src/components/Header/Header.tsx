import Container from '../Container/Container'
import LogoPrimary from '@/assets/images/logo-primary.svg'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'
import { useDeviceType } from '../../hooks/useDeviceType'
import SearchIcon from '@/assets/icons/search.svg?react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'

const Header = ({
  showMobileSearch,
  setShowMobileSearch,
}: {
  showMobileSearch: boolean
  setShowMobileSearch: Dispatch<SetStateAction<boolean>>
}) => {
  const navigate = useNavigate()
  const deviceType = useDeviceType()

  const handleSearch = (keyword: string) => {
    navigate(`/list?keyword=${encodeURIComponent(keyword)}`)
  }

  return (
    <header className="bg-gray-10 fixed z-50 flex h-16 w-full items-center p-4 shadow-xs sm:h-21.5">
      <Container className="flex items-center justify-between gap-4">
        <img src={LogoPrimary} alt="로고" className="h-full" />
        {deviceType === 'desktop' || deviceType === 'tablet' ? (
          <>
            {/* 데스크탑, 태블릿 */}
            <SearchBar onSubmit={handleSearch} />
            <div>
              <nav>로그인</nav>
              <nav>거래</nav>
            </div>
          </>
        ) : (
          <>
            {/* 모바일 */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowMobileSearch(prev => !prev)}
                className="cursor-pointer"
              >
                <SearchIcon />
              </button>
              <button>아이콘</button>
            </div>
            <AnimatePresence>
              {showMobileSearch && (
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'top' }}
                  className="bg-gray-10 absolute top-16 right-0 left-0 px-4 pb-4 shadow-xs"
                >
                  <SearchBar onSubmit={handleSearch} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </Container>
    </header>
  )
}

export default Header
