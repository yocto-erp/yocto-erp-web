import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from 'reactstrap';
import { addToCart } from '../../containers/public/shop/redux/shopping';
import { imagePath } from '../../libs/apis/image.api';
import noImage from '../../images/No_image_available.svg';

const CardShop = ({ index, item }) => {
  const dispatch = useDispatch();
  const addProduct = useCallback(() => dispatch(addToCart(item)), [dispatch]);
  return (
    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 mt-3" key={index}>
      <Card>
        <CardImg
          top
          width="100%"
          src={
            item?.product?.thumbnail
              ? imagePath(item?.product?.thumbnail)
              : noImage
          }
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h5" className="bold">
            {item?.webDisplayName}
          </CardTitle>
          <CardText>{item?.price} VND</CardText>
          <Button onClick={addProduct}>Add Card</Button>
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
