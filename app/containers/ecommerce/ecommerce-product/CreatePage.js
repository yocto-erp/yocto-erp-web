import React from "react";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../Layout/PageTitle";
import ECommerceProductForm from "./eCommerceProductForm";
import messages from "../messages";

const CreatePage = () => (
  <>
    <PageTitle title={<FormattedMessage {...messages.listPageCreateBtn} />} />
    <div className="row">
      <div className="col-md-12">
        <ECommerceProductForm />
      </div>
    </div>
  </>
);
export default CreatePage;
