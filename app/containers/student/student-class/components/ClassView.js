import React from "react"
import PropTypes from "prop-types"
import Price from "../../../../components/common/Price"
import { IconClassRoom } from "../../../Icon/constants"

export const ClassView = ({ studentClass, isShowTuition = false }) => {
  if (!studentClass) return null
  return (
    <p className="mb-0">
      <IconClassRoom className="" /> {studentClass.name}
      {isShowTuition && (
        <>
          <br />
          <Price amount={studentClass.tuitionFeePerMonth} />
        </>
      )}
    </p>
  )
}

ClassView.propTypes = {
  studentClass: PropTypes.object.isRequired,
  isShowTuition: PropTypes.bool,
}
