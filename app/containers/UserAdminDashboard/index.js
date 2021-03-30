import React from 'react';
import useUser from '../../libs/hooks/useUser';
import LayoutComponent from '../Layout/Layout';
import CompanyChoose from '../Auth/company-choose';
import OnBoardPage from '../Auth/onboard';
import Login from '../Auth/login';

const UserAdminDashboard = () => {
  const { isAuthenticated, user } = useUser();

  const mainPage = React.useMemo(() => {
    let rs;

    if (!isAuthenticated) {
      rs = <Login />;
    } else if (user.companyId !== null) {
      rs = <LayoutComponent />;
    } else if (user.userCompanies.length) {
      rs = <CompanyChoose />;
    } else {
      rs = <OnBoardPage />;
    }
    return rs;
  }, [isAuthenticated, user]);

  return mainPage;
};

UserAdminDashboard.propTypes = {};

export default UserAdminDashboard;
