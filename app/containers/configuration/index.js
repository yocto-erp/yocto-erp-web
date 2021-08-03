import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EmailConfigurationPage from './EmailConfigurationPage';
import {
  CONFIGURATION_COMPANY_ROOT_PATH,
  CONFIGURATION_EMAIL_ROOT_PATH,
} from './constants';
import SettingCompany from './SettingCompany';

function ConfigurationPage() {
  return (
    <Switch>
      <Route
        exact
        path={CONFIGURATION_EMAIL_ROOT_PATH}
        component={EmailConfigurationPage}
      />
      <Route
        exact
        path={CONFIGURATION_COMPANY_ROOT_PATH}
        component={SettingCompany}
      />
    </Switch>
  );
}

ConfigurationPage.propTypes = {};

ConfigurationPage.defaultProps = {};

export default ConfigurationPage;
