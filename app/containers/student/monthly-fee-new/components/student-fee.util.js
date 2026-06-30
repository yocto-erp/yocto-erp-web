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
  isTuitionPaid,
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
  if (student && student.enableMeal && studentAbsentDay && studentClass?.mealFeeReturnPerDay) {
    rs.studentAbsentDayDeductMealFee = studentAbsentDay * studentClass.mealFeeReturnPerDay
  }

  if (student && monthYear && studentClass) {
    const tuitionFee = !isTuitionPaid
      ? studentClass.tuitionFeePerMonth * monthYear.numberOfMonths
      : 0
    console.log("tuitionFee", tuitionFee)
    rs.totalFeeWithoutScholarShip =
      tuitionFee -
      rs.absentDayFee -
      rs.studentAbsentDayDeductMealFee +
      (busFee || 0) +
      (mealFee || 0) +
      (otherFee || 0) -
      (otherDeduceFee || 0)

    rs.scholarShipFee = !isTuitionPaid
      ? (studentClass.tuitionFeePerMonth * monthYear.numberOfMonths * (scholarShip || 0)) / 100
      : 0
  }

  rs.totalFee = rs.totalFeeWithoutScholarShip - rs.scholarShipFee

  return rs
}
