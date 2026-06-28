import React from "react"
import PropTypes from "prop-types"
import Price from "../../../../components/common/Price"
import { IconClassRoom } from "../../../Icon/constants"

export const ClassView = ({ studentClass, isShowTuition = false }) => {
  if (!studentClass) return null
  return (
    <div className="text-white">
      <p className="mb-0">
        <IconClassRoom className="ml-1" /> {studentClass.name}
      </p>
      {isShowTuition && (
        <p className="mb-0">
          <Price amount={studentClass.tuitionFeePerMonth} />
        </p>
      )}
    </div>
  )
}

ClassView.propTypes = {
  studentClass: PropTypes.object.isRequired,
  isShowTuition: PropTypes.bool,
}
