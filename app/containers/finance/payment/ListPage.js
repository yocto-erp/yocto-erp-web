import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Widget from "../../../components/Widget/Widget";
import PaymentSettingFormModal from "./components/PaymentSettingFormModal";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import { ecommercePaymentMethodStr } from "./constants";
import RawHTML from "../../../components/RawHtml";
import { useConfirmDialog } from "../../../libs/hooks/useConfirmDialog";
import PageTitle from "../../Layout/PageTitle";
import CreateButton from "../../../components/button/CreateButton";
import { PaymentApi } from "../../../libs/apis/finance/payment.api";

const ListPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { state, exec } = useApi(PaymentApi.search);
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
            PaymentApi.remove(item.id).then(
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

  const actions = (
    <>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          setIsOpen(true);
          setEditItem(null);
        }}
      >
        Tạo kênh thanh toán
      </CreateButton>
    </>
  );

  useEffect(() => {
    exec();
  }, []);

  return (
    <>
      <PageTitle title="Quản lý kênh thanh toán" actions={actions} />
      <Widget>
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
        <PaymentSettingFormModal
          isOpen={isOpen}
          onClose={onClose}
          id={editItem}
        />
        {confirmModal}
      </Widget>
    </>
  );
};

ListPage.propTypes = {};

export default ListPage;
