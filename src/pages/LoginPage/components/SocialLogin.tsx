import KakaoLoginIcon from '@/assets/icons/kakao-login.svg?react'
import GoogleLoginIcon from '@/assets/icons/google-login.svg?react'
import NaverLoginIcon from '@/assets/icons/naver-login.svg?react'
import { googleLogin, kakaoLogin, naverLogin } from '../../../apis/auth'

const socialLogins = [
  { id: 'kakao', label: '카카오 로그인', Icon: KakaoLoginIcon, onClick: kakaoLogin },
  { id: 'google', label: '구글 로그인', Icon: GoogleLoginIcon, onClick: googleLogin },
  { id: 'naver', label: '네이버 로그인', Icon: NaverLoginIcon, onClick: naverLogin },
]

const SocialLogin = () => {
  return (
    <div className="space-y-8">
      <div className="text-gray-30 font-fs14 text-center font-medium sm:text-gray-900">
        SNS 계정으로 간편하게 시작하기
      </div>
      <div className="flex justify-evenly gap-4">
        {socialLogins.map(({ id, label, Icon, onClick }) =>
          Icon ? (
            <button key={id} aria-label={label} className="cursor-pointer" onClick={onClick}>
              <Icon className="h-13 w-13" />
            </button>
          ) : (
            <div key={id}>{label}</div>
          )
        )}
      </div>
    </div>
  )
}

export default SocialLogin
