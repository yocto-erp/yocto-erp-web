import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Col, Form, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { Controller } from "react-hook-form";
import Widget from "../../../../components/Widget/Widget";
import SubmitButton from "../../../../components/button/SubmitButton";
import BackButton from "../../../../components/button/BackButton";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import FormGroupInput from "../../../../components/Form/FormGroupInput";
import messages from "../../messages";
import InputAsyncTagging from "../../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../../libs/apis/tagging.api";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import debtApi from "../../../../libs/apis/debt/debt.api";
import FormError from "../../../../components/Form/FormError";
import FormGroup from "../../../../components/Form/FormGroup";
import InputNumber from "../../../../components/Form/InputNumber";
import { DEBIT_TYPE, LIST_PAID_TYPE, PAID_TYPE } from "../../constants";
import { ERROR } from "../../../../components/Form/messages";
import SelectSubject from "../../../partner/subject/components/SelectSubject";
import SelectSettleDebtId from "../../components/SelectSettleDebtId";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
  type: Yup.string().required(),
  amount: Yup.number()
    .typeError("This field is required.")
    .moreThan(0, "Quantity must larger than 0")
    .required("This field is required."),
});

const { create, update, read } = debtApi;

function MyFormPaid({ id }) {
  const {
    register,
    submit,
    errors,
    control,
    setValue,
    watch,
    state: { isLoading, formData, errors: serverErrors },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Paid ${resp.name} Success!`
          : `Create Paid ${resp.name} Success!`,
      );
    },
    validationSchema,
    initForm: {
      name: "",
      type: PAID_TYPE.RECOVERY_PUBLIC_DEBT,
      remark: "",
      amount: "",
      tagging: [],
      settleDebtId: null,
      subject: null,
    },
    id,
  });

  const typeDebit = watch("type");

  useEffect(() => {
    console.log("ServerErrors", serverErrors);
  }, [serverErrors]);

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverErrors} />
        <Row>
          <Col xs="12" sm="6" md="12" lg="6" xl="6">
            <FormGroupInput
              label="Name"
              isRequired
              name="name"
              type="text"
              error={errors.name}
              register={register}
              placeholder="Name"
            />
            <FormGroupInput
              label="Loại trả nợ"
              name="type"
              type="select"
              register={register}
              error={errors.typeDebit}
            >
              {LIST_PAID_TYPE.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </FormGroupInput>
            <FormGroup>
              <Label for="name" className="mr-sm-2">
                Debt
              </Label>
              <Controller
                name="settleDebtId"
                defaultValue={formData.settleDebtId}
                control={control}
                render={({ onChange, ...data }, { invalid }) => (
                  <SelectSettleDebtId
                    id="settleDebtId"
                    placeholder="settleDebtId"
                    debtType={
                      +typeDebit === PAID_TYPE.RECOVERY_PUBLIC_DEBT
                        ? [DEBIT_TYPE.RECEIVABLES]
                        : [DEBIT_TYPE.TO_PAY_DEBT]
                    }
                    invalid={invalid}
                    onChange={val => {
                      if (val) {
                        setValue("amount", val.amount);
                        setValue("subject", val.subject);
                      }
                      onChange(val);
                    }}
                    {...data}
                  />
                )}
              />
              <FormHookErrorMessage error={errors.settleDebtId} />
            </FormGroup>
            <FormGroup>
              <Label for="name" className="mr-sm-2">
                Partner
              </Label>
              <Controller
                name="subject"
                defaultValue={formData.subject}
                control={control}
                render={({ onChange, ...data }, { invalid }) => (
                  <SelectSubject
                    id="subject"
                    placeholder="Choose Partner"
                    invalid={invalid}
                    onAdded={newCompany => {
                      setValue("subject", newCompany, {
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
            <FormGroup>
              <Label for="name" className="mr-sm-2">
                Amount
              </Label>
              <Controller
                control={control}
                defaultValue=""
                invalid={!!errors.amount}
                name="amount"
                render={({ onChange, value, onBlur, ...props }) => (
                  <InputNumber
                    {...props}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Amount"
                  />
                )}
              />
              <FormHookErrorMessage error={errors.amount} />
            </FormGroup>
            <FormattedMessage {...messages.formRemark}>
              {msg => (
                <FormGroupInput
                  label={msg}
                  rows={4}
                  type="textarea"
                  name="remark"
                  register={register}
                  placeholder={msg}
                />
              )}
            </FormattedMessage>
            <FormGroup>
              <Label for="tagging" className="mr-sm-2">
                Tagging
              </Label>
              <Controller
                name="tagging"
                id="tagging"
                defaultValue={formData ? formData.tagging : []}
                control={control}
                render={({ onChange, ...data }) => (
                  <InputAsyncTagging
                    {...data}
                    onChange={onChange}
                    loadOptionApi={taggingApi.search}
                  />
                )}
              />
              <FormHookErrorMessage error={errors.tagging} />
            </FormGroup>
          </Col>
        </Row>

        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!(isValid && isDirty)} />
      </Form>
    </Widget>
  );
}

MyFormPaid.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyFormPaid.defaultProps = {};

export default MyFormPaid;
