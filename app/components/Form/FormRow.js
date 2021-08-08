import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import FormHookErrorMessage from './FormHookErrorMessage';

const FormRow = ({
  name,
  label,
  register,
  type,
  labelCol = 2,
  valueCol = 10,
  error,
  placeholder,
  isRequired = false,
  ...props
}) => (
  <FormGroup row>
    <Label sm={labelCol} for={name}>
      {label} {isRequired ? <span className="text-danger">*</span> : null}
    </Label>
    <Col sm={valueCol}>
      <Input
        type={type}
        id={name}
        innerRef={register}
        name={name}
        invalid={!!error}
        placeholder={placeholder}
        {...props}
      />
      <FormHookErrorMessage error={error} />
    </Col>
  </FormGroup>
);

FormRow.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'select',
    'file',
    'radio',
    'checkbox',
    'textarea',
    'button',
    'reset',
    'submit',
    'date',
    'datetime-local',
    'hidden',
    'image',
    'month',
    'number',
    'range',
    'search',
    'tel',
    'url',
    'week',
    'password',
    'datetime',
    'time',
    'color',
  ]),
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  register: PropTypes.any.isRequired,
  labelCol: PropTypes.number,
  valueCol: PropTypes.number,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default FormRow;
