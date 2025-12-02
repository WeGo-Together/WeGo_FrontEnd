import '@/styles/globals.css';

import type { Preview } from '@storybook/nextjs';

import { pretendard } from '../src/lib/fonts';

(() => {
  console.log('body className added');
  const addFontClass = () => {
    document.body.classList.add(pretendard.className);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addFontClass, { once: true });
  } else {
    addFontClass();
  }
})();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
