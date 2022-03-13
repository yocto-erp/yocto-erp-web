import React from "react";
import PageTitle from "../../Layout/PageTitle";
import StudentConfigurationForm from "./components/StudentConfigurationForm";

const ConfigurationPage = () => (
  <>
    <PageTitle title="Student Configuration" />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <StudentConfigurationForm />
      </div>
    </div>
  </>
);

ConfigurationPage.propTypes = {};

export default ConfigurationPage;
