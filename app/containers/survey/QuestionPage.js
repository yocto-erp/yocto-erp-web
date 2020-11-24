import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { useAsync } from '../../libs/hooks/useAsync';
import surveyApi from '../../libs/apis/survey.api';
import Question from './components/Question';
import { useApi } from '../../libs/hooks/useApi';
import PersonForm from './components/PersonForm';
import ReviewAnswerForm from './components/ReviewAnswerForm';
import { SURVEY_ROOT_PATH } from './constants';

const QuestionPage = () => {
  const history = useHistory();
  const [answers, setAnswers] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [person, setPerson] = React.useState({});
  const [completed, isCompleted] = React.useState(false);

  const { code } = useParams();

  const {
    state: { isLoading, errors, resp },
    exec,
  } = useApi(() => surveyApi.verify(code));

  const [isLoadingAnswer, execAnswer] = useAsync({
    asyncApi: surveyApi.answerQuestion,
  });

  const onSubmitFormAnswer = () => {
    const formAnswer = [];
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const property in answers) {
      const split = property.split('question');
      formAnswer.push({
        questionId: +split[1] + 1,
        answer: answers[property],
      });
    }
    if (formAnswer.length && !_.isEmpty(person)) {
      execAnswer(code, { formAnswer, formPerson: person }).then(t => {
        isCompleted(true);
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

  const formThankYou = React.useMemo(
    () => (
      <div className="form-person p-4">
        <div className="container">
          <div className="row align-items-center justify-content-center mh-100">
            <div className="col-12 col-sm-10 col-md-6 col-lg-4 text-center">
              <div className="question-form">
                <h5 className="mb-3">Thank you!</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [completed],
  );

  if (completed) {
    return formThankYou;
  }

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
    if (index < resp.questions.length && !_.isEmpty(person)) {
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
              total={resp.questions.length}
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

  if (errors && errors.length) {
    const decodeCode = atob(code);
    const [surveyId, clientId, target] = decodeCode.split('|');
    if (errors[0].code === 'EXISTED') {
      history.push(`${SURVEY_ROOT_PATH}/result/${target}/${surveyId}`);
    }
  }
  return (
    <div className="d-flex align-items-center h-100 justify-content-center">
      <h1>Invalid Survey</h1>
    </div>
  );
};

QuestionPage.propTypes = {};

export default QuestionPage;
