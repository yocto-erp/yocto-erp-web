import React from 'react';
import PageTitle from '../../Layout/PageTitle';
import ECommercePaymentSettingForm from './ECommercePaymentSettingForm';
import EcommercePaymentSetting from './EcommercePaymentSetting';

const ECommerceSetting = props => (
  <>
    <PageTitle title="Ecommerce Setting" />
    <div className="row">
      <div className="col-md-6">
        <EcommercePaymentSetting />
      </div>
    </div>
  </>
);

ECommerceSetting.propTypes = {};

export default ECommerceSetting;
