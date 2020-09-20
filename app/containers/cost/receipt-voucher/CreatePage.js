import React from 'react';
import PageTitle from '../../Layout/PageTitle';
import CreateReceiptForm from '../components/CreateReceiptForm';
const CreatePage = () => (
  <>
    <PageTitle title="Create Receipt Voucher" />
    <div className="row">
      <div className="col-md-12">
        <CreateReceiptForm />
      </div>
    </div>
  </>
);
export default CreatePage;
