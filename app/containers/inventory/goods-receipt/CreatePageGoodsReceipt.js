import React from "react";
import GoodsReceiptForm from "../components/GoodsReceiptForm";
import PageTitle from "../../Layout/PageTitle";

const CreatePageGoodsReceipt = () => (
  <>
    <PageTitle title="Tạo phiếu nhập kho" />
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <GoodsReceiptForm />
      </div>
    </div>
  </>
);

CreatePageGoodsReceipt.propTypes = {};

export default CreatePageGoodsReceipt;
