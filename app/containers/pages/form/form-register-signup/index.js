import React from "react";
import { Route, Switch } from "react-router-dom";
import { FORM_REGISTER_ROOT_PATH } from "./constants";
import { listPage } from "../../../../libs/utils/crud.util";
import ListPage from "./ListPage";

const MAIN_PATH = FORM_REGISTER_ROOT_PATH;

function RegisterFormPage() {
  return (
    <Switch>
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

RegisterFormPage.propTypes = {};

RegisterFormPage.defaultProps = {};

export default RegisterFormPage;
