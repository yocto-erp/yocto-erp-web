import { useCallback, useState } from 'react';

export const useApi = asyncApi => {
  const [state, setState] = useState({
    isLoading: false,
    errors: [],
    resp: null,
  });

  const exec = useCallback(
    (...args) => {
      setState({
        ...state,
        isLoading: true,
      });
      return asyncApi(...args).then(
        t => {
          setState({
            errors: [],
            resp: t,
            isLoading: false,
          });
        },
        err => {
          setState({
            errors: err.errors,
            resp: null,
            isLoading: false,
          });
        },
      );
    },
    [asyncApi],
  );
  return { state, exec };
};
