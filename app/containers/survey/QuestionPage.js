import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import surveyApi from '../../libs/apis/survey/survey.api';
import QuestionForm from './components/QuestionForm';
import { useApi } from '../../libs/hooks/useApi';
import PersonForm from './components/PersonForm';
import ReviewAnswerForm from './components/ReviewAnswerForm';
import { SURVEY_ROOT_PATH } from './constants';
import { isArrayHasItem } from '../../utils/util';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import messages, { personFormMessages } from './messages';

const QuestionPage = () => {
  const history = useHistory();
  const [answers, setAnswers] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [person, setPerson] = React.useState(null);
  const language = useSelector(makeSelectLocale());

  const { code } = useParams();
  const decodeCode = atob(code);
  const [surveyId, clientId, target] = decodeCode.split('|');
  const {
    state: { errors, resp },
    exec,
  } = useApi(() => surveyApi.verify(code, language));

  const {
    exec: execAnswer,
    state: { resp: answerResp, isLoading },
  } = useApi(surveyApi.answerQuestion);

  const onSubmitFormAnswer = React.useCallback(() => {
    const formAnswer = [];
    for (let i = 0; i < resp.questions.length; i += 1) {
      const questionId = resp.questions[i].id;
      let userAnswer = answers[`question${i}`];
      if (isArrayHasItem(userAnswer)) {
        userAnswer = userAnswer.map(t => t.key);
      } else {
        userAnswer = userAnswer.key;
      }
      formAnswer.push({
        questionId,
        answer: userAnswer,
      });
    }

    console.log(formAnswer, person);
    if (formAnswer.length && !_.isEmpty(person)) {
      execAnswer(code, {
        language,
        formAnswer,
        formPerson: person,
      });
    } else {
      toast.error(`Please choose a answer !`);
    }
  }, [resp, answers, person]);

  const onNext = React.useCallback(
    answer => {
      console.log('answer', answer);
      setAnswers(prevState => ({
        ...prevState,
        [`question${index}`]: answer,
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

  useEffect(() => {
    if (errors && errors.length) {
      if (errors[0].code === 'EXISTED') {
        history.push(
          `${SURVEY_ROOT_PATH}/result/${target || clientId}/${surveyId}`,
        );
      }
    }
  }, [errors, code]);

  let renderEls = <h1>Loading</h1>;
  if (resp) {
    if (_.isEmpty(person)) {
      renderEls = (
        <>
          <h1 className="mb-3">
            <FormattedMessage {...personFormMessages.title} />
          </h1>
          <PersonForm
            form={{ email: target }}
            onSubmitFormPerson={setPerson}
            surveyType={resp.type}
          />
        </>
      );
    } else if (index < resp.questions.length) {
      renderEls = (
        <>
          <h1>{resp?.name}</h1>
          <QuestionForm
            key={index}
            question={resp.questions[index]}
            onNext={onNext}
            onBack={onBack}
            index={index}
            total={resp.questions.length}
            answers={answers[`question${index}`]}
          />
        </>
      );
    } else {
      renderEls = (
        <ReviewAnswerForm
          onSubmitFormAnswer={onSubmitFormAnswer}
          answers={answers}
          questions={resp.questions}
          onBack={onBack}
          isLoading={isLoading}
        />
      );
    }
  }
  if (answerResp) {
    renderEls = (
      <>
        <h1 className="mb-3">
          <FormattedMessage {...messages.thankyou} />
        </h1>
        <h5 className="text-muted">
          <FormattedHTMLMessage
            {...messages.checkResult}
            values={{
              url: `${SURVEY_ROOT_PATH}/result/${target ||
                clientId}/${surveyId}`,
            }}
          />
        </h5>
      </>
    );
  }
  if (errors && errors.length) {
    renderEls = <h1>Invalid Survey</h1>;
  }

  return (
    <div className="d-flex h-100 justify-content-center">
      <div className="container p-4 text-center">
        <div className="question-form">{renderEls}</div>
      </div>
    </div>
  );
};
QuestionPage.propTypes = {};

export default QuestionPage;
