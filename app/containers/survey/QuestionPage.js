import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useAsync } from '../../libs/hooks/useAsync';
import surveyApi from '../../libs/apis/survey.api';
import Question from './components/Question';

const QuestionPage = () => {
  const [answers, setAnswers] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const { id } = useParams();
  const [isLoading, exec, resp] = useAsync({
    asyncApi: () => surveyApi.readSurveyQuestion(id),
  });

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
      // if (typeof answers[property] === 'object') {
      //   for (let i = 0; i < answers[property].length; i += 1) {
      //     form.push({
      //       questionId: +split[1] + 1,
      //       answer: answers[property][i],
      //     });
      //   }
      // } else {
      //   form.push({
      //     questionId: +split[1] + 1,
      //     answer: answers[property],
      //   });
      // }
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
    exec();
  }, [id]);

  const formReview = React.useMemo(
    () => (
      <div className="row align-items-center">
        <div className="col text-center">
          <div className="question-form card">
            <h5 className="card-header">Review Answer</h5>
            {resp?.questions.map((t, indexQ) => (
              <div className="card-body" key={indexQ}>
                <h5 className="card-title">{t.content}</h5>
                <div className="card-text">
                  {typeof answers[`question${indexQ}`] === 'object' ? (
                    <>
                      {answers[`question${indexQ}`].map((answer, indexA) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={indexA}>
                          {indexA + 1} - {answer}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div>{answers[`question${indexQ}`]}</div>
                  )}
                </div>
              </div>
            ))}
            <div className="row mt-3">
              <div className="col">
                <Button type="button" outline color="primary" onClick={onBack}>
                  Back
                </Button>
                <Button
                  type="button"
                  outline
                  color="secondary"
                  onClick={onSubmitForm}
                >
                  Submit Form
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [index],
  );

  const form = React.useMemo(
    () => (
      <div className="h-50 row align-items-center">
        <div className="col text-center">
          <h1>{resp?.name}</h1>
          <Question
            key={index}
            question={resp?.questions[index] || {}}
            onNext={onNext}
            onBack={onBack}
            index={index}
            total={resp?.questions.length - 1}
            answers={answers[`question${index}`] || {}}
          />
        </div>
      </div>
    ),
    [resp, index],
  );

  if (index > resp?.questions.length - 1) {
    return formReview;
  }

  return resp ? form : null;
};

QuestionPage.propTypes = {};

export default QuestionPage;
