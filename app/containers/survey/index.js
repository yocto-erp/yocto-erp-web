import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SURVEY_ROOT_PATH } from './constants';
import SurveyLandingPage from './SurveyLandingPage';
import SurveyMainPage from './SurveyMainPage';
import QuestionPage from './QuestionPage';

const MAIN_PATH = SURVEY_ROOT_PATH;

function TemplatePage() {
  return (
    <Switch>
      <Route
        exact
        path={`${MAIN_PATH}/:id/join`}
        component={SurveyLandingPage}
      />
      <Route exact path={`${MAIN_PATH}/:code`} component={SurveyMainPage} />
      <Route
        exact
        path={`${MAIN_PATH}/:id/question`}
        component={QuestionPage}
      />
    </Switch>
  );
}

TemplatePage.propTypes = {};

TemplatePage.defaultProps = {};

export default TemplatePage;
