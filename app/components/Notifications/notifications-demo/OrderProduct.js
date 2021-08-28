import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { useSelector } from 'react-redux';
import s from './ListGroup.module.scss';
import { imagePath } from '../../../libs/apis/image.api';
import noImage from '../../../images/No_image_available.svg';

const OrderProduct = () => {
  const { products } = useSelector(state => state.shop);
  return React.useMemo(
    () => (
      <ListGroup className={[s.listGroup, 'thin-scroll'].join(' ')}>
        {products?.map(item => (
          <ListGroupItem className={s.listGroupItem} key={item.id}>
            <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
              <img
                className="rounded-circle"
                src={
                  item?.product?.thumbnail
                    ? imagePath(item?.product?.thumbnail)
                    : noImage
                }
                alt="..."
              />
            </span>
            <p className="m-0 overflow-hidden">
              {item?.webDisplayName} - {item?.price} VND
            </p>
          </ListGroupItem>
        ))}
      </ListGroup>
    ),
    [products],
  );
};

export default OrderProduct;
