import React from "react";
import PageTitle from "../../Layout/PageTitle";
import ECommerceProductForm from "./eCommerceProductForm";

const CreatePage = () => (
  <>
    <PageTitle title="New Sale Product" />
    <div className="row">
      <div className="col-md-12">
        <ECommerceProductForm />
      </div>
    </div>
  </>
);
export default CreatePage;
