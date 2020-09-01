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
import goodsReceiptApi from '../../../../libs/apis/inventory/goods-receipt.api';
import Widget from '../../../../components/Widget/Widget';
import SubmitButton from '../../../../components/button/SubmitButton';
import BackButton from '../../../../components/button/BackButton';
import { useHookCRUDForm } from '../../../../libs/hooks/useHookCRUDForm';
import WarehouseSelect from '../../../../components/common/warehouse/WarehouseSelect';
import InventoryFormDetail from '../../../inventory/components/InventoryFormDetail';
import CreateButton from '../../../../components/button/CreateButton';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  warehouse: Yup.object()
    .required('Warehouse is required')
    .nullable(true),
  details: Yup.array()
    .of(
      Yup.object().shape({
        product: Yup.object()
          .required('Product is required')
          .nullable(true),
        quantity: Yup.number()
          .moreThan(0)
          .required('Quantity is required'),
        unit: Yup.object()
          .required('Unit is required')
          .nullable(true),
      }),
    )
    .required('Details is required'),
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
    mappingToForm: form => {
      console.log(`Mapping to form`);
      console.log(form);
      return {
        name: form.name,
        remark: form.remark,
        warehouse: form.warehouse,
        details: form.details.map(t => ({ ...t, id: uuidv4() })),
      };
    },
    mappingToServer: form => {
      console.log(`Mapping to server: ${JSON.stringify(form)}`);
      console.log(form);
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
        details,
      };
    },
    validationSchema,
    initForm: {
      warehouse: null,
      name: '',
      remark: '',
      details: [{ product: null, unit: null, quantity: 0, remark: '' }],
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
            <FormGroup>
              <Label for="warehouse" className="mr-sm-2 required">
                Warehouse <span className="text-danger">*</span>
              </Label>
              <Controller
                defaultValue={formData ? formData.warehouse : null}
                name="warehouse"
                invalid={!!errors.warehouse}
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
                Name <span className="text-danger">*</span>
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
            <Label for="remark" className="mr-sm-2">
              Date
            </Label>
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
                <th style={{ width: '30%' }}>Product</th>
                <th style={{ width: '250px' }}>Unit</th>
                <th style={{ width: '150px' }}>Quantity</th>
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
