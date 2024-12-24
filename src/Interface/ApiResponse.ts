export default interface apiResponse {
  data?: {
    statusCode?: number;
    isSuccess?: boolean;
    errorMessage?: Array<string>;
    result: [];
  };
  errorList: any;
}
