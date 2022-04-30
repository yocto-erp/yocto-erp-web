import React from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import MyForm from "./components/MyForm";
import PageTitle from "../Layout/PageTitle";
import { studentFormMessage } from "./messages";

const EditPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle
        title={<FormattedMessage {...studentFormMessage.pageUpdateHeader} />}
      />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <MyForm id={id} />
        </div>
      </div>
    </>
  );
};

EditPage.propTypes = {};

export default EditPage;
