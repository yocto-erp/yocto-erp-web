import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

import { useSelector } from "react-redux";
import s from "./ListGroup.module.scss";
import { imagePath } from "../../../../libs/apis/image.api";
import noImage from "../../../../images/No_image_available.svg";
import { formatMoney } from "../../../../libs/utils/number.util";

const OrderProduct = () => {
  const { products } = useSelector(state => state.shop);
  return React.useMemo(
    () => (
      <ListGroup className={[s.listGroup, "thin-scroll"].join(" ")}>
        {products?.map(item => (
          <ListGroupItem
            className={[s.listGroupItem].join(" ")}
            key={item.product.id}
          >
            <div className="media">
              <img
                style={{ width: "32px", height: "32px" }}
                src={
                  item?.product?.thumbnail
                    ? imagePath(item?.product?.thumbnail)
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

export default OrderProduct;
