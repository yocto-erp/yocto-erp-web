import React from 'react';
import { Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import '../survey.scss';
import { isFunc } from '../../../utils/util';

const AnswerForm = ({
  placeholder,
  children,
  rows,
  selectedList = {},
  onItemSelect,
  type,
  ...props
}) => {
  console.log('anwser form', type);
  return (
    <>
      {rows.map(row => (
        <div className="answer-question" key={row.id}>
          <div className="option-item">
            <Label>{row?.content}</Label>
            <Input
              type={type}
              id={row.id}
              value="1"
              placeholder={placeholder}
              defaultChecked={
                selectedList[
                  `question${String(row.questionId)}-item${String(row.id)}`
                ]
              }
              checked={
                !!selectedList[
                  `question${String(row.questionId)}-item${String(row.id)}`
                ]
              }
              onChange={() =>
                isFunc(onItemSelect) && onItemSelect({ ...row, type })
              }
              {...props}
            >
              {children}
            </Input>
          </div>
        </div>
      ))}
    </>
  );
};

AnswerForm.propTypes = {
  type: PropTypes.oneOf(['radio', 'checkbox']),
  placeholder: PropTypes.string,
  children: PropTypes.any,
  selectedList: PropTypes.object,
  onItemSelect: PropTypes.func,
  rows: PropTypes.array,
};

export default AnswerForm;
