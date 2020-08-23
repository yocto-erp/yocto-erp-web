import { useCallback, useState } from 'react';

export const useAsync = ({ asyncApi }) => {
  const [resp, setResp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const exec = useCallback(
    (...args) => {
      setIsLoading(true);
      return asyncApi(args)
        .then(t => setResp(t))
        .finally(() => {
          setIsLoading(false);
        });
    },
    [asyncApi],
  );
  return [isLoading, exec, resp];
};
