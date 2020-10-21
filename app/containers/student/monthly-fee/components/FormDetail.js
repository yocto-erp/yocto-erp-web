import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, FormFeedback, Input } from 'reactstrap';
import { Controller, useWatch } from 'react-hook-form';
import FormErrorMessage from '../../../../components/Form/FormHookErrorMessage';
import MonthSelect from '../../../../components/date/MonthSelect';
import StudentSelect from '../../components/StudentSelect';
import InputNumber from '../../../../components/Form/InputNumber';
import studentConfigurationApi from '../../../../libs/apis/student/student-config.api';
import InputPercent from '../../../../components/Form/InputPercent';

const FormDetail = ({
  control,
  errors,
  register,
  setValue,
  getValues,
  item,
  index,
  remove,
}) => {
  const [studentConfig, setStudentConfig] = React.useState(null);
  React.useEffect(() => {
    studentConfigurationApi.get().then(resp => {
      if (resp) {
        setStudentConfig(resp);
      }
    });
  }, []);
  console.log(studentConfig);
  const absentDay = useWatch({
    control,
    name: `details[${index}].absentDay`, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: item.absentDay, // default value before the render
  });

  const student = useWatch({
    control,
    name: `details[${index}].student`, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: item.student, // default value before the render
  });

  const columns = React.useMemo(
    () => (
      <tr key={item.id}>
        <td>
          <div style={{ maxWidth: '100%' }} className="">
            <Controller
              defaultValue={item.monthYear}
              name={`details[${index}].monthYear`}
              control={control}
              invalid={!!get(errors, ['details', index, 'monthYear'], false)}
              as={MonthSelect}
            />
            <FormFeedback>
              {get(errors, ['details', index, 'monthYear', 'message'], '')}
            </FormFeedback>
          </div>
        </td>
        <td>
          <Controller
            name={`details[${index}].student`}
            defaultValue={item.student}
            control={control}
            render={({ onChange, ...data }) => (
              <StudentSelect
                id="studentId"
                placeholder="Select Student"
                invalid={!!get(errors, ['details', index, 'student'], false)}
                onChange={val => {
                  if (studentConfig && val) {
                    if (val.enableBus && studentConfig.busFee) {
                      setValue(
                        `details[${index}].busFee`,
                        studentConfig.busFee,
                        {
                          shouldValidate: true,
                        },
                      );
                    } else {
                      setValue(`details[${index}].busFee`, 0, {
                        shouldValidate: true,
                      });
                    }
                    if (val.enableMeal && studentConfig.mealFeePerDay) {
                      console.log('absentDay', absentDay);
                      const totalFeeMeal =
                        studentConfig.numberDayOfMonth &&
                        studentConfig.mealFeePerDay
                          ? (studentConfig.numberDayOfMonth - absentDay) *
                            studentConfig.mealFeePerDay
                          : 0;
                      setValue(`details[${index}].mealFee`, totalFeeMeal, {
                        shouldValidate: true,
                      });
                    } else {
                      setValue(`details[${index}].mealFee`, 0, {
                        shouldValidate: true,
                      });
                    }
                  }

                  onChange(val);
                }}
                {...data}
              />
            )}
          />
          <FormFeedback>
            {get(errors, ['details', index, 'student', 'message'], '')}
          </FormFeedback>
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
          <FormErrorMessage
            error={get(errors, ['details', index, 'scholarShip'])}
          />
        </td>
        <td>
          <Controller
            name={`details[${index}].absentDay`}
            control={control}
            defaultValue={item.absentDay}
            render={({ onChange, ...data }) => (
              <InputNumber
                id="absentDay"
                placeholder="Absent Day"
                invalid={!!get(errors, ['details', index, 'absentDay'], false)}
                onChange={val => {
                  if (studentConfig && val && student && student.enableBus) {
                    if (val && studentConfig.mealFeePerDay) {
                      const totalFeeMeal =
                        studentConfig.numberDayOfMonth &&
                        studentConfig.mealFeePerDay
                          ? (studentConfig.numberDayOfMonth - val) *
                            studentConfig.mealFeePerDay
                          : 0;
                      setValue(`details[${index}].mealFee`, totalFeeMeal, {
                        shouldValidate: true,
                      });
                    } else {
                      setValue(`details[${index}].mealFee`, 0, {
                        shouldValidate: true,
                      });
                    }
                  }

                  onChange(val);
                }}
                {...data}
              />
            )}
          />
          <FormErrorMessage
            error={get(errors, ['details', index, 'absentDay'])}
          />
        </td>
        <td>
          <Controller
            invalid={!!get(errors, ['details', index, 'trialDate'], false)}
            name={`details[${index}].trialDate`}
            control={control}
            as={InputNumber}
            defaultValue={item.trialDate}
            placeholder="Trial Date"
          />
          <FormErrorMessage
            error={get(errors, ['details', index, 'trialDate'])}
          />
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
          <Controller
            invalid={!!get(errors, ['details', index, 'otherFee'], false)}
            name={`details[${index}].otherFee`}
            control={control}
            as={InputNumber}
            defaultValue={item.otherFee}
            placeholder="Other Fee"
          />
          <FormErrorMessage
            error={get(errors, ['details', index, 'otherFee'])}
          />
        </td>
        <td>
          <Controller
            invalid={!!get(errors, ['details', index, 'otherDeduceFee'], false)}
            name={`details[${index}].otherDeduceFee`}
            control={control}
            as={InputNumber}
            defaultValue={item.otherDeduceFee}
            placeholder="Other Deduce Fee"
          />
          <FormErrorMessage
            error={get(errors, ['details', index, 'otherDeduceFee'])}
          />
        </td>
        <td>
          <Input
            type="textarea"
            invalid={!!get(errors, ['details', index, 'remark'], false)}
            name={`details[${index}].remark`}
            innerRef={register()}
            defaultValue={item.remark} // make sure to set up defaultValue
          />
          <FormFeedback>
            {get(errors, ['details', index, 'remark', 'message'], '')}
          </FormFeedback>
        </td>
        <td>s</td>
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
      </tr>
    ),
    [studentConfig, errors, register, control],
  );

  const columnEmpty = (
    <tr>
      <td colSpan="10">please set student configuration</td>
    </tr>
  );
  return <>{studentConfig ? columns : columnEmpty}</>;
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
};
export default FormDetail;
