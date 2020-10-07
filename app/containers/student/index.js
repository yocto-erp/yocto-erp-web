import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { STUDENT_ROOT_PATH } from './constants';
import { listPage, newPage } from '../../libs/utils/crud.util';
import CreatePage from './CreatePage';
import EditPage from './EditPage';
import ListPage from './ListPage';

const MAIN_PATH = STUDENT_ROOT_PATH;

function StudentPage() {
  return (
    <Switch>
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

StudentPage.propTypes = {};

StudentPage.defaultProps = {};

export default StudentPage;
