import { connectionAPIGet, connectionAPIPost } from '../functions/connections/connectionAPI';

export const useRequests = () => {
  const getRequest = async <T>(url: string): Promise<T | undefined> => {
    try {
      return await connectionAPIGet<T>(url);
    } catch (er) {
      console.log(er);
    }
  };

  const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
    try {
      return await connectionAPIPost<T>(url, body);
    } catch (er) {
      console.log(er);
    }
  };

  return {
    getRequest,
    postRequest,
  };
};
