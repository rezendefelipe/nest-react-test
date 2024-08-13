import { connectionAPIDelete, connectionAPIGet, connectionAPIPost } from '../functions/connections/connectionAPI';

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

  const deleteRequest = async <T>(url: string, id: number): Promise<T | undefined> => {
    try {
      return await connectionAPIDelete<T>(`${url}/${id}`);
    } catch (er) {
      console.log(er);
    }
  };

  return {
    getRequest,
    postRequest,
    deleteRequest
  };
};
