import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { Controller, useWatch } from 'react-hook-form';
import { useHookCRUDForm } from '../../../../libs/hooks/useHookCRUDForm';
import Widget from '../../../../components/Widget/Widget';
import SubmitButton from '../../../../components/button/SubmitButton';
import BackButton from '../../../../components/button/BackButton';
import { templateApi } from '../../../../libs/apis/template/template.api';
import Editor from '../../../../components/Form/Editor';
import FormGroup from '../../../../components/Form/FormGroup';
import {
  useTemplateType,
  useTemplateTypeId,
} from '../../../../libs/apis/template/templateType.api';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  templateTypeId: Yup.number().required('Template Type is required'),
  content: Yup.string().required('Content is required'),
});

const { create, update, read } = templateApi;

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
          ? `Update Template ${resp.name} success`
          : `Create Template ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      name: form.name,
      content: form.content,
      templateTypeId: String(form.templateTypeId),
      remark: form.remark,
    }),
    validationSchema,
    initForm: {
      name: '',
      templateTypeId: '',
      content: '',
    },
    id,
  });

  const { templateTypeList } = useTemplateType();
  const templateTypeId = useWatch({
    control,
    name: 'templateTypeId',
  });
  const { templateType } = useTemplateTypeId(templateTypeId);

  const editor = useMemo(
    () =>
      templateTypeId ? (
        <div className="form-group">
          <Label for="content" className="mr-sm-2">
            Content
          </Label>
          <Controller
            name="content"
            control={control}
            defaultValue={formData.content || ''}
            render={({ onChange, onBlur, value }) => (
              <Editor
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                variables={templateType}
                name="content"
              />
            )}
          />
        </div>
      ) : null,
    [control, templateType, templateTypeId, formData.content],
  );

  const form = React.useMemo(
    () =>
      templateTypeList && templateTypeList.length ? (
        <Form onSubmit={submit} noValidate formNoValidate>
          <div className="row">
            <div className="col-md-6">
              <FormGroup
                name="name"
                type="text"
                error={errors.name}
                placeholder="Template Name"
                register={register}
                label="Name"
              />
              <FormGroup
                name="templateTypeId"
                type="select"
                error={errors.templateTypeId}
                register={register}
                label="Template Type"
              >
                <option value="">Select Type</option>
                {templateTypeList.map(i => (
                  <option value={i.id} key={i.id}>
                    {i.name}
                  </option>
                ))}
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup
                name="remark"
                type="textarea"
                placeholder="Remark"
                register={register}
                label="Remark"
              />
            </div>
          </div>
          {editor}
          <BackButton className="mr-2" />
          <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
        </Form>
      ) : null,
    [
      errors,
      isLoading,
      submit,
      register,
      templateTypeList,
      templateType,
      templateTypeId,
      formData.content,
    ],
  );
  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
