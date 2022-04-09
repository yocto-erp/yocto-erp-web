import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import FormHookErrorMessage from "./FormHookErrorMessage";

const Input = ({ register, type, name, error, className, ...props }) => (
  <>
    <input
      type={type}
      ref={register}
      name={name}
      className={classNames(className, { "is-invalid": !!error })}
      {...props}
    />
    <FormHookErrorMessage error={error} />
  </>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func,
  error: PropTypes.any,
  className: PropTypes.any,
  type: PropTypes.oneOf([
    "text",
    "email",
    "select",
    "file",
    "radio",
    "checkbox",
    "textarea",
    "button",
    "reset",
    "submit",
    "date",
    "datetime-local",
    "hidden",
    "image",
    "month",
    "number",
    "range",
    "search",
    "tel",
    "url",
    "week",
    "password",
    "datetime",
    "time",
    "color",
  ]),
};

export default Input;
