import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../Layout/PageTitle';
import CreactReceiptForm from '../components/CreactReceiptForm';
const EditPageReceiptCost = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="Update Payment Voucher" />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <CreactReceiptForm id={id} />
        </div>
      </div>
    </>
  );
};

EditPageReceiptCost.propTypes = {};

export default EditPageReceiptCost;
