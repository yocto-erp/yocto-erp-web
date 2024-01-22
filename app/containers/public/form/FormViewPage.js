import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import * as Yup from "yup";
import { Controller } from "react-hook-form";
import Header from "../components/Header";
import "../index.scss";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import { FormPublicApi } from "../../../libs/apis/form/form-public.api";
import Widget from "../../../components/Widget/Widget";
import { hasText } from "../../../utils/util";
import { cloudAssetUrl } from "../../../libs/apis/image.api";
import RawHtml from "../../../components/RawHtml";
import { phoneNumber } from "../../../utils/yup.util";
import useMyForm from "../../../libs/hooks/useMyForm";
import FormGroupInput from "../../../components/Form/FormGroupInput";
import SubmitButton from "../../../components/button/SubmitButton";
import FormError from "../../../components/Form/FormError";
import Footer from "../components/Footer";
import "./FormViewPage.scss";
import FormViewClass from "./FormViewClass";
import FormViewProduct from "./FormViewProduct";
import Price from "../../../components/common/Price";
import useUser from "../../../libs/hooks/useUser";
import { FORM_STATUS } from "../../pages/form-register/constants";
import NotFound from "../../NotFoundPage";

const schema = Yup.object()
  .shape({
    name: Yup.string().required(),
    phone: phoneNumber().required(),
    classes: Yup.array().nullable(),
    products: Yup.array().nullable(),
    email: Yup.string()
      .email()
      .required(),
    captcha: Yup.object().required(),
  })
  .test({
    name: "asset",
    exclusive: false,
    message: "Vui lòng chọn lớp hoặc sản phẩm",
    test: (value, testContext) => {
      console.log(value, testContext);
      return (
        (value.classes && value.classes.length > 0) ||
        (value.products && value.products.length > 0)
      );
    },
  });
