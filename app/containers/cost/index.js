import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  COST_ROOT_PATH,
  COST_RECEIPT_PATH,
  COST_PAYMENT_PATH,
} from './constants';
import { editPage, listPage, newPage } from '../../libs/utils/crud.util';
import CreatePageReceipt from './CreatePageReceipt';
import ListPage from './ListPage';
import CreatePagePayment from './CreatePagePayment';
const MAIN_PATH = COST_ROOT_PATH;
const RECEIPT_PATH = COST_RECEIPT_PATH;
const PAYMENT_PATH = COST_PAYMENT_PATH;
const CostPage = () => (
  <Switch>
    <Route
      exact
      path={`${editPage(RECEIPT_PATH, ':id')}`}
      component={CreatePageReceipt}
    />
    <Route
      exact
      path={`${editPage(PAYMENT_PATH, ':id')}`}
      component={CreatePagePayment}
    />
    <Route
      exact
      path={`${newPage(RECEIPT_PATH)}`}
      component={CreatePageReceipt}
    />
    <Route
      exact
      path={`${newPage(PAYMENT_PATH)}`}
      component={CreatePagePayment}
    />
    <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
  </Switch>
);
export default CostPage;
