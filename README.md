<div align="center">
  
# 🔥 WeGo 🔥

</div>

<table align='center'>
  <thead>
    <tr>
      <th width="400px">관리 문서</th>
      <th width="400px">관련 링크</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <h3><a href='https://www.notion.so/MSWProvider-2b353353e9c1804b9b25d269c0c0f5b4?source=copy_link'>📜 프로젝트 수행 계획서</a></h3>
        <h3><a href='https://www.figma.com/design/mnEc0l7EpYrnA5kwi8h17z/WeGo---Prototype?node-id=290-741&p=f&t=T50GX1Aa1R78OX8J-0'>🎨 디자인 시안</a></h3>
        <h3><a href='https://github.com/WeGo-Together/WeGo_BackEnd/wiki'>🗃️ API 명세서</a></h3>
      </td>
      <td>
        <h3><a href='https://wego.monster/'>🚀 배포 사이트</a></h3>
        <h3><a href='https://main--6921b0f53b7a664723f48704.chromatic.com/'>📚 스토리북</a></h3>
        <h3><a href='https://wego-together.github.io/front/coverage/lcov-report/'>🔍 테스트 커버리지</a></h3>
      </td>
    </tr>
  </tbody>
</table>

<br/>

---

<details>
  <summary><h2>🚀 프로젝트 설치 가이드</h2></summary>

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

### 4. 환경변수 설정

기본 동작 실행을 위한 환경변수 설정

```bash
// .env.local
# API 요청 주소
NEXT_PUBLIC_API_BASE_URL=https://example.com/api/v1
# MSW 설정
NEXT_PUBLIC_MSW_ENABLED=true // Or false
```

playwright 테스트를 위한 환경변수 설정

```bash
// .env.test
NEXT_PUBLIC_MSW_ENABLED=true
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
│  │  ├─ 🔷 httpClient.ts               # HTTP 클라이언트 (fetch 래퍼)
│  │  └─ 📁 service
│  │     └─ 📁 product                     # Product 엔드포인트
│  │        ├─ 📁 product-get-item
│  │        │  └─ 🔷 index.ts              # getProductItem API
│  │        └─ 📁 product-get-list
│  │           └─ 🔷 index.ts              # getProductList API
│  │
│  ├─ 📁 app                            # Next.js App Router
│  │  ├─ 🧩 layout.tsx                  # 루트 레이아웃
│  │  ├─ 🧩 page.tsx                    # 홈 페이지
│  │  ├─ 📁 login
│  │  │  └─ 🧩 page.tsx
│  │  └─ 📁 details
│  │     └─ 📁 [id]
│  │        └─ 🧩 page.tsx
│  │
│  ├─ 📁 assets                         # 정적 리소스
│  │  ├─ 📁 fonts                       # 로컬 폰트
│  │  │  └─ PretendardVariable.woff2
│  │  └─ 📁 icons                       # SVG 아이콘
│  │     └─ 🖼️ icon-check-blue.svg
│  │
│  ├─ 📁 components                     # 컴포넌트
│  │  ├─ 📁 ui                          # 아톰 컴포넌트
│  │  │  └─ 📁 button                   # 버튼 컴포넌트
│  │  │     ├─ 🧩 index.tsx
│  │  │     ├─ 🧪 index.test.tsx
│  │  │     └─ 📖 index.stories.tsx
│  │  │
│  │  ├─ 📁 shared                      # 공유 컴포넌트
│  │  │  └─ 📁 card                     # 카드 컴포넌트
│  │  │     ├─ 🧩 index.tsx
│  │  │     ├─ 🧪 index.test.tsx
│  │  │     └─ 📖 index.stories.tsx
│  │  │
│  │  └─ 📁 pages                       # 페이지별 컴포넌트
│  │     └─ 📁 login                    # 로그인 페이지용 컴포넌트
│  │        ├─ 🧩 index.tsx             # 여기서 한번에 export
│  │        ├─ 📁 login-form            # 상위 폴더의 이름을 포함하도록 이름 짓기
│  │        │  └─ 🧩 index.tsx
│  │        └─ 📁 login-social-button
│  │           └─ 🧩 index.tsx
│  │
│  ├─ 📁 hooks                          # Custom Hooks
│  │  └─ 📁 use-product
│  │     ├─ 📁 use-product-get-item
│  │     │  └─ 🔷 index.ts              # useGetProductItemQuery
│  │     └─ 📁 use-product-get-list
│  │        └─ 🔷 index.ts              # useGetProductListQuery
│  │
│  ├─ 📁 stores                         # 전역 상태 (Zustand)
│  │  ├─ 📁 use-auth-store
│  │  │  └─ 🔷 index.ts                 # useAuthStore
│  │  ├─ 📁 use-modal-store
│  │  │  └─ 🔷 index.ts                 # useModalStore
│  │  └─ 📁 use-user-store
│  │     └─ 🔷 index.ts                 # useUserStore
│  │
│  ├─ 📁 lib                            # 유틸리티 & 설정
│  │  ├─ 🔷 utils.ts                    # 공통 유틸리티
│  │  ├─ 🔷 query-client.ts             # React Query 설정
│  │  └─ 📁 query-key                   # Query Key 설정
│  │     ├─ 📁 query-key-product        # product 엔드포인트 용 Query Key
│  │     │  └─ 🔷 index.ts
│  │     └─ 📁 query-key-user           # user 엔드포인트 용 Query Key
│  │        └─ 🔷 index.ts
│  │
│  ├─ 📁 mocks                          # MSW 모킹
│  │  ├─ 🔷 index.ts                    # MSW 초기화
│  │  ├─ 🎭 handlers.ts                 # 모든 핸들러 통합 export
│  │  ├─ 🎭 browser.ts                  # 브라우저용 worker
│  │  ├─ 🎭 server.ts                   # 서버용 server
│  │  └─ 📁 endpoints
│  │     └─ 📁 product
│  │        ├─ 🔷 product-handler.ts    # product 엔드포인트 전용 모킹 함수
│  │        └─ 🔷 product-mock.ts       # product 엔드포인트 전용 목 데이터
│  │
│  ├─ 📁 types                          # TypeScript 타입
│  │  ├─ 🔵 global.d.ts                 # 전역 선언 타입
│  │  └─ 📁 service
│  │     ├─ 🔷 product.ts
│  │     └─ 🔷 user.ts
│  │
│  ├─ 📁 providers                      # Provider 컴포넌트
│  │  ├─ 🔷 index.ts                    # provider 한번에 export
│  │  ├─ 📁 provider-query.tsx          # React Query Provider
│  │  │  └─ 🧩 index.tsx
│  │  ├─ 📁 provider-msw.tsx            # MSW Provider
│  │  │  └─ 🧩 index.tsx
│  │  └─ 📁 provider-lazy-motion.tsx    # Framer Motion Provider
│  │     └─ 🧩 index.tsx
│  │
│  ├─ 📁 styles                         # 스타일
│  │  ├─ 🎨 base.css                    # 기본 스타일
│  │  ├─ 🎨 colors.css                  # 색상 변수
│  │  ├─ 🎨 typography.css              # 타이포그래피
│  │  ├─ 🎨 layout.css                  # 레이아웃
│  │  └─ 🎨 animations.css              # 애니메이션
│  │
```

</details>
