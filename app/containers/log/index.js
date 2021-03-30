import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListLogEmailPage from './ListLogEmailPage';
import { LOG_EMAIL_ROOT_PATH } from './constants';

function LogPage() {
  return (
    <Switch>
      <Route exact path={LOG_EMAIL_ROOT_PATH} component={ListLogEmailPage} />
    </Switch>
  );
}

LogPage.propTypes = {};

LogPage.defaultProps = {};

export default LogPage;
