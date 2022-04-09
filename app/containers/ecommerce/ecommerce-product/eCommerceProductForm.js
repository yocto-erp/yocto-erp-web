import React from "react";
import * as yup from "yup";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { Form, Input, Label } from "reactstrap";
import { useHookCRUDForm } from "../../../libs/hooks/useHookCRUDForm";
import EcommerceProductApi from "../../../libs/apis/ecommerce/ecommerce-product.api";
import ProductSelect from "../../../components/common/product/ProductSelect";
import FormGroup from "../../../components/Form/FormGroup";
import UnitSelect from "../../../components/common/unit/UnitSelect";
import Widget from "../../../components/Widget/Widget";
import FormGroupInput from "../../../components/Form/FormGroupInput";
import InputAmount from "../../../components/Form/InputAmount";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";
import Editor from "../../../components/Form/Editor";
import BackButton from "../../../components/button/BackButton";
import SubmitButton from "../../../components/button/SubmitButton";
import { transformUnNumber } from "../../../libs/utils/number.util";
import TaxSetSelect from "../../finance/tax/tax-set/components/TaxSetSelect";
import AssetSelect from "../../../components/assets/AssetSelect";
import { MIME_TYPE } from "../../../components/assets/constants";
import InputAsyncTagging from "../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../libs/apis/tagging.api";

const validationSchema = yup.object().shape({
  product: yup
    .object()
    .nullable()
    .required("Product is required."),
  unit: yup
    .object()
    .nullable()
    .required("Unit is required."),
  webDisplayName: yup
    .string()
    .max(250)
    .required("Web display name is required."),
  shortName: yup
    .string()
    .max(64)
    .required("Short name is required"),
  price: yup
    .number()
    .transform(transformUnNumber)
    .moreThan(0),
});

const { create, update, read } = EcommerceProductApi;

const ECommerceProductForm = ({ id }) => {
  const {
    control,
    register,
    watch,
    submit,
    state: { isLoading, formData },
    formState: { isDirty, isValid, errors },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Sale Product ${resp.webDisplayName} success`
          : `Create Sale Product ${resp.webDisplayName} success`,
      );
    },
    validationSchema,
    initForm: {
      product: null,
      unit: null,
      webDisplayName: "",
      shortName: "",
      price: "",
      enableWarehouse: false,
      taxSet: null,
      tagging: [],
      assets: [],
    },
    id,
  });

  console.log("formData", formData);
  const { product } = watch(["product"]);
  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              <div className="col">
                <FormGroup label="Product" isRequired>
                  <Controller
                    name="product"
                    control={control}
                    defaultValue={formData.product}
                    render={({ onChange, name, value, onBlur }) => (
                      <ProductSelect
                        error={errors.product}
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup label="Unit" isRequired>
                  <Controller
                    name="unit"
                    control={control}
                    defaultValue={formData.unit}
                    render={({ onChange, name, value, onBlur }) => (
                      <UnitSelect
                        error={errors.unit}
                        id="unitId"
                        productId={product?.id}
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormGroup label="Price" id="price" isRequired>
                  <Controller
                    name="price"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }, { invalid }) => (
                      <InputAmount
                        onChange={onChange}
                        value={value}
                        invalid={invalid}
                      />
                    )}
                  />
                  <FormHookErrorMessage error={errors.price} />
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup label="Tax Set">
                  <Controller
                    name="taxSet"
                    control={control}
                    defaultValue={formData.taxSet}
                    render={(
                      { onChange, name, value, onBlur },
                      { invalid },
                    ) => (
                      <TaxSetSelect
                        invalid={invalid}
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </div>
            <FormGroupInput
              name="webDisplayName"
              label="Web Display Name"
              error={errors.webDisplayName}
              register={register}
              type="text"
              isRequired
            />
            <FormGroupInput
              name="shortName"
              label="Short Name"
              error={errors.shortName}
              register={register}
              type="text"
              isRequired
            />
            <FormGroup>
              <Label for="enableWarehouse" className="sr-only mr-sm-2">
                &nbsp;
              </Label>
              <div className="checkbox abc-checkbox abc-checkbox-primary pl-0">
                <Input
                  type="checkbox"
                  name="enableWarehouse"
                  innerRef={register}
                  id="enableWarehouse"
                />{" "}
                <Label for="enableWarehouse">Sản phẩm cần xuất kho</Label>
              </div>
            </FormGroup>
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
          </div>
          <div className="col-md-5">
            <FormGroup className="h-100">
              <Label for="assets" className="sr-only">
                Hình ảnh
              </Label>
              <Controller
                defaultValue={formData?.assets}
                name="assets"
                control={control}
                render={({ onChange, ...data }, { invalid }) => (
                  <AssetSelect
                    id="assets"
                    fileTypes={[MIME_TYPE.IMAGE]}
                    placeholder="Chọn hình ảnh"
                    {...data}
                    onChange={onChange}
                    className="h-100"
                    invalid={invalid}
                  />
                )}
              />
              <FormHookErrorMessage error={errors.assets} />
            </FormGroup>
          </div>
        </div>
        <FormGroup label="Remark">
          <Controller
            name="remark"
            control={control}
            defaultValue=""
            render={({ onChange, onBlur, value }) => (
              <Editor
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                name="subject"
                format="html"
                height={300}
              />
            )}
          />
        </FormGroup>
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!isDirty || !isValid} />
      </Form>
    </Widget>
  );
};

ECommerceProductForm.propTypes = {
  id: PropTypes.number,
};

export default ECommerceProductForm;
