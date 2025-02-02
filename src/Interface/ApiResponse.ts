export default interface apiResponse {
  data?: {
    statusCode?: number;
    isSuccess?: boolean;
    errorList?: Array<string>;
    result?:{
        [key:string]:string;
    };
  };
  error?: any;
}
