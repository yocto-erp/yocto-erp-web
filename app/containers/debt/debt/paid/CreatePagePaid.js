import React from "react";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../../Layout/PageTitle";
import MyFormPaid from "./MyFormPaid";
import messages from "../../messages";

const CreatePagePaid = () => (
  <>
    <PageTitle title={<FormattedMessage {...messages.addDebtPaidTitle} />} />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <MyFormPaid />
      </div>
    </div>
  </>
);

CreatePagePaid.propTypes = {};

export default CreatePagePaid;
