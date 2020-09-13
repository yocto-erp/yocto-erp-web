import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { COST_ROOT_PATH, COST_PAYMENT_PATH } from './constants';
import { editPage, listPage, newPage } from '../../libs/utils/crud.util';
import CreatePageReceipt from './receipt-voucher/CreatePageReceipt';
import ListPage from './ListPage';
import CreatePagePayment from './payment-voucher/CreatePagePayment';
import EditPageReceiptCost from './receipt-voucher/EditPageReceiptCost';
import EditPagePaymentCost from './payment-voucher/EditPagePaymentCost';
const MAIN_PATH = COST_ROOT_PATH;
const PAYMENT_PATH = COST_PAYMENT_PATH;
const CostPage = () => (
  <Switch>
    <Route
      exact
      path={`${editPage(MAIN_PATH, ':id')}`}
      component={EditPageReceiptCost}
    />
    <Route
      exact
      path={`${editPage(PAYMENT_PATH, ':id')}`}
      component={EditPagePaymentCost}
    />
    <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePageReceipt} />
    <Route
      exact
      path={`${newPage(PAYMENT_PATH)}`}
      component={CreatePagePayment}
    />
    <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
  </Switch>
);
export default CostPage;
