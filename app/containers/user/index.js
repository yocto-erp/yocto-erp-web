import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListPage from './ListPage';
import { USER_ROOT_PATH } from './constants';
import DetailPage from './DetailPage';
import EditPage from './EditPage';

function UserPage() {
  return (
    <Switch>
      <Route exact path={`${USER_ROOT_PATH}/:id/view`} component={DetailPage} />
      <Route exact path={`${USER_ROOT_PATH}/:id/edit`} component={EditPage} />
      <Route path={`${USER_ROOT_PATH}`} component={ListPage} />
    </Switch>
  );
}

UserPage.propTypes = {};

UserPage.defaultProps = {};

export default UserPage;
