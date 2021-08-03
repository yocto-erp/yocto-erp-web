import { useCallback, useState } from 'react';

export const API_STATE = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};

export const useApi = asyncApi => {
  const [state, setState] = useState({
    isLoading: false,
    errors: [],
    resp: null,
    status: API_STATE.PENDING,
  });

  const exec = useCallback(
    (...args) => {
      setState({
        ...state,
        isLoading: true,
        status: API_STATE.LOADING,
      });
      return asyncApi(...args).then(
        t => {
          setState({
            errors: [],
            resp: t,
            isLoading: false,
            status: API_STATE.SUCCESS,
          });
          return t;
        },
        err => {
          setState({
            errors: err.errors,
            resp: null,
            isLoading: false,
            status: API_STATE.FAIL,
          });
        },
      );
    },
    [asyncApi],
  );

  return {
    state,
    exec,
    reset: () =>
      setState({
        isLoading: false,
        errors: [],
        resp: null,
        status: API_STATE.PENDING,
      }),
  };
};
