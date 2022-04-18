import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from "prop-types";
import s from "./ListGroup.module.scss";
import { cloudImageUrl } from "../../../../libs/apis/image.api";
import noImage from "../../../../images/No_image_available.svg";
import { formatMoney } from "../../../../libs/utils/number.util";

const OrderProduct = ({ products }) => {
  console.log(products);
  return React.useMemo(
    () => (
      <ListGroup className={[s.listGroup, "thin-scroll"].join(" ")}>
        {products &&
          products?.map(item => (
            <ListGroupItem
              className={[s.listGroupItem].join(" ")}
              key={item.product.id}
            >
              <div className="media">
                <img
                  style={{ width: "32px", height: "32px" }}
                  src={
                    item.product?.thumbnail
                      ? cloudImageUrl(item.product?.thumbnail)
                      : noImage
                  }
                  className="align-self-center mr-3"
                  alt="thumbnail"
                />
                <div className="media-body">
                  <p className="mb-0">
                    {item.qty} x {item?.product?.webDisplayName} -{" "}
                    {formatMoney(item?.product.price, "VND")}
                  </p>
                </div>
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    ),
    [products],
  );
};
OrderProduct.propTypes = {
  products: PropTypes.array,
};

export default OrderProduct;
