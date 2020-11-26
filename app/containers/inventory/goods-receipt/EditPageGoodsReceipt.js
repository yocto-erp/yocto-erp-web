import React from 'react';
import GoodsReceiptForm from '../components/GoodsReceiptForm';
import PageTitle from '../../Layout/PageTitle';
c;

const EditPageGoodsReceipt = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="Update Goods Receipt" />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <GoodsReceiptForm id={id} />
        </div>
      </div>
    </>
  );
};

EditPageGoodsReceipt.propTypes = {};

export default EditPageGoodsReceipt;
