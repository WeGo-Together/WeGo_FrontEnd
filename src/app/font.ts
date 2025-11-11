import localFont from 'next/font/local';

export const primary = localFont({
  src: [{ path: '../assets/fonts/PretendardVariable.woff2', weight: '45 920' }],
  variable: '--font-primary',
  display: 'swap',
});
