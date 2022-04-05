import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, FormGroup, Input, Label, Row, Col, Table } from "reactstrap";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Controller, useFieldArray } from "react-hook-form";
import goodsIssueApi from "../../../libs/apis/inventory/goods-issue.api";
import Widget from "../../../components/Widget/Widget";
import SubmitButton from "../../../components/button/SubmitButton";
import BackButton from "../../../components/button/BackButton";
import { useHookCRUDForm } from "../../../libs/hooks/useHookCRUDForm";
import WarehouseSelect from "../../../components/common/warehouse/WarehouseSelect";
import InventoryFormDetail from "./InventoryFormDetail";
import CreateButton from "../../../components/button/CreateButton";
import { ERROR } from "../../../components/Form/messages";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";
import { mappingServerTagging } from "../../../components/constants";
import InputAsyncTagging from "../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../libs/apis/tagging.api";

const { create, update, read } = goodsIssueApi;

function GoodsIssueForm({ id }) {
  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required("This field is required."),
        warehouse: Yup.object()
          .required("This field is required.")
          .nullable(true),
        tagging: Yup.array().nullable(),
        details: Yup.array()
          .of(
            Yup.object().shape({
              product: Yup.object()
                .required("This field is required.")
                .nullable(true),
              quantity: Yup.number()
                .typeError(ERROR.required)
                .moreThan(0, ERROR.amountGT0)
                .required(ERROR.required),
              unit: Yup.object()
                .required(ERROR.required)
                .nullable(true),
              serialCode: Yup.string().max(64, ERROR.max),
            }),
          )
          .required("This field is required."),
      }),
    [],
  );
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
          ? `Update Goods Issue ${resp.name} success`
          : `Create Goods Issue ${resp.name} success`,
      );
    },
    mappingToForm: data => ({
      name: data.name,
      remark: data.remark,
      warehouse: data.warehouse,
      processedDate: new Date(data.processedDate),
      tagging:
        data.tagging && data.tagging.length
          ? data.tagging.map(mappingServerTagging)
          : [],
      details: data.details.map(t => {
        const { inventoryDetailId } = t;
        return { ...t, id: inventoryDetailId };
      }),
    }),
    mappingToServer: form => ({
      ...form,
      warehouseId: form.warehouse ? form.warehouse.id : null,
      details: form.details.map(result => ({
        ...result,
        productId: result.product.id,
        unitId: result.unit.id,
      })),
    }),
    validationSchema,
    initForm: {
      warehouse: null,
      tagging: [],
      name: "",
      remark: "",
      details: [
        { product: null, unit: null, quantity: "", remark: "", serialCode: "" },
      ],
    },
    id,
  });

  React.useEffect(() => {
    if (serverErrors && serverErrors.length) {
      toast.error(serverErrors.map(t => t.message).join("\n"));
    }
  }, [serverErrors]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
    keyName: "fId",
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
                defaultValue={null}
                name="warehouse"
                control={control}
                id="warehouseId"
                render={({ onChange, value }, { invalid }) => (
                  <WarehouseSelect
                    placeholder="Select Warehouse"
                    onChange={onChange}
                    value={value}
                    invalid={invalid}
                  />
                )}
              />
              <FormHookErrorMessage error={errors.warehouse} />
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
              <FormHookErrorMessage error={errors.name} />
            </FormGroup>
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
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="tagging" className="mr-sm-2">
                Tagging
              </Label>
              <Controller
                name="tagging"
                id="tagging"
                defaultValue={formData ? formData.tagging : []}
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
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Table bordered hover striped>
            <thead>
              <tr>
                <th style={{ width: "300px" }}>
                  Product <span className="text-danger">*</span>
                </th>
                <th style={{ width: "180px" }}>
                  Unit <span className="text-danger">*</span>
                </th>
                <th style={{ width: "150px" }}>
                  Quantity <span className="text-danger">*</span>
                </th>
                <th style={{ width: "350px" }}>Serials</th>
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
                        quantity: "",
                        remark: "",
                        serialCode: "",
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
  return <Widget>{form}</Widget>;
}

GoodsIssueForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GoodsIssueForm.defaultProps = {};

export default GoodsIssueForm;
