import React from 'react';
import {
  FormFeedback,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';

import apiCost from '../../../libs/apis/cost.api';
import Widget from '../../../components/Widget/Widget';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import CompanySelect from '../../../components/common/company/CompanySelect';
import CustomerSelect from '../../../components/common/customer/CustomerSelect';
import FileUpload from '../../../components/FileUpload';
import InputAmount from '../../../components/Form/InputAmount';
import FormErrorMessage from '../../../components/Form/FormHookErrorMessage';
import { ERROR } from '../../../components/Form/messages';

const CreatePaymentForm = ({ id }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required(ERROR.required),
    amount: yup
      .number()
      .typeError(ERROR.required)
      .positive(ERROR.amountGT0)
      .required(ERROR.required),
  });
  const { create, read, update } = apiCost;
  const {
    control,
    register,
    submit,
    errors,
    setValue,
    formState: { isValid, isDirty },
    state: { isLoading, formData },
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
    }),
    mappingToServer: form => ({
      name: form.name,
      remark: form.remark,
      type: form.type,
      amount: form.amount,
      purpose: form.purpose,
      partnerPersonId: form.partnerPersonId ? form.partnerPersonId.id : null,
      partnerCompanyId: form.partnerCompanyId ? form.partnerCompanyId.id : null,
      assets: form.assets,
    }),
    initForm: {
      amount: '',
      assets: [],
      partnerPersonId: null,
      partnerCompanyId: null,
    },
    validationSchema,
    id,
  });
  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
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
                <FormErrorMessage error={errors.name} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>
                Total Amount <span className="text-danger">*</span>
              </Label>
              <Col sm={9}>
                <Controller
                  type="number"
                  name="amount"
                  invalid={!!errors.amount}
                  control={control}
                  as={InputAmount}
                  defaultValue={formData.amount}
                  placeholder="Enter Amount here"
                />
                <FormErrorMessage error={errors.amount} />
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
                  defaultValue={formData ? formData.partnerCompanyId : null}
                  control={control}
                  render={({ onChange, ...data }) => (
                    <CompanySelect
                      id="partnerCompanyId"
                      placeholder="Choose Partner Company"
                      invalid={!!errors.partnerCompanyId}
                      onAdded={newCompany => {
                        console.log(`OnAdd: ${JSON.stringify(newCompany)}`);
                        setValue('partnerCompanyId', newCompany, {
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
                  defaultValue={formData ? formData.partnerPersonId : null}
                  control={control}
                  render={({ onChange, ...data }) => (
                    <CustomerSelect
                      id="partnerPersonId"
                      placeholder="Choose Partner Person"
                      invalid={!!errors.partnerPersonId}
                      onAdded={newCustomer => {
                        console.log(`OnAdd: ${JSON.stringify(newCustomer)}`);
                        setValue('partnerPersonId', newCustomer, {
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
          </Col>
          <Col md={5}>
            <FormGroup className="pb-3 h-100">
              <Controller
                defaultValue={formData ? formData.assets : []}
                invalid={!!errors.assets}
                as={FileUpload}
                className="h-100"
                name="assets"
                placeholder="Upload files"
                control={control}
                accept={['image/*']}
                maxSize={500000}
              />
              <FormFeedback>
                {errors.assets && errors.assets.message}
              </FormFeedback>
            </FormGroup>
            <Input innerRef={register} type="hidden" value="2" name="type" />
          </Col>
        </Row>

        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!isValid || !isDirty} />
      </Form>
    ),
    [submit, errors, isLoading, register],
  );

  return <Widget>{form}</Widget>;
};
CreatePaymentForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
CreatePaymentForm.defaultProps = {};
export default CreatePaymentForm;
