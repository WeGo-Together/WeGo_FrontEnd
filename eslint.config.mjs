// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// eslint.config.mjs에 규칙 추가
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import perfectionist from 'eslint-plugin-perfectionist';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
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
      // import 정렬
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
      // JSX 속성 정렬
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
  ...storybook.configs['flat/recommended'],
]);

export default eslintConfig;
