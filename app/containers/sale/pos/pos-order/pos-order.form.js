import React, { useMemo, useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { FormattedMessage } from "react-intl";
import { UncontrolledTooltip } from "reactstrap";
import { usePosDispatch, usePosOrderContext } from "./pos.context";
import {
  changeProductQty,
  onChangeOrderPaymentAmount,
  onCheckout,
  onSelectCustomer,
  onSetShipping,
  removeOrder,
  removeProduct,
} from "./pos.reduce";
import Price from "../../../../components/common/Price";
import { PosScrollOptions } from "./constants";
import Input from "../../../../components/Form/Input";
import InputAmount from "../../../../components/Form/InputAmount";
import PosCheckOut from "./check-out.modal";
import SelectSubject from "../../../partner/subject/components/SelectSubject";
import "./pos-order.scss";
import { useConfirmDialog } from "../../../../libs/hooks/useConfirmDialog";

import messages from "./messages";
import { TAX_TYPE } from "../../../finance/tax/tax/constants";

const PosOrderForm = () => {
  const order = usePosOrderContext();
  const dispatch = usePosDispatch();

  const [checkoutOrder, setCheckOutOrder] = useState(null);

  const { openConfirm, confirmModal } = useConfirmDialog("danger");

  const onSubmit = () => {
    setCheckOutOrder(order);
  };

  const isEnableCheckout = useMemo(() => {
    let rs = false;
    if (order) {
      const { products, customer, debt } = order;
      if (products.length) {
        if (debt > 0) {
          rs = !!customer;
        } else {
          rs = true;
        }
      }
    }
    return rs;
  }, [order]);

  return (
    <div className="checkout-wrapper border-primary border-right">
      {order ? (
        <div className="checkout">
          <div className="checkout-form">
            <FormattedMessage {...messages.formCustomer}>
              {msg => (
                <SelectSubject
                  name="customer"
                  value={order?.customer}
                  onChange={val => dispatch(onSelectCustomer(val))}
                  onAdded={val => dispatch(onSelectCustomer(val))}
                  mappingValue={null}
                  placeholder={msg}
                />
              )}
            </FormattedMessage>

            <OverlayScrollbarsComponent
              className="product-list mt-3"
              options={PosScrollOptions}
            >
              <table className="table table-sm table-bordered product-list-table">
                <thead>
                  <tr className="bg-primary">
                    <th>
                      <FormattedMessage {...messages.tableHeaderProduct} /> (
                      {order.products.length})
                    </th>
                    <th>
                      <FormattedMessage {...messages.tableHeaderQty} /> (
                      {order.products
                        .map(t => t.qty)
                        .reduce((a, b) => a + b, 0)}
                      )
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
                  {order.products.map((t, index) => (
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
                                changeProductQty(
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
                          onClick={() => dispatch(removeProduct(index))}
                        >
                          <i className="fa fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </OverlayScrollbarsComponent>
          </div>
          <div className="action">
            <div className="info">
              <table className="table-borderless table-sm w-100">
                <tbody>
                  <tr>
                    <td className="text-left" id={`tax${order.id}`}>
                      Tax: <Price amount={order.tax} />{" "}
                    </td>
                    <td className="text-right">
                      Total: <Price amount={order.total} />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td className="text-right">
                      <strong className="text-danger h4">
                        <Price amount={order.totalWithTax} />
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <UncontrolledTooltip target={`tax${order.id}`}>
                {(order.taxes || []).map(t => (
                  <p className="mb-0" key={`tax${t.id}`}>
                    {t.shortName}
                    {t.type === TAX_TYPE.PERCENT ? ` (${t.amount}%)` : ""}:{" "}
                    <Price amount={t.taxAmount} />
                  </p>
                ))}
              </UncontrolledTooltip>
              <p />
              <p />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-9  p-0">
                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <div
                        className="input-group-text"
                        style={{ width: "70px" }}
                      >
                        <Input
                          id="isShipping"
                          name="isShipping"
                          type="checkbox"
                          checked={order.isShipping}
                          onChange={e =>
                            dispatch(onSetShipping(e.currentTarget.checked))
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="isShipping"
                        >
                          &nbsp;Ship
                        </label>
                      </div>
                    </div>
                    <Input
                      className="form-control"
                      type="text"
                      disabled={!order.isShipping}
                      name="address"
                      value={order.address}
                      placeholder="Địa chỉ giao hàng"
                    />
                  </div>
                  <InputAmount
                    placeholder="Khách hàng trả"
                    onChange={val => dispatch(onChangeOrderPaymentAmount(val))}
                    value={order.paymentAmountInput}
                  />
                </div>
                <div className="col-md-3 p-0 pl-1">
                  <button
                    type="button"
                    className="btn btn-primary btn-block h-100"
                    disabled={!isEnableCheckout}
                    onClick={() => onSubmit()}
                  >
                    <span className="text-uppercase">Check Out</span>
                  </button>
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="col-md-6 p-0">
                  <p className="help-block mb-0 mt-0">
                    {order.return > 0 ? (
                      <span className="text-success">
                        Return: <Price amount={order.return} />{" "}
                      </span>
                    ) : null}
                    {order.debt > 0 ? (
                      <span className="text-danger">
                        Debt: <Price amount={order.debt} />
                      </span>
                    ) : null}
                  </p>
                </div>
                <div className="col-md-6 text-right p-0">
                  <button
                    type="button"
                    className="btn btn-link text-danger small"
                    onClick={() => {
                      openConfirm({
                        title: (
                          <p className="mb-0">
                            <FormattedMessage {...messages.formBtnDelete} />{" "}
                            {order.name}?
                          </p>
                        ),
                        message: `Are you sure to delete this order?`,
                        onClose: isConfirm => {
                          if (isConfirm) {
                            dispatch(removeOrder(order));
                          }
                        },
                      });
                    }}
                  >
                    <i className="fa fa-trash" />{" "}
                    <FormattedMessage {...messages.formBtnDelete} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-order text-warning">
          <FormattedMessage {...messages.orderEmpty} />
        </div>
      )}
      <PosCheckOut
        order={checkoutOrder}
        onClose={res => {
          console.log(res);
          setCheckOutOrder(null);
          if (res) {
            dispatch(onCheckout());
          }
        }}
      />
      {confirmModal}
    </div>
  );
};

PosOrderForm.propTypes = {};

export default PosOrderForm;
