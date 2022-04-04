import React from "react";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../Layout/PageTitle";
import MyForm from "./components/MyForm";
import messages from "./messages";

const CreatePage = () => (
  <>
    <PageTitle title={<FormattedMessage {...messages.createPageHeader} />} />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <MyForm />
      </div>
    </div>
  </>
);

CreatePage.propTypes = {};

export default CreatePage;
