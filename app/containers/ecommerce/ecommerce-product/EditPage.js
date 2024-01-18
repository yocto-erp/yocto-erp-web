import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../Layout/PageTitle";
import ECommerceProductForm from "./eCommerceProductForm";

const EditPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="Update Sale Product" />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <ECommerceProductForm id={Number(id)} />
        </div>
      </div>
    </>
  );
};

EditPage.propTypes = {};

export default EditPage;
