import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, FormFeedback, Input } from 'reactstrap';
import { Controller } from 'react-hook-form';
import InputAmount from '../../../../components/Form/InputAmount';

const ClassForm = ({ errors, register, item, index, remove, control }) => (
  <tr key={item.key}>
    <td>
      <Input
        type="text"
        invalid={!!get(errors, ['classes', index, 'id'], false)}
        name={`classes[${index}].id`}
        innerRef={register()}
        defaultValue={item.id} // make sure to set up defaultValue
      />
      <FormFeedback>
        {get(errors, ['classes', index, 'id', 'message'], '')}
      </FormFeedback>
    </td>
    <td>
      <Input
        type="text"
        invalid={!!get(errors, ['classes', index, 'name'], false)}
        name={`classes[${index}].name`}
        innerRef={register()}
        defaultValue={item.name} // make sure to set up defaultValue
      />
      <FormFeedback>
        {get(errors, ['classes', index, 'name', 'message'], '')}
      </FormFeedback>
    </td>
    <td>
      <Controller
        name={`classes[${index}].tuitionFee`}
        invalid={!!get(errors, ['classes', index, 'tuitionFee'], false)}
        control={control}
        as={InputAmount}
        defaultValue={item.tuitionFee}
        placeholder="Tuition Fee"
      />
      <FormFeedback>
        {get(errors, ['classes', index, 'tuitionFee', 'message'], '')}
      </FormFeedback>
    </td>
    <td>
      <Controller
        name={`classes[${index}].feePerDay`}
        invalid={!!get(errors, ['classes', index, 'feePerDay'], false)}
        control={control}
        as={InputAmount}
        defaultValue={item.feePerDay || ''}
        placeholder="Fee Per Day"
      />
      <FormFeedback>
        {get(errors, ['classes', index, 'feePerDay', 'message'], '')}
      </FormFeedback>
    </td>
    <td>
      <Controller
        name={`classes[${index}].feePerTrialDay`}
        invalid={!!get(errors, ['classes', index, 'feePerTrialDay'], false)}
        control={control}
        as={InputAmount}
        defaultValue={item.feePerTrialDay || ''}
        placeholder="Fee Per Trial Day"
      />
      <FormFeedback>
        {get(errors, ['classes', index, 'feePerTrialDay', 'message'], '')}
      </FormFeedback>
    </td>
    <td>
      <Controller
        name={`classes[${index}].mealFeePerMonth`}
        invalid={!!get(errors, ['classes', index, 'mealFeePerMonth'], false)}
        control={control}
        as={InputAmount}
        defaultValue={item.mealFeePerMonth || ''}
        placeholder="Meal Fee Per Month"
      />
      <FormFeedback>
        {get(errors, ['classes', index, 'mealFeePerMonth', 'message'], '')}
      </FormFeedback>
    </td>
    <td>
      <Controller
        name={`classes[${index}].mealFeePerDay`}
        invalid={!!get(errors, ['classes', index, 'mealFeePerDay'], false)}
        control={control}
        as={InputAmount}
        defaultValue={item.mealFeePerDay || ''}
        placeholder="Meal Fee Per Day"
      />
      <FormFeedback>
        {get(errors, ['classes', index, 'mealFeePerDay', 'message'], '')}
      </FormFeedback>
    </td>
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

ClassForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  item: PropTypes.any,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  control: PropTypes.any,
};
export default ClassForm;
