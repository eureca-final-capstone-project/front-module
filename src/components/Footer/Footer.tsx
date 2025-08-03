import Logo from '@/assets/images/logo.svg'
import FaviconIcon from '@/assets/icons/favicon.svg?react'
import ChevronDownIcon from '@/assets/icons/arrow-bottom.svg?react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface LinkItem {
  name: string
  href?: string
  external?: boolean
  children?: LinkItem[]
}

interface LinkGroup {
  groupName: string
  members: LinkItem[]
}

interface SectionItem {
  name: string
  links?: LinkItem[]
  groups?: LinkGroup[]
}

interface FooterProps {
  type?: 'primary' | 'white'
  marginClassName?: string
}

const Footer = ({ type = 'white', marginClassName = '' }: FooterProps) => {
  const currentYear = new Date().getFullYear()
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLUListElement | null>(null)

  const isWhite = type === 'white'
  const bgClass = isWhite ? 'bg-background' : 'bg-pri-gradation'
  const textClass = isWhite ? 'text-pri-700' : 'text-gray-10'
  const titleClass = isWhite ? 'text-gray-900' : 'text-gray-10'
  const subTextClass = isWhite ? 'text-gray-700' : 'text-pri-100'
  const hoverClass = isWhite ? 'hover:border-b-[0.5px] leading-none' : 'hover:text-pri-400'

  useEffect(() => {
    if (openDropdown && dropdownRef.current) {
      setTimeout(() => {
        dropdownRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 100)
    }
  }, [openDropdown])

  const toggleSection = (sectionName: string) => {
    setOpenSection(openSection === sectionName ? null : sectionName)
  }

  const toggleDropdown = (linkName: string) => {
    setOpenDropdown(openDropdown === linkName ? null : linkName)
  }

  const sections: SectionItem[] = [
    {
      name: '서비스',
      links: [
        { name: '홈', href: '/' },
        { name: '데이터 거래', href: '/posts' },
        { name: '내 판매글', href: '/my-posts' },
        {
          name: '마이페이지',
          children: [
            { name: '데이터 충전권', href: '/mypage/data-charge' },
            { name: '관심 거래', href: '/mypage/favorites' },
            { name: '이벤트 쿠폰함', href: '/mypage/event-coupons' },
            { name: '거래 내역', href: '/mypage/transaction-history' },
            { name: '페이 내역', href: '/mypage/pay-history' },
            { name: '신고 내역', href: '/mypage/report-history' },
          ],
        },
        { name: '이용 방법', href: '/' },
      ],
    },
    {
      name: '계정',
      links: [
        { name: '로그인', href: '/login' },
        { name: '회원가입', href: '/sign-up' },
      ],
    },
    {
      name: '프로젝트 자료',
      links: [
        {
          name: 'GitHub',
          href: 'https://github.com/eureca-final-capstone-project',
          external: true,
        },
        {
          name: 'Notion',
          href: 'https://sleet-emery-a6a.notion.site/2-2225cc39b823809bac27fe909edc5433',
          external: true,
        },
        {
          name: 'Figma',
          href: 'https://www.figma.com/design/uOdC1ZwphMsIq3XXCsRoBn/%EC%B5%9C%EC%A2%85-%EC%9C%B5%ED%95%A9-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-2%EC%A1%B0?node-id=5-2&t=D9i3LLNGJR0GnzHm-1',
          external: true,
        },
      ],
    },
    {
      name: '팀원',
      groups: [
        {
          groupName: '프론트엔드',
          members: [{ name: '김소은' }, { name: '김예지' }, { name: '황주경' }],
        },
        {
          groupName: '백엔드',
          members: [{ name: '박소연' }, { name: '서보인' }, { name: '이종규' }, { name: '장현서' }],
        },
      ],
    },
  ]

  return (
    <footer
      className={`${bgClass} ${isWhite ? 'border-t-[0.5px] border-gray-100' : 'mt-6 sm:mt-0'} w-full px-4 py-6 sm:px-0 sm:py-8 ${marginClassName}`}
    >
      <div className="mx-auto max-w-7xl px-1 sm:px-4">
        {/* 로고 / 설명 */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 text-center sm:flex-row sm:items-center sm:gap-0 md:mb-12">
          {/* 로고 */}
          {isWhite ? (
            <div>
              <FaviconIcon className="h-12 w-12" />
            </div>
          ) : (
            <div>
              <img src={Logo} alt="로고" className="h-10 sm:h-[30%]" />
            </div>
          )}
          {/* 설명 */}
          <div className="text-fs16 md:text-fs18">
            <p className={`${textClass} text-start leading-relaxed font-medium sm:text-end`}>
              데이터 거래의 새로운 기준,
              <br />
              당신의 잠재된 데이터 가치를 깨워보세요.
            </p>
          </div>
        </div>

        {/* 링크 섹션 */}
        <div className="grid grid-cols-2 gap-x-14 text-center md:grid-cols-4 md:justify-items-center md:gap-4 md:text-left">
          {sections.map(section => (
            <div key={section.name} className="w-full">
              {/* 모바일 제목 */}
              <button
                className={`${titleClass} text-fs14 sm:text-fs16 flex w-full items-center justify-between pb-4 font-medium sm:font-semibold md:hidden`}
                onClick={() => toggleSection(section.name)}
              >
                {section.name}
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-300 ${
                    openSection === section.name ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* 데스크톱 제목 */}
              <h4 className={`${titleClass} text-fs16 mb-4 hidden font-semibold md:block`}>
                {section.name}
              </h4>

              {/* 서비스 / 계정 / 프로젝트 자료 */}
              {section.links && (
                <ul
                  className={`${subTextClass} text-fs14 mb-6 space-y-3 overflow-hidden text-start font-light transition-all duration-300 ease-in-out md:pb-0 ${
                    openSection === section.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } md:block md:max-h-full md:opacity-100`}
                >
                  {section.links.map(link => (
                    <li key={link.name}>
                      {link.children ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(link.name)}
                            className={`${isWhite ? '' : 'hover:text-pri-400'} text-fs14 flex items-center justify-between gap-1.5 text-left transition-colors`}
                          >
                            {link.name}
                            <motion.div
                              animate={{ rotate: openDropdown === link.name ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDownIcon className="ml-1 h-3 w-3" />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {openDropdown === link.name && (
                              <motion.ul
                                ref={dropdownRef}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 space-y-2 pb-2 pl-3"
                              >
                                {link.children.map(childLink => (
                                  <li key={childLink.name}>
                                    <a
                                      href={childLink.href}
                                      target={childLink.external ? '_blank' : '_self'}
                                      rel={childLink.external ? 'noopener noreferrer' : ''}
                                      className={`${hoverClass} text-fs14 font-light transition-colors`}
                                    >
                                      {childLink.name}
                                    </a>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : '_self'}
                          rel={link.external ? 'noopener noreferrer' : ''}
                          className={`${hoverClass} inline-block transition-colors`}
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {/* 팀원 */}
              {section.groups && (
                <div
                  className={`transition-all duration-300 ease-in-out ${openSection === section.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} flex justify-start gap-x-6 md:max-h-full md:space-y-0 md:gap-x-8 md:opacity-100`}
                >
                  {section.groups.map(group => (
                    <div key={group.groupName} className="flex-shrink-0">
                      {' '}
                      <p className={`${subTextClass} text-fs14 mb-3`}>{group.groupName}</p>
                      <ul
                        className={`${isWhite ? 'text-gray-700' : 'text-pri-200'} text-fs14 mb-6 space-y-1 text-start font-light md:mb-0`}
                      >
                        {group.members.map(member => (
                          <li key={member.name}>{member.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 저작권 */}
        <div
          className={`${titleClass} text-fs14 mt-0 border-t border-gray-100 pt-6 text-center font-light md:mt-6`}
        >
          <p className="mb-2">&copy; {currentYear} Datcha. All rights reserved.</p>
          <p>
            본 서비스는 <strong>Toss Payments</strong>를 통해 안전하게 결제됩니다.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
