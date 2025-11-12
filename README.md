# My App

Next.js 프로젝트 기본 세팅

## 주요 기능

### 프레임워크 & 라이브러리

- **Next.js 16** - React 프레임워크 (Turbopack)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 스타일링

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

# Orval API 클라이언트 생성
npx orval
```

## 참고

프로젝트 세팅은 [Project Setup Guide](https://github.com/Chiman2937/Project-Setup-Guide/tree/main)를 기반으로 생성했습니다.
