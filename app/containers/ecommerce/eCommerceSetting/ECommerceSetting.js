import React from "react";
import PageTitle from "../../Layout/PageTitle";
import EcommercePaymentSetting from "./EcommercePaymentSetting";

const ECommerceSetting = () => (
  <>
    <PageTitle title="Ecommerce Setting" />
    <div className="row">
      <div className="col-md-8 offset-2">
        <EcommercePaymentSetting />
      </div>
    </div>
  </>
);

ECommerceSetting.propTypes = {};

export default ECommerceSetting;
