import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import {
  Button,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { Controller, useWatch } from "react-hook-form";
import classNames from "classnames";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import MonthSelect from "../../../../components/date/MonthSelect";
import StudentSelect from "../../components/StudentSelect";
import InputNumber from "../../../../components/Form/InputNumber";
import InputPercent from "../../../../components/Form/InputPercent";
import Price from "../../../../components/common/Price";
import { toMonthObj } from "../../../../libs/utils/date.util";

const FormDetail = ({
  control,
  register,
  setValue,
  trigger,
  item,
  index,
  remove,
  studentConfig,
  formState,
  isUpdated = false,
}) => {
  const {
    absentDay,
    studentAbsentDay,
    student,
    scholarShip,
    trialDate,
    otherFee,
    otherDeduceFee,
    busFee,
    mealFee,
    debt,
  } = useWatch({
    control,
    name: `details[${index}]`,
    defaultValue: item,
  });

  useEffect(() => {
    let totalBusFee = 0;

    if (student) {
      totalBusFee = student.enableBus ? item.busFee || studentConfig.busFee : 0;
    }
    setValue(`details[${index}].busFee`, totalBusFee);
    trigger([`details[${index}].busFee`]);
  }, [student, index, item]);

  useEffect(() => {
    let totalMealFee = 0;
    if (student && student.enableMeal) {
      totalMealFee = item.mealFee || student.class.mealFeePerMonth;
    }
    setValue(`details[${index}].mealFee`, totalMealFee);
    trigger([`details[${index}].mealFee`]);
  }, [student, item, index]);

  const absentDayFee = useMemo(() => {
    let rs = 0;
    if (student && absentDay) {
      rs = absentDay * student.class.absentFeeReturnPerDay;
    }
    return rs;
  }, [student, absentDay]);

  const studentAbsentDayDeductMealFee = useMemo(() => {
    console.log(studentAbsentDay);
    let rs = 0;
    if (student && student.enableMeal && studentAbsentDay) {
      rs = studentAbsentDay * student.class.mealFeeReturnPerDay;
    }
    return rs;
  }, [student, studentAbsentDay]);

  const trialDateFee = useMemo(() => {
    let rs = 0;
    if (student) {
      rs = trialDate * student.class.feePerTrialDay;
    }
    return rs;
  }, [student, trialDate]);

  const totalFeeWithoutScholarShip = useMemo(() => {
    let rsFee = 0;
    if (student) {
      rsFee =
        student.class.tuitionFeePerMonth -
        absentDayFee -
        studentAbsentDayDeductMealFee +
        trialDateFee +
        busFee +
        mealFee +
        (otherFee || 0) -
        (otherDeduceFee || 0) +
        (debt || 0);
    }
    return rsFee;
  }, [
    student,
    absentDayFee,
    trialDateFee,
    debt,
    busFee,
    mealFee,
    otherFee,
    otherDeduceFee,
    studentAbsentDayDeductMealFee,
  ]);

  const scholarShipFee = useMemo(() => {
    let rs = 0;
    if (student) {
      rs =
        ((student.class.tuitionFeePerMonth - absentDayFee) * scholarShip) / 100;
    }
    return rs;
  }, [student, absentDayFee, scholarShip]);

  const totalFee = useMemo(() => totalFeeWithoutScholarShip - scholarShipFee, [
    totalFeeWithoutScholarShip,
    scholarShipFee,
  ]);

  return React.useMemo(() => {
    const { errors } = formState;
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
              "is-invalid": !!get(
                errors,
                ["details", index, "monthYear"],
                false,
              ),
            })}
          >
            <Controller
              defaultValue={
                item.monthYear || toMonthObj(new Date(item.monthYear))
              }
              control={control}
              name={`details[${index}].monthYear`}
              invalid={!!get(errors, ["details", index, "monthYear"], false)}
              render={({ onChange, value, onBlur }, { invalid }) => (
                <MonthSelect
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
          <FormFeedback>
            {get(errors, ["details", index, "monthYear", "message"], "")}
          </FormFeedback>
          <div className="mt-2">
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
                />
              )}
            />
            <FormFeedback>
              {get(errors, ["details", index, "student", "message"], "")}
            </FormFeedback>
          </div>
        </td>
        <td>
          <Controller
            control={control}
            defaultValue={item.scholarShip}
            placeholder="ScholarShip"
            name={`details[${index}].scholarShip`}
            render={({ onChange, value, onBlur, ...props }) => (
              <InputPercent
                {...props}
                invalid={
                  !!get(errors, ["details", index, "scholarShip"], false)
                }
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Price className="text-muted small" amount={scholarShipFee} />
          <FormHookErrorMessage
            error={get(errors, ["details", index, "scholarShip"])}
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
                max={studentConfig ? studentConfig.numberDayOfMonth : 30}
                {...props}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Return Fee"
              />
            )}
          />
          <Price className="text-muted small" amount={absentDayFee} />
          <Controller
            control={control}
            defaultValue={item.studentAbsentDay || ""}
            invalid={!!get(errors, ["details", index, "absentDay"], false)}
            name={`details[${index}].studentAbsentDay`}
            render={({ onChange, value, onBlur, ...props }) => (
              <InputNumber
                max={studentConfig ? studentConfig.numberDayOfMonth : 30}
                {...props}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Return Meal Fee"
              />
            )}
          />
          <p className="mb-0">
            Deduce Meal Fee:{" "}
            <Price
              className="text-muted small"
              amount={studentAbsentDayDeductMealFee}
            />
          </p>
        </td>
        <td>
          <Controller
            control={control}
            defaultValue={item.trialDate}
            invalid={!!get(errors, ["details", index, "trialDate"], false)}
            name={`details[${index}].trialDate`}
            render={({ onChange, value, onBlur, ...props }) => (
              <InputNumber
                max={studentConfig ? studentConfig.numberDayOfMonth : 30}
                {...props}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Trial Date"
              />
            )}
          />
          <Price className="text-muted small" amount={trialDateFee} />
        </td>
        <td>
          <Controller
            control={control}
            defaultValue={item.busFee}
            invalid={!!get(errors, ["details", index, "busFee"], false)}
            name={`details[${index}].busFee`}
            disabled={!student || !student.enableBus}
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
          <FormHookErrorMessage
            error={get(errors, ["details", index, "busFee"])}
          />
        </td>
        <td>
          <Controller
            control={control}
            defaultValue={item.mealFee}
            invalid={!!get(errors, ["details", index, "mealFee"], false)}
            name={`details[${index}].mealFee`}
            render={({ onChange, value, onBlur, ...props }, { invalid }) => (
              <InputNumber
                {...props}
                invalid={invalid}
                readOnly
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Meal Fee"
              />
            )}
          />
          <FormHookErrorMessage
            error={get(errors, ["details", index, "mealFee"])}
          />
        </td>
        <td>
          <InputGroup className="mb-2">
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
          <InputGroup className="mb-2">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-minus fa-fw" />
              </InputGroupText>
            </InputGroupAddon>
            <Controller
              control={control}
              defaultValue={item.otherDeduceFee}
              invalid={
                !!get(errors, ["details", index, "otherDeduceFee"], false)
              }
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
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-money fa-fw" />
              </InputGroupText>
            </InputGroupAddon>
            <Controller
              control={control}
              defaultValue={item.debt}
              invalid={!!get(errors, ["details", index, "debt"], false)}
              name={`details[${index}].debt`}
              render={({ onChange, value, onBlur, ...props }) => (
                <InputNumber
                  {...props}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Debt"
                />
              )}
            />
          </InputGroup>
        </td>
        <td>
          <Input
            type="textarea"
            invalid={!!get(errors, ["details", index, "remark"], false)}
            name={`details[${index}].remark`}
            innerRef={register()}
            style={{ height: "75px" }}
            placeholder="Remark"
            defaultValue={item.remark}
          />
        </td>
        <td className="text-nowrap min">
          <Price amount={totalFee} />
        </td>
        {isUpdated ? null : (
          <td className="action">
            <Button
              type="button"
              color="danger"
              size="sm"
              onClick={() => remove(index)}
            >
              <i className="fi flaticon-trash" /> {index}
            </Button>
          </td>
        )}
      </tr>
    );
  }, [
    formState,
    index,
    register,
    control,
    scholarShipFee,
    trialDateFee,
    absentDayFee,
    totalFee,
    studentAbsentDayDeductMealFee,
  ]);
};

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
};
export default FormDetail;
