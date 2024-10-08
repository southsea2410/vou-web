import axios from "axios";

export type BasicResponse<T> = {
  code: number;
  result: T;
};

const httpClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_GATEWAY_URL });

const noTokenClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_GATEWAY_URL });
export { noTokenClient };

export default httpClient;
