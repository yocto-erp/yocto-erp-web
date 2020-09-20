import React from 'react';
import PageTitle from '../../Layout/PageTitle';
import CreatePaymentForm from '../components/CreatePaymentForm';
const CreatePage = () => (
  <>
    <PageTitle title="Create Payment Voucher" />
    <div className="row">
      <div className="col-md-12">
        <CreatePaymentForm />
      </div>
    </div>
  </>
);
export default CreatePage;
