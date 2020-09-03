import React from 'react';
import MyForm from './components/MyForm';
import PageTitle from '../../Layout/PageTitle';

const CreatePage = () => (
  <>
    <PageTitle title="Create Sale" />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <MyForm />
      </div>
    </div>
  </>
);

CreatePage.propTypes = {};

export default CreatePage;
