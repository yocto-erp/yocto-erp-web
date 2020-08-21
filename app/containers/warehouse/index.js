import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { WAREHOUSE_ROOT_PATH } from './constants';
import { listPage, newPage } from '../../libs/utils/crud.util';
import ListPage from './ListPage';

function WarehousePage() {
  return (
    <Switch>
      <Route
        exact
        path={`${newPage(WAREHOUSE_ROOT_PATH)}`}
        render={() => <div>Create Warehouse</div>}
      />
      <Route
        exact
        path={`${WAREHOUSE_ROOT_PATH}/:id/edit`}
        render={() => <div>Warehouse Edit Page</div>}
      />
      <Route path={`${listPage(WAREHOUSE_ROOT_PATH)}`} component={ListPage} />
    </Switch>
  );
}

WarehousePage.propTypes = {};

WarehousePage.defaultProps = {};

export default WarehousePage;
