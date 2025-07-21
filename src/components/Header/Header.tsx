import Container from '../Container/Container'
import LogoPrimary from '@/assets/images/logo-primary.svg'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'
import { useDeviceType } from '../../hooks/useDeviceType'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import HeaderNav from './HeaderNav'

const Header = () => {
  const navigate = useNavigate()
  const deviceType = useDeviceType()

  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const handleSearch = (keyword: string) => {
    navigate(`/list?keyword=${encodeURIComponent(keyword)}`)
  }

  return (
    <header className="bg-gray-10 fixed z-50 flex h-16 w-full items-center p-4 shadow-xs sm:h-21.5">
      <Container className="flex max-w-[1280px] items-center justify-between gap-4">
        <div
          onClick={() => {
            setShowMobileSearch(false)
            navigate('/')
          }}
          className="h-full cursor-pointer"
        >
          <img src={LogoPrimary} alt="로고" className="h-full" />
        </div>
        {deviceType !== 'mobile' && <SearchBar onSubmit={handleSearch} />}
        <HeaderNav deviceType={deviceType} setShowMobileSearch={setShowMobileSearch} />

        {/* 모바일일 때, 아래로 내려오는 검색바 */}
        {deviceType === 'mobile' && (
          <AnimatePresence>
            {showMobileSearch && (
              <>
                <div
                  className="fixed inset-0 top-16 z-1"
                  onClick={() => setShowMobileSearch(false)}
                />
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="absolute top-16 right-0 left-0 z-1 p-4"
                >
                  <SearchBar onSubmit={handleSearch} />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}
      </Container>
    </header>
  )
}

export default Header
