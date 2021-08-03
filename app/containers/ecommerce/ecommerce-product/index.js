import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  editPagePattern,
  listPage,
  newPage,
} from '../../../libs/utils/crud.util';

import ListPage from './ListPage';
import { ECOMMERCE_PRODUCT_ROOT_PATH } from '../constants';
import EditPage from './EditPage';
import CreatePage from './CreatePage';

const MAIN_PATH = ECOMMERCE_PRODUCT_ROOT_PATH;
const CostPage = () => (
  <Switch>
    <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
    <Route exact path={`${editPagePattern(MAIN_PATH)}`} component={EditPage} />

    <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
  </Switch>
);
export default CostPage;
