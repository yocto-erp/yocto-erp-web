import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, FormFeedback, Input } from 'reactstrap';

const ClassForm = ({ errors, register, item, index, remove }) => (
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
};
export default ClassForm;
