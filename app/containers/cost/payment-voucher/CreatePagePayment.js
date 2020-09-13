import React from 'react';
import PageTitle from '../../Layout/PageTitle';
import CreactPaymentForm from '../components/CreactPaymentForm';
const CreatePagePayment = () => (
  <>
    <PageTitle title="Create Payment Voucher" />
    <div className="row">
      <div className="col-md-12">
        <CreactPaymentForm />
      </div>
    </div>
  </>
);
export default CreatePagePayment;
