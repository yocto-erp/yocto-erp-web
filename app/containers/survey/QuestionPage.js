import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../libs/hooks/useAsync';
import surveyApi from '../../libs/apis/survey.api';
import Question from './components/Question';
import { useApi } from '../../libs/hooks/useApi';
import PersonForm from './components/PersonForm';
import ReviewAnswerForm from './components/ReviewAnswerForm';

const QuestionPage = () => {
  const [answers, setAnswers] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [person, setPerson] = React.useState({});

  const { code } = useParams();

  const {
    state: { isLoading, errors, resp },
    exec,
  } = useApi(() => surveyApi.verify(code));

  const [isLoadingAnswer, execAnswer] = useAsync({
    asyncApi: surveyApi.answerQuestion,
  });

  const onSubmitFormAnswer = () => {
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
      execAnswer(code, form).then(result => {
        toast.success(`Answer success!`);
        console.log(result);
      });
    } else {
      toast.error(`Please choose a answer !`);
    }
  };

  const onSubmitFormPerson = React.useCallback(
    data => {
      setPerson(data);
    },
    [person, resp],
  );

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
  }, []);

  if (resp) {
    if (_.isEmpty(person)) {
      return (
        <div className="form-person p-4">
          <div className="container">
            <div className="row align-items-center justify-content-center mh-100">
              <div className="col-12 col-sm-10 col-md-6 col-lg-4 text-center">
                <div className="question-form">
                  <h5 className="mb-3">Please Input Information to Survey!</h5>
                  <PersonForm
                    form={person}
                    onSubmitFormPerson={onSubmitFormPerson}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (index < resp.questions.length - 18 && !_.isEmpty(person)) {
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
    return (
      <div className="container mb-4 mt-4">
        <div className="row align-items-center">
          <div className="col text-center">
            <ReviewAnswerForm
              onSubmitFormAnswer={onSubmitFormAnswer}
              answers={answers}
              questions={resp?.questions}
              onBack={onBack}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="d-flex align-items-center h-100 justify-content-center">
      <h1>Invalid Survey</h1>
    </div>
  );
};

QuestionPage.propTypes = {};

export default QuestionPage;