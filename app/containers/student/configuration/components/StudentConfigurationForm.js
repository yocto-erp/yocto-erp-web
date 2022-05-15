import React, { useEffect } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import Widget from "../../../../components/Widget/Widget";
import studentConfigurationApi from "../../../../libs/apis/student/student-config.api";
import { ERROR } from "../../../../components/Form/messages";
import useMyForm from "../../../../libs/hooks/useMyForm";
import FormError from "../../../../components/Form/FormError";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import SubmitButton from "../../../../components/button/SubmitButton";
import InputNumber from "../../../../components/Form/InputNumber";
import InputAmount from "../../../../components/Form/InputAmount";
import { useApi } from "../../../../libs/hooks/useApi";
import { templateApi } from "../../../../libs/apis/template/template.api";
import InputAsyncTagging from "../../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../../libs/apis/tagging.api";
import BackButton from "../../../../components/button/BackButton";

const StudentConfigurationForm = () => {
  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape({
        numberDayOfMonth: Yup.number()
          .typeError(ERROR.required)
          .moreThan(0, ERROR.numberGT0)
          .required(ERROR.required),
        busFee: Yup.number()
          .typeError(ERROR.required)
          .positive(ERROR.amountGT0)
          .required(ERROR.required),
        /*
        busRoutes: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.string().required(ERROR.required),
              name: Yup.string().required(ERROR.required),
            }),
          )
          .required(ERROR.required),
        classes: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.string().required(ERROR.required),
              name: Yup.string().required(ERROR.required),
              tuitionFee: Yup.number()
                .required()
                .transform(transformUnNumber),
              feePerDay: Yup.number()
                .transform(transformUnNumber)
                .positive(ERROR.amountGT0)
                .required(ERROR.required),
              feePerTrialDay: Yup.number()
                .transform(transformUnNumber)
                .positive(ERROR.amountGT0)
                .required(ERROR.required),
              mealFeePerMonth: Yup.number()
                .transform(transformUnNumber)
                .positive(ERROR.amountGT0)
                .required(ERROR.required),
              mealFeePerDay: Yup.number()
                .transform(transformUnNumber)
                .positive(ERROR.amountGT0)
                .required(ERROR.required),
            }),
          )
          .required(ERROR.required),

         */
      }),
    [],
  );

  const {
    control,
    register,
    errors,
    onSubmit,
    reset,
    formState: { isValid, isDirty },
    state: { isLoading, errors: serverErrors, resp: submitResp },
  } = useMyForm({
    api: async data => studentConfigurationApi.save(data),
    validationSchema,
    defaultValues: {
      numberDayOfMonth: 0,
      feePerDay: 0,
      monthlyTuitionFee: 0,
      feePerTrialDay: 0,
      mealFeePerDay: 0,
      busFee: 0,
      busRoutes: [{ id: "", name: "" }],
      classes: [
        {
          id: "",
          name: "",
          tuitionFee: 0,
          feePerDay: 0,
          feePerTrialDay: 0,
          mealFeePerDay: 0,
          mealFeePerMonth: 0,
        },
      ],
      printTemplateId: "",
    },
  });

  const {
    state: { resp: templates },
    exec,
  } = useApi(() =>
    templateApi.search({ page: 1, size: 1000, filter: { type: 1 } }),
  );

  useEffect(() => {
    exec().then(_resp => {
      console.log(_resp);
    });
  }, []);

  useEffect(() => {
    studentConfigurationApi.get().then(resp => {
      console.log(resp);
      if (resp) {
        reset(resp);
      }
    });
  }, [reset]);

  useEffect(() => {
    if (submitResp) {
      toast.success(`Update student configuration success.`);
    }
  }, [submitResp]);

  /*
  const { fields, append, remove } = useFieldArray({
    control,
    name: "busRoutes",
    keyName: "bId",
  });

  const {
    fields: classFields,
    append: classAppend,
    remove: classRemove,
  } = useFieldArray({
    control,
    name: "classes",
    keyName: "cId",
  });
  */
  const form = React.useMemo(() => {
    if (!templates) return null;
    return (
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="numberDayOfMonth">
                Number Day of Month <span className="text-danger">*</span>
              </Label>
              <Controller
                invalid={!!errors.numberDayOfMonth}
                name="numberDayOfMonth"
                control={control}
                defaultValue={0}
                render={({ onChange, value, onBlur }, { invalid }) => (
                  <InputNumber
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Number Day of Month"
                    value={value}
                    invalid={invalid}
                  />
                )}
              />
              <FormHookErrorMessage error={errors.numberDayOfMonth} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="busFee">
                Bus Fee<span className="text-danger">*</span>
              </Label>
              <Controller
                name="busFee"
                control={control}
                defaultValue={0}
                render={({ onChange, value, onBlur }, { invalid }) => (
                  <InputAmount
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Bus Fee"
                    value={value}
                    invalid={invalid}
                  />
                )}
              />
              <FormHookErrorMessage error={errors.busFee} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="printTemplate">Print Template</Label>
              <Input type="select" innerRef={register} name="printTemplateId">
                <option value="">Select Print Template</option>
                {templates?.rows.map(t => (
                  <option value={t.id} key={t.id}>
                    {t.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <p className="h3">Phiếu thu</p>
        <div className="form-group row">
          <label htmlFor="taggingTuition" className="col-md-3 col-form-label">
            Tagging phiếu thu học phí
          </label>
          <div className="col-md-9">
            <Controller
              name="taggingTuition"
              defaultValue={null}
              control={control}
              render={({ onChange, ...data }) => (
                <InputAsyncTagging
                  {...data}
                  onChange={onChange}
                  loadOptionApi={taggingApi.search}
                />
              )}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="taggingBusFee" className="col-md-3 col-form-label">
            Tagging phiếu thu tiền xe
          </label>
          <div className="col-md-9">
            <Controller
              name="taggingBusFee"
              defaultValue={null}
              control={control}
              render={({ onChange, ...data }) => (
                <InputAsyncTagging
                  {...data}
                  onChange={onChange}
                  loadOptionApi={taggingApi.search}
                />
              )}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="taggingMealFee" className="col-md-3 col-form-label">
            Tagging phiếu thu tiền ăn
          </label>
          <div className="col-md-9">
            <Controller
              name="taggingMealFee"
              defaultValue={null}
              control={control}
              render={({ onChange, ...data }) => (
                <InputAsyncTagging
                  {...data}
                  onChange={onChange}
                  loadOptionApi={taggingApi.search}
                />
              )}
            />
          </div>
        </div>
        {/*
        <Row>
          <Col>
            <FormGroup>
              <Label for="classes">List of classes</Label>
              <Table bordered hover striped size="sm">
                <thead>
                  <tr>
                    <th style={{ width: "100px" }}>
                      ID <span className="text-danger">*</span>
                    </th>
                    <th style={{ width: "250px" }}>
                      Name <span className="text-danger">*</span>
                    </th>
                    <th>
                      Fee / Month <span className="text-danger">*</span>
                    </th>
                    <th>
                      Fee Return / Day <span className="text-danger">*</span>
                    </th>
                    <th>
                      Fee Per Trial Date <span className="text-danger">*</span>
                    </th>
                    <th>
                      Meal Fee / Months <span className="text-danger">*</span>
                    </th>
                    <th>
                      Meal Fee Return / Day
                      <span className="text-danger">*</span>
                    </th>
                    <th className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classFields.map((item, index) => (
                    <ClassForm
                      key={item.id || item.key}
                      errors={errors}
                      register={register}
                      item={item}
                      index={index}
                      remove={classRemove}
                      control={control}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="8">
                      <CreateButton
                        size="sm"
                        type="button"
                        onClick={() => {
                          classAppend({
                            id: "",
                            name: "",
                            key: uuidv4(),
                          });
                        }}
                      >
                        Add
                      </CreateButton>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="6" lg="6" xl="6">
            <FormGroup>
              <Label for="busRoutes">Bus Route</Label>
              <Table bordered hover striped size="sm">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>
                      ID <span className="text-danger">*</span>
                    </th>
                    <th style={{ width: "250px" }}>
                      Name <span className="text-danger">*</span>
                    </th>
                    <th className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((item, index) => (
                    <BusRouteForm
                      key={item.id || item.key}
                      errors={errors}
                      register={register}
                      item={item}
                      index={index}
                      remove={remove}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="6">
                      <CreateButton
                        size="sm"
                        type="button"
                        onClick={() => {
                          append({
                            id: "",
                            name: "",
                            key: uuidv4(),
                          });
                        }}
                      >
                        Add
                      </CreateButton>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </FormGroup>
          </Col>
        </Row>
        */}
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!(isValid && isDirty)} />
      </Form>
    );
  }, [onSubmit, errors, register, isLoading, reset, templates]);
  return (
    <Widget>
      {serverErrors && serverErrors.length ? (
        <FormError errors={serverErrors} />
      ) : (
        ""
      )}
      {form}
    </Widget>
  );
};

StudentConfigurationForm.propTypes = {};

export default StudentConfigurationForm;
