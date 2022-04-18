import React from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../../Layout/PageTitle";
import MyFormPaid from "./MyFormPaid";
import messages from "../../messages";

const EditPagePaid = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title={<FormattedMessage {...messages.editDebtPaidTitle} />} />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <MyFormPaid id={id} />
        </div>
      </div>
    </>
  );
};

EditPagePaid.propTypes = {};

export default EditPagePaid;
