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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { Controller, useWatch } from 'react-hook-form';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import CustomerSelect from '../../../components/common/customer/CustomerSelect';
import studentApi from '../../../libs/apis/student/student.api';
import DateSelect from '../../../components/date/DateSelect';
import FormErrorMessage from '../../../components/Form/FormHookErrorMessage';
import studentConfigurationApi from '../../../libs/apis/student/student-config.api';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('This field is required.'),
  studentId: Yup.string().required('This field is required.'),
  alias: Yup.string().required('This field is required.'),
});

const { create, update, read } = studentApi;

function MyForm({ id }) {
  const [optionsBusRoute, setOptionsBusRoute] = React.useState([]);
  const [optionsClass, setOptionsClass] = React.useState([]);

  React.useEffect(() => {
    studentConfigurationApi.get().then(resp => {
      console.log(resp);
      if (resp) {
        setOptionsBusRoute(resp.busRoutes);
        setOptionsClass(resp.classes);
      }
    });
  }, []);
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
          ? `Update student ${resp.fullName} success`
          : `Create student ${resp.fullName} success`,
      );
    },
    mappingToForm: form => ({
      studentId: form.studentId,
      fullName: form.child
        ? `${form.child.firstName} ${form.child.lastName}`
        : '',
      alias: form.alias,
      joinDate: form.joinDate ? new Date(form.joinDate) : new Date(),
      status: form.status ? form.status : '',
      class: form.class,
      birthday: form.child ? new Date(form.child.birthday) : new Date(),
      sex: form.child.sex ? form.child.sex : '',
      feePackage: form.feePackage ? form.feePackage : '',
      fatherId: form.father ? form.father : null,
      motherId: form.mother ? form.mother : null,
      enableMeal: form.enableMeal,
      enableBus: form.enableBus,
      toSchoolBusRoute: form.toSchoolBusRoute,
      toHomeBusRoute: form.toHomeBusRoute,
    }),
    mappingToServer: form => ({
      studentId: form.studentId,
      fullName: form.fullName,
      alias: form.alias,
      joinDate: form.joinDate,
      status: form.status,
      birthday: form.birthday,
      sex: form.sex,
      class: form.class,
      feePackage: form.feePackage,
      fatherId: form.fatherId ? form.fatherId.id : null,
      motherId: form.motherId ? form.motherId.id : null,
      enableBus: form.enableBus,
      toSchoolBusRoute: form.toSchoolBusRoute,
      toHomeBusRoute: form.toHomeBusRoute,
      enableMeal: form.enableMeal,
    }),
    validationSchema,
    initForm: {
      studentId: '',
      fullName: '',
      sex: '',
      class: '',
      birthday: new Date(),
      joinDate: new Date(),
      status: '',
      feePackage: '',
      fatherId: null,
      motherId: null,
      enableBus: false,
      toSchoolBusRoute: '',
      toHomeBusRoute: '',
      enableMeal: false,
    },
    id,
  });

  const enableBus = useWatch({
    control,
    name: 'enableBus',
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <Row>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="studentId" className="mr-sm-2 required">
                StudentId <span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.studentId}
                type="text"
                name="studentId"
                innerRef={register}
                id="studentId"
                placeholder="Student ID"
              />
              <FormFeedback>
                {errors.studentId && errors.studentId.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="fullName" className="mr-sm-2 required">
                FullName <span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.fullName}
                type="text"
                name="fullName"
                innerRef={register}
                id="fullName"
                placeholder="FullName Student"
              />
              <FormFeedback>
                {errors.fullName && errors.fullName.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
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
          <Col xs="12" sm="12" md="6" lg="2" xl="2">
            <FormGroup>
              <Label for="sex" className="mr-sm-2 required">
                Gender
              </Label>
              <Input
                name="sex"
                type="select"
                innerRef={register}
                placeholder="Choose Gender"
              >
                <option value="">Select Gender</option>
                <option value={0}>MALE</option>
                <option value={1}>FEMALE</option>
                <option value={2}>OTHER</option>
              </Input>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="2" xl="2">
            <FormGroup>
              <Label for="birthday" className="mr-sm-2">
                Birthday
              </Label>
              <div>
                <Controller
                  defaultValue={formData ? formData.birthday : null}
                  name="birthday"
                  control={control}
                  invalid={!!errors.birthday}
                  as={DateSelect}
                />
              </div>
              <FormErrorMessage error={errors.birthday} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="class" className="mr-sm-2 required">
                Class
              </Label>
              <Input
                name="class"
                type="select"
                innerRef={register}
                id="class"
                placeholder="Choose Class"
              >
                <option value="">Select Class</option>
                {optionsClass.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="feePackage" className="required">
                Fee Package
              </Label>
              <Input
                type="select"
                name="feePackage"
                innerRef={register}
                id="feePackage"
                placeholder="Choose Package"
              >
                <option value="">Select Package</option>
                <option value={0}>Monthly</option>
                <option value={1}>Quarterly</option>
                <option value={2}>Yearly</option>
              </Input>
              <FormFeedback>
                {errors.feePackage && errors.feePackage.message}
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="6" lg="2" xl="2">
            <FormGroup>
              <Label for="status" className="mr-sm-2 required">
                Status
              </Label>
              <Input name="status" type="select" innerRef={register}>
                <option value="">Select Status</option>
                <option value={1}>PENDING</option>
                <option value={2}>ACTIVE</option>
                <option value={3}>LEAVE</option>
              </Input>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="2" xl="2">
            <FormGroup>
              <Label for="joinDate" className="mr-sm-2">
                Join Date
              </Label>
              <div>
                <Controller
                  defaultValue={formData ? formData.joinDate : null}
                  name="joinDate"
                  control={control}
                  invalid={!!errors.joinDate}
                  as={DateSelect}
                />
              </div>
              <FormErrorMessage error={errors.joinDate} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="fatherId" className="mr-sm-2">
                Father
              </Label>
              <Controller
                name="fatherId"
                defaultValue={formData ? formData.fatherId : null}
                control={control}
                render={({ onChange, ...data }) => (
                  <CustomerSelect
                    id="fatherId"
                    placeholder="Choose Father"
                    onAdded={newCustomer => {
                      console.log(`OnAdd: ${JSON.stringify(newCustomer)}`);
                      setValue('fatherId', newCustomer, {
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
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="motherId" className="mr-sm-2">
                Mother
              </Label>
              <Controller
                name="motherId"
                defaultValue={formData ? formData.motherId : null}
                control={control}
                render={({ onChange, ...data }) => (
                  <CustomerSelect
                    id="motherId"
                    placeholder="Choose Mother"
                    onAdded={newCustomer => {
                      console.log(`OnAdd: ${JSON.stringify(newCustomer)}`);
                      setValue('motherId', newCustomer, {
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
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <FormGroup>
              <Label for="enableBus" className="mr-sm-2">
                Đi xe bus (Chiều đi từ / Chiều về đến)
              </Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input
                      addon
                      type="checkbox"
                      name="enableBus"
                      innerRef={register}
                      id="enableBus"
                    />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  className="form-control"
                  type="select"
                  name="toSchoolBusRoute"
                  innerRef={register}
                  id="toSchoolBusRoute"
                  placeholder="From place to School"
                  disabled={enableBus === false}
                >
                  <option value="">Select From Place to School</option>
                  {optionsBusRoute.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </Input>
                <Input
                  type="select"
                  name="toHomeBusRoute"
                  innerRef={register}
                  id="toHomeBusRoute"
                  placeholder="Form school to place"
                  disabled={enableBus === false}
                >
                  <option value="">Select Form school to place</option>
                  {optionsBusRoute.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </Input>
              </InputGroup>
            </FormGroup>
          </Col>
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
                {errors.enableMeal && errors.enableMeal.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6" />
        </Row>

        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!(isValid && isDirty)} />
      </Form>
    ),
    [errors, isLoading, submit, register, optionsBusRoute, optionsClass],
  );

  return (
    <Widget>
      {optionsBusRoute.length && optionsClass.length ? form : <></>}
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
