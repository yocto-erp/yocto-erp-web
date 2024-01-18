import React from "react";
import MyForm from "./components/MyForm";
import PageTitle from "../../Layout/PageTitle";

const CreatePage = () => (
  <>
    <PageTitle title="Tạo form đăng ký" />
    <MyForm />
  </>
);

CreatePage.propTypes = {};

export default CreatePage;
