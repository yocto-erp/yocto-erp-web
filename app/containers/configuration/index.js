import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EmailConfigurationPage from './EmailConfigurationPage';

const MAIN_PATH = '/configuration';

function ConfigurationPage() {
  return (
    <Switch>
      <Route exact path={`${MAIN_PATH}/email`} component={EmailConfigurationPage} />
    </Switch>
  );
}

ConfigurationPage.propTypes = {};

ConfigurationPage.defaultProps = {};

export default ConfigurationPage;
