import React, { useEffect, useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Col, Form, Row, UncontrolledTooltip } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Price from "../../../../components/common/Price";
import Input from "../../../../components/Form/Input";
import messages from "./messages";
import { TAX_TYPE } from "../../../finance/tax/tax/constants";
import { PosScrollOptions } from "./constants";
import "./order.scss";
import {
  userChangeProductQty,
  userOnSetShipping,
  userRemoveProduct,
  userChangeAddress,
} from "../redux/shopping";
import useMyForm from "../../../../libs/hooks/useMyForm";
import useUser from "../../../../libs/hooks/useUser";
import FormGroupInput from "../../../../components/Form/FormGroupInput";
import Widget from "../../../../components/Widget/Widget";
import BackButton from "../../../../components/button/BackButton";
import SubmitButton from "../../../../components/button/SubmitButton";
import { ERROR } from "../../../../components/Form/messages";
import ecommerceShopApi from "../../../../libs/apis/public/ecommerce-shop";
import { API_STATE, useApi } from "../../../../libs/hooks/useApi";
const schemaNotLogin = Yup.object().shape({
  email: Yup.string()
    .email(ERROR.email)
    .required(ERROR.required),
  firstName: Yup.string().required(ERROR.required),
  lastName: Yup.string().required(ERROR.required),
  phone: Yup.string().required(ERROR.required),
  address: Yup.string().when("isShipping", {
    is: true,
    then: Yup.string().required(ERROR.required),
  }),
});

