import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { ORDER_STATUS } from "../constants";
import { orderMessage } from "../messages";

const PurchaseOrderStatus = ({ status }) => {
  if (!status) return null;
  switch (status) {
    case ORDER_STATUS.PROCESSING:
      return (
        <span className="badge badge-primary">
          <FormattedMessage {...orderMessage[`status${status}`]} />
        </span>
      );
    case ORDER_STATUS.SHIPPING:
      return (
        <span className="badge badge-info">
          <FormattedMessage {...orderMessage[`status${status}`]} />
        </span>
      );
    case ORDER_STATUS.DONE:
      return (
        <span className="badge badge-success">
          <FormattedMessage {...orderMessage[`status${status}`]} />
        </span>
      );
    case ORDER_STATUS.CANCELLED:
      return (
        <span className="badge badge-danger">
          <FormattedMessage {...orderMessage[`status${status}`]} />
        </span>
      );
    default:
      return (
        <span className="badge badge-secondary">
          <FormattedMessage {...orderMessage[`status${status}`]} />
        </span>
      );
  }
};

PurchaseOrderStatus.propTypes = {
  status: PropTypes.number,
};

export default PurchaseOrderStatus;
