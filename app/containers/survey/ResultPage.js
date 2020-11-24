import React from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../libs/hooks/useApi';
import surveyApi from '../../libs/apis/survey.api';
import PreviewQuestionAnswer from './components/PreviewQuestionAnswer';

const ResultPage = () => {
  const { target, surveyId } = useParams();
  const {
    state: { isLoading, errors, resp },
    exec,
  } = useApi(() => surveyApi.readResult(surveyId, target));

  React.useEffect(() => {
    exec();
  }, []);

  return resp ? (
    <div className="d-flex h-100 justify-content-center">
      <div className="container p-4 text-center">
        <div className="question-form">
          <h1 className="mb-5">
            {resp.survey.name}
            <br />
            <small className="text-muted">{resp.survey.remark}</small>
          </h1>
          {resp.answers.map(t => (
            <div className="row" key={`${resp.id}-${t.question.id}`}>
              <div className="col">
                <PreviewQuestionAnswer
                  question={t.question}
                  answer={t.answer}
                  isOpen
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

ResultPage.propTypes = {};

export default ResultPage;
