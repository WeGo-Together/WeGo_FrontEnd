export class CommonErrorResponse {
  constructor(
    public type: string,
    public title: string,
    public status: number,
    public detail: string,
    public instance: string,
    public errorCode?: string,
  ) {}
}

export class CommonSuccessResponse<T> {
  constructor(
    public status: number,
    public success: boolean,
    public data: T,
  ) {}
}
