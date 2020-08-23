import { useReducer, useEffect, useCallback } from 'react';
import produce from 'immer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

const FORM_TYPE = {
  LOAD_DATA: 'LOAD_DATA',
  FINISH_LOAD_DATA: 'FINISH_LOAD_DATA',
  SUBMIT: 'SUBMIT',
  SUBMIT_ERROR: 'SUBMIT_ERROR',
};

const STATE = {
  formData: {},
  isLoading: false,
  errors: [],
  isInitial: false,
};

/* eslint-disable default-case, no-param-reassign */
const formReducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FORM_TYPE.LOAD_DATA:
        draft.errors = [];
        draft.isInitial = false;
        break;
      case FORM_TYPE.FINISH_LOAD_DATA:
        draft.isInitial = false;
        draft.formData = action.payload;
        break;
      case FORM_TYPE.SUBMIT:
        draft.errors = [];
        draft.isLoading = true;
        break;
      case FORM_TYPE.SUBMIT_ERROR:
        draft.errors = action.payload;
        draft.isInitial = false;
        draft.isLoading = false;
        break;
      default:
        throw new Error(`Not support type: ${action.type}`);
    }
  });
export const useHookForm = ({
  id,
  read,
  create,
  update,
  initForm = {},
  mappingToForm,
  validationSchema,
  onSuccess,
}) => {
  const [state, dispatch] = useReducer(formReducer, STATE, () => ({
    ...STATE,
    formData: initForm,
  }));

  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (id) {
      dispatch({ type: FORM_TYPE.LOAD_DATA });
      read(id).then(data => {
        const localFormData = mappingToForm ? mappingToForm(data) : data;
        dispatch({
          type: FORM_TYPE.FINISH_LOAD_DATA,
          payload: localFormData,
        });
        reset(localFormData);
      });
    }
  }, [read, id]);

  const submit = useCallback(
    handleSubmit(values => {
      const promise = id ? update(id, values) : create(values);
      return promise
        .then(resp => {
          if (!id) {
            reset({});
          }
          return onSuccess(resp);
        })
        .catch(() =>
          dispatch({ type: FORM_TYPE.SUBMIT_ERROR, payload: initForm }),
        );
    }),
    [update, create, onSuccess, dispatch, initForm, handleSubmit],
  );

  return { state, register, submit, errors };
};
