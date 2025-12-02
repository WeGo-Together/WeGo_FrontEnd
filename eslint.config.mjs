// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// eslint.config.mjs에 규칙 추가
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';

import pageDefaultExportNaming from './config/eslint-rules/page-default-export-naming.js';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '.github/**',
    'scripts/**',
  ]),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      perfectionist: perfectionist,
    },
    rules: {
      /**
       * 함수 선언 규칙
       * - 함수 선언문(function foo(){}) 사용 금지
       * - 화살표 함수(const foo = () => {}) 사용 필수
       *
       * 이유: 일관성 있는 코드 스타일 유지
       */
      'func-style': [
        'error',
        'expression',
        {
          allowArrowFunctions: true,
        },
      ],
      /**
       * 삼항 연산자 사용 규칙
       * - 삼항 연산자 중첩 완전 금지
       *
       * 이유: 코드 가독성 확보
       */
      'no-nested-ternary': 'error',
      /**
       * 사용되지 않는 변수 규칙
       * - 변수명이 언더스코어(_)로 시작하면 미사용 허용
       * - 예: const _unusedVar = 1; ✅
       * - 예: const unusedVar = 1; ❌
       *
       * 이유:
       * - API 응답이나 배열 구조분해에서 일부 값만 필요할 때 명시적 표현
       * - 예: const [first, _second, third] = array;
       * - 예: const { data, _meta } = response;
       */
      // JS용 기본 규칙 비활성화 (TS 규칙 사용)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // export 정렬
      'simple-import-sort/exports': 'warn',
      /**
       * import 구문 정렬 규칙
       * - import 순서를 일관되게 유지하여 가독성 향상
       *
       * 정렬 순서:
       * 1. CSS imports (*.css)
       * 2. Next.js 일반 import
       * 3. Next.js type import
       * 4. React 일반 import
       * 5. React type import
       * 6. 서드파티 라이브러리 (@로 시작하는 패키지 포함)
       * 7. 내부 절대 경로 (@/ 경로)
       * 8. 상대 경로 (./, ../)
       *
       * 예시:
       * import './globals.css';
       * import { cookies } from 'next/headers';
       * import type { Metadata } from 'next';
       * import { useState } from 'react';
       * import type { ReactNode } from 'react';
       * import { clsx } from 'clsx';
       * import { Button } from '@/components/Button';
       * import { helper } from './utils';
       *
       * 이유:
       * - 외부 의존성과 내부 코드를 명확히 구분
       * - import 구문을 찾기 쉽고 관리하기 편함
       * - 코드 리뷰 시 변경사항 파악 용이
       */
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // CSS imports
            ['\\.css$'],
            // Next.js (일반 import)
            ['^next(?!.*type)'],
            // Next.js (type import)
            ['^next.*\\u0000$'],
            // React (일반 import)
            ['^react(?!.*type)'],
            // React (type import)
            ['^react.*\\u0000$'],
            // 서드파티 (외부 라이브러리)
            ['^@?\\w'],
            // 로컬 파일 (@/ 경로)
            ['^@/'],
            // 상대 경로
            ['^\\.'],
          ],
        },
      ],
      /**
       * JSX 속성 정렬 규칙
       * - JSX 요소의 props를 일관된 순서로 정렬하여 가독성 향상
       *
       * 정렬 순서:
       * 1. key - React 리스트 렌더링의 고유 식별자
       * 2. ref - DOM 참조
       * 3. id - HTML id 속성
       * 4. className - 스타일링 클래스
       * 5. style - 인라인 스타일
       * 6. unknown - 기타 일반 props (알파벳 순)
       * 7. callback - 이벤트 핸들러 (onClick, onChange 등)
       *
       * 예시:
       * <Button
       *   key={item.id}
       *   ref={buttonRef}
       *   id="submit-button"
       *   className="primary-btn"
       *   style={{ margin: 10 }}
       *   disabled={isLoading}
       *   type="submit"
       *   onClick={handleClick}
       *   onMouseEnter={handleHover}
       * />
       *
       * 이유:
       * - 중요한 props(key, ref)를 항상 먼저 배치하여 빠른 인식
       * - 이벤트 핸들러를 마지막에 배치하여 데이터 props와 분리
       * - 팀원 간 일관된 코드 스타일 유지
       */

      'perfectionist/sort-jsx-props': [
        'warn',
        {
          type: 'alphabetical',
          order: 'asc',
          groups: ['key', 'ref', 'id', 'className', 'style', 'unknown', 'callback'],
          customGroups: {
            key: 'key',
            ref: 'ref',
            id: 'id',
            className: 'className',
            style: 'style',
            callback: '^on[A-Z].*',
          },
        },
      ],
    },
  },
  /**
   * page.tsx 컴포넌트 네이밍 규칙
   * - page.tsx의 default export 컴포넌트는 반드시 'Page'로 끝나야 함
   * - 파일 경로와 무관하게 컴포넌트명에만 적용
   *
   * 예시:
   * - app/page.tsx → HomePage ✅
   * - app/products/page.tsx → ProductsPage ✅
   * - app/products/[id]/page.tsx → ProductDetailPage ✅
   *
   * 이유:
   * - page 컴포넌트를 다른 일반 컴포넌트와 명확히 구분
   * - 코드 검색 및 디버깅 시 빠른 식별 가능
   * - 팀 전체의 일관된 네이밍 컨벤션 유지
   */
  {
    files: ['**/page.tsx'],
    plugins: {
      local: {
        rules: {
          'page-default-export-naming': pageDefaultExportNaming,
        },
      },
    },
    rules: {
      'local/page-default-export-naming': 'error',
    },
  },
  ...storybook.configs['flat/recommended'],
]);

export default eslintConfig;
