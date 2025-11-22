# My App

Next.js 프로젝트 기본 세팅

> **주의**: 이 프로젝트는 pnpm을 사용합니다. npm은 지원하지 않습니다.

## 주요 기능

### 프레임워크 & 라이브러리

- **Next.js 16** - React 프레임워크 (Turbopack)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 스타일링

### 패키지 관리

- **pnpm (via Corepack)** - 빠르고 효율적인 패키지 매니저
  - npm보다 빠른 설치 속도
  - 디스크 공간 절약 (하드 링크 사용)
  - strict mode로 의존성 관리
  - Corepack을 통해 프로젝트별 pnpm 버전 관리

### 개발 도구

- **ESLint** - 코드 품질 검사 및 자동 수정
  - `simple-import-sort`: Import 문 자동 정렬
  - `eslint-plugin-perfectionist`: JSX 속성 자동 정렬
  - Next.js 권장 규칙 적용
- **Prettier** - 코드 포매팅
  - `prettier-plugin-tailwindcss`: Tailwind CSS 클래스 자동 정렬
- **commitLint**
  - commit message 규칙 검사
- **Husky + lint-staged**
  - Pre-commit: ESLint 자동 검사 및 수정
  - Commit-msg: Commit 메시지 규칙 검증
- **only-allow** - pnpm만 사용 가능하도록 제한 (npm 차단)

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

## 설치

### 1. Corepack 활성화 (최초 1회)

이 프로젝트는 global pnpm 설치 대신 Node.js 내장 Corepack을 사용합니다.

```bash
# Windows: 관리자 권한으로 PowerShell/CMD 실행 후
corepack enable

# macOS/Linux: sudo 권한으로 실행
sudo corepack enable
```

### 2. 의존성 설치

```bash
pnpm install
```

## 스크립트

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트 검사
pnpm lint

# 테스트 실행
pnpm test

# 테스트 커버리지
pnpm test:coverage

# Storybook 실행
pnpm storybook

# Storybook 빌드
pnpm build-storybook

# Orval API 클라이언트 생성
pnpm orval
```

## 폴더 구조

```
my-app
├─ 📁 public                            # 정적 파일
│  └─ 📁 images                         # 이미지 파일 모음
│
├─ 📁 src
│  ├─ 📁 api                            # API 클라이언트
│  │  └─ httpClient.ts                   # Axios/Fetch 인스턴스
│  │
│  ├─ 📁 app                            # Next.js App Router (page.tsx만 관리)
│  │  ├─ page.tsx                        # 홈 페이지
│  │  ├─ 📁 login
│  │  │  └─ page.tsx                     # 로그인 페이지
│  │  └─ 📁 details
│  │     └─ 📁 [id]
│  │        └─ page.tsx                  # 상세 페이지
│  │
│  ├─ 📁 assets                         # 정적 리소스
│  │  ├─ 📁 fonts                       # 로컬 폰트 파일
│  │  │  └─ PretendardVariable.woff2
│  │  └─ 📁 icons                       # SVG 아이콘
│  │     └─ icon_check_blue.svg
│  │
│  ├─ 📁 components                     # 모든 컴포넌트 관리
│  │  ├─ 📁 common                      # 공용 컴포넌트
│  │  │  ├─ 📁 Button
│  │  │  │  ├─ Button.test.tsx           # 테스트 파일
│  │  │  │  └─ Button.tsx                # 버튼 컴포넌트
│  │  │  ├─ 📁 Input
│  │  │  │  └─ Input.tsx
│  │  │  └─ 📁 Modal
│  │  │     └─ Modal.tsx
│  │  │
│  │  └─ 📁 pages                       # 페이지 전용 컴포넌트
│  │     ├─ 📁 login                    # 로그인 페이지 컴포넌트
│  │     │  ├─ LoginForm.tsx
│  │     │  └─ SocialLoginButtons.tsx
│  │     └─ 📁 details                  # 상세 페이지 컴포넌트
│  │        ├─ DetailsHeader.tsx
│  │        └─ DetailsContent.tsx
│  │
│  ├─ 📁 lib                            # 유틸리티 함수 및 설정
│  │  ├─ feature.ts                      # 기능 플래그 또는 설정
│  │  ├─ queryClient.ts                  # React Query 클라이언트 설정
│  │  └─ utils.ts                        # 공통 유틸리티 함수
│  │
│  ├─ 📁 mock                           # MSW 모킹 설정
│  │  ├─ browser.ts                      # 브라우저용 MSW 설정
│  │  ├─ handlers.ts                     # API 모킹 핸들러
│  │  └─ server.ts                       # 서버용 MSW 설정 (테스트)
│  │
│  ├─ 📁 providers                      # React Provider 컴포넌트
│  │  ├─ LazyMotionProvider.tsx          # Framer Motion 지연 로딩
│  │  ├─ MSWProvider.tsx                 # MSW 초기화
│  │  └─ QueryProvider.tsx               # React Query Provider
│  │
│  ├─ 📁 stores                         # 전역 상태 관리 (Zustand)
│  │  ├─ useAuthStore.ts                 # 인증 상태
│  │  ├─ useModalStore.ts                # 모달 상태
│  │  └─ useUserStore.ts                 # 사용자 정보
│  │
│  ├─ 📁 types                          # TypeScript 타입 정의
│  │  ├─ api.ts                          # API 응답 타입
│  │  ├─ common.ts                       # 공통 타입
│  │  └─ user.ts                         # 사용자 관련 타입
│  │
│  └─ 📁 styles                         # CSS 모듈화
│     ├─ animations.css                  # 애니메이션 정의
│     ├─ base.css                        # 기본 스타일 리셋
│     ├─ colors.css                      # 색상 변수
│     ├─ layout.css                      # 레이아웃 유틸리티
│     └─ typography.css                  # 타이포그래피 설정
```

## 참고

프로젝트 세팅은 [Project Setup Guide](https://github.com/Chiman2937/Project-Setup-Guide/tree/main)를 기반으로 생성했습니다.
