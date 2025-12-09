import { CommonSuccessResponse } from '@/types/service/common';

export const createMockSuccessResponse = <T>(data: T): CommonSuccessResponse<T> => ({
  status: 200,
  message: '요청이 정상적으로 처리되었습니다.',
  data,
});

interface CreateErrorResponseType {
  status: number;
  detail: string;
  errorCode: string;
}

export const createMockErrorResponse = ({
  status,
  detail,
  errorCode,
}: CreateErrorResponseType) => ({
  type: `https://example.com/errors/${errorCode}`,
  title: errorCode.toUpperCase(),
  status,
  detail,
  instance: '/api/test',
  errorCode,
});
