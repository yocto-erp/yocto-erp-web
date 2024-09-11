import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"

const IconStudentClass = React.forwardRef(({ className }) => (
  <i className={clsx("bi bi-tag", className)} />
))

IconStudentClass.propTypes = {
  className: PropTypes.string,
}

export default IconStudentClass
