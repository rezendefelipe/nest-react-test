import { AuthType } from '../../modules/login/types/AuthType';
import { URL_AUTH, URL_USER } from '../constants/urls';
import { connectionAPIDelete, connectionAPIGet, connectionAPIPost, connectionAPIPut } from '../functions/connections/connectionAPI';
import { useNavigate } from 'react-router-dom';
import { notifications } from "@mantine/notifications";
import { setAuthorizationToken } from '../functions/connections/auth';
import { useGlobalContext } from './useGlobalContext';

export const useRequests = () => {
  const navigator = useNavigate();
  const { setUser } = useGlobalContext();

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

  const authRequest = async (body: unknown): Promise<void> => {
    try {
      const resp = await connectionAPIPost<AuthType>(URL_AUTH, body);

      setAuthorizationToken(resp.accessToken);
      setUser(resp.user);

      notifications.show({
        title: 'User Logged.',
        message: '',
      })
      navigator('/');
    } catch (error: unknown) {
      notifications.show({
        title: 'Error on Login.',
        message: '',
        color: 'red'
      });
    }
  };

  const createUserRequest = async (body: unknown): Promise<void> => {
    try {
      await connectionAPIPost<AuthType>(URL_USER, body);

      notifications.show({
        title: 'User created.',
        message: '',
      })
      navigator('/login');
    } catch (error) {
      notifications.show({
        title: 'Error on Create User.',
        message: '',
        color: 'red'
      });
    }
  };

  return {
    getRequest,
    postRequest,
    deleteRequest,
    putRequest,
    authRequest,
    createUserRequest
  };
};
