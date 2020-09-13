import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../Layout/PageTitle';
import CreactPaymentForm from '../components/CreactPaymentForm';
const EditPagePaymentCost = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="Update Payment Voucher" />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <CreactPaymentForm id={id} />
        </div>
      </div>
    </>
  );
};

EditPagePaymentCost.propTypes = {};

export default EditPagePaymentCost;
