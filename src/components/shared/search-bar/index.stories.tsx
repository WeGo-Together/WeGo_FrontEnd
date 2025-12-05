import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { SearchBar } from './index';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    className: { control: 'text' },
    onSearch: { action: 'search' },
    onChange: { action: 'change' },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

// 기본: 내부 상태(uncontrolled)로 동작
export const Default: Story = {
  args: {
    placeholder: '원하는 모임을 검색해보세요.',
  },
};

// 초기값이 있는 uncontrolled 사용 예시
export const WithDefaultValue: Story = {
  args: {
    placeholder: '검색어를 입력하세요.',
    defaultValue: '초기 검색어',
  },
};

// 부모가 value를 제어하는 controlled 사용 예시
export const Controlled: Story = {
  args: {
    placeholder: '제어형 검색 바',
    value: '초기 값',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');

    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
          // Storybook action(onChange)도 같이 호출
          if (typeof args.onChange === 'function') {
            (args.onChange as (value: string) => void)(nextValue);
          }
        }}
      />
    );
  },
};
