# My App

Next.js 프로젝트 기본 세팅

## 주요 기능

### 프레임워크 & 라이브러리

- **Next.js 15** - React 프레임워크 (Turbopack 지원)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 스타일링

### 개발 도구

- **ESLint** - 코드 품질 검사 및 자동 수정
  - Import 자동 정렬 지원 (simple-import-sort)
  - JSX 속성 자동 정렬 지원 (perfectionist)
  - Next.js 규칙 검사
- **Prettier** - 코드 포매팅
  - Tailwind CSS 클래스 정렬 지원
- **Husky + lint-staged** - Git hooks를 통한 커밋 전 자동 검사

### API & 상태 관리

- **TanStack Query (React Query)** - 서버 상태 관리 및 데이터 페칭
  - DevTools 포함
- **Orval** - OpenAPI/Swagger를 통한 API 클라이언트 자동 생성

### 테스트 & 개발

- **Jest** - JavaScript 테스트 프레임워크
  - React Testing Library 포함
  - jsdom 환경 지원
- **Storybook** - UI 컴포넌트 개발 및 문서화
- **MSW (Mock Service Worker)** - API 모킹

### 유틸리티

- **@faker-js/faker** - 테스트 데이터 생성
- **@svgr/webpack** - SVG를 React 컴포넌트로 변환

## 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint

# Storybook 실행
npm run storybook

# Storybook 빌드
npm run build-storybook
```

## 폴더 구조

```
my-app
├─ 📁 .husky                      # Git hooks 자동화
│  ├─ commit-msg                   # Commitlint 검증
│  └─ pre-commit                   # ESLint 자동 검사
│
├─ .prettierignore                 # Prettier 무시 파일 설정
├─ .prettierrc                     # Prettier 설정
├─ 📁 .storybook                  # Storybook 설정
│  ├─ main.ts                      # Storybook 메인 설정
│  └─ preview.ts                   # 전역 데코레이터 및 파라미터
├─ commitlint.config.cjs           # Commit 메시지 규칙
├─ eslint.config.mjs               # ESLint 설정 (Flat Config)
├─ next.config.ts                  # Next.js 설정
├─ orval.config.ts                 # API 클라이언트 자동 생성 설정
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs              # PostCSS 설정
├─ 📁 public                      # 정적 파일
│  └─ mockServiceWorker.js         # MSW 서비스 워커
├─ README.md
├─ 📁 src
│  ├─ 📁 api                      # API 클라이언트
│  │  └─ httpClient.ts             # Axios/Fetch 인스턴스
│  ├─ 📁 app                      # Next.js App Router
│  │  ├─ favicon.ico
│  │  ├─ font.ts                   # 폰트 설정 (Pretendard)
│  │  ├─ globals.css               # 전역 스타일
│  │  ├─ layout.tsx                # 루트 레이아웃
│  │  ├─ page.tsx                  # 홈페이지
│  │  └─ Providers.tsx             # 전역 Provider 통합
│  ├─ 📁 assets                   # 정적 리소스
│  │  ├─ fonts                     # 로컬 폰트 파일
│  │  │  └─ PretendardVariable.woff2
│  │  └─ icons                     # SVG 아이콘
│  │     └─ icon_check_blue.svg
│  ├─ 📁 components               # 재사용 가능한 UI 컴포넌트
│  │  └─ Button
│  │     ├─ Button.stories.tsx     # Storybook 스토리
│  │     └─ Button.tsx             # 컴포넌트 구현
│  ├─ 📁 lib                      # 유틸리티 함수 및 설정
│  │  ├─ feature.ts                # 기능 플래그 또는 설정
│  │  ├─ queryClient.ts            # React Query 클라이언트 설정
│  │  └─ utils.ts                  # 공통 유틸리티 함수
│  ├─ 📁 mock                     # MSW 모킹 설정
│  │  ├─ browser.ts                # 브라우저용 MSW 설정
│  │  ├─ handlers.ts               # API 모킹 핸들러
│  │  └─ server.ts                 # 서버용 MSW 설정 (테스트)
│  ├─ 📁 providers                # React Provider 컴포넌트
│  │  ├─ LazyMotionProvider.tsx    # Framer Motion 지연 로딩
│  │  ├─ MSWProvider.tsx           # MSW 초기화
│  │  └─ QueryProvider.tsx         # React Query Provider
│  └─ 📁 styles                   # CSS 모듈화
│     ├─ animations.css            # 애니메이션 정의
│     ├─ base.css                  # 기본 스타일 리셋
│     ├─ colors.css                # 색상 변수
│     ├─ layout.css                # 레이아웃 유틸리티
│     └─ typography.css            # 타이포그래피 설정
├─ svg.d.ts                        # SVG TypeScript 타입 선언
└─ tsconfig.json                   # TypeScript 설정
```

## 참고

프로젝트 세팅은 [Project Setup Guide](https://github.com/Chiman2937/Project-Setup-Guide/tree/main)를 기반으로 생성했습니다.
