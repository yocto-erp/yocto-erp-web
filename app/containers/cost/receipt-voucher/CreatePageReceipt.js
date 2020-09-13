import React from 'react';
import PageTitle from '../../Layout/PageTitle';
import CreactReceiptForm from '../components/CreactReceiptForm';
const CreatePageReceipt = () => (
  <>
    <PageTitle title="Create Receipt Voucher" />
    <div className="row">
      <div className="col-md-12">
        <CreactReceiptForm />
      </div>
    </div>
  </>
);
export default CreatePageReceipt;
