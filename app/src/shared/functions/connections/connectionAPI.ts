import axios, { AxiosRequestConfig } from 'axios';

import { ERROR_ACCESS_DENIED, ERROR_CONNECTION } from '../../constants/errorStatus';
import { MethodsEnum } from '../../enum/methods.enum';
import { getAuthorizationToken } from './auth';

export default class ConnectionAPI {
  static async call<T>(url: string, method: string, body?: unknown, useToken?: boolean): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const configToken: AxiosRequestConfig = {
      headers: {
        Authorization: getAuthorizationToken(),
        'Content-Type': 'application/json',
      },
    };

    switch (method) {
      case MethodsEnum.GET:
        return (await axios.get<T>(url, useToken ? configToken : config)).data;
      case MethodsEnum.POST:
        return (await axios.post<T>(url, body, useToken ? configToken : config)).data;
      case MethodsEnum.PUT:
        return (await axios.put<T>(url, body, useToken ? configToken : config)).data;
      case MethodsEnum.DELETE:
        return (await axios.delete<T>(url, useToken ? configToken : config)).data;
      case MethodsEnum.PATCH:
        return (await axios.patch<T>(url, body, useToken ? configToken : config)).data;
      default:
        return (await axios.get<T>(url, useToken ? configToken : config)).data;
    }
  }

  static async connect<T>(url: string, method: string, body?: unknown, useToken?: boolean): Promise<T> {
    return ConnectionAPI.call<T>(url, method, body, useToken).catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error('401');
          case 403:
            throw new Error(ERROR_ACCESS_DENIED);
          default:
            throw new Error(ERROR_CONNECTION);
        }
      }
      throw new Error(ERROR_CONNECTION);
    });
  }
}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.GET);
};

export const connectionAPIGetWithToken = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.GET, null, true);
};

export const connectionAPIPost = async <T>(url: string, body?: unknown): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.POST, body);
};

export const connectionAPIPut = async <T>(url: string, body?: unknown): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.PUT, body);
};

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.DELETE);
};

export const connectionAPIPatch = async <T>(url: string, body?: unknown): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.PATCH, body);
};
