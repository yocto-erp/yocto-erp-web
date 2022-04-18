import React from "react";
import Header from "../../components/Header";
import "../../index.scss";
import UserOrderForm from "./UserOrderForm";

const UserOrderPage = () => {
  console.log("User Order");
  return (
    <div className="public-page">
      <div className="background">
        <Header companyName="Company Name" />
        <main>
          <div className="container-fluid mt-5">
            <UserOrderForm />
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

UserOrderPage.propTypes = {};

export default UserOrderPage;
