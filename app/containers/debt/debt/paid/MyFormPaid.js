import React from "react";
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
import CustomerSelect from "../../../../components/common/customer/CustomerSelect";
import debtApi from "../../../../libs/apis/debt/debt.api";
import FormError from "../../../../components/Form/FormError";
import FormGroup from "../../../../components/Form/FormGroup";
import CompanySelect from "../../../../components/common/company/CompanySelect";
import InputNumber from "../../../../components/Form/InputNumber";
import {
  LIST_SUBJECT_TYPE,
  SUBJECT_TYPE,
} from "../../../partner/subject/constants";

const validationSchema = Yup.object().shape({
  person: Yup.object().when("type", {
    is: val => Number(val) === SUBJECT_TYPE.PERSONAL,
    then: Yup.object()
      .nullable()
      .required(),
  }),
  company: Yup.object().when("type", {
    is: val => Number(val) === SUBJECT_TYPE.COMPANY,
    then: Yup.object()
      .nullable()
      .required(),
  }),
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
    watch,
    control,
    setValue,
    state: { isLoading, formData, errors: serverErrors },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      let msg = "";
      if (Number(resp.type) === SUBJECT_TYPE.COMPANY) {
        msg = resp.company.name;
      } else {
        msg =
          resp.person.fullName ||
          `${resp.person.firstName} ${resp.person.lastName}`;
      }
      toast.success(
        id ? `Update Debit ${msg} success` : `Create Debit ${msg} success`,
      );
    },
    validationSchema,
    initForm: {
      person: null,
      company: null,
      type: SUBJECT_TYPE.PERSONAL,
      remark: "",
      contactPerson: null,
      amount: "",
      tagging: [],
    },
    id,
  });

  const type = watch("type");

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverErrors} />
        <Row>
          <Col xs="12" sm="6" md="12" lg="6" xl="6">
            <FormGroupInput
              className={id ? "hide" : ""}
              label="Loại đối tác"
              name="type"
              type="select"
              register={register}
              error={errors.type}
            >
              <option value="">Chọn loại đối tác</option>
              {LIST_SUBJECT_TYPE.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </FormGroupInput>
            {Number(type) === SUBJECT_TYPE.COMPANY ? (
              <FormattedMessage {...messages.formCompanyLabel}>
                {msg => (
                  <FormGroup isRequired label={msg}>
                    <Controller
                      name="company"
                      defaultValue={formData.company}
                      control={control}
                      render={({ onChange, ...data }, { invalid }) => (
                        <CompanySelect
                          id="company"
                          placeholder={msg}
                          invalid={invalid}
                          onAdded={newCompany => {
                            setValue("company", newCompany, {
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
                    <FormHookErrorMessage error={errors.company} />
                  </FormGroup>
                )}
              </FormattedMessage>
            ) : (
              <FormattedMessage {...messages.formPersonLabel}>
                {msg => (
                  <FormGroup isRequired label={msg}>
                    <Controller
                      name="person"
                      defaultValue={formData.person}
                      control={control}
                      render={({ onChange, ...data }, { invalid }) => (
                        <CustomerSelect
                          id="person"
                          placeholder={msg}
                          invalid={invalid}
                          onAdded={newPerson => {
                            setValue("person", newPerson, {
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
                    <FormHookErrorMessage error={errors.person} />
                  </FormGroup>
                )}
              </FormattedMessage>
            )}
            {Number(type) === SUBJECT_TYPE.COMPANY ? (
              <FormGroup>
                <Label for="person" className="mr-sm-2">
                  <FormattedMessage {...messages.formContactPerson} />
                </Label>
                <Controller
                  name="contactPerson"
                  defaultValue={formData.contactPerson}
                  control={control}
                  render={({ onChange, ...data }) => (
                    <FormattedMessage {...messages.formContactPerson}>
                      {msg => (
                        <CustomerSelect
                          id="contactPerson"
                          placeholder={msg}
                          onAdded={newCustomer => {
                            setValue("contactPerson", newCustomer, {
                              shouldValidate: true,
                            });
                          }}
                          onChange={onChange}
                          {...data}
                        />
                      )}
                    </FormattedMessage>
                  )}
                />
              </FormGroup>
            ) : null}
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
