export const studentFeeCalculate = ({
  student,
  absentDay,
  studentClass,
  scholarShip,
  studentAbsentDay,
  monthYear,
  otherFee,
  otherDeduceFee,
  busFee,
  mealFee,
}) => {
  const rs = {
    absentDayFee: 0,
    studentAbsentDayDeductMealFee: 0,
    totalFeeWithoutScholarShip: 0,
    scholarShipFee: 0,
    totalFee: 0,
  }
  if (student && absentDay && studentClass) {
    rs.absentDayFee =
      absentDay * studentClass.absentFeeReturnPerDay * (1 - (scholarShip || 0) / 100)
  }
  if (student && student.enableMeal && studentAbsentDay && studentClass) {
    rs.studentAbsentDayDeductMealFee = studentAbsentDay * studentClass.mealFeeReturnPerDay
  }

  if (student && monthYear && studentClass) {
    rs.totalFeeWithoutScholarShip =
      studentClass.tuitionFeePerMonth * monthYear.numberOfMonths -
      rs.absentDayFee -
      rs.studentAbsentDayDeductMealFee +
      busFee +
      mealFee +
      (otherFee || 0) -
      (otherDeduceFee || 0)
  }

  if (student && monthYear && studentClass) {
    rs.scholarShipFee =
      (studentClass.tuitionFeePerMonth * monthYear.numberOfMonths * scholarShip) / 100
  }
  rs.totalFee = rs.totalFeeWithoutScholarShip - rs.scholarShipFee

  return rs
}
