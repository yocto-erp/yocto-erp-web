import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as yup from "yup";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import ModalCancelButton from "../../../../components/button/ModalCancelButton";
import ModalOKButton from "../../../../components/button/ModalOKButton";
import Price from "../../../../components/common/Price";
import SubjectView from "../../../partner/subject/components/SubjectView";
import { transformUnNumber } from "../../../../libs/utils/number.util";
import { ERROR } from "../../../../components/Form/messages";
import useMyForm from "../../../../libs/hooks/useMyForm";
import InputAmount from "../../../../components/Form/InputAmount";
import InputAsyncTagging from "../../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../../libs/apis/tagging.api";
import { compare } from "../../../../libs/utils/math.util";
import useSaleConfigure from "../../components/useSaleConfigure";
import messages from "./messages";
import { TAX_TYPE } from "../../../finance/tax/tax/constants";

import posApi from "../../../../libs/apis/pos.api";
import { API_STATE } from "../../../../libs/hooks/useApi";

const schema = yup.object().shape({
  storeCashIn: yup.bool(),
  storeCashInName: yup.string().when("storeCashIn", {
    is: true,
    then: yup.string().required(),
  }),
  storeCashInAmount: yup.number().when("storeCashIn", {
    is: true,
    then: yup
      .number()
      .transform(transformUnNumber)
      .positive(ERROR.amountGT0)
      .required(ERROR.required),
  }),
  storeDebt: yup.bool(),
  storeDebtName: yup.string().when("storeDebt", {
    is: true,
    then: yup.string().required(),
  }),
  storeDebtAmount: yup.number().when("storeDebt", {
    is: true,
    then: yup
      .number()
      .transform(transformUnNumber)
      .positive(ERROR.amountGT0)
      .required(ERROR.required),
  }),
  storeWarehouse: yup.bool(),
  storeWarehouseName: yup.string().when("storeWarehouse", {
    is: true,
    then: yup.string().required(),
  }),
});
const PosCheckOut = ({ order, onClose }) => {
  const { id } = useParams();
  const { configure: saleConfig } = useSaleConfigure();
  const [tab, setTab] = useState(1);
  const {
    register,
    errors,
    onSubmit,
    formState: { isValid },
    reset,
    control,
    watch,
    state,
  } = useMyForm({
    validationSchema: schema,
    api: formData => {
      console.log({ order, voucher: formData });
      return posApi.posOrder(id, { order, voucher: formData });
    },
  });

  const { storeCashIn, storeDebt, storeWarehouse } = watch([
    "storeCashIn",
    "storeDebt",
    "storeWarehouse",
  ]);

  useEffect(() => {
    if (order && saleConfig) {
      reset({
        storeCashIn: order.paymentAmount > 0,
        storeCashInName: `Thu tiền đơn hàng ${order.name}`,
        storeCashInAmount:
          compare(order.paymentAmount || 0, order.totalWithTax || 0) > 0
            ? order.totalWithTax
            : order.paymentAmount,
        storeCashInTagging: saleConfig.taggingPOSCost,
        storeDebt: order.debt > 0,
        storeDebtName: `Ghi nợ đơn hàng ${order.name}`,
        storeDebtAmount: order.debt,
        storeDebtTagging: saleConfig.taggingPOSDebt,
        storeWarehouse: true,
        storeWarehouseName: `Xuất kho cho đơn hàng ${order.name}`,
        storeWarehouseTagging: saleConfig.taggingPOSWarehouse,
      });
    }
  }, [order, saleConfig]);

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      toast.success(`Thanh toán thành công đơn hàng ${order.name}`);
      onClose(true);
    }
  }, [state]);

  return (
    order && (
      <Modal
        className="warning"
        isOpen={!!order}
        fade={false}
        size="lg"
        modalClassName="modal-tabs"
      >
        <ModalHeader toggle={() => onClose(false)} wrapTag="div">
          <div className="row align-items-center">
            <div className="col text-nowrap text-ellipsis">{order.name}</div>
            <div className="col-auto">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className={classNames("nav-link", { active: tab === 1 })}
                    href="#tab1"
                    onClick={() => setTab(1)}
                  >
                    <FormattedMessage {...messages.checkoutModalTabTitle} />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={classNames("nav-link", { active: tab === 2 })}
                    href="#tab2"
                    onClick={() => setTab(2)}
                  >
                    <FormattedMessage {...messages.checkoutModalTabVoucher} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="tab-content" id="tabContent">
            <div
              className={classNames("tab-pane fade", {
                "active show": tab === 1,
              })}
              id="tab1"
              role="tabpanel"
              aria-labelledby="tab1"
            >
              <h1 className="text-success text-center">
                <Price amount={order.totalWithTax} />
              </h1>
              <div>
                {order.customer ? (
                  <div className="row">
                    <label className="col-3 col-form-label" htmlFor="payAmount">
                      Khách hàng
                    </label>
                    <div className="col align-self-center pb-2 pt-2">
                      <SubjectView
                        item={order.customer}
                        isShowTagging={false}
                      />
                    </div>
                  </div>
                ) : null}
                <div className="row">
                  <label className="col-3 col-form-label" htmlFor="payAmount">
                    <FormattedMessage {...messages.checkoutModalTotal} />
                  </label>
                  <div className="col align-self-center">
                    <Price amount={order.total} />
                  </div>
                </div>
                <div className="row">
                  <label className="col-3 col-form-label" htmlFor="payAmount">
                    <FormattedMessage {...messages.checkoutModalTax} />
                  </label>
                  <div className="col align-self-center">
                    {(order?.taxes || []).map(t => (
                      <p className="mb-0" key={t.id}>
                        {t.shortName} ({t.amount}
                        {t.type === TAX_TYPE.PERCENT ? "%" : ""}) :{" "}
                        <Price amount={t.taxAmount} />
                      </p>
                    ))}
                  </div>
                </div>
                <div className="row">
                  <label className="col-3 col-form-label" htmlFor="payAmount">
                    <FormattedMessage {...messages.checkoutModalCustomerPay} />
                  </label>
                  <div className="col align-self-center">
                    <Price amount={order.paymentAmount} />
                  </div>
                </div>
                {order.debt > 0 && (
                  <div className="row">
                    <label
                      className="col-3 col-form-label text-danger"
                      htmlFor="debtAmount"
                    >
                      Debt
                    </label>
                    <div className="col align-self-center">
                      <Price amount={order.debt} className="text-danger" />
                    </div>
                  </div>
                )}
                {order.return > 0 && (
                  <div className="row">
                    <label
                      className="col-3 col-form-label text-success"
                      htmlFor="returnAmount"
                    >
                      Return
                    </label>
                    <div className="col align-self-center">
                      <Price amount={order.return} className="text-success" />
                    </div>
                  </div>
                )}
                {order.isShipping ? (
                  <div className="row">
                    <label className="col-3 col-form-label" htmlFor="payAmount">
                      Shipping
                    </label>
                    <div className="col align-self-center">
                      {order.isShipping ? order.address : "No"}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div
              className={classNames("tab-pane fade", {
                "active show": tab === 2,
              })}
              id="tab2"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              {order.paymentAmount > 0 ? (
                <div className="form-group">
                  <label htmlFor="storeCashIn">Tạo phiếu thu</label>
                  <div className="form-inline">
                    <div className="input-group mr-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-gray">
                          <input
                            type="checkbox"
                            className=""
                            id="storeCashIn"
                            name="storeCashIn"
                            ref={register}
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        name="storeCashInName"
                        placeholder="Tên phiếu thu"
                        className={classNames("form-control", {
                          "is-invalid": !!errors.storeCashInName,
                        })}
                        disabled={!storeCashIn}
                        ref={register}
                      />
                    </div>
                    <Controller
                      name="storeCashInAmount"
                      control={control}
                      defaultValue="0"
                      render={({ onChange, value, onBlur }, { invalid }) => (
                        <InputAmount
                          style={{ width: "120px" }}
                          onChange={onChange}
                          onBlur={onBlur}
                          disabled={!storeCashIn}
                          placeholder="Tuition Amount"
                          value={value}
                          invalid={invalid}
                        />
                      )}
                    />
                    <Controller
                      name="storeCashInTagging"
                      defaultValue={null}
                      control={control}
                      render={({ onChange, ...data }) => (
                        <div className="ml-2" style={{ width: "300px" }}>
                          <InputAsyncTagging
                            isDisabled={!storeCashIn}
                            {...data}
                            onChange={onChange}
                            loadOptionApi={taggingApi.search}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              ) : null}
              {order.debt > 0 ? (
                <div className="form-group">
                  <label htmlFor="storeDebt">Tạo phiếu nợ</label>
                  <div className="form-inline">
                    <div className="input-group mr-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-gray">
                          <input
                            type="checkbox"
                            className=""
                            id="storeDebt"
                            name="storeDebt"
                            ref={register}
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        name="storeDebtName"
                        placeholder="Tên phiếu nợ"
                        className={classNames("form-control", {
                          "is-invalid": !!errors.storeDebtName,
                        })}
                        disabled={!storeDebt}
                        ref={register}
                      />
                    </div>
                    <Controller
                      name="storeDebtAmount"
                      control={control}
                      defaultValue="0"
                      render={({ onChange, value, onBlur }, { invalid }) => (
                        <InputAmount
                          style={{ width: "120px" }}
                          onChange={onChange}
                          onBlur={onBlur}
                          disabled={!storeDebt}
                          placeholder="Debt Amount"
                          value={value}
                          invalid={invalid}
                        />
                      )}
                    />
                    <Controller
                      name="storeDebtTagging"
                      defaultValue={null}
                      control={control}
                      render={({ onChange, ...data }) => (
                        <div className="ml-2" style={{ width: "300px" }}>
                          <InputAsyncTagging
                            isDisabled={!storeDebt}
                            {...data}
                            onChange={onChange}
                            loadOptionApi={taggingApi.search}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              ) : null}
              <div className="form-group">
                <label htmlFor="storeWarehouse">Tạo phiếu xuất kho</label>
                <div className="form-inline">
                  <div className="input-group mr-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-gray">
                        <input
                          type="checkbox"
                          className=""
                          id="storeWarehouse"
                          name="storeWarehouse"
                          ref={register}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="storeWarehouseName"
                      placeholder="Tên phiếu xuất kho"
                      className={classNames("form-control", {
                        "is-invalid": !!errors.storeWarehouse,
                      })}
                      disabled={!storeWarehouse}
                      ref={register}
                    />
                  </div>
                  <Controller
                    name="storeWarehouseTagging"
                    defaultValue={null}
                    control={control}
                    render={({ onChange, ...data }) => (
                      <div className="ml-2" style={{ width: "300px" }}>
                        <InputAsyncTagging
                          isDisabled={!storeWarehouse}
                          {...data}
                          onChange={onChange}
                          loadOptionApi={taggingApi.search}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {state.errors && state.errors.length ? (
            <p className="mb-0 text-left text-danger flex-grow-1">
              <i className="fa fa-warning fa-fw mr-2" />
              {state.errors.map(t => t.message || t.code).join("\n")}
            </p>
          ) : null}
          <ModalCancelButton onClick={() => onClose(false)} />
          <ModalOKButton
            color="warning"
            isLoading={state.status === API_STATE.LOADING}
            disabled={!isValid}
            onClick={onSubmit}
          >
            <i className="fa fa-check fa-fw mr-2" /> Check out
          </ModalOKButton>
        </ModalFooter>
      </Modal>
    )
  );
};

PosCheckOut.propTypes = {
  order: PropTypes.object,
  onClose: PropTypes.func,
  form: PropTypes.object,
};

export default PosCheckOut;
