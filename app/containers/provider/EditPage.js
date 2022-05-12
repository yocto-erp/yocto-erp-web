import React from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import MyForm from "./components/MyForm";
import PageTitle from "../Layout/PageTitle";
import messages from "./messages";

const EditPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title={<FormattedMessage {...messages.updatePageTitle} />} />
      <div className="row">
        <div className="col-md-12">
          <MyForm id={id} />
        </div>
      </div>
    </>
  );
};

EditPage.propTypes = {};

export default EditPage;
