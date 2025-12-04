// toast.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';

import { Toast } from '.';
import { useToast } from './core';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [(Story) => <Story />],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'info',
    children: '모임 신청 완료! Share the fun',
  },
  parameters: {
    controls: { disabled: true },
  },
  render: () => (
    <div className='space-y-8'>
      <div>
        <h1 className='mb-2 text-2xl font-bold'>Toast</h1>
        <p className='mb-6 text-gray-600'>사용자에게 짧은 알림 메시지를 표시하는 컴포넌트입니다.</p>
      </div>

      <div>
        <h2 className='mb-4 text-xl font-semibold'>Variants</h2>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='border-b'>
              <th className='px-4 py-2 text-left'>Type</th>
              <th className='px-4 py-2 text-left'>Visual</th>
              <th className='px-4 py-2 text-left'>Example Code</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='px-4 py-4'>info</td>
              <td className='px-4 py-4'>
                <Toast type='info'>모임 신청 완료! Share the fun</Toast>
              </td>
              <td className='px-4 py-4'>
                <code className='rounded bg-gray-100 px-2 py-1 text-sm'>
                  {`<Toast type="info">모임 신청 완료! Share the fun</Toast>`}
                </code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
};

export const Code_Snippet: Story = {
  args: {
    type: 'info',
    children: '모임 신청 완료! Share the fun',
  },
  parameters: {
    controls: { disabled: true },
  },
  render: () => {
    const { run } = useToast();

    return (
      <div className='space-y-8'>
        <div>
          <h2 className='mb-4 text-xl font-semibold'>Usage Example</h2>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            onClick={() => {
              console.log('Button clicked');
              run(<Toast type='info'>모임 신청 완료! Share the fun</Toast>);
              console.log('Toast run called');
            }}
          >
            토스트 실행
          </button>
        </div>

        <div>
          <h3 className='mb-2 text-lg font-medium'>Code</h3>
          <pre className='overflow-x-auto rounded bg-gray-100 p-4'>
            <code>{`'use client';

import { Toast } from '@/components/ui/toast';
import { useToast } from '@/components/ui/toast/core';

const HomePage = () => {
  const { run } = useToast();
  return (
    <div>
      <button onClick={() => run(<Toast type='info'>모임 신청 완료! Share the fun</Toast>)}>
        토스트 실행
      </button>
    </div>
  );
};

export default HomePage;`}</code>
          </pre>
        </div>
      </div>
    );
  },
};
