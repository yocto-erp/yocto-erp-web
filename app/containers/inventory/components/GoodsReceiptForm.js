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
} from 'reactstrap';
import { toast } from 'react-toastify';
import goodsReceiptApi from '../../../libs/apis/goods-receipt.api';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import WarehouseSelect from '../../../components/common/warehouse/WarehouseSelect';
import DetailsInventory from './DetailsInventory';

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
    state: { isLoading },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      console.log(`Success: ${JSON.stringify(resp)}`);
      toast.success(id ? 'Update product success' : 'Create product success');
    },
    mappingToForm: form => {
      console.log(`Mapping to form`);
      console.log(form);
      return {
        name: form.name,
        remark: form.remark,
        warehouse: form.warehouse,
        details: form.details,
      };
    },
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
        details,
      };
    },
    validationSchema,
    initForm: {
      warehouse: null,
      details: [{ product: null, unit: null, quantity: 0, remark: '' }],
    },
    id,
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
              <WarehouseSelect
                invalid={!!errors.warehouse}
                name="warehouse"
                control={control}
                id="warehouseId"
                placeholder="Warehouse Name"
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
        <DetailsInventory
          control={control}
          register={register}
          errors={errors}
          getValues={getValues}
          setValue={setValue}
        />

        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} />
      </Form>
    );
  }, [errors, isLoading, submit, register]);
  console.log('MyForm');

  return <Widget>{form}</Widget>;
}

GoodsReceiptForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

GoodsReceiptForm.defaultProps = {};

export default GoodsReceiptForm;
