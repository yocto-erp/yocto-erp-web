import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import {
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import { Controller, useWatch } from "react-hook-form";
import Widget from "../../../components/Widget/Widget";
import SubmitButton from "../../../components/button/SubmitButton";
import BackButton from "../../../components/button/BackButton";
import { useHookCRUDForm } from "../../../libs/hooks/useHookCRUDForm";
import CustomerSelect from "../../../components/common/customer/CustomerSelect";
import studentApi from "../../../libs/apis/student/student.api";
import DateSelect from "../../../components/date/DateSelect";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";
import { ERROR } from "../../../components/Form/messages";
import useStudentConfigure from "../../../libs/hooks/useStudentConfigure";
import BusStopSelect from "../student-bus-stop/components/BusStopSelect";
import StudentClassSelect from "../student-class/components/StudentClassSelect";
import { parseIso } from "../../../libs/utils/date.util";
import { STUDENT_STATUS_LIST } from "../constants";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required(ERROR.required),
  studentId: Yup.string().required(ERROR.required),
  alias: Yup.string().required(ERROR.required),
});

const { create, update, read } = studentApi;

function MyForm({ id }) {
  const {
    configure: { busRoutes = null, classes = null },
  } = useStudentConfigure();

  const {
    control,
    register,
    submit,
    errors,
    setValue,
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

  const form = React.useMemo(() => {
    if (!busRoutes && !classes) {
      return null;
    }
    return (
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
              <FormHookErrorMessage error={errors.studentId} />
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
              <FormHookErrorMessage error={errors.fullName} />
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
              <FormHookErrorMessage error={errors.alias} />
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
              <FormHookErrorMessage error={errors.birthday} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="class" className="mr-sm-2 required">
                Lớp học
              </Label>
              <Controller
                name="class"
                control={control}
                render={({ onChange, ...data }) => (
                  <StudentClassSelect
                    id="class"
                    placeholder="Chọn lớp học"
                    invalid={!!errors.class}
                    onChange={onChange}
                    {...data}
                  />
                )}
              />
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
                {STUDENT_STATUS_LIST.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
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
              <FormHookErrorMessage error={errors.joinDate} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="father" className="mr-sm-2">
                Father
              </Label>
              <Controller
                name="father"
                defaultValue={formData ? formData.father : null}
                control={control}
                render={({ onChange, ...data }) => (
                  <CustomerSelect
                    id="father"
                    placeholder="Choose Father"
                    onAdded={newCustomer => {
                      console.log(`OnAdd: ${JSON.stringify(newCustomer)}`);
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
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="mother" className="mr-sm-2">
                Mother
              </Label>
              <Controller
                name="mother"
                defaultValue={formData ? formData.mother : null}
                control={control}
                render={({ onChange, ...data }) => (
                  <CustomerSelect
                    id="mother"
                    placeholder="Choose Mother"
                    onAdded={newCustomer => {
                      setValue("mother", newCustomer, {
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
        <div className="align-items-center row">
          <div className="col-auto">
            <div className="checkbox abc-checkbox pl-0">
              <Input
                type="checkbox"
                name="enableBus"
                innerRef={register}
                id="enableBus"
              />{" "}
              <Label for="enableBus">Đi xe bus</Label>
            </div>
          </div>
          <div className="col">
            <Label for="toSchoolBusStop" className="sr-only mr-sm-2">
              Chiều đi từ
            </Label>
            <Controller
              name="toSchoolBusStop"
              defaultValue={null}
              control={control}
              render={({ onChange, ...data }) => (
                <BusStopSelect
                  disabled={enableBus === false}
                  id="toSchoolBusStop"
                  placeholder="Đến trường từ địa điểm"
                  invalid={!!errors.toSchoolBusRoute}
                  onChange={onChange}
                  {...data}
                />
              )}
            />
          </div>
          <div className="col">
            <Label for="toHomeBusStop" className="sr-only mr-sm-2">
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
          </div>
        </div>
        <Row className="mt-3">
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <div className="checkbox abc-checkbox pl-0">
                <Input
                  type="checkbox"
                  name="enableMeal"
                  innerRef={register}
                  id="enableMeal"
                />{" "}
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
    );
  }, [errors, isLoading, submit, register, busRoutes, classes]);

  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
