import React from "react";
import { Route, Switch } from "react-router-dom";
import { listPage, newPage } from "../../../libs/utils/crud.util";
import ListPage from "./ListPageCompany";
import EditPage from "./EditPageCompany";
import CreatePage from "./CreatePageCompany";
import { COMPANY_ROOT_PATH } from "../constants";

const MAIN_PATH = COMPANY_ROOT_PATH;

function CompanyPage() {
  return (
    <Switch>
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

CompanyPage.propTypes = {};

CompanyPage.defaultProps = {};

export default CompanyPage;
