import { useCallback, useState } from "react";

export const API_STATE = {
  PENDING: "PENDING",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
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
          let errors = [];
          if (err.error) {
            errors = [{ message: err.error, code: "INVALID", name: "Unknown" }];
          } else if (err.errors && err.errors.length) {
            // eslint-disable-next-line prefer-destructuring
            errors = err.errors;
          } else if (err.message) {
            errors = [{ message: err.message, code: "INVALID" }];
          }
          setState({
            errors,
            resp: null,
            isLoading: false,
            status: API_STATE.FAIL,
          });
          return err;
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
