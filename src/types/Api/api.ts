export interface ApiError {
  response: {data: {error: InterpretedError}};
}

export interface InterpretedError {
  status: boolean;
  message: string;
}

export interface GetProps {
  serviceUrl: string;
  serviceKey: string;
}

export interface GetResponse {
  data: any;
  status: boolean;
}
