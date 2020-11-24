import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import SubmitButton from '../../../components/button/SubmitButton';
import PreviewQuestionAnswer from './PreviewQuestionAnswer';
import { SURVEY_QUESTION_TYPE } from '../constants';

const ReviewAnswerForm = ({
  onSubmitFormAnswer,
  questions,
  onBack,
  answers,
  isLoading = false,
}) => (
  <>
    <h1>Review Answer</h1>
    {questions.map((t, indexQ) => {
      let userAnswers = answers[`question${indexQ}`];
      if (t.type === SURVEY_QUESTION_TYPE.CHECKBOX) {
        userAnswers = userAnswers.map(item => item.key);
      } else {
        userAnswers = userAnswers.key;
      }
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div className="row" key={indexQ}>
          <div className="col">
            <PreviewQuestionAnswer question={t} answer={userAnswers} isOpen />
          </div>
        </div>
      );
    })}
    <div className="row mt-3 mb-3 align-items-center justify-content-center">
      <div className="col">
        <Button type="button" outline color="primary" onClick={onBack}>
          Back
        </Button>
      </div>
      <div className="col">
        <SubmitButton
          type="button"
          color="primary"
          onClick={onSubmitFormAnswer}
          isLoading={isLoading}
        >
          Submit Form
        </SubmitButton>
      </div>
    </div>
  </>
);

ReviewAnswerForm.propTypes = {
  onSubmitFormAnswer: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  onBack: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};

export default ReviewAnswerForm;
