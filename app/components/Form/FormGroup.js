import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup as BootStrapFormGroup, Label } from 'reactstrap';

const FormGroup = ({ id, label, children, className, isRequired }) => (
  <BootStrapFormGroup className={className}>
    {label ? (
      <Label for={id}>
        {label} {isRequired ? <span className="text-danger">*</span> : null}
      </Label>
    ) : null}
    {children}
  </BootStrapFormGroup>
);

FormGroup.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default FormGroup;
