import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import SubmitButton from '../../../components/button/SubmitButton';

const ReviewAnswerForm = ({
  onSubmitFormAnswer,
  questions,
  onBack,
  answers,
}) => {
  console.log('form review');
  return (
    <div className="question-form card">
      <h5 className="card-header">Review Answer</h5>
      {questions.map((t, indexQ) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="card-body text-left" key={indexQ}>
          <h5 className="card-title">
            {indexQ + 1}. {t.content}
          </h5>
          <div className="card-text ml-3">
            {typeof answers[`question${indexQ}`] === 'object' ? (
              <>
                {answers[`question${indexQ}`].map((answer, indexA) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={indexA}>
                    {indexA + 1}. {answer}
                  </div>
                ))}
              </>
            ) : (
              <div>1. {answers[`question${indexQ}`]}</div>
            )}
          </div>
        </div>
      ))}
      <div className="row mt-3 mb-3">
        <div className="col">
          <Button type="button" outline color="primary" onClick={onBack}>
            Back
          </Button>
        </div>
        <div className="col">
          <SubmitButton
            type="button"
            outline
            color="secondary"
            onClick={onSubmitFormAnswer}
          >
            Submit Form
          </SubmitButton>
        </div>
      </div>
    </div>
  );
};

ReviewAnswerForm.propTypes = {
  onSubmitFormAnswer: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  onBack: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
};

export default ReviewAnswerForm;
