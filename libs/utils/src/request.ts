import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  timeout: 3000
});

export function get(url: string, config?: AxiosRequestConfig | undefined) {
  return instance.get(url, config).then((res) => {
    return res.data;
  });
};

export function post(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) {
  return instance.post<any>(url, data, config).then((res) => {
    return res.data;
  });
};
