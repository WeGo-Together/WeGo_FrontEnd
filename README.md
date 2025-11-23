<div align="center">
  
# 🔥 WeGo 🔥

</div>

> **주의**: 이 프로젝트는 pnpm을 사용합니다. npm은 지원하지 않습니다.

<details>
  <summary><h2>📜 개발 관련 문서</h2></summary>

- [[🔗 프로젝트 수행 계획서]](https://www.notion.so/MSWProvider-2b353353e9c1804b9b25d269c0c0f5b4?source=copy_link)

- [[🔗 프로젝트 가이드 문서(기본 제공)]](https://codeit.notion.site/fd8eae01cd8e41e39d01c81c3a942814)
- [[🔗 SWAGGER(기본 제공)]](https://fe-adv-project-together-dallaem.vercel.app/)
- [[🔗 디자인 시안(기본 제공)]](https://fe-adv-project-together-dallaem.vercel.app/)

</details>

<details>
  <summary><h2>ℹ️ 주요 설정</h2></summary>

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

</details>

<details>
  <summary><h2>🚀 프로젝트 설치 및 가이드</h2></summary>

### 1. Corepack 활성화 (최초 1회)

이 프로젝트는 global pnpm 설치 대신 Node.js 내장 Corepack을 사용합니다.

```bash
# Windows: 관리자 권한으로 PowerShell/CMD 실행 후
corepack enable

# macOS/Linux: sudo 권한으로 실행
sudo corepack enable
```

### 2. 프로젝트 다운로드

```bash
git clone https://github.com/WeGo-Together/WeGo_FrontEnd.git
cd wego
```

### 3. 의존성 설치

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
```

</details>

<details>
  <summary><h2>📁 폴더 구조</h2></summary>

```
my-app
├─ 📁 public                            # 정적 파일
│  └─ 📁 images                         # 이미지 파일 모음
│
├─ 📁 src
│  ├─ 📁 api                            # API 관련
│  │  ├─ 📄 httpClient.ts               # HTTP 클라이언트 (fetch 래퍼)
│  │  ├─ 📁 endpoints                   # API 엔드포인트 함수
│  │  │  └─ 📄 getUser.ts
│  │  └─ 📁 types                       # API 타입 정의
│  │     └─ 📄 index.ts
│  │
│  ├─ 📁 app                            # Next.js App Router
│  │  ├─ 📄 layout.tsx                  # 루트 레이아웃
│  │  ├─ 📄 page.tsx                    # 홈 페이지
│  │  ├─ 📁 login
│  │  │  └─ 📄 page.tsx
│  │  └─ 📁 details
│  │     └─ 📁 [id]
│  │        └─ 📄 page.tsx
│  │
│  ├─ 📁 assets                         # 정적 리소스
│  │  ├─ 📁 fonts                       # 로컬 폰트
│  │  │  └─ 📄 PretendardVariable.woff2
│  │  └─ 📁 icons                       # SVG 아이콘
│  │     └─ 📄 icon_check_blue.svg
│  │
│  ├─ 📁 components                     # 컴포넌트
│  │  ├─ 📁 common                      # 공통 컴포넌트
│  │  │  ├─ 📁 Button
│  │  │  │  ├─ 📄 Button.tsx
│  │  │  │  └─ 📄 Button.test.tsx
│  │  │  ├─ 📁 Input
│  │  │  │  └─ 📄 Input.tsx
│  │  │  └─ 📁 Modal
│  │  │     └─ 📄 Modal.tsx
│  │  │
│  │  └─ 📁 pages                       # 페이지별 컴포넌트
│  │     ├─ 📁 login
│  │     │  ├─ 📄 LoginForm.tsx
│  │     │  └─ 📄 SocialLoginButtons.tsx
│  │     └─ 📁 details
│  │        ├─ 📄 DetailsHeader.tsx
│  │        └─ 📄 DetailsContent.tsx
│  │
│  ├─ 📁 hooks                          # Custom Hooks
│  │  ├─ 📄 useAuth.ts
│  │  └─ 📄 useDebounce.ts
│  │
│  ├─ 📁 lib                            # 유틸리티 & 설정
│  │  ├─ 📄 utils.ts                    # 공통 유틸리티
│  │  └─ 📄 queryClient.ts              # React Query 설정
│  │
│  ├─ 📁 mocks                          # MSW 모킹
│  │  ├─ 📄 index.ts                    # MSW 초기화
│  │  ├─ 📄 handlers.ts                 # 모킹 핸들러
│  │  ├─ 📄 browser.ts                  # 브라우저용 worker
│  │  └─ 📄 server.ts                   # 서버용 server
│  │
│  ├─ 📁 providers                      # Provider 컴포넌트
│  │  ├─ 📄 QueryProvider.tsx           # React Query Provider
│  │  └─ 📄 LazyMotionProvider.tsx      # Framer Motion Provider
│  │
│  ├─ 📁 stores                         # 전역 상태 (Zustand)
│  │  ├─ 📄 useAuthStore.ts
│  │  ├─ 📄 useModalStore.ts
│  │  └─ 📄 useUserStore.ts
│  │
│  ├─ 📁 styles                         # 스타일
│  │  ├─ 📄 base.css                       # 기본 스타일
│  │  ├─ 📄 colors.css                     # 색상 변수
│  │  ├─ 📄 typography.css                 # 타이포그래피
│  │  ├─ 📄 layout.css                     # 레이아웃
│  │  └─ 📄 animations.css                 # 애니메이션
│  │
│  └─ 📁 types                          # TypeScript 타입
│     ├─ 📄 common.ts                   # 공통 타입
│     └─ 📄 user.ts                     # 사용자 타입
```

</details>
