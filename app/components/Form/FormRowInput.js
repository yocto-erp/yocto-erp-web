import React from "react"
import { Col, FormGroup as BootStrapFormGroup, Input, Label } from "reactstrap"
import PropTypes from "prop-types"
import FormHookErrorMessage from "./FormHookErrorMessage"

const FormRowInput = ({
  name,
  label,
  register,
  type,
  error,
  placeholder,
  children,
  iconLeft,
  iconRight,
  className,
  isRequired,
  hint,
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
  )

  return (
    <BootStrapFormGroup className={className} row>
      {label ? (
        <Label for={name} sm={2}>
          {label} {isRequired ? <span className="text-danger">*</span> : null}
        </Label>
      ) : null}
      <Col sm={10}>
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
            <FormHookErrorMessage error={error} />
          </div>
        ) : (
          <>{input}</>
        )}
        {hint}
        <FormHookErrorMessage error={error} />
      </Col>
    </BootStrapFormGroup>
  )
}

FormRowInput.propTypes = {
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
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  register: PropTypes.any,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  hint: PropTypes.node,
  isRequired: PropTypes.bool,
}

export default FormRowInput
