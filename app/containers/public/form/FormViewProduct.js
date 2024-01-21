import React, { useCallback, useState } from "react";
import "../index.scss";
import "./FormViewPage.scss";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import PropTypes from "prop-types";
import Price from "../../../components/common/Price";
import "./FormViewProduct.scss";

import { cloudAssetUrl } from "../../../libs/apis/image.api";
import ProductImageView from "../../../components/common/product/ProductImageView";
import ecommerceProductApi from "../../../libs/apis/ecommerce/ecommerce-product.api";

const FormViewProduct = ({ product, isActive = false, onClick }) => {
  const [isViewImage, setIsViewImage] = useState(false);
  const onViewListImage = useCallback(() => {
    if (product.thumbnail) {
      setIsViewImage(true);
    }
  }, [product]);

  return (
    <Card outline color="primary" className="h-100 form-product">
      <img
        role="presentation"
        src={cloudAssetUrl(product.thumbnail)}
        className="card-img-top"
        alt="product thumbnail"
        onClick={onViewListImage}
        onKeyDown={onViewListImage}
      />
      <CardBody>
        <CardTitle>{product.webDisplayName}</CardTitle>
        <CardText>
          <Price amount={product.price} />
        </CardText>
        {onClick && (
          <Button
            color={!isActive ? "primary" : "danger"}
            className="w-100"
            type="button"
            onClick={onClick}
          >
            {!isActive ? <span>Chọn</span> : <span>Bỏ chọn</span>}
          </Button>
        )}
      </CardBody>
      {isActive && <i className="fa fa-check active bg-success" />}
      {product.thumbnail ? (
        <ProductImageView
          getAssetsApi={() =>
            ecommerceProductApi.read(product.id).then(resp => resp.assets)
          }
          isOpen={isViewImage}
          onClose={() => setIsViewImage(false)}
        />
      ) : null}
    </Card>
  );
};

FormViewProduct.propTypes = {
  product: PropTypes.object,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FormViewProduct;
