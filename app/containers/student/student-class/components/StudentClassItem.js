import React from "react"
import PropTypes from "prop-types"
import IconStudentClass from "../../../../components/Icon/IconLabel"

const StudentClassItem = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ studentClass, className, isShowIcon }) => {
    if (!studentClass) {
      return null
    }
    return (
      <span className="text text-bold">
        {isShowIcon && <IconStudentClass />} {studentClass.name || studentClass.class.name}
      </span>
    )
  },
)
StudentClassItem.propTypes = {
  studentClass: PropTypes.any,
  className: PropTypes.string,
  isShowIcon: PropTypes.bool,
}
export default StudentClassItem
