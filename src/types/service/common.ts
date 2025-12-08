export interface CommonErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errorCode?: string;
}
