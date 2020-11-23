import React from 'react';
import { FormGroup as BootStrapFormGroup, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import FormErrorMessage from './FormHookErrorMessage';

const FormGroup = ({
  name,
  label,
  register,
  type,
  error,
  placeholder,
  children,
  iconLeft,
  iconRight,
  ...props
}) => {
  const input = (
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
  );

  return (
    <BootStrapFormGroup>
      {label ? <Label for={name}>{label}</Label> : null}
      {iconLeft || iconRight ? (
        <div className="input-group">
          {iconLeft ? (
            <div className="input-group-prepend">
              <span className="input-group-text style-icon">{iconLeft}</span>
            </div>
          ) : null}
          {input}
          {iconRight ? (
            <div className="input-group-append">
              <span className="input-group-text">{iconRight}</span>
            </div>
          ) : null}
        </div>
      ) : (
        input
      )}
      <FormErrorMessage error={error} />
    </BootStrapFormGroup>
  );
};

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
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  register: PropTypes.any.isRequired,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  children: PropTypes.any,
};

export default FormGroup;
