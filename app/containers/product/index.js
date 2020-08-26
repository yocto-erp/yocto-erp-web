import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PRODUCT_ROOT_PATH } from './constants';
import { listPage, newPage } from '../../libs/utils/crud.util';
import ListPage from './ListPage';
import CreatePage from './CreatePage';
import EditPage from './EditPage';

const MAIN_PATH = PRODUCT_ROOT_PATH;

function ProductPage() {
  return (
    <Switch>
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

ProductPage.propTypes = {};

ProductPage.defaultProps = {};

export default ProductPage;
