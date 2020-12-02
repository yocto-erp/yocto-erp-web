import React, { useCallback, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useAsync } from '../../libs/hooks/useAsync';
import surveyApi from '../../libs/apis/survey/survey.api';
import EmailValidationForm from './components/EmailValidateForm';
import { SURVEY_TYPE } from './Admin/constants';
import { SURVEY_ROOT_PATH } from './constants';
import { getClientId } from '../../libs/utils/storage';
import logo from '../../images/logo/logo.png';

const SurveyLandingPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const clientId = getClientId();
  const [, exec, resp] = useAsync({
    asyncApi: () => surveyApi.read(id),
  });

  useEffect(() => {
    exec();
  }, [id]);

  const joinSurvey = useCallback(() => {
    const base64String = btoa(`${id}|${clientId}||`);
    history.push(`${SURVEY_ROOT_PATH}/${base64String}`);
  }, [id]);

  const surveyAction = useMemo(() => {
    if (resp) {
      switch (resp.type) {
        case SURVEY_TYPE.EMAIL_VERIFY:
          return <EmailValidationForm surveyId={Number(id)} />;
        default:
          return (
            <Button onClick={joinSurvey} color="primary">
              Join Survey
            </Button>
          );
      }
    }
    return null;
  }, [resp]);
  return resp ? (
    <div className="h-100 container">
      <div className="h-100 row align-items-center">
        <div className="col w-75 text-center">
          <img
            className="img-fluid mb-5"
            style={{ minWidth: '320px', width: '60%' }}
            src={logo}
            title="Logo"
            alt="logo"
          />
          <h1 className="mb-5">
            {resp.name}
            <br />
            {resp.remark ? (
              <small className="text-muted">{resp.remark}</small>
            ) : null}
          </h1>
          {surveyAction}
        </div>
      </div>
    </div>
  ) : null;
};

SurveyLandingPage.propTypes = {};

export default SurveyLandingPage;
