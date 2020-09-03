import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { COST_ROOT_PATH } from './constants';
import { editPage, listPage, newPage } from '../../libs/utils/crud.util';
import CreatePage from './CreatePage';
import EditPage from './EditPage';
import ListPage from './ListPage';
const MAIN_PATH = COST_ROOT_PATH;
const CostPage = () => (
  <Switch>
    <Route exact path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    <Route path={`${editPage(MAIN_PATH, ':id')}`} component={EditPage} />
    <Route path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
  </Switch>
);
export default CostPage;
