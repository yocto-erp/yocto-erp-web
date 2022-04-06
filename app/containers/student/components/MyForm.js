import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import { Controller, useWatch } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import Widget from "../../../components/Widget/Widget";
import SubmitButton from "../../../components/button/SubmitButton";
import BackButton from "../../../components/button/BackButton";
import { useHookCRUDForm } from "../../../libs/hooks/useHookCRUDForm";
import CustomerSelect from "../../../components/common/customer/CustomerSelect";
import studentApi from "../../../libs/apis/student/student.api";
import DateSelect from "../../../components/date/DateSelect";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";
import { ERROR } from "../../../components/Form/messages";
import BusStopSelect from "../student-bus-stop/components/BusStopSelect";
import StudentClassSelect from "../student-class/components/StudentClassSelect";
import { parseIso } from "../../../libs/utils/date.util";
import { MAIN_CONTACT_TYPE, STUDENT_STATUS_LIST } from "../constants";
import FormGroupInput from "../../../components/Form/FormGroupInput";
import { studentFormMessage } from "../messages";
import { LIST_GENDER } from "../../../libs/apis/person.api";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required(ERROR.required),
  studentId: Yup.string().required(ERROR.required),
  sex: Yup.string().required(),
  mainContact: Yup.string().required(),
  mother: Yup.object()
    .nullable()
    .when("mainContact", {
      is: val => Number(val) === MAIN_CONTACT_TYPE.MOTHER,
      then: Yup.object()
        .nullable()
        .required(),
    }),
  father: Yup.object()
    .nullable()
    .when("mainContact", {
      is: val => Number(val) === MAIN_CONTACT_TYPE.FATHER,
      then: Yup.object()
        .nullable()
        .required(),
    }),
});

const { create, update, read } = studentApi;

