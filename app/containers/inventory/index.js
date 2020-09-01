import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  INVENTORY_ROOT_PATH,
  PATH_GOODS_RECEIPT,
  PATH_GOODS_ISSUE,
} from './constants';
import { listPage, newPage } from '../../libs/utils/crud.util';
import ListPage from './ListPage';
import CreatePageGoodsReceipt from './goods-receipt/CreatePageGoodsReceipt';
import EditPageGoodsReceipt from './goods-receipt/EditPageGoodsReceipt';
import CreatePageGoodsIssue from './goods-issue/CreatePageGoodsIssue';
import EditPageGoodsIssue from './goods-issue/EditPageGoodsIssue';

const MAIN_PATH = INVENTORY_ROOT_PATH;

function InventoryPage() {
  return (
    <Switch>
      <Route
        exact
        path={`${newPage(PATH_GOODS_RECEIPT)}`}
        component={CreatePageGoodsReceipt}
      />
      <Route
        exact
        path={`${PATH_GOODS_RECEIPT}/:id/edit`}
        component={EditPageGoodsReceipt}
      />
      <Route
        exact
        path={`${newPage(PATH_GOODS_ISSUE)}`}
        component={CreatePageGoodsIssue}
      />
      <Route
        exact
        path={`${PATH_GOODS_ISSUE}/:id/edit`}
        component={EditPageGoodsIssue}
      />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

InventoryPage.propTypes = {};

InventoryPage.defaultProps = {};

export default InventoryPage;
