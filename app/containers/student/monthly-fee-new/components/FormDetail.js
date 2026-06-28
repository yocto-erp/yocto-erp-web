import React, { useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import get from "lodash/get"
import {
  Button,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap"
import { Controller, useWatch } from "react-hook-form"
import classNames from "classnames"
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage"
import StudentSelect from "../../components/StudentSelect"
import InputNumber from "../../../../components/Form/InputNumber"
import InputPercent from "../../../../components/Form/InputPercent"
import Price from "../../../../components/common/Price"
import MonthRangeSelect from "../../../../components/date/MonthRangeSelect"
import { SelectClass } from "../../student-class/components/SelectClass"
import FormRowOnly from "../../../../components/Form/FormRowOnly"
import FormGroupInput from "../../../../components/Form/FormGroupInput"
import useStudentConfigure from "../../../../libs/hooks/useStudentConfigure"
import { studentFeeCalculate } from "./student-fee.util"

const FormDetail = ({
  control,
  register,
  setValue,
  trigger,
  item,
  index,
  remove,
  formState,
  isUpdated = false,
}) => {
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
    studentClass,
  } = useWatch({
    control,
    name: `details[${index}]`,
    defaultValue: item,
  })

  const { configure } = useStudentConfigure()

  useEffect(() => {
    // Auto update total bus fee when monthYear, student, student class change
    let totalBusFee = 0
    console.log("TotalBusFee: ", student?.enableBus, configure?.busFee, monthYear)
    if (student && student.enableBus && monthYear && configure?.busFee) {
      totalBusFee = configure.busFee * monthYear.numberOfMonths
      setValue(`details[${index}].busFee`, totalBusFee)
      trigger([`details[${index}].busFee`])
    }
  }, [student, index, configure, monthYear])

  useEffect(() => {
    let totalMealFee = 0
    if (!isUpdated && student && student.enableMeal && monthYear && studentClass) {
      totalMealFee = studentClass.mealFeePerMonth * monthYear.numberOfMonths
      setValue(`details[${index}].mealFee`, totalMealFee)
      trigger([`details[${index}].mealFee`])
    }
  }, [student, index, monthYear, studentClass, isUpdated])

  const { scholarShipFee, studentAbsentDayDeductMealFee, absentDayFee, totalFee } = useMemo(
    () =>
      studentFeeCalculate({
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
      }),
    [
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
    ],
  )

  const { errors } = formState
  return (
    <tr key={item.id}>
      <td>
        <Input
          type="hidden"
          name={`details[${index}].id`}
          innerRef={register()}
          defaultValue={item.id}
        />
        <div
          className={classNames("w-100 mb-2", {
            "is-invalid": !!get(errors, ["details", index, "monthYear"], false),
          })}
        >
          <Controller
            defaultValue={item.monthYear}
            control={control}
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
        </div>
        <FormFeedback>{get(errors, ["details", index, "monthYear", "message"], "")}</FormFeedback>
        <div className="mt-2">
          <Controller
            name={`details[${index}].studentClass`}
            control={control}
            defaultValue={item.studentClass}
            render={({ onChange, name, value }, { invalid }) => (
              <SelectClass
                id="studentClass"
                placeholder="Chọn lớp học"
                invalid={invalid}
                isShowPrice
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
          {studentClass && (
            <p className="text-muted small mb-1">
              Học phí:&nbsp;
              <strong>
                <Price amount={studentClass.tuitionFeePerMonth} />
              </strong>
            </p>
          )}
        </div>
        <div className="mt-2">
          <Controller
            defaultValue={item.student}
            control={control}
            id={`student${index}.student`}
            name={`details[${index}].student`}
            render={({ onChange, value, onBlur, name }) => (
              <StudentSelect
                onChange={onChange}
                invalid={!!get(errors, ["details", index, "student"], false)}
                onBlur={onBlur}
                isClearable={!isUpdated}
                value={value}
                /* studentClass={studentClass} */
                disabled={isUpdated}
                placeholder="Select Student"
                name={name}
              />
            )}
          />
          <FormFeedback>{get(errors, ["details", index, "student", "message"], "")}</FormFeedback>
        </div>
        <div className="mt-2">
          <Controller
            control={control}
            defaultValue={item.scholarShip}
            placeholder="ScholarShip"
            name={`details[${index}].scholarShip`}
            render={({ onChange, value, onBlur, ...props }) => (
              <InputPercent
                placeholder="Scholarship"
                {...props}
                invalid={!!get(errors, ["details", index, "scholarShip"], false)}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {scholarShipFee > 0 && (
            <p className="text-muted small mb-1">
              Học bổng ({scholarShip}%):&nbsp;
              <strong>
                <Price amount={scholarShipFee} />
              </strong>
            </p>
          )}
          <FormHookErrorMessage error={get(errors, ["details", index, "scholarShip"])} />
        </div>
      </td>
      <td>
        <div className="container">
          <FormRowOnly label="Bus" className="flex-nowrap">
            <Controller
              control={control}
              defaultValue={item.busFee}
              name={`details[${index}].busFee`}
              render={({ onChange, value, onBlur, ...props }) => (
                <InputNumber
                  {...props}
                  disabled={!student?.enableBus}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Bus Fee"
                />
              )}
            />
            <FormHookErrorMessage error={get(errors, ["details", index, "busFee"])} />
          </FormRowOnly>
          <FormRowOnly label="Meal" className="flex-nowrap">
            <Controller
              control={control}
              defaultValue={item.mealFee}
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
        </div>
      </td>
      <td>
        <InputGroup className="mb-2" size="sm">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="pl-1 pr-1">
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
                placeholder="Chi phí khác"
              />
            )}
          />
        </InputGroup>
        <FormGroupInput
          type="textarea"
          defaultValue={item.extraData?.otherFeeDesc}
          name={`details[${index}].extraData.otherFeeDesc`}
          label=""
          rows={5}
          placeholder="Mô tả chi phí khác"
          register={register}
        />
      </td>
      <td>
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
          <p className="text-muted small mb-0">
            Học phí:&nbsp;
            <strong>
              <Price amount={absentDayFee} />
            </strong>
          </p>
        )}
        <div className="mt-2">
          <Controller
            control={control}
            defaultValue={item.studentAbsentDay || ""}
            invalid={!!get(errors, ["details", index, "absentDay"], false)}
            name={`details[${index}].studentAbsentDay`}
            render={({ onChange, value, onBlur, ...props }) => (
              <InputNumber
                max={studentClass?.numberDayOfMonth || 22}
                {...props}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Số ngày nghỉ ăn"
              />
            )}
          />
          {studentAbsentDayDeductMealFee > 0 && (
            <p className="mb-0 text-muted small">
              Tiền ăn:&nbsp;
              <strong>
                <Price amount={studentAbsentDayDeductMealFee} />
              </strong>
            </p>
          )}
        </div>
      </td>
      <td>
        <InputGroup className="mb-2" size="sm">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="pl-1 pr-1">
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
                placeholder="Tiền trả lại khác"
              />
            )}
          />
        </InputGroup>
        <FormGroupInput
          defaultValue={item.extraData?.otherDeduceFeeDesc}
          type="textarea"
          name={`details[${index}].extraData.otherDeduceFeeDesc`}
          label=""
          rows={5}
          placeholder="Mô tả tiền trả lại khác"
          register={register}
        />
      </td>
      <td>
        <Input
          type="textarea"
          invalid={!!get(errors, ["details", index, "remark"], false)}
          name={`details[${index}].remark`}
          innerRef={register()}
          rows={5}
          placeholder="Remark"
          defaultValue={item.remark}
        />
      </td>
      <td className="text-nowrap min">
        <Price amount={totalFee} />
      </td>
      {isUpdated ? null : (
        <td className="action">
          <Button type="button" color="danger" size="sm" onClick={() => remove(index)}>
            <i className="fi flaticon-trash" />
          </Button>
        </td>
      )}
    </tr>
  )
}

FormDetail.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  item: PropTypes.any,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  studentConfig: PropTypes.object,
  trigger: PropTypes.func,
  isUpdated: PropTypes.bool,
  formState: PropTypes.object,
}
export default FormDetail
