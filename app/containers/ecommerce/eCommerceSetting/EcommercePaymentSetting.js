import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Widget from "../../../components/Widget/Widget";
import ECommercePaymentSettingForm from "./ECommercePaymentSettingForm";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import { EcommerceSettingApi } from "../../../libs/apis/ecommerce/ecommerce-setting.api";
import { ecommercePaymentMethodStr } from "../constants";
import RawHTML from "../../../components/RawHtml";
import { useConfirmDialog } from "../../../libs/hooks/useConfirmDialog";

const EcommercePaymentSetting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { state, exec } = useApi(EcommerceSettingApi.payment.search);
  const { confirmModal, openConfirm } = useConfirmDialog();

  const onClose = useCallback(
    res => {
      setIsOpen(false);
      console.log(res);
      exec();
    },
    [setIsOpen, exec],
  );

  const onDelete = useCallback(
    item => {
      openConfirm({
        title: "Are you sure to delete payment ?",
        message:
          "This will remove all user's order that have this payment method information",
        onClose: res => {
          if (res) {
            EcommerceSettingApi.payment.remove(item.id).then(
              () => {
                toast.success("Delete Payment Method success");
                exec();
              },
              () => {
                toast.error("Delete Payment Method Fail");
              },
            );
          }
        },
      });
    },
    [openConfirm, exec],
  );

  useEffect(() => {
    if (state.status === API_STATE.FAIL) {
      toast.error(state.errors.map(t => t.message || t.code).join("\n"));
    }
  }, [state]);

  useEffect(() => {
    exec();
  }, []);

  return (
    <Widget
      title="Payment Setting"
      controls={
        <>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setEditItem(null);
            }}
          >
            <i className="fa fa-plus" />
          </button>
        </>
      }
    >
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Payment Type</th>
            <th>Information</th>
            <th className="min">Action</th>
          </tr>
        </thead>
        <tbody>
          {(state?.resp || []).map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name || ""}</td>
              <td id={`paymentMethod${t.id}`}>
                {ecommercePaymentMethodStr(t.paymentTypeId)}
              </td>
              <td>
                <RawHTML html={t.setting} />
              </td>
              <td className="min">
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(t)}
                >
                  <i className="fa fa-trash" />{" "}
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-sm btn-info"
                  onClick={() => {
                    setEditItem(t.id);
                    setIsOpen(true);
                  }}
                >
                  <i className="fa fa-edit" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ECommercePaymentSettingForm
        isOpen={isOpen}
        onClose={onClose}
        id={editItem}
      />
      {confirmModal}
    </Widget>
  );
};

EcommercePaymentSetting.propTypes = {};

export default EcommercePaymentSetting;
