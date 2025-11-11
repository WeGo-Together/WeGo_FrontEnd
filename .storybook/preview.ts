import '@/app/globals.css';

import type { Preview } from '@storybook/nextjs';

import { primary } from '../src/app/font';

(() => {
  console.log('body className added');
  const addFontClass = () => {
    document.body.classList.add(primary.className);
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
