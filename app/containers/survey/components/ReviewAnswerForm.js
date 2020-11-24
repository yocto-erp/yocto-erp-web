import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import PropTypes from 'prop-types';
import SubmitButton from '../../../components/button/SubmitButton';

const ReviewAnswerForm = ({
  onSubmitFormAnswer,
  questions,
  onBack,
  answers,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="container mt-1">
      <div className="row align-items-center justify-content-center mh-100">
        <div className="col-12 col-sm-10 col-md-6 col-lg-6 text-center">
          <h1>Review Answer</h1>
          {questions.map((t, indexQ) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="mt-2" key={indexQ}>
              <Button
                color="secondary"
                onClick={toggle}
                className="result-button-question text-left"
              >
                {indexQ + 1}. {t.content}
              </Button>
              <Collapse isOpen={isOpen}>
                <Card className="text-left">
                  {typeof answers[`question${indexQ}`] === 'object' ? (
                    <>
                      {answers[`question${indexQ}`].map((answer, indexA) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <CardBody key={indexA}>
                          {indexA + 1}. {answer}
                        </CardBody>
                      ))}
                    </>
                  ) : (
                    <CardBody>1. {answers[`question${indexQ}`]}</CardBody>
                  )}
                </Card>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
      <div className="row align-items-center justify-content-center mh-100 mt-3">
        <div className="col-12 col-sm-10 col-md-6 col-lg-6 text-center">
          <Button type="button" outline color="primary" onClick={onBack}>
            Back
          </Button>
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
