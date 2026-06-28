import React, { useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import get from "lodash/get"
import { FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import { Controller, useWatch } from "react-hook-form"
import FormHookErrorMessage from "../../../../../components/Form/FormHookErrorMessage"
import StudentSelect from "../../../components/StudentSelect"
import InputNumber from "../../../../../components/Form/InputNumber"
import InputPercent from "../../../../../components/Form/InputPercent"
import Price from "../../../../../components/common/Price"
import MonthRangeSelect from "../../../../../components/date/MonthRangeSelect"
import Widget from "../../../../../components/Widget/Widget"
import FormRowOnly from "../../../../../components/Form/FormRowOnly"
import { SelectClass } from "../../../student-class/components/SelectClass"
import FormGroupInput from "../../../../../components/Form/FormGroupInput"

const StudentFeeForm = ({
  control,
  register,
  setValue,
  trigger,
  index,
  remove,
  formState,
  isUpdated = false,
  className,
  item,
}) => {
  const dataItem = useWatch({
    control,
    name: `details[${index}]`,
    defaultValue: item,
  })

  console.log(dataItem, item)
  const {
    monthYear,
    absentDay,
    studentAbsentDay,
    student,
    scholarShip,
    otherFee,
    otherDeduceFee,
    busFee,
    mealFee,
    debt,
    studentClass,
  } = dataItem

  const globalClass = useWatch({
    control,
    name: "class",
  })

  useEffect(() => {
    if (!isUpdated) {
      setValue(`details[${index}].studentClass`, globalClass)
    }
  }, [globalClass])

  useEffect(() => {
    // Auto update total bus fee when monthYear, student, student class change
    let totalBusFee = 0

    if (student && student.enableBus && monthYear && studentClass?.busFee) {
      totalBusFee = studentClass.busFee * monthYear.numberOfMonths
      setValue(`details[${index}].busFee`, totalBusFee)
      trigger([`details[${index}].busFee`])
    }
  }, [student, index, studentClass, monthYear])

  useEffect(() => {
    let totalMealFee = 0
    if (student && student.enableMeal && monthYear && studentClass) {
      totalMealFee = studentClass.mealFeePerMonth * monthYear.numberOfMonths
      setValue(`details[${index}].mealFee`, totalMealFee)
      // trigger([`details[${index}].mealFee`])
    }
  }, [student, studentClass, index, monthYear, isUpdated])

  const absentDayFee = useMemo(() => {
    let rs = 0
    if (student && absentDay && studentClass?.absentFeeReturnPerDay) {
      rs = absentDay * studentClass.absentFeeReturnPerDay * (1 - scholarShip / 100)
    }
    return rs
  }, [student, absentDay, studentClass, scholarShip])

  const studentAbsentDayDeductMealFee = useMemo(() => {
    let rs = 0
    if (student && student.enableMeal && studentAbsentDay && studentClass?.mealFeeReturnPerDay) {
      rs = studentAbsentDay * studentClass.mealFeeReturnPerDay
    }
    return rs
  }, [student, studentAbsentDay, studentClass])

  const totalFeeWithoutScholarShip = useMemo(() => {
    let rsFee = 0
    if (student && monthYear && studentClass) {
      rsFee =
        studentClass.tuitionFeePerMonth * monthYear.numberOfMonths -
        absentDayFee -
        studentAbsentDayDeductMealFee +
        busFee +
        mealFee +
        (otherFee || 0) -
        (otherDeduceFee || 0) +
        (debt || 0)
    }
    return rsFee
  }, [
    student,
    absentDayFee,
    debt,
    busFee,
    mealFee,
    otherFee,
    otherDeduceFee,
    studentAbsentDayDeductMealFee,
    monthYear,
    studentClass,
  ])

  const scholarShipFee = useMemo(() => {
    let rs = 0
    if (student && monthYear && studentClass) {
      rs = (studentClass.tuitionFeePerMonth * monthYear.numberOfMonths * scholarShip) / 100
    }
    return rs
  }, [student, scholarShip, monthYear, studentClass])

  const totalFee = useMemo(() => Number(totalFeeWithoutScholarShip) - Number(scholarShipFee), [
    totalFeeWithoutScholarShip,
    scholarShipFee,
    className,
  ])

  const { errors } = formState

  const ROW = {
    labelCol: 3,
    valueCol: 9,
  }
  return (
    <Widget>
      <Input
        type="hidden"
        name={`details[${index}].id`}
        innerRef={register()}
        defaultValue={item.id}
      />
      <FormRowOnly label="Học sinh" id="studentClass" {...ROW}>
        <div className="d-flex align-items-center justify-content-between" style={{ gap: "8px" }}>
          <div className="flex-grow-1">
            <Controller
              name={`details[${index}].studentClass`}
              control={control}
              defaultValue={item.studentClass}
              render={({ onChange, name, value }, { invalid }) => (
                <SelectClass
                  id="studentClass"
                  placeholder="Chọn lớp học"
                  invalid={invalid}
                  disabled={isUpdated}
                  name={name}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormFeedback>
              {get(errors, ["details", index, "studentClass", "message"], "")}
            </FormFeedback>
          </div>
          <div style={{ flexGrow: 2 }}>
            <Controller
              defaultValue={item.student}
              control={control}
              id={`student${index}`}
              name={`details[${index}].student`}
              render={({ onChange, value, onBlur, name }) => (
                <StudentSelect
                  onChange={onChange}
                  invalid={!!get(errors, ["details", index, "student"], false)}
                  onBlur={onBlur}
                  isClearable={!isUpdated}
                  value={value}
                  disabled={isUpdated}
                  placeholder="Select Student"
                  name={name}
                  classId={studentClass?.id}
                />
              )}
            />
            <FormFeedback>{get(errors, ["details", index, "student", "message"], "")}</FormFeedback>
          </div>
        </div>
      </FormRowOnly>
      <FormRowOnly label="Month" {...ROW}>
        <Controller
          control={control}
          defaultValue={item.monthYear}
          name={`details[${index}].monthYear`}
          render={({ onChange, value, onBlur }, { invalid }) => (
            <MonthRangeSelect
              onChange={onChange}
              onBlur={onBlur}
              isClearable={!isUpdated}
              value={value}
              disabled={isUpdated}
              invalid={invalid}
            />
          )}
        />
        <FormFeedback>{get(errors, ["details", index, "monthYear", "message"], "")}</FormFeedback>
      </FormRowOnly>
      <FormRowOnly label="Học phí" className="align-items-center" {...ROW}>
        <div className="d-flex align-items-center justify-content-between">
          <Price className="d-block" amount={studentClass?.tuitionFeePerMonth} />
        </div>
      </FormRowOnly>
      <FormRowOnly label="Học bổng" {...ROW}>
        <Controller
          control={control}
          defaultValue={item.scholarShip}
          placeholder="ScholarShip"
          name={`details[${index}].scholarShip`}
          render={({ onChange, value, onBlur, ...props }) => (
            <InputPercent
              {...props}
              invalid={!!get(errors, ["details", index, "scholarShip"], false)}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <Price className="text-muted small" amount={scholarShipFee} />
        <FormHookErrorMessage error={get(errors, ["details", index, "scholarShip"])} />
      </FormRowOnly>
      <FormRowOnly label="Xe bus" {...ROW}>
        <Controller
          control={control}
          name={`details[${index}].busFee`}
          defaultValue={item.busFee}
          render={({ onChange, value, onBlur, ...props }) => (
            <InputNumber
              {...props}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Bus Fee"
            />
          )}
        />
        <FormHookErrorMessage error={get(errors, ["details", index, "busFee"])} />
      </FormRowOnly>
      <FormRowOnly label="Tiền ăn" {...ROW}>
        <Controller
          control={control}
          invalid={!!get(errors, ["details", index, "mealFee"], false)}
          name={`details[${index}].mealFee`}
          render={({ onChange, value, onBlur, ...props }, { invalid }) => (
            <InputNumber
              {...props}
              invalid={invalid}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Meal Fee"
            />
          )}
        />
        <FormHookErrorMessage error={get(errors, ["details", index, "mealFee"])} />
      </FormRowOnly>
      <FormRowOnly label="Chi phí khác" {...ROW}>
        <div className="row">
          <div className="col-sm-4 col-md-4">
            <InputGroup className="mb-2" size="sm">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-plus fa-fw" />
                </InputGroupText>
              </InputGroupAddon>
              <Controller
                control={control}
                defaultValue={item.otherFee}
                invalid={!!get(errors, ["details", index, "otherFee"], false)}
                name={`details[${index}].otherFee`}
                render={({ onChange, value, onBlur, ...props }) => (
                  <InputNumber
                    {...props}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Other Fee"
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className="col-sm-8 col-md-8">
            <FormGroupInput
              type="textarea"
              name={`details[${index}].otherFeeDesc`}
              label=""
              placeholder="Mô tả chi phí khác"
              register={register}
            />
          </div>
        </div>
      </FormRowOnly>
      <FormRowOnly label="Ngày nghỉ (học/ăn)" {...ROW}>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <Controller
              control={control}
              defaultValue={item.absentDay}
              name={`details[${index}].absentDay`}
              invalid={!!get(errors, ["details", index, "absentDay"], false)}
              render={({ onChange, value, onBlur, ...props }) => (
                <InputNumber
                  max={studentClass?.numberDayOfMonth || 22}
                  {...props}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Số ngày nghỉ học"
                />
              )}
            />
            {absentDayFee > 0 && (
              <span className="text-muted small">
                Học phí trả lại: <Price amount={absentDayFee} />
              </span>
            )}
          </div>
          <div className="col-md-6 col-sm-6">
            <Controller
              control={control}
              defaultValue={item.studentAbsentDay || ""}
              invalid={!!get(errors, ["details", index, "studentAbsentDay"], false)}
              name={`details[${index}].studentAbsentDay`}
              render={({ onChange, value, onBlur, ...props }) => (
                <InputNumber
                  max={studentClass?.numberDayOfMonth || 22}
                  {...props}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Số ngày nghỉ không ăn"
                />
              )}
            />
            {studentAbsentDayDeductMealFee > 0 && (
              <p className="mb-0">
                Tiền ăn trả lại:{" "}
                <Price className="text-muted small" amount={studentAbsentDayDeductMealFee} />
              </p>
            )}
          </div>
        </div>
      </FormRowOnly>
      <FormRowOnly label="Tiền trả lại" {...ROW}>
        <div className="row">
          <div className="col-sm-4 col-md-4">
            <InputGroup className="mb-2" size="sm">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-minus fa-fw" />
                </InputGroupText>
              </InputGroupAddon>
              <Controller
                control={control}
                defaultValue={item.otherDeduceFee}
                invalid={!!get(errors, ["details", index, "otherDeduceFee"], false)}
                name={`details[${index}].otherDeduceFee`}
                render={({ onChange, value, onBlur, ...props }) => (
                  <InputNumber
                    {...props}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Deduce Fee"
                  />
                )}
              />
            </InputGroup>
          </div>
          <div className="col-sm-8 col-md-8">
            <FormGroupInput
              type="textarea"
              name={`details[${index}].otherDeduceFeeDesc`}
              label=""
              placeholder="Mô tả chi phí trả lại khác"
              register={register}
            />
          </div>
        </div>
      </FormRowOnly>
    </Widget>
  )
}

StudentFeeForm.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  item: PropTypes.any,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  trigger: PropTypes.func,
  isUpdated: PropTypes.bool,
  formState: PropTypes.object,
  className: PropTypes.object,
}
export default StudentFeeForm
