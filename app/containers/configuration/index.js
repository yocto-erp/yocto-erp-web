import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EmailConfigurationPage from './EmailConfigurationPage';
import { CONFIGURATION_EMAIL_ROOT_PATH } from './constants';

function ConfigurationPage() {
  return (
    <Switch>
      <Route
        exact
        path={CONFIGURATION_EMAIL_ROOT_PATH}
        component={EmailConfigurationPage}
      />
    </Switch>
  );
}

ConfigurationPage.propTypes = {};

ConfigurationPage.defaultProps = {};

export default ConfigurationPage;
