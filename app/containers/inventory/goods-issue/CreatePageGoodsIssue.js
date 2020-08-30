import React from 'react';
import GoodsIssueForm from '../components/GoodsIssueForm';
import PageTitle from '../../Layout/PageTitle';

const CreatePageGoodsIssue = () => (
  <>
    <PageTitle title="Create Goods Issue" />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <GoodsIssueForm />
      </div>
    </div>
  </>
);

CreatePageGoodsIssue.propTypes = {};

export default CreatePageGoodsIssue;
