import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../libs/hooks/useAsync';
import surveyApi from '../../libs/apis/survey.api';
import QuestionForm from './components/QuestionForm';

const QuestionPage = props => {
  const [index, setIndex] = React.useState(0);
  const { id } = useParams();
  const [isLoading, exec, resp] = useAsync({
    asyncApi: () => surveyApi.readSurveyQuestion(id),
  });

  useEffect(() => {
    exec();
  }, [id]);
  const form = React.useMemo(
    () => (
      <>
        <div className="h-50 row align-items-center">
          <div className="col text-center">
            <h1>{resp?.name}</h1>
            <QuestionForm
              question={resp?.questions[index]}
              total={resp?.questions.length}
              index={index}
              result={val => {
                setIndex(val);
              }}
            />
          </div>
        </div>
      </>
    ),
    [resp, index],
  );
  return resp ? form : null;
};

QuestionPage.propTypes = {};

export default QuestionPage;
