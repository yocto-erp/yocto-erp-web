import React from 'react';
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
import classNames from 'classnames';
import goodsReceiptApi from '../../../libs/apis/inventory/goods-receipt.api';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import WarehouseSelect from '../../../components/common/warehouse/WarehouseSelect';
import InventoryFormDetail from './InventoryFormDetail';
import CreateButton from '../../../components/button/CreateButton';
import DateSelect from '../../../components/date/DateSelect';
import FormError from '../../../components/Form/FormError';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  warehouse: Yup.object()
    .required('This field is required.')
    .nullable(true),
  details: Yup.array()
    .of(
      Yup.object().shape({
        product: Yup.object()
          .required('This field is required.')
          .nullable(true),
        quantity: Yup.number()
          .moreThan(0, 'Quantity must larger than 0')
          .required('This field is required.'),
        unit: Yup.object()
          .required('This field is required.')
          .nullable(true),
        serialCode: Yup.string(),
      }),
    )
    .required('This field is required.'),
  processedDate: Yup.date()
    .required('This field is required.')
    .nullable(),
});

const { create, update, read } = goodsReceiptApi;

function GoodsReceiptForm({ id }) {
  const {
    control,
    register,
    submit,
    errors,
    getValues,
    setValue,
    state: { isLoading, formData, errors: serverErrors },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Goods Receipt ${resp.name} success`
          : `Create Goods Receipt ${resp.name} success`,
      );
    },
    mappingToForm: data => ({
      name: data.name,
      remark: data.remark,
      warehouse: data.warehouse,
      processedDate: new Date(data.processedDate),
      details: data.details.map(t => {
        const { inventoryDetailId } = t;
        return { ...t, id: inventoryDetailId };
      }),
    }),
    mappingToServer: form => {
      const details = form.details.map(result => ({
        productId: result.product.id,
        unitId: result.unit.id,
        quantity: result.quantity,
        remark: result.remark,
        serialCode: result.serialCode,
      }));
      return {
        name: form.name,
        warehouseId: form.warehouse.id,
        remark: form.remark,
        processedDate: form.processedDate,
        details,
      };
    },
    validationSchema,
    initForm: {
      warehouse: null,
      name: '',
      remark: '',
      details: [
        { product: null, unit: null, quantity: '', remark: '', serialCode: '' },
      ],
      processedDate: new Date(),
    },
    id,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="warehouse" className="mr-sm-2 required">
                Warehouse<span className="text-danger">*</span>
              </Label>
              <Controller
                invalid={!!errors.warehouse}
                defaultValue={formData ? formData.warehouse : null}
                name="warehouse"
                control={control}
                id="warehouseId"
                placeholder="Select Warehouse"
                as={WarehouseSelect}
              />
              <FormFeedback>
                {errors.warehouse && errors.warehouse.message}
              </FormFeedback>
            </FormGroup>
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
                placeholder="Inventory Name"
              />
              <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="units" className="mr-sm-2">
                Process Date<span className="text-danger">*</span>
              </Label>
              <div
                style={{ width: '250px' }}
                className={classNames({ 'is-invalid': !!errors.processedDate })}
              >
                <Controller
                  defaultValue={formData ? formData.processedDate : null}
                  name="processedDate"
                  control={control}
                  invalid={!!errors.processedDate}
                  as={DateSelect}
                />
              </div>
              <FormFeedback>
                {errors.processedDate && errors.processedDate.message}
              </FormFeedback>
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
                placeholder="Product Remark"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Table bordered hover striped>
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
                <th style={{ width: '350px' }}>Serials</th>
                <th>Remark</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <InventoryFormDetail
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
                        quantity: '',
                        serialCode: '',
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
    ),
    [errors, isLoading, submit, register, control],
  );

  return (
    <Widget>
      <FormError className="mt-3" errors={serverErrors} item={item => [item]} />
      {form}
    </Widget>
  );
}

GoodsReceiptForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GoodsReceiptForm.defaultProps = {};

export default GoodsReceiptForm;
