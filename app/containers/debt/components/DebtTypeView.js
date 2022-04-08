import React from "react";
import PropTypes from "prop-types";
import { DEBT_TYPE } from "../constants";

// eslint-disable-next-line consistent-return
const DebtTypeView = ({ type }) => {
  switch (type) {
    case DEBT_TYPE.RECEIVABLES:
      return <span className="badge badge-success">RECEIVABLES</span>;
    case DEBT_TYPE.PAID_DEBT:
      return <span className="badge badge-secondary">PAID DEBT</span>;
    case DEBT_TYPE.RECOVERY_PUBLIC_DEBT:
      return <span className="badge badge-danger">RECOVERY PUBLIC DEBT</span>;
    case DEBT_TYPE.TO_PAY_DEBT:
      return <span className="badge badge-primary">TO PAY DEBT</span>;
    default:
      return <span className="badge badge-success">RECEIVABLES</span>;
  }
};

DebtTypeView.propTypes = {
  type: PropTypes.number,
};

export default DebtTypeView;
