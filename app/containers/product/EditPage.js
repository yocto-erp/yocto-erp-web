import React from 'react';
import { useParams } from 'react-router-dom';
import MyForm from './components/MyForm';
import PageTitle from '../Layout/PageTitle';

const EditPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="Update Product" />
      <div className="row">
        <div className="col-md-6">
          <MyForm id={id} />
        </div>
      </div>
    </>
  );
};

EditPage.propTypes = {};

export default EditPage;
