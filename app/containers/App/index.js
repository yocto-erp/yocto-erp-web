/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import LayoutComponent from 'components/Layout/Layout';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../../global-styles';

// eslint-disable-next-line react/prop-types
const CloseButton = ({ closeToast }) => (
  <button type="button" onClick={closeToast}>
    <i className="la la-close notifications-close" />
  </button>
);
export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Yocto ERP" defaultTitle="Yocto ERP">
        <meta
          name="description"
          content="Yocto ERP - a simple management tool for small company"
        />
      </Helmet>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        closeButton={<CloseButton />}
      />
      <Switch>
        <Route path="/" component={LayoutComponent} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
