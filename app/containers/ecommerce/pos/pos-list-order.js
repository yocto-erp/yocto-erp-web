import React, { useMemo } from "react";
import classNames from "classnames";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { addOrder, removeOrder, selectOrder } from "./pos.reduce";
import { usePosDispatch, usePosListOrderContext } from "./pos.context";
import { PosScrollOptions } from "./constants";
import { useConfirmDialog } from "../../../libs/hooks/useConfirmDialog";

const PosListOrder = () => {
  const dispatch = usePosDispatch();
  const { orders, currentOrder } = usePosListOrderContext();
  const { openConfirm, confirmModal } = useConfirmDialog();
  console.log(orders);
  const listOrder = useMemo(
    () => (
      <div className="list-group">
        {orders.map((t, i) => (
          <div
            role="button"
            tabIndex={i}
            className={classNames(
              "list-group-item list-group-item-action p-2 d-flex justify-content-between align-items-center",
              {
                active: i === currentOrder,
              },
            )}
            onClick={() => dispatch(selectOrder(i))}
            onKeyDown={() => dispatch(selectOrder(i))}
            key={t.id}
          >
            <p className="m-0 pr-1 text-ellipsis">
              {t.name}
              <br />
              <span className="badge badge-info badge-pill">
                {t.products.map(it => it.qty).reduce((a, b) => a + b, 0)} /{" "}
                {t.products.length}
              </span>
            </p>

            <div className="btn-group btn-group-sm">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  openConfirm({
                    title: <h3>Delete Order {t.name}?</h3>,
                    message: `Are you sure to delete this order?`,
                    onClose: isConfirm => {
                      if (isConfirm) {
                        dispatch(removeOrder(i));
                      }
                    },
                  });
                }}
              >
                <i className="fa fa-trash" />{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    ),
    [orders, currentOrder],
  );
  return (
    <div className="order-list-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span>{orders.length} Orders</span>
        <button
          type="button"
          className="btn btn-info btn-sm"
          onClick={() => dispatch(addOrder())}
        >
          New Order
        </button>
      </div>

      <OverlayScrollbarsComponent
        className="order-list"
        options={PosScrollOptions}
      >
        {listOrder}
      </OverlayScrollbarsComponent>
      {confirmModal}
    </div>
  );
};

PosListOrder.propTypes = {};

export default PosListOrder;
