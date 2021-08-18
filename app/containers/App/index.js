import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../../global-styles';
import { Login } from '../Auth/login';
import RegisterPage from '../Auth/register';
import { VerifyMailPage } from '../Auth/verify-mail';
import { VerifyInvitationPage } from '../Auth/verify-invitation';
import ForgotPasswordPage from '../Auth/forgot-password';
import RestPasswordPage from '../Auth/reset-password';
import UserAdminDashboard from '../UserAdminDashboard';

import 'styles/theme.scss';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import UserPublicHomePage from '../public/UserPublicHomePage';
import UserProductPage from '../public/UserProductPage';

export default function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Yocto ERP" defaultTitle="Yocto ERP">
        <meta
          name="description"
          content="Yocto ERP - a simple management tool for small company"
        />
      </Helmet>
      <ToastContainer autoClose={5000} hideProgressBar />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/email-activate" exact component={VerifyMailPage} />
        <Route
          path="/forgot-password/send-mail"
          exact
          component={ForgotPasswordPage}
        />
        <Route
          path="/forgot-password/reset"
          exact
          component={RestPasswordPage}
        />
        <Route path="/invite-confirm" exact component={VerifyInvitationPage} />
        <Route path="/admin" component={UserAdminDashboard} />
        <Route path="/cpm/:publicId/product" component={UserProductPage} />
        <Route path="/" component={UserPublicHomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
