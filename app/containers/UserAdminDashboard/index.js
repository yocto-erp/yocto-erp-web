import React from "react";
import useUser from "../../libs/hooks/useUser";
import LayoutComponent from "../Layout/Layout";
import CompanyChoose from "../Auth/company-choose";
import OnBoardPage from "../Auth/onboard";
import Login from "../Auth/login";

const UserAdminDashboard = () => {
  const { isAuthenticated, user, isLoading } = useUser();

  return React.useMemo(() => {
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
      } else if (user && user.companyId !== null) {
        rs = <LayoutComponent />;
      } else if (user && user.userCompanies && user.userCompanies.length) {
        rs = <CompanyChoose />;
      } else {
        rs = <OnBoardPage />;
      }
    }
    return rs;
  }, [isAuthenticated, user, isLoading]);
};

UserAdminDashboard.propTypes = {};

export default UserAdminDashboard;
