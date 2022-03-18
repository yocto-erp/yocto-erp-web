import React from "react";
import MyForm from "./components/MyForm";
import PageTitle from "../../Layout/PageTitle";

const CreatePage = () => (
  <>
    <PageTitle title="Create Student Monthly Fee" />
    <div className="row">
      <div className="col-md-12">
        <MyForm />
      </div>
    </div>
  </>
);

CreatePage.propTypes = {};

export default CreatePage;
