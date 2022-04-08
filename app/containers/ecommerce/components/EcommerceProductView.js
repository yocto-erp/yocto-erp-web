import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import noImage from "../../../images/No_image_available.svg";
import { cloudImageUrl } from "../../../libs/apis/image.api";
import ProductImageView from "../../../components/common/product/ProductImageView";
import Tags from "../../../components/Form/tagging/ViewTags";
import ecommerceProductApi from "../../../libs/apis/ecommerce/ecommerce-product.api";

const EcommerceProductView = ({ item }) => {
  const [isViewImage, setIsViewImage] = useState(false);
  const onViewListImage = useCallback(() => {
    if (item.thumbnail) {
      setIsViewImage(true);
    }
  }, [item]);
  return (
    <>
      <div className="media">
        <img
          role="presentation"
          src={item.thumbnail ? cloudImageUrl(item.thumbnail) : noImage}
          style={{ width: 48, cursor: "pointer" }}
          title="Click to view all image"
          className="mr-3 img-thumbnail"
          alt="..."
          onClick={onViewListImage}
          onKeyDown={onViewListImage}
        />
        <div className="media-body">
          <p className="mt-0 mb-0 font-weight-bold">
            {item.product.productDocumentId}
          </p>
          <p className="mt-0 mb-0" title="Tên dùng hiển thị trên web">
            {item.webDisplayName}
          </p>
          <p
            className="mt-0 mb-0 small text-info"
            title="Tên dùng cho việc xuất hoá đơn trên máy POS"
          >
            {item.shortName}
          </p>
          <Tags item={item.tagging} />
        </div>
      </div>
      {item?.thumbnail ? (
        <ProductImageView
          getAssetsApi={() =>
            ecommerceProductApi.read(item.id).then(resp => resp.assets)
          }
          isOpen={isViewImage}
          onClose={() => setIsViewImage(false)}
        />
      ) : null}
    </>
  );
};

EcommerceProductView.propTypes = {
  item: PropTypes.object.isRequired,
};

export default EcommerceProductView;
