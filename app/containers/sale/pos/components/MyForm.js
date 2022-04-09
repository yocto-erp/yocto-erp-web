import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import Widget from "../../../../components/Widget/Widget";
import SubmitButton from "../../../../components/button/SubmitButton";
import BackButton from "../../../../components/button/BackButton";
import { ERROR } from "../../../../components/Form/messages";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import posApi from "../../../../libs/apis/pos.api";
import FormError from "../../../../components/Form/FormError";
import WarehouseSelect from "../../../../components/common/warehouse/WarehouseSelect";
import ShopSelect from "../../shop/components/ShopSelect";
import FormGroupInput from "../../../../components/Form/FormGroupInput";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
  warehouse: Yup.object().required(),
  shop: Yup.object().required(),
});

const { create, update, read } = posApi;

function MyForm({ id }) {
  const {
    register,
    submit,
    errors,
    control,
    state: { isLoading, errors: serverErrors },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update POS ${resp.name} success`
          : `Create POS ${resp.name} success`,
      );
    },
    validationSchema,
    initForm: {
      name: "",
      address: "",
    },
    id,
  });

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverErrors} />
        <FormGroup>
          <Label for="name" className="mr-sm-2">
            Name
          </Label>
          <Input
            invalid={!!errors.name}
            type="text"
            name="name"
            innerRef={register}
            id="name"
            placeholder="POS Name"
          />
          <FormHookErrorMessage error={errors.name} />
        </FormGroup>
        <FormGroup>
          <Label for="warehouse" className="required">
            Warehouse
          </Label>
          <Controller
            invalid={!!errors.warehouse}
            defaultValue={null}
            name="warehouse"
            control={control}
            id="warehouse"
            render={({ onChange, value }, { invalid }) => (
              <WarehouseSelect
                placeholder="Select Warehouse"
                onChange={onChange}
                value={value}
                invalid={invalid}
              />
            )}
          />
        </FormGroup>
        <FormGroup>
          <Label for="shop" className="required">
            Shop
          </Label>
          <Controller
            invalid={!!errors.shop}
            defaultValue={null}
            name="shop"
            control={control}
            id="shop"
            render={({ onChange, value }, { invalid }) => (
              <ShopSelect
                name="shop"
                placeholder="Select Shop"
                onChange={onChange}
                value={value}
                invalid={invalid}
              />
            )}
          />
        </FormGroup>
        <FormGroupInput
          label="Remark"
          name="remark"
          type="textarea"
          register={register}
          placeholder="Remark"
        />
        <BackButton className="mr-2" />
        <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
      </Form>
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
