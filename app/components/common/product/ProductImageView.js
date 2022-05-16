import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import "./ProductImageView.scss";
import AssetLargeViewModal from "../../assets/AssetListView/AssetLargeViewModal";

const ProductImageView = ({ isOpen, onClose, getAssetsApi }) => {
  const { exec, state } = useApi(getAssetsApi);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      exec();
    }
  }, [isOpen]);

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      setItems(state.resp.filter(t => t !== null));
    }
  }, [state]);

  return isOpen ? (
    <AssetLargeViewModal onClose={onClose} assets={items} />
  ) : null;
};

ProductImageView.propTypes = {
  getAssetsApi: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default ProductImageView;
