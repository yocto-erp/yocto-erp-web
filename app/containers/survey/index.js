import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SURVEY_ROOT_PATH } from './constants';
import SurveyLandingPage from './SurveyLandingPage';
import QuestionPage from './QuestionPage';
import SurveyDetailResultPage from './SurveyDetailResultPage';
import './survey.scss';
import SurveySummary from './SurveySummaryPage';

const MAIN_PATH = SURVEY_ROOT_PATH;

function TemplatePage() {
  return (
    <Switch>
      <Route
        exact
        path={`${MAIN_PATH}/result/:target/:surveyId`}
        component={SurveyDetailResultPage}
      />
      <Route
        exact
        path={`${MAIN_PATH}/:id/join`}
        component={SurveyLandingPage}
      />
      <Route path={`${MAIN_PATH}/:id/summary`} component={SurveySummary} />
      <Route exact path={`${MAIN_PATH}/:code`} component={QuestionPage} />
    </Switch>
  );
}

TemplatePage.propTypes = {};

TemplatePage.defaultProps = {};

export default TemplatePage;
