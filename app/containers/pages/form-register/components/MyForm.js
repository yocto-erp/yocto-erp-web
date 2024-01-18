import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import Widget from "../../../../components/Widget/Widget";
import SubmitButton from "../../../../components/button/SubmitButton";
import BackButton from "../../../../components/button/BackButton";
import { ERROR } from "../../../../components/Form/messages";
import FormGroupInput from "../../../../components/Form/FormGroupInput";
import AssetSingleSelect from "../../../../components/assets/AssetSingleSelect";
import FormGroup from "../../../../components/Form/FormGroup";
import Editor from "../../../../components/Form/Editor";
import { SelectClass } from "../../../student/student-class/components/SelectClass";
import { EDITOR_TYPE } from "../../../../components/constants";
import SelectEcommerceProduct from "../../../ecommerce/components/SelectEcommerceProduct";
import registerFormApi from "../../../../libs/apis/form/register-form.api";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import FormError from "../../../../components/Form/FormError";
import PaymentSelect from "../../../finance/payment/components/PaymentSelect";
import { TEMPLATE_TYPE } from "../../../../libs/apis/template/templateType.api";
import EmailTemplateSelect from "../../../../components/common/template/EmailTemplateSelect";

const validationSchema = Yup.object()
  .shape({
    name: Yup.string().required(ERROR.required),
    classes: Yup.array().nullable(),
    products: Yup.array().nullable(),
    status: Yup.string().required(),
  })
  .test({
    name: "asset",
    exclusive: true,
    message: "Require class or product",
    test: value =>
      (value.classes && value.classes.length > 0) ||
      (value.products && value.products.length > 0),
  });

const { create, update, read } = registerFormApi;

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
          ? `Update form ${resp.name} success`
          : `Create form ${resp.name} success`,
      );
    },
    validationSchema,
    initForm: {
      name: "",
      classes: [],
      products: [],
    },
    id,
  });

  return (
    <Widget>
      <FormError errors={serverErrors} />
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormGroupInput
          name="name"
          className="input-sm"
          label="Name"
          placeholder="Name"
          register={register}
          error={errors.name}
          type="text"
        />
        <FormGroup>
          <Label>Banner (2120x351)</Label>
          <Controller
            name="banner"
            control={control}
            defaultValue={null}
            render={({ onChange, ...data }, { invalid }) => (
              <AssetSingleSelect
                isPreviewThumbnail={false}
                width={1070}
                height={172}
                placeholder="Select Banner"
                {...data}
                onChange={onChange}
                invalid={invalid}
              />
            )}
          />
        </FormGroup>
        <div className="form-group">
          <Label for="introduction" className="mr-sm-2">
            Lời giới thiệu
          </Label>
          <Controller
            name="introduction"
            defaultValue=""
            control={control}
            render={({ onChange, onBlur, value, name }) => (
              <Editor
                type={EDITOR_TYPE.NORMAL}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                name={name}
                height={200}
              />
            )}
          />
        </div>
        <FormGroup>
          <div className="checkbox abc-checkbox pl-0">
            <Input
              type="checkbox"
              name="isAllowCreateUser"
              innerRef={register}
              id="isAllowCreateUser"
            />{" "}
            <Label for="isAllowCreateUser">Cho phép tạo user</Label>
          </div>
        </FormGroup>
        <div className="row mt-5">
          <div className="col-6">
            <p className="form-heading">Thông tin đăng ký</p>
            <FormGroup>
              <Label for="class" className="mr-sm-2 required">
                Danh sách lớp học
              </Label>
              <Controller
                name="classes"
                defaultValue={[]}
                control={control}
                render={({ onChange, ...data }, { invalid }) => (
                  <SelectClass
                    isShowPrice
                    id="classes"
                    isMulti
                    placeholder="Chọn lớp học"
                    invalid={invalid}
                    onChange={onChange}
                    {...data}
                  />
                )}
              />
            </FormGroup>
            <FormGroup label="Danh sách sản phẩm">
              <Controller
                name="products"
                control={control}
                defaultValue={[]}
                render={({ onChange, name, value, onBlur }) => (
                  <SelectEcommerceProduct
                    error={errors.product}
                    value={value}
                    isMulti
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormGroup>
            <FormHookErrorMessage error={errors.asset} />
          </div>
          <div className="col-6">
            <p className="form-heading">Thiết lập đăng ký</p>
            <FormGroup label="Kênh thanh toán">
              <Controller
                name="payment"
                control={control}
                defaultValue={null}
                render={({ onChange, name, value, onBlur }) => (
                  <PaymentSelect
                    value={value}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormGroup>
            <FormGroup label="Email xác nhận thanh toán">
              <Controller
                name="paymentTemplate"
                control={control}
                defaultValue={null}
                render={({ onChange, value }) => (
                  <EmailTemplateSelect
                    style={{ width: "100%" }}
                    name="template"
                    type={TEMPLATE_TYPE.REGISTER_FORM}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormGroup>
            <FormGroupInput
              label="Trạng thái"
              isRequired
              name="status"
              type="select"
              error={errors.status}
              register={register}
            >
              <option value="">Chọn trạng thái</option>
              <option value="1">Hoạt động</option>
              <option value="2">Tạm ngưng</option>
            </FormGroupInput>
          </div>
        </div>

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
