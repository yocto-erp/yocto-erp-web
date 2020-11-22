import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';
import { SURVEY_QUESTION_TYPE } from '../constants';
import FormErrorMessage from '../../../components/Form/FormHookErrorMessage';

const AnswerItem = ({ item, register, value, type, ...props }) => {
  const inputType = useMemo(() => {
    let rs = 'text';
    switch (type) {
      case SURVEY_QUESTION_TYPE.RADIO:
        rs = 'radio';
        break;
      case SURVEY_QUESTION_TYPE.CHECKBOX:
        rs = 'checkbox';
        break;
      default:
        rs = 'text';
    }
    return rs;
  }, [type]);

  return (
    <div className="answer-question" key={item.id}>
      <div className="option-item">
        <Label>{item.content}</Label>
        <Input
          type={inputType}
          value={item.key}
          innerRef={register}
          {...props}
        />
      </div>
    </div>
  );
};

AnswerItem.propTypes = {
  item: PropTypes.object.isRequired,
  register: PropTypes.any,
  value: PropTypes.any,
  type: PropTypes.number.isRequired,
};

export default AnswerItem;
