// scripts/sprite/generate-sprite.cjs
const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');
const prettier = require('prettier');

// 색상 변환 제외할 파일명 목록
const EXCLUDE_COLOR_TRANSFORM = [
  'congratulate',
  'plus-circle',
  'visibility-false',
  'visibility-true',
  'unread-true',
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
        const shouldTransformColors = !EXCLUDE_COLOR_TRANSFORM.includes(fileName);

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

const spriter = new SVGSpriter(config);

const iconsDir = path.join(__dirname, '../../public/icons');
const files = fs.readdirSync(iconsDir);

files.forEach((file) => {
  if (file.endsWith('.svg')) {
    const filePath = path.join(iconsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
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
});
