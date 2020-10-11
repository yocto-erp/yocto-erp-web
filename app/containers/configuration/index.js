import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EmailConfigurationPage from './EmailConfigurationPage';
import StudentConfigurationPage from './StudentConfigurationPage';

const MAIN_PATH = '/configuration';

function ConfigurationPage() {
  return (
    <Switch>
      <Route
        exact
        path={`${MAIN_PATH}/email`}
        component={EmailConfigurationPage}
      />
      <Route
        exact
        path={`${MAIN_PATH}/student`}
        component={StudentConfigurationPage}
      />
    </Switch>
  );
}

ConfigurationPage.propTypes = {};

ConfigurationPage.defaultProps = {};

export default ConfigurationPage;
