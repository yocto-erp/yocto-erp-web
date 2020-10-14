import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, FormFeedback, Input } from 'reactstrap';
import { Controller } from 'react-hook-form';
import FormErrorMessage from '../../../../components/Form/FormHookErrorMessage';
import MonthSelect from '../../../../components/date/MonthSelect';
import StudentSelect from '../../components/StudentSelect';
const FormDetail = ({
  control,
  errors,
  register,
  setValue,
  item,
  index,
  remove,
}) => {
  console.log('fsdfdsf');
  return (
    <tr key={item.id}>
      <td>
        <div style={{ maxWidth: '100%' }} className="">
          <Controller
            defaultValue={item.monthYear}
            name={`details[${index}].monthYear`}
            control={control}
            innerRef={register()}
            invalid={!!get(errors, ['details', index, 'monthYear'], false)}
            as={MonthSelect}
          />
          <FormErrorMessage
            error={get(errors, ['details', index, 'monthYear', 'message'], '')}
          />
          {/*<FormFeedback>*/}
          {/*  {get(errors, ['details', index, 'monthYear', 'message'], '')}*/}
          {/*</FormFeedback>*/}
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
        <Input
          type="number"
          invalid={!!get(errors, ['details', index, 'scholarShip'], false)}
          name={`details[${index}].scholarShip`}
          innerRef={register()}
          defaultValue={item.scholarShip} // make sure to set up defaultValue
        />
        <FormFeedback>
          {get(errors, ['details', index, 'scholarShip', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <Input
          type="number"
          invalid={!!get(errors, ['details', index, 'absentDay'], false)}
          name={`details[${index}].absentDay`}
          innerRef={register()}
          defaultValue={item.absentDay} // make sure to set up defaultValue
        />
        <FormFeedback>
          {get(errors, ['details', index, 'absentDay', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <Input
          type="number"
          invalid={!!get(errors, ['details', index, 'trialDate'], false)}
          name={`details[${index}].trialDate`}
          innerRef={register()}
          defaultValue={item.trialDate} // make sure to set up defaultValue
        />
        <FormFeedback>
          {get(errors, ['details', index, 'trialDate', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <Input
          type="number"
          invalid={!!get(errors, ['details', index, 'busFee'], false)}
          name={`details[${index}].busFee`}
          innerRef={register()}
          defaultValue={item.busFee} // make sure to set up defaultValue
        />
        <FormFeedback>
          {get(errors, ['details', index, 'busFee', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <Input
          type="number"
          invalid={!!get(errors, ['details', index, 'mealFee'], false)}
          name={`details[${index}].mealFee`}
          innerRef={register()}
          defaultValue={item.mealFee} // make sure to set up defaultValue
        />
        <FormFeedback>
          {get(errors, ['details', index, 'mealFee', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <Input
          type="number"
          invalid={!!get(errors, ['details', index, 'otherFee'], false)}
          name={`details[${index}].otherFee`}
          innerRef={register()}
          defaultValue={item.otherFee} // make sure to set up defaultValue
        />
        <FormFeedback>
          {get(errors, ['details', index, 'otherFee', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <Input
          type="number"
          invalid={!!get(errors, ['details', index, 'otherDeduceFee'], false)}
          name={`details[${index}].otherDeduceFee`}
          innerRef={register()}
          defaultValue={item.otherDeduceFee} // make sure to set up defaultValue
        />
        <FormFeedback>
          {get(errors, ['details', index, 'otherDeduceFee', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <Input
          type="text"
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
  );
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
