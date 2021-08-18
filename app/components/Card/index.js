import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from 'reactstrap';

const CardShop = ({ index, item }) => {
  const image =
    item && item.product && item.product.thumbnail
      ? item.product?.thumbnail
      : 'https://img.freepik.com/free-photo/beautiful-tropical-beach-sea-ocean-with-white-cloud-blue-sky-copyspace_74190-8663.jpg?size=626&ext=jpg';
  return (
    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 mt-3">
      <Card>
        <CardImg top width="100%" src={image} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5" className="bold">
            {item?.webDisplayName}
          </CardTitle>
          <CardText>{item?.price} VND</CardText>
          <Button>Add Card</Button>
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