const FormViewPage = ({ history }) => {
  const { publicId } = useParams();

  const { exec, state } = useApi(FormPublicApi.get);

  const { resp } = state;

  const {
    register,
    errors,
    onSubmit,
    control,
    watch,
    reset,
    formState: { isDirty, isValid },
    state: { isLoading, errors: serverErrors, status, resp: registerResp },
  } = useMyForm({
    validationSchema: schema,
    api: form => FormPublicApi.register(publicId, form),
    form: {
      name: "",
      email: "",
      phone: "",
      classes: [],
      products: [],
      captcha: null,
    },
  });

  const { classes, products } = watch(["classes", "products"]);

  const toggleClass = (clazzes, clazz) => {
    const index = (clazzes || []).findIndex(t => t.id === clazz.id);
    if (index > -1) {
      clazzes.splice(index, 1);
      return [...clazzes];
    }
    return [...(clazzes || []), clazz];
  };

  const isClassActive = (clazzs, classId) =>
    (clazzs || []).findIndex(t => t.id === classId) > -1;

  const toggleProduct = (listProducts, product) => {
    const index = (listProducts || []).findIndex(t => t.id === product.id);
    if (index > -1) {
      listProducts.splice(index, 1);
      return [...listProducts];
    }
    return [...(listProducts || []), product];
  };

  const isProductActive = (listProducts, productId) =>
    (listProducts || []).findIndex(t => t.id === productId) > -1;

  const { user } = useUser();

  useEffect(() => {
    exec(publicId);
  }, [publicId]);

  useEffect(() => {
    if (status === API_STATE.SUCCESS) {
      history.push(`/cpm/${registerResp.formRegister.publicId}/register`);
    }
  }, [status, registerResp]);

  const total =
    (products || []).map(t => t.price).reduce((a, b) => a + b, 0) +
    (classes || []).map(t => t.tuitionFeePerMonth).reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);
  if (!resp) {
    return null;
  }

  return (
    <div className="public-page">
      <Header isShowSignUp={false} isShowCart={false} />
      {resp.status !== FORM_STATUS.ACTIVE && <NotFound />}
      {resp.status === FORM_STATUS.ACTIVE && (
        <>
          <main>
            <div className="container mt-4">
              <Widget bodyClass="form-register">
                {resp.banner && (
                  <div className="banner mb-5">
                    <img src={cloudAssetUrl(resp.banner)} alt="banner" />
                  </div>
                )}
                <div className="form-register-body">
                  <h1 className="display-4">{resp.name}</h1>

                  {hasText(resp.introduction) && (
                    <RawHtml
                      className="introduction mt-4"
                      html={resp.introduction}
                    />
                  )}
                  <Form
                    onSubmit={onSubmit}
                    noValidate
                    formNoValidate
                    className="mt-5"
                  >
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <FormGroup>
                          <Label className="d-block text-center">
                            Khoá học{" "}
                            <span className="help">(click để chọn)</span>
                          </Label>
                          <Controller
                            name="classes"
                            control={control}
                            render={({ value, onChange }) => (
                              <div className="container">
                                <div className="row justify-content-center row-cols-md-2 row-cols-sm-1">
                                  {resp.classes.map(t => (
                                    <div className="col p-2" key={t.id}>
                                      <FormViewClass
                                        isActive={isClassActive(value, t.id)}
                                        clazz={t}
                                        onClick={() =>
                                          onChange(toggleClass(value, t))
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          />
                        </FormGroup>
                        <FormGroup className="">
                          <Label className="d-block text-center">
                            Sản phẩm{" "}
                            <span className="help">(click để chọn)</span>
                          </Label>
                          <Controller
                            name="products"
                            control={control}
                            render={({ value, onChange }) => (
                              <div className="container">
                                <div className="row justify-content-center row-cols-md-2 row-cols-sm-1">
                                  {resp.products.map(t => (
                                    <div className="col p-2" key={t.id}>
                                      <FormViewProduct
                                        product={t}
                                        isActive={isProductActive(value, t.id)}
                                        onClick={() =>
                                          onChange(toggleProduct(value, t))
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          />
                        </FormGroup>
                        {errors.asset && (
                          <FormFeedback className="d-block mt-0 mb-3">
                            Vui lòng chọn lớp hoặc sản phẩm
                          </FormFeedback>
                        )}
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <FormGroupInput
                          isRequired
                          name="name"
                          className="input-sm"
                          label="Họ Tên"
                          placeholder="Họ Tên"
                          register={register}
                          error={errors.name}
                          type="text"
                        />
                        <FormGroupInput
                          isRequired
                          name="email"
                          className="input-sm"
                          label="Email"
                          placeholder="Email"
                          register={register}
                          error={errors.email}
                          type="email"
                        />
                        <FormGroupInput
                          isRequired
                          name="phone"
                          className="input-sm"
                          label="Số điện thoại"
                          placeholder="Số điện thoại"
                          register={register}
                          error={errors.phone}
                          type="tel"
                        />
                        {resp.isAllowCreateUser && !user && (
                          <div className="checkbox abc-checkbox pl-0 mb-3">
                            <Input
                              type="checkbox"
                              name="isCreateUser"
                              innerRef={register}
                              id="isCreateUser"
                            />{" "}
                            <Label for="isCreateUser">Tạo tài khoản</Label>
                          </div>
                        )}
                        <FormGroupInput
                          name="description"
                          className="input-sm"
                          label="Góp ý thêm"
                          placeholder="Góp ý của bạn"
                          register={register}
                          type="textarea"
                        />
                        <Controller
                          name="captcha"
                          defaultValue={null}
                          control={control}
                          render={({ onChange }, { invalid }) => (
                            <>
                              <HCaptcha
                                languageOverride="vi"
                                sitekey="62b59756-7a60-4dc3-8512-94c7937c98f8"
                                onVerify={(token, ekey) => {
                                  onChange({ token, ekey });
                                }}
                              />
                              {invalid && (
                                <FormFeedback className="d-block mt-0 mb-3">
                                  Captcha required
                                </FormFeedback>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>
                    <FormError errors={serverErrors} />
                    <div className="footer p-0 pt-3 mt-3">
                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col-6 p-0 text-left text-danger">
                            <p
                              className="font-weight-bold mb-0"
                              style={{ fontSize: "1.2rem" }}
                            >
                              Tổng tiền: <Price amount={total} />
                            </p>
                          </div>
                          <div className="col-6 p-0 text-right">
                            <SubmitButton
                              className="btn-lg"
                              disabled={!isValid || !isDirty}
                              isLoading={isLoading}
                            >
                              Đăng ký
                            </SubmitButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </Widget>
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

FormViewPage.propTypes = {
  history: PropTypes.any,
};

export default FormViewPage;
