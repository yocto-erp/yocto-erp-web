import React from "react";
import PropTypes from "prop-types";

export const DEFAULT_HOOK_FORM_PROP_TYPE = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export const defaultFormatOptionLabel = data => (
  <div className="text-white">
    <span>{data.name}</span>
  </div>
);

export const defaultGetOptionValue = data => data.id;
