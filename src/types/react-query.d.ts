// types/react-query.d.ts
import { CommonErrorResponse } from './service/common';

import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: CommonErrorResponse;
  }
}
