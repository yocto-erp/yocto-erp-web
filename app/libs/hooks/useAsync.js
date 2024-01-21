import { useCallback, useState } from "react";

/**
 * Deprecated, use useApi instead
 * @param asyncApi
 * @return {[boolean,(function(...[*]): *),unknown]}
 */
export const useAsync = ({ asyncApi }) => {
  const [resp, setResp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const exec = useCallback(
    (...args) => {
      setIsLoading(true);
      return asyncApi(...args)
        .then(t => {
          setResp(t);
          return t;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [asyncApi],
  );
  return [isLoading, exec, resp];
};
