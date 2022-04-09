import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ModalCancelButton from "../../../../components/button/ModalCancelButton";
import ModalOKButton from "../../../../components/button/ModalOKButton";
import Price from "../../../../components/common/Price";

const PosCheckOut = ({
  order: {
    order,
    form: { payAmount, isShipping, address },
  },
  onClose,
}) =>
  order && (
    <Modal className="warning" isOpen={!!order} fade={false}>
      <ModalHeader toggle={() => onClose(false)}>
        Check out order {order.customer?.name} ({order.phone})
      </ModalHeader>
      <ModalBody>
        <h1 className="text-danger text-center">
          <Price amount={order.total} />
        </h1>
        <div>
          <div className="row">
            <label className="col-3 col-form-label" htmlFor="payAmount">
              Client Pay
            </label>
            <div className="col align-self-center">
              <Price amount={payAmount} />
            </div>
          </div>
          {order.debt > 0 && (
            <div className="row">
              <label className="col-3 col-form-label" htmlFor="debtAmount">
                Debt
              </label>
              <div className="col align-self-center">
                <Price amount={order.debt} />
              </div>
            </div>
          )}
          {order.return > 0 && (
            <div className="row">
              <label className="col-3 col-form-label" htmlFor="returnAmount">
                Return
              </label>
              <div className="col align-self-center">
                <Price amount={order.return} />
              </div>
            </div>
          )}
          <div className="row">
            <label className="col-3 col-form-label" htmlFor="payAmount">
              Shipping
            </label>
            <div className="col align-self-center">
              {isShipping ? address : "No"}
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => onClose(false)} />
        <ModalOKButton color="warning" onClick={() => onClose(true)}>
          <i className="fa fa-check fa-fw mr-2" /> Check out
        </ModalOKButton>
      </ModalFooter>
    </Modal>
  );

PosCheckOut.propTypes = {
  order: PropTypes.object,
  onClose: PropTypes.func,
  form: PropTypes.object,
};

export default PosCheckOut;
