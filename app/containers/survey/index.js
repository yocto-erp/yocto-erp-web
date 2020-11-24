import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SURVEY_ROOT_PATH } from './constants';
import SurveyLandingPage from './SurveyLandingPage';
import QuestionPage from './QuestionPage';
import ResultPage from './ResultPage';

const MAIN_PATH = SURVEY_ROOT_PATH;

function TemplatePage() {
  return (
    <Switch>
      <Route
        exact
        path={`${MAIN_PATH}/result/:target/:surveyId`}
        component={ResultPage}
      />
      <Route
        exact
        path={`${MAIN_PATH}/:id/join`}
        component={SurveyLandingPage}
      />
      <Route exact path={`${MAIN_PATH}/:code`} component={QuestionPage} />
    </Switch>
  );
}

TemplatePage.propTypes = {};

TemplatePage.defaultProps = {};

export default TemplatePage;
