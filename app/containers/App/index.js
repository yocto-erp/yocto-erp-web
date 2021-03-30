import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../../global-styles';
import { Login } from '../Auth/login';
import useUser from '../../libs/hooks/useUser';
import RegisterPage from '../Auth/register';
import { VerifyMailPage } from '../Auth/verify-mail';
import { VerifyInvitationPage } from '../Auth/verify-invitation';
import ForgotPasswordPage from '../Auth/forgot-password';
import RestPasswordPage from '../Auth/reset-password';
import UserAdminDashboard from '../UserAdminDashboard';

import 'styles/theme.scss';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import UserPublicHomePage from '../UserPublicHomePage';

export default function App() {
  const { isLoading } = useUser();

  return (
    <>
      <Helmet titleTemplate="%s - Yocto ERP" defaultTitle="Yocto ERP">
        <meta
          name="description"
          content="Yocto ERP - a simple management tool for small company"
        />
      </Helmet>
      <ToastContainer autoClose={5000} hideProgressBar />
      {isLoading ? (
        <div className="container h-100 d-flex justify-content-center">
          <div className=" my-auto animate__animated animate__pulse animate__infinite	infinite text-center">
            <h1 className="display-4 ">Yocto ERP</h1>
            <small>. . .</small>
          </div>
        </div>
      ) : (
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
          <Route
            path="/invite-confirm"
            exact
            component={VerifyInvitationPage}
          />
          <Route path="/admin" component={UserAdminDashboard} />
          <Route path="/" component={UserPublicHomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      )}

      <GlobalStyle />
    </>
  );
}
