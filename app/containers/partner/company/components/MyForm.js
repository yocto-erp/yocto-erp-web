import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { toast } from 'react-toastify';
import companyApi from '../../../../libs/apis/company.api';
import Widget from '../../../../components/Widget/Widget';
import SubmitButton from '../../../../components/button/SubmitButton';
import BackButton from '../../../../components/button/BackButton';
import { useHookCRUDForm } from '../../../../libs/hooks/useHookCRUDForm';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
});

const { create, update, read } = companyApi;

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
          ? `Update company ${resp.name} success`
          : `Create company ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      name: form.name,
      gsm: form.gsm,
      remark: form.remark,
      address: form.address,
    }),
    validationSchema,
    initForm: {
      name: '',
      gsm: '',
      address: '',
      remark: '',
    },
    id,
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="name" className="mr-sm-2 required">
                Name <span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.name}
                type="text"
                name="name"
                innerRef={register}
                id="name"
                placeholder="Name"
              />
              <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="gsm" className="mr-sm-2 required">
                Phone
              </Label>
              <Input
                type="text"
                name="gsm"
                innerRef={register}
                id="gsm"
                placeholder="Phone"
              />
            </FormGroup>
            <FormGroup>
              <Label for="address" className="mr-sm-2 required">
                Address
              </Label>
              <Input
                type="text"
                name="address"
                innerRef={register}
                id="address"
                placeholder="Address"
              />
            </FormGroup>

            <FormGroup>
              <Label for="remark" className="mr-sm-2">
                Remark
              </Label>
              <Input
                type="textarea"
                name="remark"
                innerRef={register}
                id="remark"
                placeholder="Remark"
              />
            </FormGroup>
          </Col>
        </Row>
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!(isValid && isDirty)} />
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
