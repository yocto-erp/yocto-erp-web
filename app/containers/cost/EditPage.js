import React from 'react';
import { useParams } from 'react-router-dom';
import CreactReceiptForm from './components/CreactReceiptForm';
import PageTitle from '../Layout/PageTitle';

const EditPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="Update Cost" />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <CreactReceiptForm id={id} />
        </div>
      </div>
    </>
  );
};

EditPage.propTypes = {};

export default EditPage;
