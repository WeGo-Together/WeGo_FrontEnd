import { NextRequest } from 'next/server';

import { notificationMockItems } from '@/mock/service/notification/notification-mock';

export const GET = async (req: NextRequest) => {
  const stream = new ReadableStream({
    start(controller) {
      let index = 0;

      const intervalId = setInterval(() => {
        if (index < notificationMockItems.length) {
          const data = JSON.stringify(notificationMockItems[index]);
          // \n\n\ : SSE 메시지 종료를 의미하는 구분자(두줄 바꿈)
          controller.enqueue(`data: ${data}\n\n`);
          index++;
        } else {
          clearInterval(intervalId);
          controller.close();
        }
      }, 0);

      req.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
};
