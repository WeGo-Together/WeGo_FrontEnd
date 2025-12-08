// src/components/shared/Icon.stories.tsx
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { Icon, IconId, iconMetadataMap } from '.';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'select',
      options: iconMetadataMap.map((icon) => icon.id),
      description: 'Icon identifier',
    },
    className: {
      control: 'text',
      description: 'CSS classes (supports Tailwind)',
    },
  },
  args: {
    className: 'size-6 text-blue-500',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// 표 형식 갤러리
const iconData = iconMetadataMap;

export const IconTable: Story = {
  args: {
    id: 'home',
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [colorClass, setColorClass] = useState<'text-gray-500' | 'text-mint-500'>(
      'text-gray-500',
    );
    const [sizeClass, setSizeClass] = useState<'size-6' | 'size-10'>('size-6');
    const className = `${sizeClass} ${colorClass}`;

    return (
      <div className='w-full max-w-6xl space-y-4'>
        <div className='sticky top-0 rounded-lg border border-gray-300 bg-white p-4'>
          <div className='grid grid-cols-2 gap-6'>
            {/* 색상 토글 */}
            <div>
              <label className='mb-3 block text-sm font-semibold text-gray-700'>Icon Color:</label>
              <div className='flex gap-2'>
                <button
                  className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                    colorClass === 'text-gray-500'
                      ? 'bg-gray-500 text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setColorClass('text-gray-500')}
                >
                  Gray
                </button>
                <button
                  className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                    colorClass === 'text-mint-500'
                      ? 'bg-mint-500 text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setColorClass('text-mint-500')}
                >
                  Mint
                </button>
              </div>
            </div>

            {/* 크기 토글 */}
            <div>
              <label className='mb-3 block text-sm font-semibold text-gray-700'>Icon Size:</label>
              <div className='flex gap-2'>
                <button
                  className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                    sizeClass === 'size-6'
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSizeClass('size-6')}
                >
                  Small (24px)
                </button>
                <button
                  className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                    sizeClass === 'size-10'
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSizeClass('size-10')}
                >
                  Large (40px)
                </button>
              </div>
            </div>
          </div>
        </div>

        <table className='w-full border-collapse'>
          <thead>
            <tr className='border-b-2 border-gray-300 bg-gray-50'>
              <th className='p-4 text-left font-semibold'>ID</th>
              <th className='p-4 text-center font-semibold'>Color Custom</th>
              <th className='p-4 text-center font-semibold'>Size Custom</th>
              <th className='p-4 text-center font-semibold'>Icon</th>
              <th className='p-4 text-left font-semibold'>Example Code</th>
            </tr>
          </thead>
          <tbody>
            {iconData.map(({ id, variant }) => {
              const enableChangeColor = variant === 'dynamic';
              const enableResize = true;
              return (
                <tr key={id} className='border-b border-gray-200 hover:bg-gray-50'>
                  <td className='p-4 font-mono text-sm'>{id}</td>
                  <td className='p-4 text-center'>
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                        enableChangeColor
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {enableChangeColor ? '✅' : '❌'}
                    </span>
                  </td>
                  <td className='p-4 text-center'>
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                        enableResize
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {enableResize ? '✅' : '❌'}
                    </span>
                  </td>
                  <td className='p-4 text-center'>
                    <Icon id={id as IconId} className={className} />
                  </td>
                  <td className='p-4'>
                    <code className='block rounded bg-gray-100 p-2 text-xs'>
                      {`<Icon id='${id}' className='${className}' />`}
                    </code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
};
