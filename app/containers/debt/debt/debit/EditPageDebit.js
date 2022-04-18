import React from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../../Layout/PageTitle";
import MyFormDebit from "./MyFormDebit";
import messages from "../../messages";

const EditPageDebit = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title={<FormattedMessage {...messages.editDebtTitle} />} />
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
