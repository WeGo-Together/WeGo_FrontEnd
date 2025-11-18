// config/eslint-rules/page-default-export-naming.js
const config = {
  meta: {
    type: 'problem',
    docs: {
      description: 'page.tsx의 default export는 Page로 끝나야 합니다',
    },
    messages: {
      invalidName: 'page.tsx의 default export 컴포넌트는 "Page"로 끝나야 합니다. (현재: {{name}})',
    },
  },
  create(context) {
    const filename = context.filename;

    if (!filename.endsWith('page.tsx')) {
      return {};
    }

    // 파일 내 모든 변수 선언 추적
    const declaredVariables = new Map();

    return {
      // 변수 선언 수집
      VariableDeclarator(node) {
        if (node.id.type === 'Identifier') {
          declaredVariables.set(node.id.name, node);
        }
      },

      // default export 체크
      ExportDefaultDeclaration(node) {
        let componentName = null;

        // export default function ComponentName() {}
        if (node.declaration.type === 'FunctionDeclaration' && node.declaration.id) {
          componentName = node.declaration.id.name;
        }
        // export default ComponentName (변수 참조)
        else if (node.declaration.type === 'Identifier') {
          componentName = node.declaration.name;
        }
        // export default () => {} (익명 함수는 체크 안함)
        else if (
          node.declaration.type === 'ArrowFunctionExpression' ||
          node.declaration.type === 'FunctionExpression'
        ) {
          context.report({
            node,
            message: 'page.tsx의 default export는 이름이 있는 컴포넌트여야 합니다.',
          });
          return;
        }

        if (componentName && !componentName.endsWith('Page')) {
          context.report({
            node,
            messageId: 'invalidName',
            data: { name: componentName },
          });
        }
      },
    };
  },
};

export default config;
