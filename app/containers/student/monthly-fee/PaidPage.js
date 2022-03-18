import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import classNames from "classnames";
import PageTitle from "../../Layout/PageTitle";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import studentMonthlyFeeApi from "../../../libs/apis/student/student-monthly-fee.api";
import InputAmount from "../../../components/Form/InputAmount";
import FormGroupInput from "../../../components/Form/FormGroupInput";
import SendEmailEditorForm from "../../../components/SendEmailEditorForm";
import useMyForm from "../../../libs/hooks/useMyForm";
import { transformUnNumber } from "../../../libs/utils/number.util";
import { ERROR } from "../../../components/Form/messages";
import { emailSchema } from "../../../libs/utils/schema.util";
import BackButton from "../../../components/button/BackButton";
import SubmitButton from "../../../components/button/SubmitButton";
import { formatMonth } from "../../../libs/utils/date.util";
import InputAsyncTagging from "../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../libs/apis/tagging.api";
import useStudentConfigure from "../../../libs/hooks/useStudentConfigure";

const schema = yup.object().shape({
  amount: yup
    .number()
    .transform(transformUnNumber)
    .positive(ERROR.amountGT0)
    .required(ERROR.required),
  remark: yup.string(),
  storeCashIn: yup.bool(),
  storeCashInName: yup.string().when("storeCashIn", {
    is: true,
    then: yup.string().required(),
  }),
  storeCashInAmount: yup.number().when("storeCashIn", {
    is: true,
    then: yup
      .number()
      .transform(transformUnNumber)
      .positive(ERROR.amountGT0)
      .required(ERROR.required),
  }),
  storeCashInBus: yup.bool(),
  storeCashInBusName: yup.string().when("storeCashInBus", {
    is: true,
    then: yup.string().required(),
  }),
  storeCashInBusAmount: yup.number().when("storeCashInBus", {
    is: true,
    then: yup
      .number()
      .transform(transformUnNumber)
      .positive(ERROR.amountGT0)
      .required(ERROR.required),
  }),
  storeCashInMeal: yup.bool(),
  storeCashInMealName: yup.string().when("storeCashInMeal", {
    is: true,
    then: yup.string().required(),
  }),
  storeCashInMealAmount: yup.number().when("storeCashInMeal", {
    is: true,
    then: yup
      .number()
      .transform(transformUnNumber)
      .positive(ERROR.amountGT0)
      .required(ERROR.required),
  }),
  storeOtherCashIn: yup.bool(),
  storeOtherCashInName: yup.string().when("storeOtherCashIn", {
    is: true,
    then: yup.string().required(),
  }),
  storeOtherCashInAmount: yup.number().when("storeOtherCashIn", {
    is: true,
    then: yup
      .number()
      .transform(transformUnNumber)
      .positive(ERROR.amountGT0)
      .required(ERROR.required),
  }),
  sendEmailConfirm: yup.bool(),
  from: emailSchema.when("sendEmailConfirm", {
    is: true,
    then: emailSchema.required(),
  }),
  content: yup.string().when("sendEmailConfirm", {
    is: true,
    then: yup.string().required(),
  }),
  subject: yup.string().when("sendEmailConfirm", {
    is: true,
    then: yup.string().required(),
  }),
  cc: yup.array().nullable(),
  bcc: yup.array().nullable(),
});

