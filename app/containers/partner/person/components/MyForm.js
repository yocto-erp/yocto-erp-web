import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import personApi from "../../../../libs/apis/person.api";
import Widget from "../../../../components/Widget/Widget";
import SubmitButton from "../../../../components/button/SubmitButton";
import BackButton from "../../../../components/button/BackButton";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import { ERROR } from "../../../../components/Form/messages";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(ERROR.required),
  lastName: Yup.string().required(ERROR.required),
  email: Yup.string().email(ERROR.email),
});

const { create, update, read } = personApi;

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
          ? `Update person ${resp.firstName} ${resp.lastName} success`
          : `Create person ${resp.firstName} ${resp.lastName} success`,
      );
    },
    mappingToForm: form => ({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      gsm: form.gsm,
      address: form.address,
      sex: form.sex,
      remark: form.remark,
    }),
    validationSchema,
    initForm: {
      firstName: "",
      lastName: "",
      email: "",
      gsm: "",
      address: "",
      sex: "",
      remark: "",
    },
    id,
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="firstName" className="mr-sm-2 required">
                First Name <span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.firstName}
                type="text"
                name="firstName"
                innerRef={register}
                id="firstName"
                placeholder="First Name"
              />
              <FormHookErrorMessage error={errors.firstName} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="lastName" className="mr-sm-2 required">
                Last Name <span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.lastName}
                type="text"
                name="lastName"
                innerRef={register}
                id="lastName"
                placeholder="Last Name"
              />
              <FormHookErrorMessage error={errors.lastName} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="email" className="mr-sm-2 required">
                Email
              </Label>
              <Input
                invalid={!!errors.email}
                type="text"
                name="email"
                innerRef={register}
                id="email"
                placeholder="Email"
              />
              <FormHookErrorMessage error={errors.email} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
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
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
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
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="sex" className="mr-sm-2 required">
                Gender
              </Label>
              <Input
                type="select"
                name="sex"
                innerRef={register}
                id="sex"
                placeholder="Choose Gender"
              >
                <option value="">Select Gender</option>
                <option value={0}>MALE</option>
                <option value={1}>FEMALE</option>
                <option value={2}>OTHER</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="remark" className="mr-sm-2">
                Remark
              </Label>
              <Input
                type="textarea"
                name="remark"
                innerRef={register}
                id="remark"
                placeholder="Product Remark"
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
