export interface CommonErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errorCode?: string;
}

export interface CommonSuccessResponse<T> {
  status: number;
  success: boolean;
  data: T;
}
