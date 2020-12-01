import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  Button,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { Controller, useWatch } from 'react-hook-form';
import FormErrorMessage from '../../../../components/Form/FormHookErrorMessage';
import MonthSelect from '../../../../components/date/MonthSelect';
import StudentSelect from '../../components/StudentSelect';
import InputNumber from '../../../../components/Form/InputNumber';
import InputPercent from '../../../../components/Form/InputPercent';
import Price from '../../../../components/common/Price';

const FormDetail = ({
  control,
  errors,
  register,
  setValue,
  getValues,
  trigger,
  item,
  index,
  remove,
  studentConfig,
  isUpdated = false,
}) => {
  const {
    absentDay,
    student,
    scholarShip,
    trialDate,
    otherFee,
    otherDeduceFee,
    busFee,
    mealFee,
  } = useWatch({
    control,
    name: `details[${index}]`,
    defaultValue: item,
  });

  useEffect(() => {
    let totalBusFee = 0;
    let totalMealFee = 0;
    if (studentConfig && student) {
      totalBusFee = student.enableBus ? studentConfig.busFee : 0;

      if (student.enableMeal && studentConfig.mealFeePerDay) {
        totalMealFee =
          (studentConfig.numberDayOfMonth - absentDay) *
          studentConfig.mealFeePerDay;
      }
    }
    setValue(`details[${index}].busFee`, totalBusFee);
    setValue(`details[${index}].mealFee`, totalMealFee);
    trigger([`details[${index}].mealFee`, `details[${index}].busFee`]);
  }, [student, absentDay, studentConfig, index]);

  const scholarShipFee = useMemo(() => {
    let rs = 0;
    if (studentConfig) {
      rs = (studentConfig.monthlyTuitionFee * scholarShip) / 100;
    }
    return rs;
  }, [studentConfig, scholarShip]);

  const absentDayFee = useMemo(() => {
    let rs = 0;
    if (studentConfig && absentDay) {
      rs = absentDay * studentConfig.feePerDay * (1 - scholarShip / 100);
    }
    return rs;
  }, [scholarShipFee, absentDay]);

  const trialDateFee = useMemo(() => {
    let rs = 0;
    if (studentConfig) {
      rs = trialDate * studentConfig.feePerTrialDay;
    }
    return rs;
  }, [studentConfig, trialDate]);

  const totalFee = useMemo(() => {
    let rsFee = 0;
    if (studentConfig && student) {
      rsFee =
        studentConfig.monthlyTuitionFee -
        scholarShipFee -
        absentDayFee +
        trialDateFee +
        busFee +
        mealFee +
        otherFee -
        otherDeduceFee;
    }
    return rsFee;
  }, [
    absentDayFee,
    trialDateFee,
    busFee,
    mealFee,
    otherFee,
    otherDeduceFee,
    scholarShipFee,
  ]);

  const columns = React.useMemo(
    () => (
      <tr key={item.id}>
        <td>
          <Input
            type="hidden"
            name={`details[${index}].id`}
            innerRef={register()}
            defaultValue={item.id}
          />
          <div className="w-100 mb-2">
            <Controller
              defaultValue={new Date(item.monthYear)}
              control={control}
              name={`details[${index}].monthYear`}
              render={({ onChange, value, onBlur }) => (
                <MonthSelect
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  invalid={
                    !!get(errors, ['details', index, 'monthYear'], false)
                  }
                />
              )}
            />
            <FormFeedback>
              {get(errors, ['details', index, 'monthYear', 'message'], '')}
            </FormFeedback>
          </div>
          <div>
            <Controller
              name={`details[${index}].student`}
              defaultValue={item.student}
              control={control}
              as={StudentSelect}
              id="studentId"
              placeholder="Select Student"
              invalid={!!get(errors, ['details', index, 'student'], false)}
            />
            <FormFeedback>
              {get(errors, ['details', index, 'student', 'message'], '')}
            </FormFeedback>
          </div>
        </td>
        <td>
          <Controller
            invalid={!!get(errors, ['details', index, 'scholarShip'], false)}
            name={`details[${index}].scholarShip`}
            control={control}
            as={InputPercent}
            defaultValue={item.scholarShip}
            placeholder="ScholarShip"
          />
          <Price className="text-muted" amount={scholarShipFee} />
          <FormErrorMessage
            error={get(errors, ['details', index, 'scholarShip'])}
          />
        </td>
        <td>
          <Controller
            invalid={!!get(errors, ['details', index, 'absentDay'], false)}
            name={`details[${index}].absentDay`}
            control={control}
            max={studentConfig ? studentConfig.numberDayOfMonth : 30}
            as={InputNumber}
            defaultValue={item.absentDay}
            placeholder="Absent Date"
          />
          <Price className="text-muted" amount={absentDayFee} />
        </td>
        <td>
          <Controller
            invalid={!!get(errors, ['details', index, 'trialDate'], false)}
            name={`details[${index}].trialDate`}
            control={control}
            max={studentConfig ? studentConfig.numberDayOfMonth : 30}
            as={InputNumber}
            defaultValue={item.trialDate}
            placeholder="Trial Date"
          />
          <Price className="text-muted" amount={trialDateFee} />
        </td>
        <td>
          <Controller
            invalid={!!get(errors, ['details', index, 'busFee'], false)}
            name={`details[${index}].busFee`}
            control={control}
            as={InputNumber}
            disabled
            defaultValue={item.busFee}
            placeholder="Bus Fee"
          />
          <FormErrorMessage error={get(errors, ['details', index, 'busFee'])} />
        </td>
        <td>
          <Controller
            invalid={!!get(errors, ['details', index, 'mealFee'], false)}
            name={`details[${index}].mealFee`}
            control={control}
            as={InputNumber}
            disabled
            defaultValue={item.mealFee}
            placeholder="Meal Fee"
          />
          <FormErrorMessage
            error={get(errors, ['details', index, 'mealFee'])}
          />
        </td>
        <td>
          <InputGroup className="mb-2">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-plus" />
              </InputGroupText>
            </InputGroupAddon>
            <Controller
              invalid={!!get(errors, ['details', index, 'otherFee'], false)}
              name={`details[${index}].otherFee`}
              control={control}
              as={InputNumber}
              defaultValue={item.otherFee}
              placeholder="Other Fee"
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-minus" />
              </InputGroupText>
            </InputGroupAddon>
            <Controller
              invalid={
                !!get(errors, ['details', index, 'otherDeduceFee'], false)
              }
              name={`details[${index}].otherDeduceFee`}
              control={control}
              as={InputNumber}
              defaultValue={item.otherDeduceFee}
              placeholder="Other Deduce Fee"
            />
          </InputGroup>
        </td>
        <td>
          <Input
            type="textarea"
            invalid={!!get(errors, ['details', index, 'remark'], false)}
            name={`details[${index}].remark`}
            innerRef={register()}
            style={{ height: '75px' }}
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
              <i className="fi flaticon-trash" />{' '}
            </Button>
          </td>
        )}
      </tr>
    ),
    [
      errors.details,
      index,
      register,
      control,
      scholarShipFee,
      trialDateFee,
      absentDayFee,
      totalFee,
    ],
  );

  return <>{columns}</>;
};

FormDetail.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  item: PropTypes.any,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  studentConfig: PropTypes.object,
  trigger: PropTypes.func,
  isUpdated: PropTypes.bool,
};
export default FormDetail;
