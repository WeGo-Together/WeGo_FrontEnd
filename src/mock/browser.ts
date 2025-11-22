import { setupWorker } from 'msw/browser';

export const worker = setupWorker();

// worker.events.on('request:start', ({ request }) => {
//   console.log('MSW Client intercepted:', request.method, request.url);
// });

// worker.events.on('request:match', ({ request }) => {
//   console.log('MSW matched:', request.method, request.url);
// });

// worker.events.on('request:unhandled', ({ request }) => {
//   console.log('MSW Client unhandled:', request.method, request.url);
// });
