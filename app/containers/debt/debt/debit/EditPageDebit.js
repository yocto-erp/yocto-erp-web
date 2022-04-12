import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../../Layout/PageTitle";
import MyFormDebit from "./MyFormDebit";

const EditPageDebit = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="Chỉnh Sửa Ghi Nợ" />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <MyFormDebit id={id} />
        </div>
      </div>
    </>
  );
};

EditPageDebit.propTypes = {};

export default EditPageDebit;
