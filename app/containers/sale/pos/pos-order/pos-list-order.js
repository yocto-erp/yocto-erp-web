import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { UncontrolledTooltip } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { addOrder, selectOrder } from "./pos.reduce";
import { usePosDispatch, usePosListOrderContext } from "./pos.context";
import { PosScrollOptions } from "./constants";
import { hasText } from "../../../../utils/util";
import messages from "./messages";
import PosOrderEditModal from "./pos-order-edit.modal";
import Price from "../../../../components/common/Price";
import SubjectName from "../../../partner/subject/components/SubjectName";

const PosListOrder = () => {
  const dispatch = usePosDispatch();
  const { orders, currentOrder } = usePosListOrderContext();
  const [editOrderIndex, setEditOrderIndex] = useState(-1);

  const listOrder = useMemo(
    () => (
      <div className="list-group">
        {orders.map((t, i) => (
          <div key={`order${t.id}`}>
            <div
              role="button"
              tabIndex={i}
              id={`order${t.id}`}
              className={classNames(
                "list-group-item list-group-item-action p-2 d-flex justify-content-between align-items-center",
                {
                  active: i === currentOrder,
                },
              )}
              onClick={() => dispatch(selectOrder(i))}
              onKeyDown={() => dispatch(selectOrder(i))}
            >
              <p
                className="m-0 pr-1 text-ellipsis small"
                style={{ width: "160px" }}
              >
                <strong>{t.name}</strong>
                {t.customer ? (
                  <>
                    <br />
                    <SubjectName item={t.customer} />
                  </>
                ) : null}
                {t.products.length ? (
                  <>
                    <br />
                    <span className="">
                      <i className="fa fa-shopping-cart fa-fw" />{" "}
                      {t.products.length} (<Price amount={t.total} />)
                    </span>
                  </>
                ) : null}
              </p>
              <div className="btn-group btn-group-sm pos-list-order-btn">
                <button
                  type="button"
                  className="btn btn-sm btn-info"
                  onClick={() => setEditOrderIndex(i)}
                >
                  <i className="fa fa-edit" />
                </button>
              </div>
            </div>

            <UncontrolledTooltip target={`order${t.id}`}>
              <div className="text-left">
                {t.name}
                {t.products.length ? (
                  <>
                    <br />
                    <span className="">
                      <i className="fa fa-shopping-cart fa-fw" />{" "}
                      {t.products.length} - <Price amount={t.total} />
                    </span>
                  </>
                ) : null}
                {hasText(t.phone) && (
                  <p className="m-0 text-nowrap">
                    <i className="fa fa-phone fa-fw" />
                    &nbsp;{t.phone}{" "}
                  </p>
                )}
                {hasText(t.email) && (
                  <p className="m-0 text-nowrap">
                    <i className="fa fa-envelope fa-fw" />
                    &nbsp;{t.email}{" "}
                  </p>
                )}
                {hasText(t.address) && (
                  <>
                    <p className="m-0">
                      <i className="fa fa-location-arrow fa-fw" />
                      &nbsp;{t.address}{" "}
                    </p>
                  </>
                )}
              </div>
            </UncontrolledTooltip>
          </div>
        ))}
      </div>
    ),
    [orders, currentOrder],
  );
  return (
    <div className="order-list-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span>
          <FormattedMessage
            {...messages.orderTitle}
            values={{ count: orders.length }}
          />
        </span>
        <button
          type="button"
          className="btn btn-info btn-sm"
          onClick={() => dispatch(addOrder())}
        >
          <i className="fi flaticon-add" />{" "}
          <FormattedMessage {...messages.order} />
        </button>
      </div>

      <OverlayScrollbarsComponent
        className="order-list"
        options={PosScrollOptions}
      >
        {listOrder}
      </OverlayScrollbarsComponent>
      <PosOrderEditModal
        closeHandle={() => setEditOrderIndex(-1)}
        orderIndex={editOrderIndex}
      />
    </div>
  );
};

PosListOrder.propTypes = {};

export default PosListOrder;
