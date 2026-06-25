import React from "react"
import PropTypes from "prop-types"
import { Col, FormGroup as BootStrapFormGroup, Label } from "reactstrap"

const FormRowOnly = ({
  id,
  label,
  children,
  className,
  isRequired,
  labelCol = 2,
  valueCol = 10,
}) => (
  <BootStrapFormGroup className={className} row>
    <Label for={id} sm={labelCol} md={labelCol}>
      {label} {isRequired ? <span className="text-danger">*</span> : null}
    </Label>
    <Col sm={valueCol} md={valueCol}>
      {children}
    </Col>
  </BootStrapFormGroup>
)

FormRowOnly.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
  labelCol: PropTypes.number,
  valueCol: PropTypes.number,
}

export default FormRowOnly
