import React from "react";
import PropTypes from "prop-types";
import { PaymentRequestStatus } from "../constants";

const PaymentRequestStatusView = ({ status }) => {
  switch (status) {
    case PaymentRequestStatus.PENDING:
      return <span className="badge badge-secondary">Đang chờ</span>;
    case PaymentRequestStatus.CONFIRMED:
      return <span className="badge badge-success">Đã xác nhận</span>;
    case PaymentRequestStatus.REJECTED:
      return <span className="badge badge-danger">Đã Huỷ</span>;
    default:
      return <span className="badge badge-secondary">Unknown</span>;
  }
};

PaymentRequestStatusView.propTypes = {
  status: PropTypes.number,
};

export default PaymentRequestStatusView;
