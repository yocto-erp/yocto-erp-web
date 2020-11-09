import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import templateApi from '../../../libs/apis/template/template.api';

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
    state: { isLoading },
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
      address: form.address,
    }),
    validationSchema,
    initForm: {
      name: '',
      templateTypeId: '',
      content: '',
    },
    id,
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormGroup>
          <Label for="name" className="mr-sm-2">
            Name
          </Label>
          <Input
            invalid={!!errors.name}
            type="text"
            name="name"
            innerRef={register}
            id="name"
            placeholder="Template Name"
          />
          <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="address" className="required">
            Template Type
          </Label>
          <Input
            type="select"
            name="templateTypeId"
            innerRef={register}
            id="templateTypeId"
          >
            <option value="">Select Type</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Input>
          <FormFeedback>
            {errors.templateTypeId && errors.templateTypeId.message}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="remark" className="mr-sm-2">
            Content
          </Label>
          <Input
            type="textarea"
            name="remark"
            innerRef={register}
            id="remark"
            placeholder="Remark"
          />
        </FormGroup>
        <FormGroup>
          <Label for="content" className="mr-sm-2">
            Content
          </Label>
          <Input
            invalid={!!errors.content}
            type="textarea"
            name="content"
            innerRef={register}
            id="content"
            placeholder="Content"
          />
          <FormFeedback>
            {errors.content && errors.content.message}
          </FormFeedback>
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
