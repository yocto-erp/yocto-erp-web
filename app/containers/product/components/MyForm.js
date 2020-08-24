import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { useHookForm } from '../../../libs/hooks/useHookForm';
import productApi from '../../../libs/apis/product.api';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  priceBaseUnit: Yup.number().required('This field is required.'),
  units: Yup.array().required('This field is required.'),
});

const { create, update, read } = productApi;

function MyForm({ id }) {
  const {
    register,
    submit,
    errors,
    state: { isLoading },
  } = useHookForm({
    create,
    update,
    read,
    onSuccess: resp => {
      console.log(`Success: ${JSON.stringify(resp)}`);
      toast.success(id ? 'Update product success' : 'Create product success');
    },
    mappingToForm: form => {
      console.log(`Mapping to form`);
      return {
        name: form.name,
        priceBaseUnit: form.priceBaseUnit,
        remark: form.remark,
      };
    },
    validationSchema,
    id,
  });

  const form = React.useMemo(() => {
    console.log('cache');
    return (
      <Form onSubmit={submit} noValidate formNoValidate>
        <Row>
          <Col xs="6" lg="6" md="12" sm="12">
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
                placeholder="Product Name"
              />
              <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="6" lg="6" md="12" sm="12">
            <FormGroup>
              <Label for="priceBaseUnit" className="required">
                Price Base Unit
              </Label>
              <Input
                type="text"
                name="priceBaseUnit"
                innerRef={register}
                id="priceBaseUnit"
                placeholder="Product Price Base Unit"
              />
              <FormFeedback>{JSON.stringify(errors)}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} />
      </Form>
    );
  }, [errors, isLoading, submit, register]);
  console.log('MyForm');

  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

MyForm.defaultProps = {};

export default MyForm;
