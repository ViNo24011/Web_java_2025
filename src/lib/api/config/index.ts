"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useContext, useEffect } from "react";

const PORT = process.env.NEXT_PUBLIC_API_PORT || 3001;
const timeout = 10000;

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
};

const request = axios.create(config);

request.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const BASE_URL = window.location.host.split(":")[0];
      config.baseURL = `http://${BASE_URL}:${PORT}`;
    } else {
      config.baseURL = `http://localhost:${PORT}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const _handleSuccess = (response: any, option: any) => {
  if (option?.success) {
  }
  return response;
};

const _handleError = (response: any, option: any) => {
  if (option?.showError) {
  }
  return response;
};

const optionDefault = {
  success: false,
  showError: false,
};

const apiClient = {
  get: (url: string, data = {}, option: any = optionDefault) => {
    return request({ method: "get", url, params: data })
      .then((res) => _handleSuccess(res, option))
      .catch((err) => _handleError(err, option));
  },
  post: (url: string, data = {}, option: any = optionDefault) => {
    return request({ method: "post", url, data })
      .then((res) => _handleSuccess(res, option))
      .catch((err) => _handleError(err, option));
  },
  put: (url: string, data = {}, option: any = optionDefault) => {
    return request({ method: "put", url, data })
      .then((res) => _handleSuccess(res, option))
      .catch((err) => _handleError(err, option));
  },
  patch: (url: string, data = {}, option: any = optionDefault) => {
    return request({ method: "patch", url, data })
      .then((res) => _handleSuccess(res, option))
      .catch((err) => _handleError(err, option));
  },
  delete: (url: string, data = {}, option: any = optionDefault) => {
    return request({ method: "delete", url, params: data })
      .then((res) => _handleSuccess(res, option))
      .catch((err) => _handleError(err, option));
  },
};

const AxiosInterceptor = ({ children }: any) => {
  useEffect(() => {
    const resInterceptor = (response: any) => {
      return response;
    };

    const errInterceptor = (error: any) => {
      if (error.code === "ERR_NETWORK") {
        return error;
      } else {
        return Promise.reject(error);
      }
    };

    const interceptor = request.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => request.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export { apiClient, AxiosInterceptor };
