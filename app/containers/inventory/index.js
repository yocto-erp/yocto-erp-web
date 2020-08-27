import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { INVENTORY_ROOT_PATH } from './constants';
import { listPage } from '../../libs/utils/crud.util';
import ListPage from './ListPage';

const MAIN_PATH = INVENTORY_ROOT_PATH;

function InventoryPage() {
  return (
    <Switch>
      {/* <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} /> */}
      {/* <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} /> */}
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

InventoryPage.propTypes = {};

InventoryPage.defaultProps = {};

export default InventoryPage;
