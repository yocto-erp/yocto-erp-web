import React from 'react';
import GoodsReceiptForm from '../components/GoodsReceiptForm';
import PageTitle from '../../Layout/PageTitle';

const CreatePageGoodsIssue = () => (
  <>
    <PageTitle title="Create Goods Issue" />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <GoodsReceiptForm />
      </div>
    </div>
  </>
);

CreatePageGoodsIssue.propTypes = {};

export default CreatePageGoodsIssue;
