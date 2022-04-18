import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { DEBT_TYPE } from "../constants";
import messages from "../messages";

// eslint-disable-next-line consistent-return
const DebtTypeView = ({ type }) => {
  switch (type) {
    case DEBT_TYPE.RECEIVABLES:
      return (
        <span className="badge badge-warning">
          <FormattedMessage {...messages[`debtType${type}`]} />
        </span>
      );
    case DEBT_TYPE.PAID_DEBT:
      return (
        <span className="badge badge-primary">
          <FormattedMessage {...messages[`debtType${type}`]} />
        </span>
      );
    case DEBT_TYPE.RECOVERY_PUBLIC_DEBT:
      return (
        <span className="badge badge-success">
          <FormattedMessage {...messages[`debtType${type}`]} />
        </span>
      );
    case DEBT_TYPE.TO_PAY_DEBT:
      return (
        <span className="badge badge-warning">
          <FormattedMessage {...messages[`debtType${type}`]} />
        </span>
      );
    default:
      return (
        <span className="badge badge-info">
          <FormattedMessage {...messages[`debtType${type}`]} />
        </span>
      );
  }
};

DebtTypeView.propTypes = {
  type: PropTypes.number,
};

export default DebtTypeView;
