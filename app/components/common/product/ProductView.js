import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import noImage from "../../../images/No_image_available.svg";
import { thumbnail } from "../../../libs/apis/image.api";
import ProductImageView from "./ProductImageView";
import { hasText } from "../../../utils/util";
import productApi from "../../../libs/apis/product/product.api";

export const PRODUCT_VIEW_TYPE = {
  NORMAL: 1,
  CARD: 2,
};
const ProductView = ({ item, type = PRODUCT_VIEW_TYPE.NORMAL }) => {
  const [isViewImage, setIsViewImage] = useState(false);
  const onViewListImage = useCallback(() => {
    if (item.thumbnail) {
      setIsViewImage(true);
    }
  }, [item]);
  return (
    <>
      {type === PRODUCT_VIEW_TYPE.NORMAL && (
        <div className="media">
          <img
            role="presentation"
            src={item.thumbnail ? thumbnail(item.thumbnail) : noImage}
            style={{ width: 48, height: 48, cursor: "pointer" }}
            title="Click to view all image"
            className="mr-3"
            alt="..."
            onClick={onViewListImage}
            onKeyDown={onViewListImage}
          />
          <div className="media-body">
            <p className="mt-0 mb-0 font-weight-bold">
              {item.productDocumentId}
            </p>
            <p className="mt-0 mb-0">{item.name}</p>
          </div>
        </div>
      )}
      {type === PRODUCT_VIEW_TYPE.CARD && (
        <div className="card">
          <img
            src={item.thumbnail ? thumbnail(item.thumbnail) : noImage}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="mt-0 mb-0 font-weight-bold">
              {item.productDocumentId}
            </p>
            <p className="mt-0 mb-0">{item.name}</p>
          </div>
        </div>
      )}
      {hasText(item?.thumbnail) ? (
        <ProductImageView
          getAssetsApi={() => productApi.assets(item.id)}
          isOpen={isViewImage}
          onClose={() => setIsViewImage(false)}
        />
      ) : null}
    </>
  );
};

ProductView.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.number,
};

export default ProductView;
