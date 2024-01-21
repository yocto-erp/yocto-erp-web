import React from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

const FormError = ({ errors, item, ...props }) => {
  // eslint-disable-next-line no-underscore-dangle
  const _errors = [];
  if (errors && errors.length) {
    _errors.push(...errors);
  } else if (errors.error) {
    _errors.push({
      name: "Invalid",
      message: errors.error,
    });
  }
  return _errors.length > 0 ? (
    <Alert fade={false} color="danger" {...props}>
      <ul className="m-0">
        {errors.map(t => (
          <li key={uuidv4()}>
            {t?.name} - {item ? item(t.message) : t.message}
          </li>
        ))}
      </ul>
    </Alert>
  ) : (
    ""
  );
};

FormError.propTypes = {
  errors: PropTypes.array,
  item: PropTypes.func,
};

export default FormError;
