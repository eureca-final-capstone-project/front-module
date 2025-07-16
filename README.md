# 다챠 서비스 프론트엔드 모듈
**Datcha(다챠)** 는 개인 간 데이터를 사고팔 수 있는 데이터 거래 플랫폼입니다.  
해당 프론트엔드 모듈은 다챠 서비스의 전체 사용자용 및 관리자용 웹 애플리케이션을 구성하며, 다음과 같은 역할을 수행합니다:

- 사용자 인터페이스(UI) 및 사용자 경험(UX) 제공
- 데이터 거래, 결제, 인증/인가 등 주요 기능을 시각적으로 구현
- 백엔드 및 데이터베이스와의 연동을 통해 데이터 송수신
- 사용자 액션에 따른 상태 변화와 화면 렌더링 처리

서비스 운영에 필요한 컴포넌트 기반 구조, 반응형 UI, 상태 관리, 데이터 동기화, API 연동 등을 포함하고 있습니다.

---

## 💻 기술 스택

<table>
  <thead>
    <tr>
      <th>기술</th>
      <th>아이콘</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>React</strong></td>
      <td><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" alt="react" /></td>
      <td>사용자 인터페이스 라이브러리</td>
    </tr>
    <tr>
      <td><strong>TypeScript</strong></td>
      <td><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="typescript" /></td>
      <td>정적 타입 기반 자바스크립트</td>
    </tr>
    <tr>
      <td><strong>TailwindCSS</strong></td>
      <td><img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="tailwindcss" /></td>
      <td>유틸리티 퍼스트 CSS 프레임워크</td>
    </tr>
    <tr>
      <td><strong>Vite</strong></td>
      <td><img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white" alt="vite" /></td>
      <td>빠른 번들러 및 개발 서버</td>
    </tr>
    <tr>
      <td><strong>React Query</strong></td>
      <td><img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat&logo=ReactQuery&logoColor=white" alt="react-query" /></td>
      <td>서버 상태 관리 라이브러리</td>
    </tr>
    <tr>
      <td><strong>Zustand</strong></td>
      <td><img src="https://img.shields.io/badge/zustand-FF9E0F?style=flat&logo=zustand&logoColor=white" alt="zustand" /></td>
      <td>경량 글로벌 상태 관리 라이브러리</td>
    </tr>
  </tbody>
</table>

---

## 📁 디렉토리 구조

```
front-module/
├──📦 public/
├──📦 src/
|	├── 📁 assets              # 이미지, svg 등
|	├── 📁 components          # 재사용 가능한 UI 컴포넌트
|	├── 📁 constants           # 상수 정의 (텍스트 등)
|	├── 📁 hooks               # 커스텀 훅
|	├── 📁 layout              # 공통 레이아웃 컴포넌트
|	├── 📁 apis                # API 클라이언트 등
|	├── 📁 pages               # 라우팅 기준 페이지 폴더/컴포
|	├── 📁 store               # 전역 상태 관리 
|	├── 📁 router              # react-router 설정
|	├── 📁 utils               # 유틸 함수들
|	├── 📁 types               # 타입 인터페이스
|	├── main.tsx               # 앱 진입점 (Vite 기준)
|	├── index.css              # 전역 css
|	└── vite-env.d.ts
├── package.json
├── tsconfig.json
├── .gitignore
├── vite.config.ts
├── .env
└── README.md
```

---

## 👩‍💻 팀원
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/nue-os"><img src="https://avatars.githubusercontent.com/u/78434676?v=4" width="120px;" alt=""/><br /><b>김소은</b></a><br /><p>개발</p></td>
      <td align="center"><a href="https://github.com/yeji424"><img src="https://avatars.githubusercontent.com/u/196058650?v=4" width="120px;" alt=""/><br /><b>김예지</b></a><br /><p>개발</p></td>
      <td align="center"><a href="https://github.com/H-JuKyung"><img src="https://avatars.githubusercontent.com/u/148874281?v=4" width="120px;" alt=""/><br /><b>황주경</b></a><br /><p>개발</p></td>
    </tr>
  </tbody>
</table>

---

## 🎯 커밋 컨벤션

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우, 스타일 코드 변경
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드, 리팩토링 테스트 코드 추가
- `build`: 패키지 매니저 수정, 주석 추가/수정/삭제

---

## 🔰 실행 방법

```bash
# 1. 의존성 설치 (루트 디렉토리에서 실행)
npm install

# 2. 클라이언트 및 서버 빌드
npm run build

# 3. 개발 서버 실행
npm run dev
```