const PaidPage = () => {
  const { id } = useParams();

  const [monthlyFee, setMonthlyFee] = useState(null);
  const { exec, state } = useApi(studentMonthlyFeeApi.read);
  const { configure } = useStudentConfigure();
  const {
    state: { resp: studentPrint },
    exec: printExec,
  } = useApi(studentMonthlyFeeApi.printData);

  const {
    register,
    onSubmit,
    formState: { errors, isDirty, isValid },
    control,
    reset,
    watch,
    setValue,
    confirmModal,
    state: { isLoading, errors: serverErrors, status },
  } = useMyForm({
    validationSchema: schema,
    api: formData => {
      console.log(formData);
      return studentMonthlyFeeApi.pay(id, formData);
    },
    onConfirm: formData => ({
      title: `Confirm Paid Student Fee ${formData.amount} !`,
      message: "Are you sure to confirm payment student fee?",
    }),
    form: {},
  });

  console.log(id);
  const {
    sendEmailConfirm,
    storeCashIn,
    storeCashInMeal,
    storeCashInBus,
    storeOtherCashIn,
  } = watch([
    "sendEmailConfirm",
    "storeCashIn",
    "storeCashInMeal",
    "storeCashInBus",
    "storeOtherCashIn",
  ]);

  useEffect(() => {
    if (serverErrors && serverErrors.length) {
      toast.error(serverErrors.map(t => t.message).join("\n"));
    }
  }, [serverErrors]);

  useEffect(() => {
    exec(id);
    printExec(id);
  }, [id]);

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS && configure) {
      console.log("configure", configure);
      setMonthlyFee(state.resp[0]);
      const monthFee = state.resp[0];
      const name = `Học phí ${monthFee.student.child.name} (${
        monthFee.student.alias
      }) - tháng ${formatMonth(monthFee?.monthFee, monthFee?.yearFee)} ${
        monthFee.numberOfMonths > 0
          ? ` - ${formatMonth(monthFee.toMonth, monthFee.toYear)}`
          : ""
      }`;
      const tuitionFee =
        monthFee.feePerMonth * (monthFee.numberOfMonths || 1) -
        monthFee.scholarFee;

      let formData = {
        amount: monthFee.totalAmount || 0,
        storeCashInAmount: tuitionFee,
        storeCashInTagging: configure?.taggingTuition || [],
        remark: "",
        storeCashInName: name,
        name,
        storeCashIn: true,
        sendEmailConfirm: true,
        from: "",
        emailTemplate: null,
      };
      if (monthFee.mealFee > 0) {
        formData = {
          ...formData,
          storeCashInMeal: true,
          storeCashInMealName: `Tiền ăn ${monthFee.student.child.name} (${
            monthFee.student.alias
          }) - tháng ${formatMonth(monthFee?.monthFee, monthFee?.yearFee)} ${
            monthFee.numberOfMonths > 0
              ? ` - ${formatMonth(monthFee.toMonth, monthFee.toYear)}`
              : ""
          }`,
          storeCashInMealAmount: monthFee.mealFee,
          storeCashInMealTagging: configure?.taggingMealFee || [],
        };
      }
      if (monthFee.busFee > 0) {
        formData = {
          ...formData,
          storeCashInBus: true,
          storeCashInBusName: `Tiền xe ${monthFee.student.child.name} (${
            monthFee.student.alias
          }) - tháng ${formatMonth(monthFee?.monthFee, monthFee?.yearFee)} ${
            monthFee.numberOfMonths > 0
              ? ` - ${formatMonth(monthFee.toMonth, monthFee.toYear)}`
              : ""
          }`,
          storeCashInBusAmount: monthFee.busFee,
          storeCashInBusTagging: configure?.taggingBusFee || [],
        };
      }
      if (monthFee.otherFee > 0) {
        formData = {
          ...formData,
          storeOtherCashIn: true,
          storeOtherCashInName: `Chi phí khác ${monthFee.student.child.name} (${
            monthFee.student.alias
          }) - tháng ${formatMonth(monthFee?.monthFee, monthFee?.yearFee)} ${
            monthFee.numberOfMonths > 0
              ? ` - ${formatMonth(monthFee.toMonth, monthFee.toYear)}`
              : ""
          }`,
          storeOtherCashInAmount: monthFee.otherFee,
        };
      }

      reset(formData);
    }
  }, [state, configure]);

  return (
    <>
      <PageTitle
        colLeft={12}
        title={`${monthlyFee?.student?.child?.name} (${
          monthlyFee?.student?.alias
        }) - Học phí tháng ${formatMonth(
          monthlyFee?.monthFee,
          monthlyFee?.yearFee,
        )} ${
          monthlyFee?.numberOfMonths > 1
            ? ` - ${formatMonth(monthlyFee?.toMonth, monthlyFee?.toYear)}`
            : ""
        }`}
      />
      {status !== API_STATE.SUCCESS ? (
        <form onSubmit={onSubmit} noValidate>
          <div className="row">
            <div className="col-4">
              <p className="h3 mb-4">Thông tin chung</p>
              <div className="form-group">
                <label htmlFor="amount">Payment Amount</label>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue="0"
                  render={({ onChange, value, onBlur }, { invalid }) => (
                    <InputAmount
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="Payment Amount"
                      value={value}
                      invalid={invalid}
                    />
                  )}
                />
              </div>
              <FormGroupInput
                name="remark"
                placeholder="Remark"
                type="textarea"
                label="Remark"
                rows={5}
                register={register}
              />
            </div>
            <div className="col-md-8">
              <p className="h3 mb-4">Tạo phiếu thu</p>
              <div className="form-group">
                <label htmlFor="storeCashIn">Phiếu Thu Học Phí</label>
                <div className="form-inline">
                  <div className="input-group mr-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-gray">
                        <input
                          type="checkbox"
                          className=""
                          id="storeCashIn"
                          name="storeCashIn"
                          ref={register}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="storeCashInName"
                      placeholder="Tên phiếu thu"
                      className={classNames("form-control", {
                        "is-invalid": !!errors.storeCashInName,
                      })}
                      disabled={!storeCashIn}
                      ref={register}
                    />
                  </div>
                  <Controller
                    name="storeCashInAmount"
                    control={control}
                    defaultValue="0"
                    render={({ onChange, value, onBlur }, { invalid }) => (
                      <InputAmount
                        style={{ width: "120px" }}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={!storeCashIn}
                        placeholder="Tuition Amount"
                        value={value}
                        invalid={invalid}
                      />
                    )}
                  />
                  <Controller
                    name="storeCashInTagging"
                    defaultValue={null}
                    control={control}
                    render={({ onChange, ...data }) => (
                      <div className="ml-2" style={{ width: "300px" }}>
                        <InputAsyncTagging
                          isDisabled={!storeCashIn}
                          {...data}
                          onChange={onChange}
                          loadOptionApi={taggingApi.search}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="storeCashInMeal">Phiếu Thu tiền ăn</label>
                <div className="form-inline">
                  <div className="input-group mr-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-gray">
                        <input
                          type="checkbox"
                          className=""
                          id="storeCashInMeal"
                          name="storeCashInMeal"
                          ref={register}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="storeCashInMealName"
                      placeholder="Tên phiếu thu"
                      className={classNames("form-control", {
                        "is-invalid": !!errors.storeCashInMealName,
                      })}
                      disabled={!storeCashInMeal}
                      ref={register}
                    />
                  </div>
                  <Controller
                    name="storeCashInMealAmount"
                    control={control}
                    defaultValue="0"
                    render={({ onChange, value, onBlur }, { invalid }) => (
                      <InputAmount
                        style={{ width: "120px" }}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={!storeCashInMeal}
                        placeholder="Meal Fee"
                        value={value}
                        invalid={invalid}
                      />
                    )}
                  />
                  <Controller
                    name="storeCashInMealTagging"
                    defaultValue={null}
                    control={control}
                    render={({ onChange, ...data }) => (
                      <div className="ml-2" style={{ width: "300px" }}>
                        <InputAsyncTagging
                          isDisabled={!storeCashInMeal}
                          {...data}
                          onChange={onChange}
                          loadOptionApi={taggingApi.search}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="storeCashInBus">Phiếu Thu tiền xe</label>
                <div className="form-inline">
                  <div className="input-group mr-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-gray">
                        <input
                          type="checkbox"
                          className=""
                          id="storeCashInBus"
                          name="storeCashInBus"
                          ref={register}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="storeCashInBusName"
                      placeholder="Tên phiếu thu"
                      className={classNames("form-control", {
                        "is-invalid": !!errors.storeCashInBusName,
                      })}
                      disabled={!storeCashInBus}
                      ref={register}
                    />
                  </div>
                  <Controller
                    name="storeCashInBusAmount"
                    control={control}
                    defaultValue="0"
                    render={({ onChange, value, onBlur }, { invalid }) => (
                      <InputAmount
                        style={{ width: "120px" }}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={!storeCashInBus}
                        placeholder="Bus Fee"
                        value={value}
                        invalid={invalid}
                      />
                    )}
                  />
                  <Controller
                    name="storeCashInBusTagging"
                    defaultValue={null}
                    control={control}
                    render={({ onChange, ...data }) => (
                      <div className="ml-2" style={{ width: "300px" }}>
                        <InputAsyncTagging
                          isDisabled={!storeCashInBus}
                          {...data}
                          onChange={onChange}
                          loadOptionApi={taggingApi.search}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="storeOtherCashIn">Phiếu Thu khác</label>
                <div className="form-inline">
                  <div className="input-group mr-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-gray">
                        <input
                          type="checkbox"
                          className=""
                          id="storeOtherCashIn"
                          name="storeOtherCashIn"
                          ref={register}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="storeOtherCashInName"
                      placeholder="Tên phiếu thu"
                      className={classNames("form-control", {
                        "is-invalid": !!errors.storeOtherCashInName,
                      })}
                      disabled={!storeOtherCashIn}
                      ref={register}
                    />
                  </div>
                  <Controller
                    name="storeOtherCashInAmount"
                    control={control}
                    defaultValue="0"
                    render={({ onChange, value, onBlur }, { invalid }) => (
                      <InputAmount
                        style={{ width: "120px" }}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={!storeOtherCashIn}
                        placeholder="Bus Fee"
                        value={value}
                        invalid={invalid}
                      />
                    )}
                  />
                  <Controller
                    name="storeOtherCashInTagging"
                    defaultValue={null}
                    control={control}
                    render={({ onChange, ...data }) => (
                      <div className="ml-2" style={{ width: "300px" }}>
                        <InputAsyncTagging
                          isDisabled={!storeOtherCashIn}
                          {...data}
                          onChange={onChange}
                          loadOptionApi={taggingApi.search}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="sendEmailConfirm"
              name="sendEmailConfirm"
              ref={register}
            />
            <label className="form-check-label" htmlFor="sendEmailConfirm">
              Send Email Confirm
            </label>
          </div>
          {sendEmailConfirm ? (
            <div className="row">
              <div className="col-12">
                <SendEmailEditorForm
                  register={register}
                  setValue={setValue}
                  control={control}
                  errors={errors}
                  values={studentPrint}
                />
              </div>
            </div>
          ) : null}
          <BackButton className="mr-2" />
          <SubmitButton
            isLoading={isLoading}
            disabled={!(isValid && isDirty)}
          />
        </form>
      ) : (
        <div className="alert alert-primary" role="alert">
          <h4 className="alert-heading">Success !</h4>
          <p style={{ fontSize: "1rem" }}>Xác nhận học phí thành công</p>
          <hr />
          <BackButton className="mr-2" />
        </div>
      )}
      {confirmModal}
    </>
  );
};

PaidPage.propTypes = {};

export default PaidPage;
