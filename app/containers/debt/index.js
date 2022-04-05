import React from "react";
import { Route, Switch } from "react-router-dom";
import { DEBT_ROOT_PATH } from "./constants";
import { listPage } from "../../libs/utils/crud.util";
import ListPage from "./ListPage";

const MAIN_PATH = DEBT_ROOT_PATH;

function DebtPage() {
  return (
    <Switch>
      {/* <Route */}
      {/*  exact */}
      {/*  path={`${newPage(PATH_GOODS_RECEIPT)}`} */}
      {/*  component={CreatePageGoodsReceipt} */}
      {/* /> */}
      {/* <Route */}
      {/*  exact */}
      {/*  path={`${PATH_GOODS_RECEIPT}/:id/edit`} */}
      {/*  component={EditPageGoodsReceipt} */}
      {/* /> */}
      {/* <Route */}
      {/*  exact */}
      {/*  path={`${newPage(PATH_GOODS_ISSUE)}`} */}
      {/*  component={CreatePageGoodsIssue} */}
      {/* /> */}
      {/* <Route */}
      {/*  exact */}
      {/*  path={`${PATH_GOODS_ISSUE}/:id/edit`} */}
      {/*  component={EditPageGoodsIssue} */}
      {/* /> */}
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

DebtPage.propTypes = {};

DebtPage.defaultProps = {};

export default DebtPage;
