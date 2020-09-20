import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  COST_ROOT_PATH,
  COST_PAYMENT_PATH,
  COST_RECEIPT_PATH,
} from './constants';
import { editPagePattern, listPage, newPage } from '../../libs/utils/crud.util';
import ReceiptVoucherEditPage from './receipt-voucher/EditPage';
import PaymentVoucherEditPage from './payment-voucher/EditPage';
import ReceiptVoucherCreatePage from './receipt-voucher/CreatePage';
import PaymentVoucherCreatePage from './payment-voucher/CreatePage';

import ListPage from './ListPage';

const MAIN_PATH = COST_ROOT_PATH;
const CostPage = () => (
  <Switch>
    <Route
      exact
      path={`${editPagePattern(COST_RECEIPT_PATH)}`}
      component={ReceiptVoucherEditPage}
    />
    <Route
      exact
      path={`${editPagePattern(COST_PAYMENT_PATH)}`}
      component={PaymentVoucherEditPage}
    />
    <Route
      exact
      path={`${newPage(COST_PAYMENT_PATH)}`}
      component={PaymentVoucherCreatePage}
    />
    <Route
      exact
      path={`${newPage(COST_RECEIPT_PATH)}`}
      component={ReceiptVoucherCreatePage}
    />
    <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
  </Switch>
);
export default CostPage;
