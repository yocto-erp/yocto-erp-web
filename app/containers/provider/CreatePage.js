import React from "react";
import { FormattedMessage } from "react-intl";
import MyForm from "./components/MyForm";
import PageTitle from "../Layout/PageTitle";
import messages from "./messages";

const CreatePage = () => (
  <>
    <PageTitle title={<FormattedMessage {...messages.createPageTitle} />} />
    <div className="row">
      <div className="col-md-12">
        <MyForm />
      </div>
    </div>
  </>
);

CreatePage.propTypes = {};

export default CreatePage;
