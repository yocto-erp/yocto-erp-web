import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup as BootStrapFormGroup, Input, Label } from 'reactstrap';
import FormErrorMessage from './FormHookErrorMessage';

const FormGroup = ({
  name,
  label,
  register,
  type,
  error,
  placeholder,
  children,
  ...props
}) => (
  <BootStrapFormGroup>
    <Label for={name}>{label}</Label>
    <Input
      type={type}
      id={name}
      innerRef={register}
      name={name}
      invalid={!!error}
      placeholder={placeholder}
      {...props}
    >
      {children}
    </Input>
    <FormErrorMessage error={error} />
  </BootStrapFormGroup>
);

FormGroup.propTypes = {
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
  error: PropTypes.object,
  placeholder: PropTypes.string,
  children: PropTypes.any,
};

export default FormGroup;
