// scripts/sprite/generate-sprite.cjs
const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');
const prettier = require('prettier');

// 색상 변환 적용 파일명 목록
const INCLUDE_COLOR_TRANSFORM = [
  'calendar',
  'chevron-down',
  'chevron-up',
  // 'congratulate',
  // 'cowbell',
  'home',
  'map-pin',
  'message',
  // 'plus-circle',
  'plus',
  'search',
  'small-x',
  'unread-false',
  'unread-true',
  'user',
  'users',
  // 'visibility-false',
  // 'visibility-true',
  // 'wego-logo',
  'x',
];

const config = {
  mode: {
    symbol: {
      dest: 'public',
      sprite: 'sprite.svg',
    },
  },
  shape: {
    id: {
      generator: (name) => {
        const baseName = path.basename(name, '.svg');
        return baseName.replace(/^icon-/, '');
      },
    },
    transform: [
      function (shape, _sprite, callback) {
        const filePath = shape.name || shape.id || shape.base;

        if (!filePath) {
          callback(null);
          return;
        }

        const fileName = path.basename(filePath, '.svg').replace(/^icon-/, '');
        const shouldTransformColors = INCLUDE_COLOR_TRANSFORM.includes(fileName);

        const svgoConfig = {
          plugins: [
            'preset-default',
            ...(shouldTransformColors
              ? [
                  {
                    name: 'convertColors',
                    params: {
                      currentColor: true,
                    },
                  },
                  {
                    name: 'removeAttrs',
                    params: {
                      attrs: '(stroke|fill):(none|black|#000000)',
                    },
                  },
                ]
              : []),
          ],
        };

        const { optimize } = require('svgo');
        const result = optimize(shape.getSVG(), svgoConfig);
        shape.setSVG(result.data);
        callback(null);
      },
    ],
  },
};

// TypeScript 타입 파일 생성 함수
async function generateTypeFile(iconIds) {
  const icons = iconIds.map((id) => ({
    id,
    enableChangeColor: INCLUDE_COLOR_TRANSFORM.includes(id),
  }));

  const typeContent = `// This file is auto-generated. Do not edit manually.

export const ICONS = [
  ${icons.map((icon) => `{ id: '${icon.id}', enableChangeColor: ${icon.enableChangeColor} }`).join(',\n  ')},
] as const;

export type IconId = typeof ICONS[number]['id'];
`;

  const typesDir = path.join(__dirname, '../../src/types/icons');
  const typeFilePath = path.join(typesDir, 'index.ts');

  try {
    const formatted = await prettier.format(typeContent, {
      parser: 'typescript',
      printWidth: 100,
      tabWidth: 2,
      singleQuote: true,
      trailingComma: 'all',
    });

    fs.mkdirSync(typesDir, { recursive: true });
    fs.writeFileSync(typeFilePath, formatted);
    console.log('✅ Type file generated:', typeFilePath);
  } catch (err) {
    console.error('⚠️  Type file generation failed:', err.message);
  }
}

const spriter = new SVGSpriter(config);
const iconIds = [];

const iconsDir = path.join(__dirname, '../../public/icons');
const files = fs.readdirSync(iconsDir);

files.forEach((file) => {
  if (file.endsWith('.svg')) {
    const filePath = path.join(iconsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const iconId = path.basename(file, '.svg').replace(/^icon-/, '');
    iconIds.push(iconId);
    spriter.add(filePath, null, content);
  }
});

spriter.compile(async (error, result) => {
  if (error) {
    console.error('❌ Error generating sprite:', error);
    return;
  }

  for (const mode in result) {
    for (const resource in result[mode]) {
      const outputPath = result[mode][resource].path;
      const content = result[mode][resource].contents.toString();

      try {
        const formatted = await prettier.format(content, {
          parser: 'html',
          printWidth: 100,
          tabWidth: 2,
        });

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, formatted);
      } catch (err) {
        console.error('⚠️  Formatting failed, saving unformatted:', err.message);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, content);
      }
    }
  }

  console.log('✅ Sprite generated and formatted!');

  // 타입 파일 생성
  await generateTypeFile(iconIds.sort());
});
