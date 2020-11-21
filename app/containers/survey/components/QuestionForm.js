import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import SubmitButton from '../../../components/button/SubmitButton';
import AnswerForm from './AnswerForm';
import { SURVEY_QUESTION_TYPE } from '../constants';

const QuestionForm = ({ question, result, index, total }) => {
  const [selectedList, setSelectedList] = React.useState({});
  const [items, setItems] = React.useState([]);
  const [isDisable, disable] = React.useState(true);

  const onNext = val => {
    console.log('netxxxxxxxx');
    console.log(selectedList);
    console.log(items);
    disable(true);
    result(val);
  };

  const onBack = val => {
    disable(false);
    result(val);
  };

  const onItemSelect = React.useCallback(
    row => {
      disable(false);
      setItems(prevState => [
        ...prevState,
        { questionId: row.questionId, answerId: row.id },
      ]);
      console.log(row);
      setSelectedList(prevState => {
        if (
          prevState[`question${String(row.questionId)}-item${String(row.id)}`]
        ) {
          // eslint-disable-next-line no-param-reassign
          delete prevState[
            `question${String(row.questionId)}-item${String(row.id)}`
          ];
          return {
            ...prevState,
          };
        }
        return {
          ...prevState,
          [`question${String(row.questionId)}-item${String(row.id)}`]: row.id,
        };
      });
    },
    [setSelectedList],
  );

  const questionForm = React.useMemo(
    () => (
      <>
        <div className="question-form">
          <p>{question?.introduction}</p>
          <p>{question?.content}</p>
          {question.type === SURVEY_QUESTION_TYPE.CHECKBOX ? (
            <>
              <AnswerForm
                type="checkbox"
                rows={question?.questionAnswers}
                onItemSelect={onItemSelect}
                selectedList={selectedList}
              />
            </>
          ) : (
            <>
              <AnswerForm
                type="radio"
                rows={question?.questionAnswers}
                onItemSelect={onItemSelect}
                selectedList={selectedList}
              />
            </>
          )}

          <div className="question-button">
            {index > 0 ? (
              <Button
                type="button"
                outline
                color="primary"
                onClick={() => onBack(index - 1)}
              >
                Back
              </Button>
            ) : (
              <></>
            )}
            {index !== total ? (
              <Button
                type="button"
                disabled={isDisable}
                outline
                color="secondary"
                onClick={() => onNext(index + 1)}
              >
                Next
              </Button>
            ) : (
              <>
                <SubmitButton color="primary" />
              </>
            )}
          </div>
        </div>
      </>
    ),
    [index, selectedList],
  );

  return (
    <div className="text-center">
      <div>{questionForm}</div>
    </div>
  );
};

QuestionForm.propTypes = {
  question: PropTypes.object,
  result: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number,
};

export default QuestionForm;
