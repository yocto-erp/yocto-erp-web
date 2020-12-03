import { useLocation } from 'react-router-dom';
import { parse } from 'qs';

export const useSearchQuery = () => {
  const location = useLocation();
  console.log(location);
  return parse(location.search, { ignoreQueryPrefix: true });
};
