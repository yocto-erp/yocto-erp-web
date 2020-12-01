import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { Controller } from 'react-hook-form';
import { useHookCRUDForm } from '../../../../libs/hooks/useHookCRUDForm';
import BackButton from '../../../../components/button/BackButton';
import SubmitButton from '../../../../components/button/SubmitButton';
import Widget from '../../../../components/Widget/Widget';
import surveyAdminApi from '../../../../libs/apis/survey/survey-admin.api';
import TypeSelect from '../../../../components/Select/TypeSelect';
import FormErrorMessage from '../../../../components/Form/FormHookErrorMessage';
import { SURVEY_TYPE_OPTION } from '../constants';
import { ERROR } from '../../../../components/Form/messages';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  type: Yup.number()
    .typeError(ERROR.required)
    .moreThan(0, ERROR.numberGT0)
    .required(ERROR.required),
});

const { create, update, read } = surveyAdminApi;

function MyForm({ id }) {
  const {
    register,
    submit,
    errors,
    control,
    state: { isLoading, formData },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Survey ${resp.name} success`
          : `Create Survey ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      name: form.name,
      remark: form.remark,
      type: form.type,
    }),
    validationSchema,
    initForm: {
      name: '',
      remark: '',
      type: 1,
    },
    id,
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormGroup>
          <Label for="name" className="mr-sm-2">
            Name<span className="text-danger">*</span>
          </Label>
          <Input
            invalid={!!errors.name}
            type="text"
            name="name"
            innerRef={register}
            id="name"
            placeholder="Survey Name"
          />
          <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="type" className="mr-sm-2">
            Type<span className="text-danger">*</span>
          </Label>
          <Controller
            name="type"
            defaultValue={formData ? formData?.type : ''}
            control={control}
            render={({ onChange, ...data }) => (
              <TypeSelect
                invalid={!!errors.type}
                id="type"
                placeholder="Select Type"
                onChange={val => {
                  onChange(val);
                }}
                isShow={false}
                options={SURVEY_TYPE_OPTION}
                {...data}
              />
            )}
          />
          <FormErrorMessage error={errors.type} />
        </FormGroup>
        <FormGroup>
          <Label for="remark" className="required">
            Remark
          </Label>
          <Input
            type="textarea"
            name="remark"
            innerRef={register}
            id="remark"
            placeholder="Survey remark"
          />
        </FormGroup>
        <BackButton className="mr-2" />
        <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
      </Form>
    ),
    [errors, isLoading, submit, register],
  );
  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
