import '@/styles/globals.css';

import type { Preview } from '@storybook/nextjs';

import { Providers } from '../src/app/providers';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        push() {},
        replace() {},
        prefetch() {},
      },
    },
  },
  decorators: [
    (Story) => (
      <Providers hasRefreshToken={false}>
        <Story />
      </Providers>
    ),
  ],
};

export default preview;
