import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { INVENTORY_ROOT_PATH } from './constants';
import { listPage, newPage } from '../../libs/utils/crud.util';
import ListPage from './ListPage';
import CreatePageGoodsReceipt from './goods-receipt/CreatePageGoodsReceipt';
import EditPageGoodsReceipt from './goods-receipt/EditPageGoodsReceipt';

const MAIN_PATH = INVENTORY_ROOT_PATH;

function InventoryPage() {
  return (
    <Switch>
      <Route
        exact
        path={`${newPage(MAIN_PATH)}`}
        component={CreatePageGoodsReceipt}
      />
      <Route
        exact
        path={`${MAIN_PATH}/:id/edit`}
        component={EditPageGoodsReceipt}
      />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

InventoryPage.propTypes = {};

InventoryPage.defaultProps = {};

export default InventoryPage;
