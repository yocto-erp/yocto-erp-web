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
import { Controller } from 'react-hook-form';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import CustomerSelect from '../../../components/common/customer/CustomerSelect';
import studentApi from '../../../libs/apis/student.api';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  alias: Yup.string().required('This field is required.'),
  freePackage: Yup.number().required('This field is required.'),
  toSchoolBusRoute: Yup.number().required('This field is required.'),
  toHomeBusRoute: Yup.number().required('This field is required.'),
});

const { create, update, read } = studentApi;

function MyForm({ id }) {
  const {
    control,
    register,
    submit,
    errors,
    setValue,
    state: { isLoading, formData },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update student ${resp.name} success`
          : `Create student ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      name: form.name,
      alias: form.alias,
      parent: form.parent,
      freePackage: form.freePackage,
      enableMeal: form.enableMeal,
      toSchoolBusRoute: form.toSchoolBusRoute,
      toHomeBusRoute: form.toHomeBusRoute,
    }),
    validationSchema,
    initForm: {},
    id,
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="name" className="mr-sm-2 required">
                FullName <span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.alias}
                type="text"
                name="name"
                innerRef={register}
                id="name"
                placeholder="Student Name"
              />
              <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="alias" className="mr-sm-2 required">
                Alias <span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.alias}
                type="text"
                name="alias"
                innerRef={register}
                id="alias"
                placeholder="Alias"
              />
              <FormFeedback>
                {errors.alias && errors.alias.message}
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="partnerPersonId" className="mr-sm-2">
                Father
              </Label>
              <Controller
                name="partnerPersonId"
                defaultValue={formData ? formData.partnerPersonId : null}
                control={control}
                render={({ onChange, ...data }) => (
                  <CustomerSelect
                    id="partnerPersonId"
                    placeholder="Choose Customer"
                    onAdded={newCustomer => {
                      console.log(`OnAdd: ${JSON.stringify(newCustomer)}`);
                      setValue('partnerPersonId', newCustomer, {
                        shouldValidate: true,
                      });
                    }}
                    onChange={val => {
                      onChange(val);
                    }}
                    {...data}
                  />
                )}
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="partnerPersonId" className="mr-sm-2">
                Mother
              </Label>
              <Controller
                name="partnerPersonId"
                defaultValue={formData ? formData.partnerPersonId : null}
                control={control}
                render={({ onChange, ...data }) => (
                  <CustomerSelect
                    id="partnerPersonId"
                    placeholder="Choose Customer"
                    onAdded={newCustomer => {
                      console.log(`OnAdd: ${JSON.stringify(newCustomer)}`);
                      setValue('partnerPersonId', newCustomer, {
                        shouldValidate: true,
                      });
                    }}
                    onChange={val => {
                      onChange(val);
                    }}
                    {...data}
                  />
                )}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="freePackage" className="required">
                Free Package
              </Label>
              <Input
                type="select"
                name="freePackage"
                innerRef={register}
                id="freePackage"
                placeholder="Choose free package"
              >
                <option value="">Select free package</option>
                <option value={0}>Monthly</option>
                <option value={1}>Quarterly</option>
                <option value={2}>Yearly</option>
              </Input>
              <FormFeedback>
                {errors.freePackage && errors.freePackage.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6" />
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <div className="checkbox abc-checkbox">
                <Input
                  type="checkbox"
                  name="enableMeal"
                  innerRef={register}
                  id="enableMeal"
                />{' '}
                <Label for="enableMeal" className="required">
                  Meal
                </Label>
              </div>
              <FormFeedback>
                {errors.freePackage && errors.freePackage.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6" />
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <div className="checkbox abc-checkbox">
                <Input
                  type="checkbox"
                  name="enableBus"
                  innerRef={register}
                  id="enableBus"
                />{' '}
                <Label for="enableBus" className="required">
                  Bus
                </Label>
              </div>
              <FormFeedback>
                {errors.freePackage && errors.freePackage.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6" />
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="toSchoolBusRoute" className="required">
                Free Package
              </Label>
              <Input
                type="select"
                name="toSchoolBusRoute"
                innerRef={register}
                id="toSchoolBusRoute"
                placeholder="From place to School"
              >
                <option value="">Select bus</option>
                <option value={0}>Home</option>
              </Input>
              <FormFeedback>
                {errors.freePackage && errors.freePackage.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6" />
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="toHomeBusRoute" className="required">
                Free Package
              </Label>
              <Input
                type="select"
                name="toHomeBusRoute"
                innerRef={register}
                id="toHomeBusRoute"
                placeholder="Form school to place"
              >
                <option value="">Select bus</option>
                <option value={0}>School</option>
              </Input>
              <FormFeedback>
                {errors.freePackage && errors.freePackage.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6" />
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
