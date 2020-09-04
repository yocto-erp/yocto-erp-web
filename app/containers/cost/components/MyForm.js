import React from 'react';
import FormFeedback, {
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import apiCost from '../../../libs/apis/cost.api';
import Widget from '../../../components/Widget/Widget';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
const MyForm = ({ id }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('this field is required'),
    type: yup.number().required('this field is required'),
    partnerCompany: yup.number().required('this field is required'),
    partnerPerson: yup.number().required('this field is required'),
    amount: yup.number().required('this field is required'),
    purpose: yup.number().required('this field is required'),
    relative: yup.number().required('this field is required'),
  });
  const { create, update, read } = apiCost;
  const {
    register,
    submit,
    errors,
    state: { isLoading },
    formState: { isValid, isDirty },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update cost ${resp.name}  sucsss`
          : `Created cost ${resp.name} succss`,
      );
    },
    mappingToForm: form => ({
      name: form.name,
      remark: form.remark,
      type: form.type,
      partnerCompany: form.partnerCompany,
      partnerPerson: form.partnerPerson,
      amount: form.amount,
      purpose: form.purpose,
      relative: form.relative,
    }),
    validationSchema,
    initForm: {
      amount: 0,
    },
    id,
  });
  const form = React.useMemo(
    () => (
      <Form onSbumit={submit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="name">
                Title <span className="text-danger">*</span>
              </Label>
              <Input
                name="name"
                id="name"
                innerRef={register}
                placeholder="Name"
              />
              <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="remark">
                Remark <span className="text-danger" />
              </Label>
              <Input
                name="remark"
                id="remark"
                innerRef={register}
                placeholder="remark"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="partnerPerson">
                Partner Person <span className="text-danger">*</span>
              </Label>
              <Input
                name="partnerPerson"
                id="partnerPerson"
                innerRef={register}
              />
              <FormFeedback>{errors.partnerPerson}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="partnerCompany">
                Partner Compamy <span className="text-danger" />
              </Label>
              <Input
                name="partnerCompany"
                id="partnerCompany"
                innerRef={register}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="amount">
                Amount <span className="text-danger" />
              </Label>
              <Input
                name="amount"
                id="amount"
                type="number"
                innerRef={register}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="purpose">
                Purpose <span className="text-danger">*</span>
              </Label>
              <Input name="purpose" id="purpose" innerRef={register} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="relative">
                Relative <span className="text-danger" />
              </Label>
              <Input name="relative" id="relative" innerRef={register} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="type">
                Type <span className="text-danger">*</span>
              </Label>
              <Input name="type" id="type" type="select" innerRef={register}>
                <option value="0">IN</option>
                <option value="1">OUT</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <BackButton />
        <SubmitButton isLoading={isLoading} disable={!isValid || !isDirty} />
      </Form>
    ),
    [errors, register, submit, isLoading],
  );
  return <Widget>{form}</Widget>;
};
MyForm.propTypes = {
  id: PropTypes.any,
};
export default MyForm;
