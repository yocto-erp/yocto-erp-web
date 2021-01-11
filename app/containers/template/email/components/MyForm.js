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
import { templateEmailApi } from '../../../../libs/apis/template/template.api';
import Editor from '../../../../components/Form/Editor';
import FormGroup from '../../../../components/Form/FormGroup';
import {
  useTemplateType,
  useTemplateTypeId,
} from '../../../../libs/apis/template/templateType.api';
import { transformUnNumber } from '../../../../libs/utils/number.util';
import MultipleEmailInput from '../../../../components/Form/MultipleEmailInput';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  subject: Yup.string().required('This field is required.'),
  from: Yup.string().email(),
  cc: Yup.array().nullable(),
  bcc: Yup.array().nullable(),
  templateTypeId: Yup.number()
    .transform(transformUnNumber)
    .required('Template Type is required'),
  content: Yup.string().required('Content is required'),
});

const { create, update, read } = templateEmailApi;

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
          ? `Update Template ${resp.template.name} success`
          : `Create Template ${resp.template.name} success`,
      );
    },
    mappingToForm: form => ({
      name: form.template.name,
      subject: form.subject,
      content: form.template.content,
      templateTypeId: String(form.template.templateTypeId),
      remark: form.template.remark,
      from: form.from,
      cc: form.cc,
      bcc: form.bcc,
    }),
    mappingToServer: form => ({
      ...form,
      cc: form.cc,
      bcc: form.bcc,
    }),
    validationSchema,
    initForm: {
      name: '',
      subject: '',
      templateTypeId: '',
      content: '',
      from: '',
      cc: [],
      bcc: [],
    },
    id,
  });

  const { templateTypeList } = useTemplateType();
  const templateTypeId = useWatch({
    control,
    name: 'templateTypeId', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both,
    defaultValue: formData?.templateTypeId,
  });
  const { templateType } = useTemplateTypeId(templateTypeId);

  const contentEditor = useMemo(
    () => (
      <div className="form-group">
        <Label for="content" className="mr-sm-2">
          Content
        </Label>
        <Controller
          name="content"
          control={control}
          defaultValue={formData?.content || ''}
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
    ),
    [control, templateType, formData],
  );

  const subjectEditor = useMemo(
    () => (
      <div className="form-group">
        <Label for="content" className="mr-sm-2">
          Subject
        </Label>
        <Controller
          name="subject"
          control={control}
          defaultValue={formData?.subject || ''}
          render={({ onChange, onBlur, value }) => (
            <Editor
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              variables={templateType}
              name="subject"
              format="text"
              height={80}
            />
          )}
        />
      </div>
    ),
    [control, templateType, formData],
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
                className="h-100"
                register={register}
                label="Remark"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <FormGroup
                name="from"
                register={register}
                label="From"
                error={errors.from}
              />
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="emailTemplate">CC</label>
                <Controller
                  name="cc"
                  control={control}
                  defaultValue={[]}
                  as={MultipleEmailInput}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="emailTemplate">BCC</label>
                <Controller
                  name="bcc"
                  control={control}
                  defaultValue={[]}
                  as={MultipleEmailInput}
                />
              </div>
            </div>
          </div>
          {subjectEditor}
          {contentEditor}
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
