import React from "react";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../../Layout/PageTitle";
import MyFormDebit from "./MyFormDebit";
import messages from "../../messages";

const CreatePageDebit = () => (
  <>
    <PageTitle title={<FormattedMessage {...messages.addDebtTitle} />} />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <MyFormDebit />
      </div>
    </div>
  </>
);

CreatePageDebit.propTypes = {};

export default CreatePageDebit;
