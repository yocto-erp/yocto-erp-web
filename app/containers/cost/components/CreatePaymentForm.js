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
import InputAmount from "../../../components/Form/InputAmount";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";
import { ERROR } from "../../../components/Form/messages";
import InputAsyncTagging from "../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../libs/apis/tagging.api";
import PaymentSelect from "../../payment/components/PaymentSelect";
import FormError from "../../../components/Form/FormError";
import AssetSelect from "../../../components/assets/AssetSelect";
import SelectSubject from "../../partner/subject/components/SelectSubject";

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
          ? `Update Payment ${resp.name} success`
          : `Create Payment ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      ...form,
      purpose: form.costPurpose.purpose,
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
                Name <span className="text-danger">*</span>
              </Label>
              <Col sm={9}>
                <Input
                  invalid={!!errors.name}
                  name="name"
                  id="name"
                  placeholder="Name"
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
              <Label sm={3}>Partner</Label>
              <Col sm={9}>
                <Controller
                  name="subject"
                  defaultValue={state.formData.subject}
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
                    fileTypes={["image/*"]}
                    placeholder="Select files"
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
