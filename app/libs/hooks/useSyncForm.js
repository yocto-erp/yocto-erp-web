import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';

const useSyncForm = ({ form = {}, validationSchema, api }) => {
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

  const exec = useCallback((...args) => api(...args), [api]);

  const onSubmit = useCallback(handleSubmit(formData => exec(formData)), [
    handleSubmit,
    exec,
  ]);
  return {
    exec,
    register,
    control,
    getValues,
    formState,
    onSubmit,
    errors,
    reset,
    setValue,
    watch,
  };
};

useSyncForm.propTypes = {
  form: PropTypes.object,
  validationSchema: PropTypes.any,
  api: PropTypes.func.isRequired,
};

export default useSyncForm;
