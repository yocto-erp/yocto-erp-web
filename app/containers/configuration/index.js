import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EmailConfigurationPage from './EmailConfigurationPage';
import { CONFIGURATION_ROOT_PATH } from './constants';

function ConfigurationPage() {
  return (
    <Switch>
      <Route
        exact
        path={`${CONFIGURATION_ROOT_PATH}/email`}
        component={EmailConfigurationPage}
      />
    </Switch>
  );
}

ConfigurationPage.propTypes = {};

ConfigurationPage.defaultProps = {};

export default ConfigurationPage;
