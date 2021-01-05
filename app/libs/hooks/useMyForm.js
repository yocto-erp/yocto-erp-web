import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { useConfirmDialog } from './useConfirmDialog';
import { isFunc } from '../../utils/util';

const useMyForm = ({ form = {}, validationSchema, api, onConfirm = null }) => {
  const { confirmModal, openConfirm } = useConfirmDialog();
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
            errors: err?.errors || [],
          });
        },
      );
    },
    [api],
  );

  const execWithConfirm = useCallback(
    (...args) => {
      if (onConfirm && isFunc(onConfirm)) {
        openConfirm({
          ...onConfirm(...args),
          onClose: isConfirmed => {
            if (isConfirmed) {
              exec(...args);
            }
          },
        });
      } else {
        exec(...args);
      }
    },
    [exec],
  );

  const onSubmit = useCallback(
    handleSubmit(formData => execWithConfirm(formData)),
    [handleSubmit, execWithConfirm],
  );
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
    confirmModal,
  };
};

useMyForm.propTypes = {
  form: PropTypes.object,
  validationSchema: PropTypes.any,
  api: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
};

export default useMyForm;
