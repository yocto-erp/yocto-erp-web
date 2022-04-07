import React from "react";
import PageTitle from "../../../Layout/PageTitle";
import MyFormPaid from "./MyFormPaid";

const CreatePagePaid = () => (
  <>
    <PageTitle title="Tạo Trả Nợ" />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <MyFormPaid />
      </div>
    </div>
  </>
);

CreatePagePaid.propTypes = {};

export default CreatePagePaid;
