import React from 'react';
import {
  FormFeedback,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import classNames from 'classnames';
import apiCost from '../../../libs/apis/cost.api';
import Widget from '../../../components/Widget/Widget';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import CompanySelect from '../../../components/common/company/CompanySelect';
import CustomerSelect from '../../../components/common/customer/CustomerSelect';
import FileUpload from '../../../components/FileUpload';
import InputAmount from '../../../components/Form/InputAmount';

const CreateReceiptForm = ({ id }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('this field is required'),
    amount: yup
      .number()
      .typeError('This field is required')
      .positive('Amount must be greater than zero')
      .required('This field is required'),
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
      partnerCompanyId: null,
      partnerPersonId: null,
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
                  defaultValue={formData.name}
                />
                <FormFeedback>
                  {errors.name && errors.name.message}
                </FormFeedback>
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
                <FormFeedback>
                  {errors.amount && errors.amount.message}
                </FormFeedback>
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
                <FormFeedback>
                  {errors.partnerCompanyId && errors.partnerCompanyId.message}
                </FormFeedback>
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
                <FormFeedback>
                  {errors.partnerPersonId && errors.partnerPersonId.message}
                </FormFeedback>
              </Col>
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup className="costUpload">
              <Controller
                defaultValue={formData ? formData.assets : []}
                invalid={!!errors.assets}
                as={FileUpload}
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

            <Input innerRef={register} type="hidden" name="type" value="1" />
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
CreateReceiptForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
CreateReceiptForm.defaultProps = {};
export default CreateReceiptForm;
