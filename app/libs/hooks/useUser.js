import useSWR from 'swr';
import { getInfo } from '../apis/auth.api';

export const SWR_KEY_USER = 'user';

export default () => {
  const { data: user, error, mutate } = useSWR(SWR_KEY_USER, getInfo, {
    initialData: null,
  });
  const isAuthenticated = !error && user != null;
  const isLoading = !user && !error;

  return {
    isAuthenticated,
    isLoading,
    user,
    getUser: mutate,
  };
};
