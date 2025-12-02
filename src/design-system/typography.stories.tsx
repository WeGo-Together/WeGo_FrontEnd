// src/stories/Typography.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';

const Typography = () => {
  const displays = [
    {
      name: 'Display LG',
      styleInfo: 'Font size: 48px | Line height: 60px | Letter spacing: -2%',
      base: 'text-display-lg',
      sizes: [
        'text-display-lg-regular',
        'text-display-lg-medium',
        'text-display-lg-semibold',
        'text-display-lg-bold',
      ],
    },
    {
      name: 'Display MD',
      styleInfo: 'Font size: 36px | Line height: 44px | Letter spacing: -2%',
      base: 'text-display-md',
      sizes: [
        'text-display-md-regular',
        'text-display-md-medium',
        'text-display-md-semibold',
        'text-display-md-bold',
      ],
    },
    {
      name: 'Display SM',
      styleInfo: 'Font size: 30px | Line height: 38px',
      base: 'text-display-sm',
      sizes: [
        'text-display-sm-regular',
        'text-display-sm-medium',
        'text-display-sm-semibold',
        'text-display-sm-bold',
      ],
    },
    {
      name: 'Display XS',
      base: 'text-display-xs',
      styleInfo: 'Font size: 24px | Line height: 32px',
      sizes: [
        'text-display-xs-regular',
        'text-display-xs-medium',
        'text-display-xs-semibold',
        'text-display-xs-bold',
      ],
    },
  ];

  const texts = [
    {
      name: 'Text XL',
      base: 'text-text-xl',
      styleInfo: 'Font size: 20px | Line height: 30px',
      sizes: [
        'text-text-xl-regular',
        'text-text-xl-medium',
        'text-text-xl-semibold',
        'text-text-xl-bold',
      ],
    },
    {
      name: 'Text LG',
      base: 'text-text-lg',
      styleInfo: 'Font size: 18px | Line height: 28px',
      sizes: [
        'text-text-lg-regular',
        'text-text-lg-medium',
        'text-text-lg-semibold',
        'text-text-lg-bold',
      ],
    },
    {
      name: 'Text MD',
      base: 'text-text-md',
      styleInfo: 'Font size: 16px | Line height: 24px',
      sizes: [
        'text-text-md-regular',
        'text-text-md-medium',
        'text-text-md-semibold',
        'text-text-md-bold',
      ],
    },
    {
      name: 'Text SM',
      base: 'text-text-sm',
      styleInfo: 'Font size: 14px | Line height: 20px',
      sizes: [
        'text-text-sm-regular',
        'text-text-sm-medium',
        'text-text-sm-semibold',
        'text-text-sm-bold',
      ],
    },
    {
      name: 'Text XS',
      base: 'text-text-xs',
      styleInfo: 'Font size: 12px | Line height: 18px',
      sizes: [
        'text-text-xs-regular',
        'text-text-xs-medium',
        'text-text-xs-semibold',
        'text-text-xs-bold',
      ],
    },
    {
      name: 'Text 2XS',
      base: 'text-text-2xs',
      styleInfo: 'Font size: 10px | Line height: 14px',
      sizes: [
        'text-text-2xs-regular',
        'text-text-2xs-medium',
        'text-text-2xs-semibold',
        'text-text-2xs-bold',
      ],
    },
  ];

  return (
    <div className='space-y-12 p-8'>
      <h1 className='mb-8 text-4xl font-bold'>Typography System</h1>

      {/* Display Styles */}
      <section>
        <h2 className='mb-6 border-b pb-2 text-2xl font-bold'>Display Styles</h2>

        <div className='space-y-8'>
          {displays.map((display) => (
            <div key={display.base} className='space-y-4'>
              <div className='flex flex-row gap-4'>
                <h3 className='w-50 text-lg font-semibold text-gray-600'>{display.name}</h3>
                <span className='text-gray-500'>{display.styleInfo}</span>
              </div>
              <div className='space-y-2'>
                {display.sizes.map((size) => {
                  const displayText = size.split('-')[3];
                  const nextDisplayText = displayText[0].toUpperCase() + displayText.substring(1);
                  return (
                    <div key={size} className='flex items-center gap-4'>
                      <span className='w-50 text-sm text-gray-500'>{size}</span>
                      <p className={`${size}`}>{nextDisplayText}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Text Styles */}
      <section>
        <h2 className='mb-6 border-b pb-2 text-2xl font-bold'>Text Styles</h2>
        <div className='space-y-8'>
          {texts.map((text) => (
            <div key={text.base} className='space-y-4'>
              <div className='flex flex-row gap-4'>
                <h3 className='w-50 text-lg font-semibold text-gray-600'>{text.name}</h3>
                <span className='text-gray-500'>{text.styleInfo}</span>
              </div>
              <div className='space-y-2'>
                {text.sizes.map((size) => {
                  const displayText = size.split('-')[3];
                  const nextDisplayText = displayText[0].toUpperCase() + displayText.substring(1);
                  return (
                    <div key={size} className='flex items-center gap-4'>
                      <span className='w-50 text-sm text-gray-500'>{size}</span>
                      <p className={`${size}`}>{nextDisplayText}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof Typography> = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const AllTypography: Story = {};
