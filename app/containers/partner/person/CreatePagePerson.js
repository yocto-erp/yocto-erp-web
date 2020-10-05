import React from 'react';
import PageTitle from '../../Layout/PageTitle';
import MyForm from './components/MyForm';

const CreatePagePerson = () => (
  <>
    <PageTitle title="Create Person" />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <MyForm />
      </div>
    </div>
  </>
);

CreatePagePerson.propTypes = {};

export default CreatePagePerson;
