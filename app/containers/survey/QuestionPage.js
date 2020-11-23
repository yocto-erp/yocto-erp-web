import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useAsync } from '../../libs/hooks/useAsync';
import surveyApi from '../../libs/apis/survey.api';
import Question from './components/Question';
import SubmitButton from '../../components/button/SubmitButton';
import { useApi } from '../../libs/hooks/useApi';

const QuestionPage = () => {
  const [answers, setAnswers] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [person, setPerson] = React.useState({});

  const { code } = useParams();

  const {
    state: { isLoading, errors, resp },
    exec,
  } = useApi(() => surveyApi.verify(code));

  const [isLoading2, exec2] = useAsync({
    asyncApi: surveyApi.answerQuestion,
  });

  const onSubmitForm = () => {
    const form = [];
    console.log(answers);
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const property in answers) {
      const split = property.split('question');
      form.push({
        questionId: +split[1] + 1,
        answer: answers[property],
      });
    }
    if (form.length) {
      exec2(form).then(result => {
        toast.success(`Answer success!`);
        console.log(result);
      });
    } else {
      toast.error(`Please choose a answer !`);
    }
  };

  const onNext = React.useCallback(
    answer => {
      setAnswers(prevState => ({
        ...prevState,
        [`question${index}`]: answer.answer,
      }));
      setIndex(index + 1);
    },
    [answers, index, resp],
  );

  const onBack = React.useCallback(
    answer => {
      console.log(answer);
      setIndex(index - 1);
    },
    [index],
  );

  useEffect(() => {
    console.log(code);
    exec();
  }, []);
  const formReview = React.useMemo(
    () => (
      <div className="row align-items-center">
        <div className="col text-center">
          <div className="question-form card">
            <h5 className="card-header">Review Answer</h5>
            {resp?.questions.map((t, indexQ) => (
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
                  isLoading={isLoading2}
                  outline
                  color="secondary"
                  onClick={onSubmitForm}
                >
                  Submit Form
                </SubmitButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [index],
  );

  if (resp) {
    if (index === resp.questions.length) {
      return (
        <div className="h-50 row align-items-center">
          <div className="col-md-12 text-center">
            <h1>{resp?.name}</h1>
            <Question
              key={index}
              question={resp.questions[index] || {}}
              onNext={onNext}
              onBack={onBack}
              index={index}
              total={resp.questions.length - 1}
              answers={answers[`question${index}`] || {}}
            />
          </div>
        </div>
      );
    }
    return <div className="container mb-4 mt-4">{formReview}</div>;
  }
  return (
    <div className="d-flex align-items-center h-100 justify-content-center">
      <h1>Invalid Survey</h1>
    </div>
  );
};

QuestionPage.propTypes = {};

export default QuestionPage;
