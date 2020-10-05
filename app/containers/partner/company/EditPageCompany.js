import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../Layout/PageTitle';
import MyForm from './components/MyForm';

const EditPageCompany = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="Update Company" />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <MyForm id={id} />
        </div>
      </div>
    </>
  );
};

EditPageCompany.propTypes = {};

export default EditPageCompany;
