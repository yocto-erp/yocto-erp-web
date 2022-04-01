import React, { useEffect } from "react";
import {
  FormFeedback,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Controller } from "react-hook-form";

import apiCost from "../../../libs/apis/cost.api";
import Widget from "../../../components/Widget/Widget";
import { useHookCRUDForm } from "../../../libs/hooks/useHookCRUDForm";
import SubmitButton from "../../../components/button/SubmitButton";
import BackButton from "../../../components/button/BackButton";
import CompanySelect from "../../../components/common/company/CompanySelect";
import CustomerSelect from "../../../components/common/customer/CustomerSelect";
import InputAmount from "../../../components/Form/InputAmount";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";
import { ERROR } from "../../../components/Form/messages";
import { mappingServerTagging } from "../../../components/constants";
import InputAsyncTagging from "../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../libs/apis/tagging.api";
import PaymentSelect from "../../payment/components/PaymentSelect";
import FormError from "../../../components/Form/FormError";
import AssetSelect from "../../../components/assets/AssetSelect";

const CreatePaymentForm = ({ id }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required(ERROR.required),
    amount: yup
      .number()
      .typeError(ERROR.required)
      .positive(ERROR.amountGT0)
      .required(ERROR.required),
    tagging: yup.array().nullable(),
  });
  const { create, read, update } = apiCost;
  const {
    control,
    register,
    submit,
    errors,
    setValue,
    formState,
    state,
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Cost ${resp.name} success`
          : `Create Cost ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      name: form.name,
      remark: form.remark,
      type: form.type,
      amount: form.amount,
      purpose: form.costPurpose.purpose,
      partnerPersonId: form.partnerPerson,
      partnerCompanyId: form.partnerCompany,
      assets: form.assets,
      tagging:
        form.tagging && form.tagging.length
          ? form.tagging.map(mappingServerTagging)
          : [],
    }),
    mappingToServer: form => ({
      ...form,
      partnerPersonId: form.partnerPersonId ? form.partnerPersonId.id : null,
      partnerCompanyId: form.partnerCompanyId ? form.partnerCompanyId.id : null,
    }),
    initForm: {
      amount: "",
      assets: [],
      partnerPersonId: null,
      partnerCompanyId: null,
      tagging: [],
      paymentMethod: null,
    },
    validationSchema,
    id,
  });

  console.log("CreatePaymentForm");
  useEffect(() => {
    console.log("ServerErrors", state);
  }, [state]);

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={state.errors} />
        <Row>
          <Col md={7}>
            <FormGroup row>
              <Label sm={3}>
                Title <span className="text-danger">*</span>
              </Label>
              <Col sm={9}>
                <Input
                  invalid={!!errors.name}
                  name="name"
                  id="name"
                  placeholder="Enter title"
                  innerRef={register}
                />
                <FormHookErrorMessage error={errors.name} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>
                Total Amount <span className="text-danger">*</span>
              </Label>
              <Col sm={9}>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={state.formData.amount}
                  render={({ onChange, value }, { invalid }) => {
                    console.log("Value change", value);
                    return (
                      <InputAmount
                        placeholder="Enter Amount here"
                        onChange={onChange}
                        value={value}
                        invalid={invalid}
                      />
                    );
                  }}
                />
                <FormHookErrorMessage error={errors.amount} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Payment Method</Label>
              <Col sm={9}>
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
            <FormGroup row>
              <Label sm={3}>Remark</Label>
              <Col sm={9}>
                <Input
                  name="remark"
                  innerRef={register}
                  type="textarea"
                  placeholder="Enter title"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Partner Company</Label>
              <Col sm={9}>
                <Controller
                  name="partnerCompanyId"
                  defaultValue={
                    state.formData ? state.formData.partnerCompanyId : null
                  }
                  control={control}
                  render={({ onChange, ...data }) => (
                    <CompanySelect
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
              <Label sm={3}>Partner Person</Label>
              <Col sm={9}>
                <Controller
                  name="partnerPersonId"
                  defaultValue={
                    state.formData ? state.formData.partnerPersonId : null
                  }
                  control={control}
                  render={({ onChange, ...data }) => (
                    <CustomerSelect
                      id="partnerPersonId"
                      placeholder="Choose Partner Person"
                      invalid={!!errors.partnerPersonId}
                      onAdded={newCustomer => {
                        setValue("partnerPersonId", newCustomer, {
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
              <Label sm={3}>Tagging</Label>
              <Col sm={9}>
                <Controller
                  name="tagging"
                  defaultValue={state.formData ? state.formData.tagging : []}
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
                defaultValue={state.formData ? state.formData.assets : []}
                name="assets"
                control={control}
                render={({ onChange, ...data }, { invalid }) => (
                  <AssetSelect
                    accept={["image/*"]}
                    placeholder="Upload files"
                    maxSize={500000}
                    {...data}
                    onChange={onChange}
                    className="h-100"
                    invalid={invalid}
                  />
                )}
              />
              <FormFeedback>
                {errors.assets && errors.assets.message}
              </FormFeedback>
            </FormGroup>
            <Input innerRef={register} type="hidden" value="2" name="type" />
          </Col>
        </Row>

        <BackButton className="mr-2" />
        <SubmitButton
          isLoading={state.isLoading}
          disabled={!formState.isValid || !formState.isDirty}
        />
      </Form>
    ),
    [submit, errors, state, formState, register],
  );

  return <Widget>{form}</Widget>;
};
CreatePaymentForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
CreatePaymentForm.defaultProps = {};
export default CreatePaymentForm;
