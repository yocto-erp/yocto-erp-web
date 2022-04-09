import React from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Controller } from "react-hook-form";
import apiCost from "../../../libs/apis/cost.api";
import Widget from "../../../components/Widget/Widget";
import { useHookCRUDForm } from "../../../libs/hooks/useHookCRUDForm";
import SubmitButton from "../../../components/button/SubmitButton";
import BackButton from "../../../components/button/BackButton";
import InputAmount from "../../../components/Form/InputAmount";
import InputAsyncTagging from "../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../libs/apis/tagging.api";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";
import PaymentSelect from "../../finance/payment/components/PaymentSelect";
import FormError from "../../../components/Form/FormError";
import FormRow from "../../../components/Form/FormRow";
import { DEFAULT_LABEL_COL, DEFAULT_VALUE_COL } from "../../../constants";
import SelectSubject from "../../partner/subject/components/SelectSubject";
import AssetSelect from "../../../components/assets/AssetSelect";
import { ALL_MIME_TYPE } from "../../../components/assets/constants";

const CreateReceiptForm = ({ id }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("this field is required"),
    amount: yup
      .number()
      .typeError("This field is required")
      .positive("Amount must be greater than zero")
      .required("This field is required"),
    tagging: yup.array().nullable(),
  });
  const { create, read, update } = apiCost;
  const {
    control,
    register,
    submit,
    errors,
    setValue,
    formState: { isValid, isDirty },
    state: { isLoading, formData, errors: serverErrors },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Receipt Voucher ${resp.name} success`
          : `Create Receipt Voucher ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      ...form,
      purpose: form.costPurpose.purpose,
    }),
    initForm: {
      amount: "",
      assets: [],
      subject: null,
      tagging: [],
    },
    validationSchema,
    id,
  });

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverErrors} />
        <Row>
          <Col md={7}>
            <FormRow
              name="name"
              error={errors.name}
              register={register}
              type="text"
              valueCol={DEFAULT_VALUE_COL}
              labelCol={DEFAULT_LABEL_COL}
              placeholder="Name"
              label="Name"
              isRequired
            />
            <FormGroup row>
              <Label sm={DEFAULT_LABEL_COL}>
                Amount <span className="text-danger">*</span>
              </Label>
              <Col sm={DEFAULT_VALUE_COL}>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={formData.amount}
                  render={({ onChange, value }, { invalid }) => (
                    <InputAmount
                      placeholder="Amount"
                      onChange={onChange}
                      value={value}
                      invalid={invalid}
                    />
                  )}
                />
                <FormHookErrorMessage error={errors.amount} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={DEFAULT_LABEL_COL}>Payment Method</Label>
              <Col sm={DEFAULT_VALUE_COL}>
                <Controller
                  name="paymentMethod"
                  control={control}
                  defaultValue={null}
                  render={({ onChange, value }, { invalid }) => (
                    <PaymentSelect
                      placeholder="Payment Method"
                      onChange={onChange}
                      value={value}
                      invalid={invalid}
                    />
                  )}
                />
                <FormHookErrorMessage error={errors.paymentMethod} />
              </Col>
            </FormGroup>
            <FormRow
              name="remark"
              register={register}
              type="textarea"
              valueCol={DEFAULT_VALUE_COL}
              labelCol={DEFAULT_LABEL_COL}
              placeholder="Remark"
              label="Remark"
            />
            <FormGroup row>
              <Label sm={DEFAULT_LABEL_COL}>Partner Company</Label>
              <Col sm={DEFAULT_VALUE_COL}>
                <Controller
                  name="subject"
                  defaultValue={formData.subject}
                  control={control}
                  render={({ onChange, ...data }) => (
                    <SelectSubject
                      id="partnerCompanyId"
                      placeholder="Choose Partner Company"
                      invalid={!!errors.partnerCompanyId}
                      onAdded={newCompany => {
                        setValue("partnerCompanyId", newCompany, {
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
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={DEFAULT_LABEL_COL}>Tagging</Label>
              <Col sm={DEFAULT_VALUE_COL}>
                <Controller
                  name="tagging"
                  defaultValue={formData.tagging}
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
              </Col>
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup className="pb-3 h-100">
              <Controller
                defaultValue={formData.assets}
                name="assets"
                control={control}
                render={({ onChange, ...data }, { invalid }) => (
                  <AssetSelect
                    fileTypes={ALL_MIME_TYPE}
                    placeholder="Select files"
                    maxSize={500000}
                    {...data}
                    onChange={onChange}
                    className="h-100"
                    invalid={invalid}
                  />
                )}
              />
              <FormHookErrorMessage error={errors.assets} />
            </FormGroup>

            <Input innerRef={register} type="hidden" name="type" value="1" />
          </Col>
        </Row>
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!isValid || !isDirty} />
      </Form>
    </Widget>
  );
};

CreateReceiptForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CreateReceiptForm.defaultProps = {};

export default CreateReceiptForm;
