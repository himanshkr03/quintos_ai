// types/api.ts

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  status: number;
  message: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}