function MyForm({ id }) {
  const {
    control,
    register,
    submit,
    errors,
    setValue,
    watch,
    state: { isLoading, formData, errors: serverErrors },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: () => {
      toast.success(id ? `Update student success` : `Create student success`);
    },
    mappingToForm: form => ({
      ...form,
      fullName: form.child
        ? `${form.child.firstName} ${form.child.lastName}`
        : "",
      joinDate: form.joinDate ? new Date(form.joinDate) : new Date(),
      birthday: form.child ? parseIso(form.child.birthday) : null,
      sex: form.child.sex,
    }),
    validationSchema,
    initForm: {
      studentId: "",
      fullName: "",
      sex: "",
      class: "",
      birthday: new Date(),
      joinDate: new Date(),
      status: "",
      feePackage: "",
      father: null,
      mother: null,
      enableBus: false,
      toSchoolBusRoute: "",
      toHomeBusRoute: "",
      enableMeal: false,
      mainContact: MAIN_CONTACT_TYPE.MOTHER,
    },
    id,
  });

  useEffect(() => {
    if (serverErrors && serverErrors.length) {
      toast.error(serverErrors.map(t => t.message).join("\n"));
    }
  }, [serverErrors]);

  const enableBus = useWatch({
    control,
    name: "enableBus",
  });

  const mainContact = watch("mainContact");
  console.log(mainContact);
  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <Row>
          <Col md={6}>
            <p className="form-heading">
              <i className="fa fa-home fa-fw" /> Thông tin gia đình
            </p>
            <FormGroupInput
              name="studentId"
              error={errors.studentId}
              type="text"
              register={register}
              label="Mã số học sinh"
              isRequired
              placeholder="Mã số"
            />
            <Row>
              <Col md={6}>
                <FormattedMessage {...studentFormMessage.fullName}>
                  {msg => (
                    <FormGroupInput
                      name="fullName"
                      error={errors.fullName}
                      type="text"
                      register={register}
                      label={msg}
                      isRequired
                      placeholder={msg}
                    />
                  )}
                </FormattedMessage>
              </Col>
              <Col md={6}>
                <FormattedMessage {...studentFormMessage.alias}>
                  {msg => (
                    <FormGroupInput
                      name="alias"
                      error={errors.alias}
                      type="text"
                      register={register}
                      label={msg}
                      placeholder={msg}
                    />
                  )}
                </FormattedMessage>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormattedMessage
                  {...studentFormMessage.formGenderSelectDefault}
                >
                  {msg => (
                    <FormGroupInput
                      name="sex"
                      error={errors.sex}
                      type="select"
                      register={register}
                      label={msg}
                      placeholder={msg}
                      isRequired
                    >
                      <option value="">{msg}</option>
                      {LIST_GENDER.map(t => (
                        <FormattedMessage
                          {...studentFormMessage[`formGender${t.id}`]}
                          key={t.id}
                        >
                          {msg1 => <option value={t.id}>{msg1}</option>}
                        </FormattedMessage>
                      ))}
                    </FormGroupInput>
                  )}
                </FormattedMessage>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="birthday" className="mr-sm-2">
                    <FormattedMessage {...studentFormMessage.birthday} />
                  </Label>
                  <Controller
                    defaultValue={formData.birthday}
                    name="birthday"
                    control={control}
                    render={({ value, onChange }, { invalid }) => (
                      <DateSelect
                        value={value}
                        onChange={onChange}
                        invalid={invalid}
                      />
                    )}
                  />
                  <FormHookErrorMessage error={errors.birthday} />
                </FormGroup>
              </Col>
            </Row>
            <div className="row align-items-center">
              <div className="col">
                <FormattedMessage {...studentFormMessage.father}>
                  {msg => (
                    <FormGroup>
                      <Label for="father" className="mr-sm-2">
                        {msg}
                      </Label>
                      <Controller
                        name="father"
                        defaultValue={formData.father}
                        control={control}
                        render={({ onChange, ...data }, { invalid }) => (
                          <CustomerSelect
                            id="father"
                            placeholder={msg}
                            invalid={invalid}
                            onAdded={newCustomer => {
                              setValue("father", newCustomer, {
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
                      <FormHookErrorMessage error={errors.father} />
                    </FormGroup>
                  )}
                </FormattedMessage>
              </div>
              <div className="col-auto">
                <FormGroup>
                  <Label for="father" className="mr-sm-2">
                    &nbsp;
                  </Label>
                  <div className="radio abc-radio abc-radio-success pl-0">
                    <input
                      defaultChecked={
                        formData.mainContact === MAIN_CONTACT_TYPE.FATHER
                      }
                      type="radio"
                      className="form-check-input"
                      name="mainContact"
                      onClick={e => {
                        console.log("setFATHERvalue", e.currentTarget.value);
                        setValue("mainContact", e.currentTarget.value, {
                          shouldDirty: true,
                        });
                      }}
                      id="fatherMainContact"
                      value={MAIN_CONTACT_TYPE.FATHER}
                    />{" "}
                    <Label for="fatherMainContact">
                      <FormattedMessage {...studentFormMessage.fatherContact} />
                    </Label>
                  </div>
                </FormGroup>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col">
                <FormattedMessage {...studentFormMessage.mother}>
                  {msg => (
                    <FormGroup>
                      <Label for="mother" className="mr-sm-2">
                        {msg}
                      </Label>
                      <Controller
                        name="mother"
                        defaultValue={formData.mother}
                        control={control}
                        render={({ onChange, ...data }, { invalid }) => (
                          <CustomerSelect
                            id="mother"
                            invalid={invalid}
                            placeholder={msg}
                            onAdded={newCustomer => {
                              setValue("mother", newCustomer, {
                                shouldValidate: true,
                              });
                            }}
                            onChange={onChange}
                            {...data}
                          />
                        )}
                      />
                      <FormHookErrorMessage error={errors.mother} />
                    </FormGroup>
                  )}
                </FormattedMessage>
              </div>
              <div className="col-auto">
                <FormGroup>
                  <Label className="mr-sm-2">&nbsp;</Label>
                  <div className="radio abc-radio  abc-radio-danger pl-0">
                    {/**
                     * không hiểu vì sao đặt trong controller thì render và setValue ok, còn ko cần thì lại không setValue được
                     */}
                    <Controller
                      name="mainContact"
                      control={control}
                      render={() => (
                        <input
                          defaultChecked={
                            formData.mainContact === MAIN_CONTACT_TYPE.MOTHER
                          }
                          type="radio"
                          className="form-check-input"
                          name="mainContact"
                          onClick={e => {
                            console.log(
                              "Set Mother Value",
                              e.currentTarget.value,
                            );
                            setValue("mainContact", e.currentTarget.value, {
                              shouldDirty: true,
                            });
                          }}
                          id="motherMainContact"
                          value={MAIN_CONTACT_TYPE.MOTHER}
                        />
                      )}
                    />{" "}
                    <Label for="motherMainContact">
                      <FormattedMessage {...studentFormMessage.motherContact} />
                    </Label>
                  </div>
                </FormGroup>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <p className="form-heading">
              <i className="fa fa-university fa-fw" /> Thông tin trường học
            </p>
            <FormGroup>
              <Label for="class" className="mr-sm-2 required">
                Lớp học
              </Label>
              <Controller
                name="class"
                control={control}
                render={({ onChange, ...data }, { invalid }) => (
                  <StudentClassSelect
                    id="class"
                    placeholder="Chọn lớp học"
                    invalid={invalid}
                    onChange={onChange}
                    {...data}
                  />
                )}
              />
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroupInput
                  label="Status"
                  isRequired
                  name="status"
                  type="select"
                  register={register}
                >
                  <option value="">Select Status</option>
                  {STUDENT_STATUS_LIST.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </FormGroupInput>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="joinDate" className="mr-sm-2">
                    Join Date
                  </Label>
                  <div>
                    <Controller
                      defaultValue={formData ? formData.joinDate : null}
                      name="joinDate"
                      control={control}
                      render={({ value, onChange }, { invalid }) => (
                        <DateSelect
                          value={value}
                          onChange={onChange}
                          invalid={invalid}
                        />
                      )}
                    />
                  </div>
                  <FormHookErrorMessage error={errors.joinDate} />
                </FormGroup>
              </Col>
            </Row>
            <div className="align-items-center row">
              <div className="col-auto">
                <FormGroup>
                  <Label for="enableBus" className=" mr-sm-2">
                    &nbsp;
                  </Label>
                  <div className="checkbox abc-checkbox pl-0">
                    <Input
                      type="checkbox"
                      name="enableBus"
                      innerRef={register}
                      id="enableBus"
                    />{" "}
                    <Label for="enableBus">Đi xe bus</Label>
                  </div>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="toSchoolBusStop" className=" mr-sm-2">
                    Chiều đi từ
                  </Label>
                  <Controller
                    name="toSchoolBusStop"
                    defaultValue={null}
                    control={control}
                    render={({ onChange, ...data }, { invalid }) => (
                      <BusStopSelect
                        disabled={enableBus === false}
                        id="toSchoolBusStop"
                        placeholder="Đến trường từ địa điểm"
                        invalid={invalid}
                        onChange={onChange}
                        {...data}
                      />
                    )}
                  />
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="toHomeBusStop" className=" mr-sm-2">
                    Chiều về đến
                  </Label>
                  <Controller
                    name="toHomeBusStop"
                    defaultValue={null}
                    control={control}
                    render={({ onChange, ...data }) => (
                      <BusStopSelect
                        disabled={enableBus === false}
                        id="toHomeBusStop"
                        placeholder="Về nhà đến địa điểm"
                        invalid={!!errors.toHomeBusStop}
                        onChange={onChange}
                        {...data}
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </div>
            <FormGroup>
              <div className="checkbox abc-checkbox pl-0">
                <Input
                  type="checkbox"
                  name="enableMeal"
                  innerRef={register}
                  id="enableMeal"
                />{" "}
                <Label for="enableMeal" className="required">
                  <FormattedMessage {...studentFormMessage.meal} />
                </Label>
              </div>
            </FormGroup>
          </Col>
        </Row>

        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!(isValid && isDirty)} />
      </Form>
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
