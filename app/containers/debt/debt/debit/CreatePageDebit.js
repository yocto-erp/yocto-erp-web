import React from "react";
import PageTitle from "../../../Layout/PageTitle";
import MyFormDebit from "./MyFormDebit";

const CreatePageDebit = () => (
  <>
    <PageTitle title="Tạo Ghi Nợ" />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <MyFormDebit />
      </div>
    </div>
  </>
);

CreatePageDebit.propTypes = {};

export default CreatePageDebit;
