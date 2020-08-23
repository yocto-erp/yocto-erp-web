import React from 'react';
import MyForm from './components/MyForm';
import PageTitle from '../Layout/PageTitle';

const CreatePage = () => (
  <>
    <PageTitle title="Create Warehouse" />
    <div className="row">
      <div className="col-md-6">
        <MyForm />
      </div>
    </div>
  </>
);

CreatePage.propTypes = {};

export default CreatePage;
