export interface ApiResponse<T> {
  success: boolean;
  msg: string | null;
  data: T;
  errorCode?: number;
  errors?: object[] | [];
}
