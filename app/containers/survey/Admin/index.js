import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SURVEY_MANAGEMENT_ROOT_PATH } from './constants';
import {
  listPage,
  newPage,
  editPagePattern,
} from '../../../libs/utils/crud.util';
import ListPage from './ListPage';
import CreatePage from './CreatePage';
import EditPage from './EditPage';
import ListQuestionPage from './ListQuestionPage';

const MAIN_PATH = SURVEY_MANAGEMENT_ROOT_PATH;

function SurveyAdminPage() {
  return (
    <Switch>
      <Route
        exact
        path={`${MAIN_PATH}/:id/questions`}
        component={ListQuestionPage}
      />
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route
        exact
        path={`${editPagePattern(MAIN_PATH)}`}
        component={EditPage}
      />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

SurveyAdminPage.propTypes = {};

SurveyAdminPage.defaultProps = {};

export default SurveyAdminPage;
