import React from "react";
import { useParams } from "react-router-dom";
import MyForm from "./components/MyForm";

const DetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <MyForm id={id} />
        </div>
      </div>
    </>
  );
};

DetailPage.propTypes = {};

export default DetailPage;
