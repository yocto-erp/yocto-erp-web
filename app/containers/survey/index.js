import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SURVEY_ROOT_PATH } from './constants';
import SurveyMainPage from './SurveyMainPage';

const MAIN_PATH = SURVEY_ROOT_PATH;

function TemplatePage() {
  return (
    <Switch>
      <Route exact path={`${MAIN_PATH}/:id/join`} component={SurveyMainPage} />
    </Switch>
  );
}

TemplatePage.propTypes = {};

TemplatePage.defaultProps = {};

export default TemplatePage;