const schemaLogin = Yup.object().shape({
  address: Yup.string().when("isShipping", {
    is: true,
    then: Yup.string().required(ERROR.required),
  }),
});
const UserOrderForm = () => {
  const { publicId } = useParams();

  const [company, setCompany] = useState(null);

  const { state: stateGet, exec } = useApi(() =>
    ecommerceShopApi.getCompanyByPublicId(publicId),
  );

  useEffect(() => {
    if (publicId) {
      exec();
    }
  }, [publicId]);

  useEffect(() => {
    if (stateGet.status === API_STATE.SUCCESS) {
      setCompany(stateGet.resp);
    } else if (stateGet.status === API_STATE.FAIL) {
      toast.error(stateGet.errors.map(t => (t.message || t.code).join("\n")));
    }
  }, [stateGet]);

  const {
    products,
    total,
    tax,
    totalWithTax,
    taxes,
    isShipping,
    address,
  } = useSelector(state => state.shop);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useUser();
  const { register, errors, onSubmit, state } = useMyForm({
    validationSchema: isAuthenticated ? schemaLogin : schemaNotLogin,
    api: formData => {
      const form = {
        ...formData,
        products,
        total,
        tax,
        totalWithTax,
        taxes,
        companyId: company.id,
        userId: isAuthenticated ? user.id : null,
      };
      return ecommerceShopApi.create(form);
    },
  });

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      toast.success(`Thanh toán thành công đơn hàng`);
    }
  }, [state]);

  return (
    <Widget>
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        {/* <FormError errors={serverErrors} /> */}
        <h1>List Product</h1>
        {products ? (
          <>
            <Row>
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <OverlayScrollbarsComponent
                  className="product-list mt-3"
                  options={PosScrollOptions}
                >
                  <table className="table table-sm table-bordered product-list-table">
                    <thead>
                      <tr className="bg-primary">
                        <th>
                          <FormattedMessage {...messages.tableHeaderProduct} />{" "}
                          ({products.length})
                        </th>
                        <th>
                          <FormattedMessage {...messages.tableHeaderQty} /> (
                          {products.map(t => t.qty).reduce((a, b) => a + b, 0)})
                        </th>
                        <th className="text-right">
                          <FormattedMessage {...messages.tableHeaderPrice} />
                        </th>
                        <th>
                          <i className="fa fa-adjust" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((t, index) => (
                        <tr key={t.product.id}>
                          <td>{t.product.webDisplayName}</td>
                          <td style={{ width: "125px" }}>
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                className="form-control"
                                style={{ width: "70px" }}
                                placeholder="Qty"
                                max={10000}
                                maxLength={5}
                                value={t.qty}
                                onChange={e =>
                                  dispatch(
                                    userChangeProductQty(
                                      index,
                                      Number(e.currentTarget.value || 0),
                                    ),
                                  )
                                }
                              />
                              <div
                                className="input-group-append"
                                id="button-addon4"
                              >
                                <span className="input-group-text">
                                  {t.product.unit.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="text-right">
                            <Price amount={t.total} currency="" />
                          </td>
                          <td className="min">
                            <button
                              type="button"
                              className="btn btn-danger btn-icon btn-sm"
                              onClick={() => dispatch(userRemoveProduct(index))}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </OverlayScrollbarsComponent>
                <div className="action">
                  <div className="info">
                    <table className="table-borderless table-sm w-100">
                      <tbody>
                        <tr>
                          <td className="text-left" id={`tax${products.id}`}>
                            Tax: <Price amount={tax} />{" "}
                          </td>
                          <td className="text-right">
                            Total: <Price amount={total} />
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td className="text-right">
                            <strong className="text-danger h4">
                              <Price amount={totalWithTax} />
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <UncontrolledTooltip target={`tax${products.id}`}>
                      {(taxes || []).map(t => (
                        <p className="mb-0" key={`tax${t.id}`}>
                          {t.shortName}
                          {t.type === TAX_TYPE.PERCENT ? ` (${t.amount}%)` : ""}
                          : <Price amount={t.taxAmount} />
                        </p>
                      ))}
                    </UncontrolledTooltip>
                    <p />
                    <p />
                  </div>
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <div className="no-order text-warning">
            <FormattedMessage {...messages.orderEmpty} />
          </div>
        )}
        {!isAuthenticated ? (
          <>
            <h1>Information</h1>
            <Row>
              <Col xs="12" sm="6" md="12" lg="6" xl="6">
                <FormGroupInput
                  label="FirstName"
                  isRequired
                  name="firstName"
                  type="text"
                  error={errors.firstName}
                  register={register}
                  placeholder="FirstName"
                />
              </Col>
              <Col xs="12" sm="6" md="12" lg="6" xl="6">
                <FormGroupInput
                  label="LastName"
                  isRequired
                  name="lastName"
                  type="text"
                  error={errors.lastName}
                  register={register}
                  placeholder="LastName"
                />
              </Col>
              <Col xs="12" sm="6" md="12" lg="6" xl="6">
                <FormGroupInput
                  label="Email"
                  isRequired
                  name="email"
                  type="email"
                  error={errors.email}
                  register={register}
                  placeholder="Email"
                />
              </Col>
              <Col xs="12" sm="6" md="12" lg="6" xl="6">
                <FormGroupInput
                  label="Phone"
                  isRequired
                  name="phone"
                  type="text"
                  error={errors.phone}
                  register={register}
                  placeholder="Phone"
                />
              </Col>
            </Row>
          </>
        ) : (
          ""
        )}
        <h1>Shipping</h1>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <div className="input-group-text" style={{ width: "70px" }}>
                  <Input
                    id="isShipping"
                    name="isShipping"
                    type="checkbox"
                    checked={isShipping}
                    register={register}
                    onChange={e =>
                      dispatch(userOnSetShipping(e.currentTarget.checked))
                    }
                  />
                  <label className="form-check-label" htmlFor="isShipping">
                    &nbsp;Ship
                  </label>
                </div>
              </div>
              <Input
                className="form-control"
                type="text"
                disabled={!isShipping}
                register={register}
                name="address"
                onChange={e =>
                  dispatch(userChangeAddress(e.currentTarget.value))
                }
                value={address}
                placeholder="Địa chỉ giao hàng"
                error={errors.address}
              />
            </div>
          </Col>
        </Row>
        <BackButton className="mr-2" />
        <SubmitButton
          isLoading={state.status === API_STATE.LOADING}
          type="submit"
        />
      </Form>
    </Widget>
  );
};

UserOrderForm.propTypes = {};

export default UserOrderForm;
