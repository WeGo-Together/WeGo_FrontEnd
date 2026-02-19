export class CommonErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errorCode: string;

  constructor(data?: Partial<CommonErrorResponse>) {
    this.type = data?.type ?? 'about:blank';
    this.title = data?.title ?? 'Network Error';
    this.status = data?.status ?? 0;
    this.detail = data?.detail ?? '서버와 연결할 수 없습니다.';
    this.instance = data?.instance ?? '';
    this.errorCode = data?.errorCode ?? 'NETWORK_ERROR';
  }
}

export interface CommonSuccessResponse<T> {
  status: number;
  success: boolean;
  data: T;
}
