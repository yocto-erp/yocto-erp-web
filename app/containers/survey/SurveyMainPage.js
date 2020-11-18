import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../libs/hooks/useAsync';
import surveyApi from '../../libs/apis/survey.api';
import './survey.scss';
import EmailValidationForm from './components/EmailValidateForm';

const SurveyMainPage = props => {
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
        <div className="col text-center">
          <h1>{resp.name}</h1>
          <EmailValidationForm surveyId={id} />
        </div>
      </div>
    </div>
  ) : null;
};

SurveyMainPage.propTypes = {};

export default SurveyMainPage;
