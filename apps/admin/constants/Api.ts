import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const authRequest: AxiosInstance = axios.create({});
const formDataRequest: AxiosInstance = axios.create({});

const setRequest = async (
  config: AxiosRequestConfig,
  contentType = "application/json"
) => {
  if (config && config.headers)
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: `Bearer dummy`,
      ContentType: contentType
    };

  return config;
};

// API 통신 직전 쿠키에 있는 값으로 헤더를 세팅해줌
authRequest.interceptors.request.use(setRequest);

// API 통신 직전 쿠키에 있는 값으로 헤더를 세팅해줌
formDataRequest.interceptors.request.use(config =>
  setRequest(config, "multipart/form-data")
);

export { authRequest, formDataRequest };
