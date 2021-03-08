import useSWR from 'swr';
import { getInfo } from '../apis/auth.api';
import { PERMISSION_TYPE } from '../../constants';
import { isArray } from '../../utils/util';

export const SWR_KEY_USER = 'user';

export default () => {
  const { data: user, error, mutate } = useSWR(SWR_KEY_USER, getInfo, {
    initialData: null,
    revalidateOnFocus: false,
    refreshInterval: 0,
    shouldRetryOnError: false,
    revalidateOnMount: true,
    errorRetryCount: 3,
    errorRetryInterval: 15000,
    focusThrottleInterval: 5000,
  });
  const isAuthenticated = !error && user != null;
  const isLoading = !user && !error;

  const isHasAnyPermission = ({ permission, type = PERMISSION_TYPE.FULL }) => {
    let rs = false;
    if (user && user.permissions) {
      let perms;
      if (isArray(permission)) {
        perms = permission;
      } else {
        perms = [permission];
      }

      for (let i = 0; i <= perms.length; i += 1) {
        const perm = perms[i];
        if (user.permissions[`action${perm}`]) {
          rs = true;
          break;
        }
      }
    }

    return rs;
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    getUser: mutate,
    isHasAnyPermission,
  };
};
