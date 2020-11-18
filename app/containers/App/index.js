import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

import LayoutComponent from 'containers/Layout/Layout';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../../global-styles';
import { Login } from '../Auth/login';
import useUser from '../../libs/hooks/useUser';
import RegisterPage from '../Auth/register';
import { VerifyMailPage } from '../Auth/verify-mail';
import ForgotPasswordPage from '../Auth/forgot-password';
import RestPasswordPage from '../Auth/reset-password';
import OnBoardPage from '../Auth/onboard';
import { SURVEY_ROOT_PATH } from '../survey/constants';
import SurveyPage from '../survey/Loadable';

export default function App() {
  const { isAuthenticated, isLoading, user } = useUser();

  const mainPage = React.useMemo(() => {
    let rs = (
      <div className="container h-100 d-flex justify-content-center">
        <div className=" my-auto animate__animated animate__pulse animate__infinite	infinite text-center">
          <h1 className="display-4 ">Yocto ERP</h1>
          <small>. . .</small>
        </div>
      </div>
    );
    if (!isLoading) {
      if (!isAuthenticated) {
        rs = <Login />;
      } else {
        console.log(user);
        if (user.userCompanies === null) {
          rs = <OnBoardPage />;
        } else {
          rs = <LayoutComponent />;
        }
      }
    }
    return rs;
  }, [isAuthenticated, isLoading, user]);

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
        <Route path="/register" component={RegisterPage} />
        <Route path="/email-activate" component={VerifyMailPage} />
        <Route
          path="/forgot-password/send-mail"
          component={ForgotPasswordPage}
        />
        <Route path="/forgot-password/reset" component={RestPasswordPage} />
        <Route path={`${SURVEY_ROOT_PATH}`} component={SurveyPage} />
        <Route path="/">{mainPage}</Route>
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
