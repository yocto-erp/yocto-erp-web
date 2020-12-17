import { useLocation } from 'react-router-dom';
import { parse } from 'qs';

export const useSearchQuery = () => {
  const location = useLocation();
  return parse(location.search, { ignoreQueryPrefix: true });
};
