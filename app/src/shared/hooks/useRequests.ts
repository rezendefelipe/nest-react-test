import { connectionAPIDelete, connectionAPIGet, connectionAPIPost, connectionAPIPut } from '../functions/connections/connectionAPI';

export const useRequests = () => {
  const getRequest = async <T>(url: string): Promise<T | undefined> => {
    try {
      return await connectionAPIGet<T>(url);
    } catch (er) {
      console.error(er);
    }
  };

  const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
    try {
      return await connectionAPIPost<T>(url, body);
    } catch (er) {
      console.error(er);
    }
  };

  const putRequest = async <T>(url: string, id: number, body: unknown): Promise<T | undefined> => {
    try {
      return await connectionAPIPut<T>(`${url}/${id}`, body);
    } catch (er) {
      console.error(er);
    }
  };

  const deleteRequest = async <T>(url: string, id: number): Promise<T | undefined> => {
    try {
      return await connectionAPIDelete<T>(`${url}/${id}`);
    } catch (er) {
      console.error(er);
    }
  };

  return {
    getRequest,
    postRequest,
    deleteRequest,
    putRequest
  };
};
