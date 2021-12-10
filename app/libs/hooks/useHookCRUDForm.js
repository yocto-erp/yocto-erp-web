import { useCallback, useEffect, useReducer } from 'react';
import produce from 'immer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import isFunction from 'lodash/isFunction';

const FORM_TYPE = {
  PENDING: 'PENDING',
  LOAD_DATA: 'LOAD_DATA',
  FINISH_LOAD_DATA: 'FINISH_LOAD_DATA',
  SUBMIT: 'SUBMIT',
  SUBMIT_ERROR: 'SUBMIT_ERROR',
  SUBMIT_DONE: 'SUBMIT_DONE',
};

const STATE = {
  status: FORM_TYPE.PENDING,
  formData: {},
  isLoading: false,
  errors: [],
  resp: null,
  isInitial: false,
};

/* eslint-disable default-case, no-param-reassign */
const formReducer = (state, action) =>
  produce(state, draft => {
    draft.status = action.type;
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
      case FORM_TYPE.SUBMIT_DONE:
        draft.errors = [];
        draft.isLoading = false;
        draft.resp = action.payload;
        break;
      default:
        throw new Error(`Not support type: ${action.type}`);
    }
  });
export const useHookCRUDForm = ({
  id,
  read,
  create,
  update,
  initForm = {},
  mappingToForm,
  mappingToServer,
  validationSchema,
  onSuccess,
}) => {
  const [state, dispatch] = useReducer(formReducer, STATE, () => ({
    ...STATE,
    formData: initForm,
  }));

  const {
    register,
    handleSubmit,
    reset,
    errors,
    control,
    getValues,
    setValue,
    watch,
    formState,
    trigger,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: initForm,
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
    } else {
      reset(initForm);
    }
  }, [read, id]);

  const handleError = error => {
    let listError = [];
    if (error.errors && error.errors.length) {
      // eslint-disable-next-line prefer-destructuring
      listError = error.errors;
    } else if (error.error) {
      listError.push({ code: 'BAD_REQUEST', message: error.error });
    } else {
      listError.push({ code: 'BAD_REQUEST', message: error.message });
    }
    dispatch({ type: FORM_TYPE.SUBMIT_ERROR, payload: listError });
  };

  const submit = useCallback(
    handleSubmit(values => {
      let form = values;
      if (isFunction(mappingToServer)) {
        form = mappingToServer(values);
      }
      const promise = id ? update(id, form) : create(form);
      dispatch({ type: FORM_TYPE.SUBMIT });
      return promise
        .then(resp => {
          if (!id) {
            console.log('reset', initForm);
            reset({ ...initForm });
          }
          dispatch({ type: FORM_TYPE.SUBMIT_DONE, payload: resp });
          return onSuccess(resp);
        }, handleError)
        .catch(handleError);
    }),
    [update, create, onSuccess, dispatch, initForm, handleSubmit],
  );

  return {
    state,
    register,
    submit,
    errors,
    control,
    getValues,
    setValue,
    formState,
    trigger,
    watch,
  };
};
