import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { SWRConfig } from 'swr';
import LayoutComponent from 'containers/Layout/Layout';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../../global-styles';
import { Login } from '../Login';
import useUser from '../../libs/hooks/useUser';

export default function App() {
  const { isAuthenticated, isLoading } = useUser();

  const mainPage = React.useMemo(() => {
    let rs = (
      <div className="container h-100 d-flex justify-content-center">
        <div className=" my-auto animate__animated animate__pulse animate__infinite	infinite">
          <h1 className="display-4 ">Loading !</h1>
        </div>
      </div>
    );
    if (!isLoading) {
      if (!isAuthenticated) {
        rs = <Login />;
      } else {
        rs = <LayoutComponent />;
      }
    }
    return rs;
  }, [isAuthenticated, isLoading]);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        refreshInterval: 0,
        shouldRetryOnError: false,
        revalidateOnMount: false,
        errorRetryCount: 3,
        errorRetryInterval: 10,
      }}
    >
      <>
        <Helmet titleTemplate="%s - Yocto ERP" defaultTitle="Yocto ERP">
          <meta
            name="description"
            content="Yocto ERP - a simple management tool for small company"
          />
        </Helmet>
        <ToastContainer autoClose={5000} hideProgressBar />
        <Switch>
          <Route path="/">{mainPage}</Route>
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </>
    </SWRConfig>
  );
}
