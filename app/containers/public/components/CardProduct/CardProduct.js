import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";
import { toast } from "react-toastify";
import { userAddProduct } from "../../shop/redux/shopping";
import { cloudAssetUrl } from "../../../../libs/apis/image.api";
import noImage from "../../../../images/No_image_available.svg";
import { formatMoney } from "../../../../libs/utils/number.util";
import "./style.scss";
import { PRODUCT_SHOP_CACHE_LRU } from "../../shop/UserOrderPage/constants";
import ecommerceShopApi from "../../../../libs/apis/public/ecommerce-shop";

const CardProduct = ({ index, item }) => {
  const dispatch = useDispatch();
  const onProductClick = useCallback(
    product => {
      if (PRODUCT_SHOP_CACHE_LRU.has(product.id)) {
        return dispatch(userAddProduct(PRODUCT_SHOP_CACHE_LRU.get(product.id)));
      }
      return ecommerceShopApi
        .read(product.id)
        .then(t => {
          PRODUCT_SHOP_CACHE_LRU.set(t.id, t);
          return dispatch(userAddProduct(t));
        })
        .catch(e => {
          let message;
          if (e && e.errors && e.errors.length) {
            message = e.errors.map(t => t.message || t.code).join("\n");
          } else if (e.error) {
            // eslint-disable-next-line prefer-destructuring
            message = e.error.message;
          } else {
            message = e.message || e.statusText;
          }
          toast.error(message);
        });
    },
    [dispatch],
  );
  return (
    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 mt-3" key={index}>
      <Card>
        <div className="box-image">
          <CardImg
            top
            src={item?.thumbnail ? cloudAssetUrl(item.thumbnail) : noImage}
            alt="thumbnail"
          />
        </div>
        <CardBody>
          <CardTitle tag="h5" className="bold">
            {item?.webDisplayName}
          </CardTitle>
          <CardText>{formatMoney(item?.price, "VND")}</CardText>
          <Button onClick={() => onProductClick(item)}>Buy Product</Button>
        </CardBody>
      </Card>
    </div>
  );
};
CardProduct.propTypes = {
  index: PropTypes.any,
  item: PropTypes.object,
};

export default CardProduct;
