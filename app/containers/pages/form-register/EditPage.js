import React from "react";
import { useParams } from "react-router-dom";
import MyForm from "./components/MyForm";
import PageTitle from "../../Layout/PageTitle";

const EditPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="Update Form" />
      <MyForm id={id} />
    </>
  );
};

EditPage.propTypes = {};

export default EditPage;
