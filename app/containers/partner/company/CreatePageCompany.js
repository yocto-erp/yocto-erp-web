import React from 'react';
import PageTitle from '../../Layout/PageTitle';
import MyForm from './components/MyForm';

const CreatePageCompany = () => (
  <>
    <PageTitle title="Create Company" />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <MyForm />
      </div>
    </div>
  </>
);

CreatePageCompany.propTypes = {};

export default CreatePageCompany;
