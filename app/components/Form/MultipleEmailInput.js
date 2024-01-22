import React from "react";
import PropTypes from "prop-types";
import InputTag from "./InputTag";
import { isValidEmail } from "../../libs/utils/schema.util";

const MultipleEmailInput = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ invalid, onBlur, onChange, placeholder, value, ...props }, ref) => (
    <InputTag
      value={value ? value.map(t => ({ label: t, value: t })) : []}
      placeholder={placeholder || "Type email and press enter"}
      onChange={val => onChange(val ? val.map(t => t.value) : null)}
      onBlur={onBlur}
      invalid={invalid}
      isValidNewOption={isValidEmail}
      {...props}
    />
  ),
);

MultipleEmailInput.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default MultipleEmailInput;
