import { useMemo } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

const ColorPalette = () => {
  const colorList = useMemo(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);

    return [
      // Mono
      { group: 'Mono', name: 'white', className: 'bg-mono-white', cssVar: '--color-mono-white' },
      { group: 'Mono', name: 'black', className: 'bg-mono-black', cssVar: '--color-mono-black' },

      // Gray
      { group: 'Gray', name: '50', className: 'bg-gray-50', cssVar: '--color-gray-50' },
      { group: 'Gray', name: '100', className: 'bg-gray-100', cssVar: '--color-gray-100' },
      { group: 'Gray', name: '200', className: 'bg-gray-200', cssVar: '--color-gray-200' },
      { group: 'Gray', name: '300', className: 'bg-gray-300', cssVar: '--color-gray-300' },
      { group: 'Gray', name: '400', className: 'bg-gray-400', cssVar: '--color-gray-400' },
      { group: 'Gray', name: '500', className: 'bg-gray-500', cssVar: '--color-gray-500' },
      { group: 'Gray', name: '600', className: 'bg-gray-600', cssVar: '--color-gray-600' },
      { group: 'Gray', name: '700', className: 'bg-gray-700', cssVar: '--color-gray-700' },
      { group: 'Gray', name: '800', className: 'bg-gray-800', cssVar: '--color-gray-800' },
      { group: 'Gray', name: '900', className: 'bg-gray-900', cssVar: '--color-gray-900' },
      { group: 'Gray', name: '950', className: 'bg-gray-950', cssVar: '--color-gray-950' },

      // Mint
      { group: 'Mint', name: '50', className: 'bg-mint-50', cssVar: '--color-mint-50' },
      { group: 'Mint', name: '100', className: 'bg-mint-100', cssVar: '--color-mint-100' },
      { group: 'Mint', name: '200', className: 'bg-mint-200', cssVar: '--color-mint-200' },
      { group: 'Mint', name: '300', className: 'bg-mint-300', cssVar: '--color-mint-300' },
      { group: 'Mint', name: '400', className: 'bg-mint-400', cssVar: '--color-mint-400' },
      { group: 'Mint', name: '500', className: 'bg-mint-500', cssVar: '--color-mint-500' },
      { group: 'Mint', name: '600', className: 'bg-mint-600', cssVar: '--color-mint-600' },
      { group: 'Mint', name: '700', className: 'bg-mint-700', cssVar: '--color-mint-700' },
      { group: 'Mint', name: '800', className: 'bg-mint-800', cssVar: '--color-mint-800' },
      { group: 'Mint', name: '900', className: 'bg-mint-900', cssVar: '--color-mint-900' },
      { group: 'Mint', name: '950', className: 'bg-mint-950', cssVar: '--color-mint-950' },

      // Error
      { group: 'Error', name: '500', className: 'bg-error-500', cssVar: '--color-error-500' },
    ].map((color) => ({
      ...color,
      hexValue: styles.getPropertyValue(color.cssVar).trim(),
    }));
  }, []);

  const groups = ['Mono', 'Gray', 'Mint', 'Error'];

  return (
    <div className='p-8'>
      {groups.map((groupName) => (
        <div key={groupName} className='mb-12'>
          <h2 className='mb-6 text-2xl font-bold'>{groupName}</h2>
          <div className='grid grid-cols-4 gap-4 md:grid-cols-6'>
            {colorList
              .filter((color) => color.group === groupName)
              .map((color) => (
                <div key={color.name} className='flex flex-col'>
                  <div
                    className={`h-24 rounded-lg border border-gray-200 shadow-md ${color.className}`}
                  />
                  <p className='text-md mt-2 font-semibold capitalize'>{color.name}</p>
                  <p className='text-xs'>{color.hexValue.toUpperCase()}</p>
                  <code className='text-xs text-gray-600'>{color.className}</code>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const meta: Meta<typeof ColorPalette> = {
  title: 'Foundation/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

export const AllColors: Story = {};
