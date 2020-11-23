import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../libs/hooks/useAsync';
import surveyApi from '../../libs/apis/survey.api';
import './survey.scss';
import EmailValidationForm from './components/EmailValidateForm';

const SurveyLandingPage = props => {
  const { id } = useParams();
  const [isLoading, exec, resp] = useAsync({
    asyncApi: () => surveyApi.read(id),
  });

  useEffect(() => {
    exec();
  }, [id]);
  return resp ? (
    <div className="h-100 container">
      <div className="h-100 row align-items-center">
        <div className="col w-75 text-center">
          <h1 className="mb-5">
            {resp.name}
            <br />
            {resp.remark ? (
              <small className="text-muted">{resp.remark}</small>
            ) : null}
          </h1>
          <EmailValidationForm surveyId={Number(id)} />
        </div>
      </div>
    </div>
  ) : null;
};

SurveyLandingPage.propTypes = {};

export default SurveyLandingPage;
