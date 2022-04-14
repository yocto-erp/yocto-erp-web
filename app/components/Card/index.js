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
import { addToCart } from "../../containers/public/shop/redux/shopping";
import { cloudImageUrl } from "../../libs/apis/image.api";
import noImage from "../../images/No_image_available.svg";
import { formatMoney } from "../../libs/utils/number.util";
import "./style.scss";

const CardShop = ({ index, item }) => {
  const dispatch = useDispatch();
  const addProduct = useCallback(() => dispatch(addToCart(item)), [dispatch]);
  return (
    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 mt-3" key={index}>
      <Card>
        <div className="box-image">
          <CardImg
            top
            src={item?.thumbnail ? cloudImageUrl(item.thumbnail) : noImage}
            alt="thumbnail"
          />
        </div>
        <CardBody>
          <CardTitle tag="h5" className="bold">
            {item?.webDisplayName}
          </CardTitle>
          <CardText>{formatMoney(item?.price, "VND")}</CardText>
          <Button onClick={addProduct}>Add to cart</Button>
        </CardBody>
      </Card>
    </div>
  );
};
CardShop.propTypes = {
  index: PropTypes.any,
  item: PropTypes.object,
};

export default CardShop;
