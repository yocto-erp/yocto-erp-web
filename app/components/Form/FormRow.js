import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import FormErrorMessage from './FormHookErrorMessage';

const FormRow = ({
  name,
  label,
  register,
  type,
  labelCol = 2,
  valueCol = 10,
  error,
  placeholder,
  ...props
}) => (
  <FormGroup row>
    <Label sm={labelCol} for={name}>
      {label}
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
      <FormErrorMessage error={error} />
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
};

export default FormRow;
