import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';

const useMyForm = ({ form = {}, validationSchema, api }) => {
  const [state, setState] = useState({
    isLoading: false,
    errors: [],
    resp: null,
  });
  const {
    register,
    handleSubmit,
    reset,
    errors,
    control,
    getValues,
    setValue,
    formState,
    watch,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: form,
  });
  const exec = useCallback(
    (...args) => {
      setState({
        isLoading: true,
        errors: [],
        resp: null,
      });
      return api(...args).then(
        t => {
          setState({
            isLoading: false,
            resp: t,
            errors: [],
          });
          return t;
        },
        err => {
          setState({
            isLoading: false,
            resp: null,
            errors: err.errors,
          });
        },
      );
    },
    [api],
  );

  const onSubmit = useCallback(handleSubmit(formData => exec(formData)), [
    handleSubmit,
    exec,
  ]);
  return {
    exec,
    register,
    control,
    setState,
    getValues,
    formState,
    onSubmit,
    errors,
    reset,
    setValue,
    state,
    watch,
  };
};

useMyForm.propTypes = {
  form: PropTypes.object,
  validationSchema: PropTypes.any,
  api: PropTypes.func.isRequired,
};

export default useMyForm;
