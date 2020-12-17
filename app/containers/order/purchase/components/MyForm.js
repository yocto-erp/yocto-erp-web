import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Table,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Controller, useFieldArray } from 'react-hook-form';
import Widget from '../../../../components/Widget/Widget';
import SubmitButton from '../../../../components/button/SubmitButton';
import BackButton from '../../../../components/button/BackButton';
import { useHookCRUDForm } from '../../../../libs/hooks/useHookCRUDForm';
import CreateButton from '../../../../components/button/CreateButton';
import OrderFormDetail from '../../components/OrderFormDetail';
import CustomerSelect from '../../../../components/common/customer/CustomerSelect';
import purchaseApi from '../../../../libs/apis/order/purchase.api';
import CompanySelect from '../../../../components/common/company/CompanySelect';
import { ERROR } from '../../../../components/Form/messages';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  details: Yup.array()
    .of(
      Yup.object().shape({
        product: Yup.object()
          .required('This field is required.')
          .nullable(true),
        quantity: Yup.number()
          .typeError(ERROR.required)
          .moreThan(0, ERROR.numberGT0)
          .required(ERROR.required),
        price: Yup.number()
          .moreThan(0, 'Price must larger than 0')
          .required('This field is required.'),
        unit: Yup.object()
          .required('This field is required.')
          .nullable(true),
      }),
    )
    .required('Details is required'),
});

const { create, update, read } = purchaseApi;

function MyForm({ id }) {
  const {
    control,
    register,
    submit,
    errors,
    getValues,
    setValue,
    state: { isLoading, formData, errors: serverError },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Purchase ${resp.name} success`
          : `Create Purchase ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      name: form.name,
      remark: form.remark,
      partnerPersonId: form.partnerPerson,
      partnerCompanyId: form.partnerCompany,
      details: form.details.map(t => ({ ...t, id: uuidv4() })),
    }),
    mappingToServer: form => {
      const details = form.details.map(result => ({
        productId: result.product.id,
        unitId: result.unit.id,
        quantity: result.quantity,
        price: result.price,
        remark: result.remark,
      }));
      return {
        name: form.name,
        partnerCompanyId: form.partnerCompanyId
          ? form.partnerCompanyId.id
          : null,
        partnerPersonId: form.partnerPersonId ? form.partnerPersonId.id : null,
        remark: form.remark,
        details,
      };
    },
    validationSchema,
    initForm: {
      name: '',
      remark: '',
      partnerPersonId: null,
      partnerCompanyId: null,
      details: [
        { product: null, unit: null, quantity: 0, price: 0, remark: '' },
      ],
    },
    id,
  });

  useEffect(() => {
    if (serverError && serverError.length) {
      toast.error(serverError.map(t => t.message).join('\n'));
    }
  }, [serverError]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });

  const form = React.useMemo(() => {
    return (
      <Form onSubmit={submit} noValidate formNoValidate>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="name" className="mr-sm-2 required">
                Name<span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.name}
                type="text"
                name="name"
                innerRef={register}
                id="name"
                placeholder="Name"
              />
              <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="partnerPersonId" className="mr-sm-2">
                Customer Partner
              </Label>
              <Controller
                name="partnerPersonId"
                defaultValue={formData ? formData.partnerPersonId : null}
                control={control}
                render={({ onChange, ...data }) => (
                  <CustomerSelect
                    id="partnerPersonId"
                    placeholder="Choose Customer"
                    onAdded={newCustomer => {
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
            </FormGroup>
            <FormGroup>
              <Label for="partnerCompanyId" className="mr-sm-2">
                Company Partner
              </Label>
              <Controller
                name="partnerCompanyId"
                defaultValue={formData ? formData.partnerCompanyId : null}
                control={control}
                render={({ onChange, ...data }) => (
                  <CompanySelect
                    id="partnerCompanyId"
                    placeholder="Choose Partner Company"
                    onAdded={newCompany => {
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
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="remark" className="mr-sm-2">
                Remark
              </Label>
              <Input
                rows={5}
                type="textarea"
                name="remark"
                innerRef={register}
                id="remark"
                placeholder="Remark"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Table bordered hover striped size="sm">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>
                  Product<span className="text-danger">*</span>
                </th>
                <th style={{ width: '250px' }}>
                  Unit<span className="text-danger">*</span>
                </th>
                <th style={{ width: '150px' }}>
                  Quantity<span className="text-danger">*</span>
                </th>
                <th style={{ width: '150px' }}>
                  Price Per Unit<span className="text-danger">*</span>
                </th>
                <th>Remark</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <OrderFormDetail
                  key={item.id}
                  control={control}
                  errors={errors}
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
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
                        id: uuidv4(),
                        product: null,
                        unit: null,
                        quantity: 0,
                        price: 0,
                        remark: '',
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
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} />
      </Form>
    );
  }, [errors, isLoading, submit, register, control]);

  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
