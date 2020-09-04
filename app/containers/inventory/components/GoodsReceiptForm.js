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
    state: { isLoading, formData },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      console.log(`Success: ${JSON.stringify(resp)}`);
      toast.success(
        id ? 'Update Goods Receipt success' : 'Create Goods Receipt success',
      );
    },
    mappingToForm: form => ({
      name: form.name,
      remark: form.remark,
      warehouse: form.warehouse,
      processedDate: form.processedDate,
      details: form.details.map(t => ({ ...t, id: uuidv4() })),
    }),
    mappingToServer: form => {
      const details = form.details.map(result => ({
        productId: result.product.id,
        unitId: result.unit.id,
        quantity: result.quantity,
        remark: result.remark,
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
      details: [{ product: null, unit: null, quantity: 0, remark: '' }],
      processedDate: new Date(1599023532000),
    },
    id,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });

  const form = React.useMemo(() => {
    console.log('cache');
    return (
      <Form onSubmit={submit} noValidate formNoValidate>
        <Row>
          <Col xs="6" lg="6" md="12" sm="12">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="warehouse" className="mr-sm-2 required">
                Warehouse<span className="text-danger">*</span>
              </Label>
              <Controller
                invalid={!!errors.warehouse}
                defaultValue={formData ? formData.warehouse : null}
                name="warehouse"
                control={control}
                id="warehouseId"
                placeholder="Warehouse Name"
                as={WarehouseSelect}
              />
              <FormFeedback>
                {errors.warehouse && errors.warehouse.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="6" lg="6" md="12" sm="12">
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
          </Col>
        </Row>
        <Row>
          <Col xs="6" lg="6" md="12" sm="12">
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
          <Col xs="6" lg="6" md="12" sm="12">
            <FormGroup>
              <Label for="remark" className="mr-sm-2">
                Remark
              </Label>
              <Input
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
                <td colSpan="5">
                  <CreateButton
                    size="sm"
                    type="button"
                    onClick={() => {
                      append({
                        id: uuidv4(),
                        product: null,
                        unit: null,
                        quantity: 0,
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
  console.log('MyForm');

  return <Widget>{form}</Widget>;
}

GoodsReceiptForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GoodsReceiptForm.defaultProps = {};

export default GoodsReceiptForm;
