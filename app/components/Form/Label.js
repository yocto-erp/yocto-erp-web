import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ required = false, children }) => (
  <span className="text-nowrap">
    {children}
    {required ? (
      <>
        &nbsp;<span className="text-danger">*</span>
      </>
    ) : (
      ''
    )}
  </span>
);

Label.propTypes = {
  required: PropTypes.bool,
  children: PropTypes.node,
};

export default Label;
