import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import surveyApi from '../../libs/apis/survey.api';
import { useApi } from '../../libs/hooks/useApi';

const SurveyMainPage = props => {
  const { code } = useParams();

  const {
    state: { isLoading, errors, resp },
    exec,
  } = useApi(() => surveyApi.verify(code));

  useEffect(() => {
    console.log(code);
    exec();
  }, []);

  console.log(resp);
  console.log(errors);

  return !isLoading && errors && errors.length ? (
    <h1>Invalid Survey or you have no permission to this.</h1>
  ) : (
    <div>OK {JSON.stringify(resp)}</div>
  );
};

SurveyMainPage.propTypes = {};

export default SurveyMainPage;
