import React from "react";
import "../index.scss";
import "./FormViewPage.scss";
import PropTypes from "prop-types";
import { clsx } from "clsx";
import Price from "../../../components/common/Price";
import "./FormViewClass.scss";

const FormViewClass = ({ clazz, isActive = false, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx("clazz btn grow bg-primary text-left text-white d-block")}
  >
    {isActive && <i className="fa fa-check active bg-success" />}
    <p>{clazz.name}</p>
    <Price amount={clazz.tuitionFeePerMonth} />
  </button>
);

FormViewClass.propTypes = {
  clazz: PropTypes.object,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FormViewClass;
