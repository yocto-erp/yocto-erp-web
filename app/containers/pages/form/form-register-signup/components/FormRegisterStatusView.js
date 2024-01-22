import React from "react";
import PropTypes from "prop-types";
import { FormRegisterStatus } from "../../../form-register/constants";

const FormRegisterStatusView = ({ status }) => {
  switch (status) {
    case FormRegisterStatus.REQUEST:
      return <span className="badge badge-secondary">Đang chờ</span>;
    case FormRegisterStatus.CONFIRMED:
      return <span className="badge badge-success">Đã xác nhận</span>;
    case FormRegisterStatus.PAID:
      return <span className="badge badge-success">Đã thanh toán</span>;
    case FormRegisterStatus.CANCEL:
      return <span className="badge badge-danger">Đã Huỷ</span>;
    default:
      return <span className="badge badge-secondary">Unknown</span>;
  }
};

FormRegisterStatusView.propTypes = {
  status: PropTypes.number,
};

export default FormRegisterStatusView;
