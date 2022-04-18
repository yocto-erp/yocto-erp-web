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
import { DEBIT_TYPE, LIST_DEBIT_TYPE } from "../../constants";
import { ERROR } from "../../../../components/Form/messages";
import SelectSubject from "../../../partner/subject/components/SelectSubject";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
  type: Yup.string().required(),
  amount: Yup.number()
    .typeError("This field is required.")
    .moreThan(0, "Quantity must larger than 0")
    .required("This field is required."),
});

const { create, update, read } = debtApi;

function MyFormDebit({ id }) {
  const {
    register,
    submit,
    errors,
    control,
    setValue,
    state: { isLoading, formData, errors: serverErrors },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Debit ${resp.name} Success!`
          : `Create Debit ${resp.name} Success!`,
      );
    },
    validationSchema,
    initForm: {
      name: "",
      type: DEBIT_TYPE.RECEIVABLES,
      remark: "",
      amount: "",
      tagging: [],
      settleDebtId: null,
      subject: null,
    },
    id,
  });

  useEffect(() => {
    console.log("ServerErrors", serverErrors);
  }, [serverErrors]);

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverErrors} />
        <Row>
          <Col md="6">
            <FormGroupInput
              label="Name"
              isRequired
              name="name"
              type="text"
              error={errors.name}
              register={register}
              placeholder="Name"
            />
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
            <FormGroupInput
              label="Loại ghi nợ"
              name="type"
              type="select"
              register={register}
              error={errors.typeDebit}
            >
              {LIST_DEBIT_TYPE.map(t => (
                <FormattedMessage {...messages[`debtType${t.id}`]} key={t.id}>
                  {msg => (
                    <option key={t.id} value={t.id}>
                      {msg}
                    </option>
                  )}
                </FormattedMessage>
              ))}
            </FormGroupInput>
            <FormGroup>
              <Label for="amount" className="mr-sm-2">
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
          </Col>
          <Col md="6">
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
          </Col>
        </Row>

        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!(isValid && isDirty)} />
      </Form>
    </Widget>
  );
}

MyFormDebit.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyFormDebit.defaultProps = {};

export default MyFormDebit;
