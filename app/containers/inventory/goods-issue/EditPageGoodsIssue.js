import React from 'react';
import { useParams } from 'react-router-dom';
import GoodsReceiptForm from '../components/GoodsReceiptForm';
import PageTitle from '../../Layout/PageTitle';

const EditPageGoodsIssue = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="Update Goods Issue" />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <GoodsReceiptForm id={id} />
        </div>
      </div>
    </>
  );
};

EditPageGoodsIssue.propTypes = {};

export default EditPageGoodsIssue;
