import type { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import axios from "axios";
import { env } from "~/constants";
import { getCookieToken } from "~/utils";

type RequestType = "DEFAULT" | "AUTH";
const getInterceptedInstance = (requestType: RequestType) =>
  setInterceptors(
    axios.create({
      baseURL: env.TOPPINGS_SERVER_URL
    }),
    requestType
  );

const setInterceptors = (instance: AxiosInstance, requestType: RequestType) => {
  instance.interceptors.request.use(config => ({
    ...config,
    headers: {
      ...(requestType === "AUTH" && {
        Authorization: `Bearer ${getCookieToken()}`
      })
    }
  }));

  return instance;
};

type SelectedMethod = "get" | "post" | "patch" | "put" | "delete";
const attachMethod =
  (method: SelectedMethod) =>
  (axiosInstance: AxiosInstance) =>
  <T = unknown>(
    url: string,
    config?: Omit<AxiosRequestConfig, "url" | "method">
  ): AxiosPromise<T> =>
    axiosInstance(url, { method, ...config });

const instance = {
  default: getInterceptedInstance("DEFAULT"),
  auth: getInterceptedInstance("AUTH")
};

const http = {
  default: {
    get: attachMethod("get")(instance.default),
    post: attachMethod("post")(instance.default),
    patch: attachMethod("patch")(instance.default),
    put: attachMethod("put")(instance.default),
    delete: attachMethod("delete")(instance.default)
  },
  auth: {
    get: attachMethod("get")(instance.auth),
    post: attachMethod("post")(instance.auth),
    patch: attachMethod("patch")(instance.auth),
    put: attachMethod("put")(instance.auth),
    delete: attachMethod("delete")(instance.auth)
  }
} as const;

export default http;
